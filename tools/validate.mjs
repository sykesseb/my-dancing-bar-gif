import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, relative, isAbsolute } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(resolve(root, "manifest.json"), "utf8"));
for (const key of ["name", "description", "main", "preview", "readme"]) {
  assert.equal(typeof manifest[key], "string", `${key} must be a string`);
  assert.ok(manifest[key].trim(), `${key} must not be empty`);
}
for (const key of ["main", "preview", "readme"]) {
  const path = resolve(root, manifest[key]);
  const pathFromRoot = relative(root, path);
  assert.ok(!pathFromRoot.startsWith("..") && !isAbsolute(pathFromRoot), `${key} must stay in the repository`);
  assert.ok(existsSync(path), `Missing ${key}: ${manifest[key]}`);
}
assert.ok(Array.isArray(manifest.authors) && manifest.authors.length, "An author is required");
assert.equal(manifest.authors[0].name, "sykesseb");
assert.equal(manifest.authors[0].url, "https://github.com/sykesseb");
const preview = readFileSync(resolve(root, manifest.preview));
assert.equal(preview.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", "Preview must be a valid PNG header");
assert.ok(existsSync(resolve(root, "LICENSE")), "License is missing");
console.log("Marketplace manifest, referenced files, author, PNG preview and license: OK");
