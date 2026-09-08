import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const membersPath = path.join(__dirname, "..", "members.json");
const requiredFields = ["id", "name", "url", "git_acc", "batch"];

const raw = await fs.readFile(membersPath, "utf8");
const members = JSON.parse(raw);

if (!Array.isArray(members) || members.length === 0) {
  throw new Error("members.json must contain at least one member");
}

for (const [index, member] of members.entries()) {
  for (const field of requiredFields) {
    if (typeof member[field] !== "string" || !member[field].trim()) {
      throw new Error(`member ${index + 1} is missing a valid ${field}`);
    }
  }
}

console.log(`Validated ${members.length} members.`);
