import assert from "node:assert/strict";
import test from "node:test";
import { createCustomizedComponent } from "../services/codeCustomization/codeCustomizationService.js";
import {
  getInstallManifest,
  serializeJSXAttributes,
} from "./installContract.js";

test("custom source and preview props survive registry resolution into install usage", () => {
  const registryComponent = {
    id: "datetime-picker",
    slug: "datetime-picker",
    name: "Date + Time Picker",
    exportName: "DateTimePicker",
    namedExport: true,
    dependencies: ["lucide-react"],
    installProps: { theme: "light", accentColor: "#4f46e5" },
    files: [
      {
        path: "forms/DateTime/DateTimePickers.jsx",
        content: "export function DateTimePicker() { return null; }",
      },
    ],
  };
  const configuredProps = {
    theme: "dark",
    size: "compact",
    width: "auto",
    variant: "default",
    accentColor: "#ff5f7e",
    locale: "en-US",
    timeFormat: "12h",
    clearable: true,
    disableWeekends: false,
  };
  const customized = createCustomizedComponent(
    registryComponent,
    [
      {
        path: "forms/DateTime/DateTimePickers.jsx",
        content: "export function DateTimePicker() { return <div>custom</div>; }",
      },
    ],
    configuredProps,
  );
  const manifest = getInstallManifest(customized, [registryComponent]);

  assert.equal(manifest.files[0].content, customized.files[0].content);
  assert.deepEqual(manifest.installProps, configuredProps);
  assert.deepEqual(manifest.externalDependencies, ["lucide-react"]);
  assert.equal(manifest.exportName, "DateTimePicker");
  const configuredEntry = manifest.files.find((file) => file.type === "component-entry");
  assert.ok(configuredEntry);
  assert.match(configuredEntry.path, /DateTimePicker\.configured\.jsx$/);
  assert.match(configuredEntry.content, /"theme": "dark"/);
  assert.match(configuredEntry.content, /"clearable": true/);
  assert.match(configuredEntry.content, /"disableWeekends": false/);
  assert.match(configuredEntry.content, /\.\.\.customizedDefaults\} \{\.\.\.props/);

  const usage = `<DateTimePicker ${serializeJSXAttributes(manifest.installProps)} />`;
  assert.match(usage, /theme=\{"dark"\}/);
  assert.match(usage, /size=\{"compact"\}/);
  assert.match(usage, /width=\{"auto"\}/);
  assert.match(usage, /accentColor=\{"#ff5f7e"\}/);
  assert.match(usage, /timeFormat=\{"12h"\}/);
  assert.match(usage, /clearable/);
  assert.match(usage, /disableWeekends=\{false\}/);
  assert.doesNotMatch(usage, /theme=\{"light"\}/);
});

test("JSX prop serializer preserves false and omits only undefined values", () => {
  assert.equal(
    serializeJSXAttributes({ enabled: true, disabled: false, optional: undefined, count: 0 }),
    "enabled disabled={false} count={0}",
  );
});
