import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";
import { dirMeta, sidebarRoots } from "./sidebarBlueprint.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsRoot = path.resolve(__dirname, "../../..");
const repoRoot = path.resolve(docsRoot, "..");
const outputPath = path.resolve(docsRoot, ".vitepress", "sidebar.mts");
const collator = new Intl.Collator("zh-Hans-CN", {
  numeric: true,
  sensitivity: "base",
});
const trackedMarkdownFiles = getTrackedMarkdownFiles();

function isMarkdownFile(entry) {
  return entry.isFile() && entry.name.endsWith(".md");
}

function isVisibleDirectory(entry) {
  return entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "public";
}

function readMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { data, content };
}

function cleanTitle(value) {
  return String(value ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(content) {
  const match = content.match(/^#{1,6}\s+(.+)$/m);
  return match ? cleanTitle(match[1]) : "";
}

function buildLinkFromPath(filePath) {
  const relativePath = path.relative(docsRoot, filePath).replace(/\\/g, "/");
  let link = `/${relativePath.replace(/\.md$/, "")}`;
  if (link.endsWith("/index")) {
    link = link.slice(0, -"/index".length) || "/";
    if (link !== "/" && !link.endsWith("/")) {
      link = `${link}/`;
    }
  }
  return link;
}

function getTrackedMarkdownFiles() {
  try {
    const stdout = execFileSync("git", ["ls-files", "-z", "--cached", "--", "docs"], {
      cwd: repoRoot,
      encoding: "utf-8",
    });

    return new Set(
      stdout
        .split("\0")
        .filter(Boolean)
        .filter((file) => file.endsWith(".md"))
        .map((file) => file.replace(/^docs\//, "")),
    );
  } catch (error) {
    console.warn("git ls-files failed, fallback to filesystem scan");
    return null;
  }
}

function isTrackedMarkdown(relativePath) {
  return !trackedMarkdownFiles || trackedMarkdownFiles.has(relativePath);
}

function getHexRank(name) {
  const match = name.match(/^0x([0-9a-f]+)$/i);
  return match ? Number.parseInt(match[1], 16) : null;
}

function humanizeSlug(slug) {
  return slug.replace(/[-_]+/g, " ").trim() || slug;
}

function getPageInfo(filePath) {
  const relativePath = path.relative(docsRoot, filePath).replace(/\\/g, "/");
  if (!isTrackedMarkdown(relativePath)) {
    return null;
  }

  const { data, content } = readMarkdown(filePath);
  if (data?.sidebar === false || data?.sidebar === "false") {
    return null;
  }
  if (data?.published !== true && data?.published !== "true" && data?.publish !== true && data?.publish !== "true") {
    return null;
  }

  const slug = path.basename(filePath, ".md");
  const fallbackTitle = extractTitle(content) || humanizeSlug(slug);
  const title =
    cleanTitle(data?.sidebarTitle || data?.sidebar_text || data?.title) || fallbackTitle;

  return {
    slug,
    title,
    link: buildLinkFromPath(filePath),
    isIndex: slug === "index",
  };
}

function getDirectoryMeta(relativeDir) {
  return dirMeta[relativeDir] || {};
}

function getDirectoryTitle(relativeDir) {
  const indexPath = path.join(docsRoot, relativeDir, "index.md");
  if (!fs.existsSync(indexPath)) {
    return "";
  }

  const pageInfo = getPageInfo(indexPath);
  return pageInfo?.title || "";
}

function compareEntries(a, b, order = []) {
  const aOrder = order.indexOf(a.orderKey);
  const bOrder = order.indexOf(b.orderKey);

  if (aOrder !== -1 || bOrder !== -1) {
    if (aOrder === -1) {
      return 1;
    }
    if (bOrder === -1) {
      return -1;
    }
    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }
  }

  if (a.type !== b.type) {
    return a.type === "page" ? -1 : 1;
  }

  const aHex = getHexRank(a.orderKey);
  const bHex = getHexRank(b.orderKey);
  if (aHex !== null && bHex !== null && aHex !== bHex) {
    return aHex - bHex;
  }
  if (aHex !== null && bHex === null) {
    return -1;
  }
  if (aHex === null && bHex !== null) {
    return 1;
  }

  return collator.compare(a.orderKey, b.orderKey);
}

function buildPageItem(relativeDir, pageInfo) {
  const meta = getDirectoryMeta(relativeDir);
  return {
    type: "page",
    orderKey: pageInfo.slug,
    item: {
      text: meta.itemText?.[pageInfo.slug] || pageInfo.title,
      link: pageInfo.link,
    },
  };
}

function buildDirectoryItem(relativeDir) {
  const fullDir = path.join(docsRoot, relativeDir);
  if (!fs.existsSync(fullDir)) {
    return null;
  }

  const meta = getDirectoryMeta(relativeDir);
  const entries = fs.readdirSync(fullDir, { withFileTypes: true });
  const markdownEntries = entries.filter(isMarkdownFile);
  const directoryEntries = entries.filter(isVisibleDirectory);

  let indexItem = null;
  const pageItems = [];

  markdownEntries.forEach((entry) => {
    const pageInfo = getPageInfo(path.join(fullDir, entry.name));
    if (!pageInfo) {
      return;
    }

    if (pageInfo.isIndex) {
      indexItem = {
        text: meta.indexText || pageInfo.title,
        link: pageInfo.link,
      };
      return;
    }

    pageItems.push(buildPageItem(relativeDir, pageInfo));
  });

  const groupItems = directoryEntries
    .map((entry) => {
      const childRelativeDir = path.posix.join(relativeDir, entry.name);
      const childGroup = buildDirectoryItem(childRelativeDir);
      if (!childGroup) {
        return null;
      }

      return {
        type: "group",
        orderKey: entry.name,
        item: childGroup,
      };
    })
    .filter(Boolean);

  const orderedItems = [...pageItems, ...groupItems]
    .sort((a, b) => compareEntries(a, b, meta.order))
    .map((entry) => entry.item);

  const items = indexItem ? [indexItem, ...orderedItems] : orderedItems;
  if (items.length === 0) {
    return null;
  }

  const directoryName = path.basename(relativeDir);
  const text = meta.text || getDirectoryTitle(relativeDir) || humanizeSlug(directoryName);

  return {
    text,
    collapsed: meta.collapsed ?? true,
    items,
  };
}

function buildSidebar() {
  return Object.fromEntries(
    sidebarRoots
      .map((root) => {
        const group = buildDirectoryItem(root.dir);
        if (!group) {
          return null;
        }
        return [root.base, [group]];
      })
      .filter(Boolean),
  );
}

function renderSidebarFile(sidebar) {
  return `// 此文件由 docs/.vitepress/theme/script/genSidebar.js 自动生成。
// 如需调整层级、排序或显示文案，请修改 sidebarBlueprint.js 后重新生成。

export const sidebar = ${JSON.stringify(sidebar, null, 2)};
`;
}

function writeIfChanged(targetPath, content) {
  const current = fs.existsSync(targetPath) ? fs.readFileSync(targetPath, "utf-8") : "";
  if (current === content) {
    return false;
  }
  fs.writeFileSync(targetPath, content);
  return true;
}

const sidebar = buildSidebar();
const output = renderSidebarFile(sidebar);
const changed = writeIfChanged(outputPath, output);

console.log(changed ? "sidebar.mts updated" : "sidebar.mts unchanged");
