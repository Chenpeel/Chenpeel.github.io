const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const primaryCnamePath = path.join(repoRoot, "CNAME");
const docsCnamePath = path.join(repoRoot, "docs", "CNAME");
const wranglerPath = path.join(
  repoRoot,
  "workers",
  "deepseek-proxy",
  "wrangler.toml",
);

function readCname(filePath) {
  if (!fs.existsSync(filePath)) {
    return "";
  }
  const content = fs.readFileSync(filePath, "utf8");
  const line = content
    .split(/\r?\n/)
    .map((value) => value.trim())
    .find((value) => value.length > 0);
  return line || "";
}

const cname = readCname(primaryCnamePath) || readCname(docsCnamePath);
if (!cname) {
  console.error("No CNAME found in repo root or docs/CNAME.");
  process.exit(1);
}

const origins = new Set();
origins.add(`https://${cname}`);
if (cname.startsWith("www.")) {
  origins.add(`https://${cname.slice(4)}`);
} else {
  origins.add(`https://www.${cname}`);
}
origins.add("http://127.0.0.1:5173");

const originList = Array.from(origins).join(",");

const wranglerContent = fs.readFileSync(wranglerPath, "utf8");
const updated = wranglerContent.replace(
  /^ALLOWED_ORIGINS\s*=\s*".*"$/m,
  `ALLOWED_ORIGINS = "${originList}"`,
);

if (updated === wranglerContent) {
  console.log("ALLOWED_ORIGINS already up to date.");
  process.exit(0);
}

fs.writeFileSync(wranglerPath, updated, "utf8");
console.log(`Updated ALLOWED_ORIGINS from CNAME: ${cname}`);
