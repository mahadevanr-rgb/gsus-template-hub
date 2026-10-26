import assert from "node:assert/strict";
import test from "node:test";
import {
  commitDateTimeDraft,
  createDateTimeDraft,
  isCalendarDateAllowed,
  publishDateTimeValue,
  selectDraftDate,
  selectDraftTime,
} from "./dateTimePickerModel.js";

const localDate = (year, month, day) => new Date(year, month - 1, day);

test("date selection and time selection stay draft-only until submit", () => {
  const initialDraft = createDateTimeDraft("");
  const dateDraft = selectDraftDate(initialDraft, "2026-10-14");
  const timeDraft = selectDraftTime(dateDraft, "17:45");

  assert.equal(initialDraft.date, "");
  assert.equal(initialDraft.time, "09:00");
  assert.deepEqual(timeDraft, { date: "2026-10-14", time: "17:45" });
  const onChangeValues = [];
  assert.deepEqual(commitDateTimeDraft(timeDraft, {}, (value) => onChangeValues.push(value)), {
    ok: true,
    value: "2026-10-14T17:45",
  });
  assert.deepEqual(onChangeValues, ["2026-10-14T17:45"]);
});

test("submit requires a selected date and a valid local date/time", () => {
  const onChangeValues = [];
  assert.deepEqual(commitDateTimeDraft(createDateTimeDraft("")), {
    ok: false,
    error: "Select a date before submitting.",
  });
  assert.equal(
    commitDateTimeDraft(
      { date: "2026-02-30", time: "10:00" },
      {},
      (value) => onChangeValues.push(value),
    ).ok,
    false,
  );
  assert.equal(
    commitDateTimeDraft({ date: "2026-02-28", time: "24:00" }).ok,
    false,
  );
  assert.deepEqual(onChangeValues, []);
});

test("date-only min and max include their complete local calendar days", () => {
  const onMinDay = commitDateTimeDraft(
    { date: "2026-10-14", time: "00:00" },
    { min: "2026-10-14", max: "2026-10-14" },
  );
  const onMaxDay = commitDateTimeDraft(
    { date: "2026-10-14", time: "23:59" },
    { min: "2026-10-14", max: "2026-10-14" },
  );
  assert.equal(onMinDay.ok, true);
  assert.equal(onMaxDay.ok, true);
  assert.equal(
    commitDateTimeDraft(
      { date: "2026-10-13", time: "23:59" },
      { min: "2026-10-14" },
    ).ok,
    false,
  );
  assert.equal(
    commitDateTimeDraft(
      { date: "2026-10-15", time: "00:00" },
      { max: "2026-10-14" },
    ).ok,
    false,
  );
});

test("datetime bounds validate the selected time without silently clamping", () => {
  const bounds = { min: "2026-10-14T10:30", max: "2026-10-15T16:00" };
  assert.equal(
    commitDateTimeDraft({ date: "2026-10-14", time: "10:29" }, bounds).ok,
    false,
  );
  assert.deepEqual(
    commitDateTimeDraft({ date: "2026-10-14", time: "10:30" }, bounds),
    { ok: true, value: "2026-10-14T10:30" },
  );
  assert.equal(
    commitDateTimeDraft({ date: "2026-10-15", time: "16:01" }, bounds).ok,
    false,
  );
});

test("calendar disables only dates outside date bounds and configured weekends", () => {
  assert.equal(
    isCalendarDateAllowed(localDate(2026, 10, 12), {
      min: "2026-10-13T14:00",
      max: "2026-10-20",
    }),
    false,
  );
  assert.equal(
    isCalendarDateAllowed(localDate(2026, 10, 13), {
      min: "2026-10-13T14:00",
      max: "2026-10-20",
    }),
    true,
  );
  assert.equal(
    isCalendarDateAllowed(localDate(2026, 10, 17), { disableWeekends: true }),
    false,
  );
  assert.equal(
    isCalendarDateAllowed(localDate(2026, 10, 16), { disableWeekends: true }),
    true,
  );
});

test("controlled value updates create a fresh draft from the new value", () => {
  assert.deepEqual(createDateTimeDraft("2026-10-14T17:45"), {
    date: "2026-10-14",
    time: "17:45",
  });
  assert.deepEqual(createDateTimeDraft("2026-10-14"), {
    date: "2026-10-14",
    time: "00:00",
  });
  assert.deepEqual(createDateTimeDraft(""), { date: "", time: "09:00" });
});

test("controlled commits notify the parent; uncontrolled commits update local state", () => {
  const parentValues = [];
  const internalValues = [];
  publishDateTimeValue("2026-10-14T17:45", {
    controlled: true,
    setInternalValue: (value) => internalValues.push(value),
    onChange: (value) => parentValues.push(value),
  });
  assert.deepEqual(parentValues, ["2026-10-14T17:45"]);
  assert.deepEqual(internalValues, []);

  publishDateTimeValue("2026-10-15T09:15", {
    controlled: false,
    setInternalValue: (value) => internalValues.push(value),
    onChange: (value) => parentValues.push(value),
  });
  assert.deepEqual(internalValues, ["2026-10-15T09:15"]);
  assert.deepEqual(parentValues, ["2026-10-14T17:45", "2026-10-15T09:15"]);
});
