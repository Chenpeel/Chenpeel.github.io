import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentBase = path.resolve("./docs");
const outputPath = path.join(contentBase, "at-pages.json");
const publicOutputPath = path.join(contentBase, "public", "at-pages.json");
const distOutputPath = path.join(contentBase, ".vitepress", "dist", "at-pages.json");
const MAX_CONTENT_CHARS = 1800;
const skipDirs = new Set([".vitepress", "public", "node_modules", ".git"]);

function extractTitle(content) {
  const match = content.match(/^#{1,3}\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function buildUrlPath(filePath) {
  const relativePath = path.relative(contentBase, filePath);
  let urlPath = `/${relativePath.replace(/\\/g, "/").replace(/\.md$/, "")}`;
  if (urlPath.endsWith("/index")) {
    urlPath = urlPath.slice(0, -"/index".length) || "/";
  }
  return urlPath;
}

function normalizeContent(content) {
  const cleaned = content.replace(/\r\n/g, "\n").trim();
  const condensed = cleaned.replace(/\n{3,}/g, "\n\n");
  if (condensed.length <= MAX_CONTENT_CHARS) {
    return condensed;
  }
  return `${condensed.slice(0, MAX_CONTENT_CHARS)}\n...[truncated]`;
}

function walkDir(dir, pages) {
  const entries = fs.readdirSync(dir);
  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (skipDirs.has(entry)) {
        return;
      }
      walkDir(fullPath, pages);
      return;
    }
    if (!fullPath.endsWith(".md")) {
      return;
    }

    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    if (data?.at === false || data?.at === "false") {
      return;
    }

    const pagePath = buildUrlPath(fullPath);
    if (pagePath === "/") {
      return;
    }
    const title = data?.title || extractTitle(content) || pagePath;
    pages.push({
      title,
      path: pagePath,
      content: normalizeContent(content),
    });
  });
}

function writeOutput(targetPath, data) {
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(targetPath, JSON.stringify(data, null, 2));
}

const pages = [];
walkDir(contentBase, pages);
pages.sort((a, b) => a.path.localeCompare(b.path, "zh"));
writeOutput(outputPath, pages);
writeOutput(publicOutputPath, pages);
if (fs.existsSync(path.dirname(distOutputPath))) {
  writeOutput(distOutputPath, pages);
}
