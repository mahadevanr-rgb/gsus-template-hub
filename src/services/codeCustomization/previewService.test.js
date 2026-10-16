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
