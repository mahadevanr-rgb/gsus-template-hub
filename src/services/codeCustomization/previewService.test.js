import assert from "node:assert/strict";
import test from "node:test";
import {
  createPreviewDocument,
  resolvePreviewModulePath,
} from "./previewService.js";

test("preview resolves extensionless imports to registered JavaScript files", () => {
  const available = new Set([
    "forms/DateTime/DateTimePickers.jsx",
    "forms/DateTime/dateTimePickerModel.js",
  ]);

  assert.equal(
    resolvePreviewModulePath(
      "forms/DateTime/dateTimePickerModel",
      available,
    ),
    "forms/DateTime/dateTimePickerModel.js",
  );
  assert.equal(
    resolvePreviewModulePath("forms/DateTime/DateTimePickers", available),
    "forms/DateTime/DateTimePickers.jsx",
  );
});

test("preview keeps explicit module extensions and resolves relative paths", () => {
  const available = new Set([
    "forms/DateTime/dateTimePickerModel.js",
    "forms/DateTime/helpers/index.jsx",
  ]);

  assert.equal(
    resolvePreviewModulePath(
      "forms/DateTime/./dateTimePickerModel.jsx",
      available,
    ),
    "forms/DateTime/dateTimePickerModel.js",
  );
  assert.equal(
    resolvePreviewModulePath("forms/DateTime/helpers", available),
    "forms/DateTime/helpers/index.jsx",
  );
});

test("preview document includes the same tested local module resolver", () => {
  const document = createPreviewDocument({ exportName: "DateTimePicker" });
  assert.match(document, /resolvePreviewModulePath/);
  assert.match(document, /new Set\(Object\.keys\(globalThis\.__factories\)\)/);
});

test("preview document avoids a body overflow clip and controls scrolling on html", () => {
  const document = createPreviewDocument({ exportName: "DateTimePicker" });
  assert.doesNotMatch(document, /html,body\{overflow/);
  assert.doesNotMatch(document, /document\.body\.style\.overflow/);
  assert.match(document, /html\{overflow:hidden\}/);
  assert.match(document, /document\.documentElement\.style\.overflow=event\.data\.enabled\?'auto':'hidden'/);
});

test("preview document reveals date time popups in-frame and reports their viewport bounds", () => {
  const document = createPreviewDocument({ exportName: "DateTimePicker" });
  assert.match(document, /function revealPopup\(popup\)/);
  assert.match(document, /window\.scrollBy\(\{top:delta,behavior:'instant'\}\)/);
  assert.match(document, /popupViewportTop,popupViewportBottom/);
  assert.match(document, /revealPopupEnabled=Boolean\(event\.data\.enabled&&event\.data\.revealPopup\)/);
  assert.match(document, /function resetPopupScroll\(\)/);
  assert.match(document, /window\.scrollTo\(\{top:0,behavior:'instant'\}\)/);
  assert.match(document, /controlled\?\{\.\.\.previewProps,value,onChange:setValue\}:previewProps/);
  assert.match(document, /exportName==='DatePicker'\?\{defaultOpen:true,keepOpenOnSelect:true\}:\{\}/);
});

test("date picker preview behavior uses the component identity, not remote export metadata", () => {
  const document = createPreviewDocument({
    slug: "date-picker",
    exportName: "default",
  });

  assert.match(document, /const exportName="DatePicker"/);
  assert.match(document, /defaultOpen:true,keepOpenOnSelect:true/);
  assert.match(document, /cachedExportName=exportName/);
});
