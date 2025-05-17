// rss build plugin
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import RSS from "rss";
import { createMarkdownRenderer } from "vitepress";
import { processMermaidInMarkdown } from "../script/mermaid-preprocessor.mjs";

// 替换 __dirname 的获取方式
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseUrl = "https://chenpeel.github.io/";
const contentBase = path.join(__dirname, "../../..");
const mermaidImagesDir = path.join(contentBase, "public", "mermaid-images");

async function generateFeedItems() {
  const categories = ["Tools", "CS", "Math", "Literature", "Stories"];
  const items = [];
  const md = await createMarkdownRenderer();

  // 确保 mermaid 图片目录存在
  if (!fs.existsSync(mermaidImagesDir)) {
    fs.mkdirSync(mermaidImagesDir, { recursive: true });
  }

  async function addItemToFeed(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");
    const { data, content: body } = matter(content);

    if (categories.includes(data.category) && data.published !== false) {
      // 处理 Markdown 中的 Mermaid 图表
      const processedBody = await processMermaidInMarkdown(
        body,
        mermaidImagesDir,
        baseUrl,
      );

      const htmlContent = md.render(processedBody);
      const relativePath = path.relative(contentBase, filePath);
      const item = {
        title: data.title || "Untitled",
        description: htmlContent,
        link: `${baseUrl}${relativePath.replace(/\.md$/, ".html")}`,
        date: new Date(data.date || Date.now()),
      };

      // Check for duplicates
      if (!items.some((existingItem) => existingItem.link === item.link)) {
        items.push(item);
        console.log(`Added item to RSS: ${item.title} - ${item.link}`);
      } else {
        console.log(`Skipped duplicate item: ${item.title}`);
      }
    }
  }

  async function walkDir(dir) {
    const files = fs.readdirSync(dir);
    const promises = [];

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Skip .vitepress directory and node_modules
        if (
          file === ".vitepress" ||
          file === "node_modules" ||
          file === "dist" ||
          file === ".git"
        ) {
          continue;
        }
        promises.push(walkDir(filePath));
      } else if (filePath.endsWith(".md")) {
        promises.push(addItemToFeed(filePath));
      }
    }

    await Promise.all(promises);
  }

  await walkDir(contentBase);
  return items;
}

export async function generateRSS() {
  console.log("Generating RSS feed...");

  const feed = new RSS({
    title: "Chenpeel",
    description:
      "乐只君子,福履将之 feedId:80283127044613120+userId:68880753051241472",
    feed_url: `${baseUrl}rss.xml`,
    site_url: baseUrl,
    language: "zh-CN",
  });

  const items = await generateFeedItems();
  items.forEach((item) => feed.item(item));

  // Write to the standard VitePress output directory
  const outputDir = path.resolve(contentBase, ".vitepress/dist");
  const outputPath = path.join(outputDir, "rss.xml");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, feed.xml({ indent: true }));
  console.log(`RSS feed written to: ${outputPath}`);

  // Also copy to docs/public directory to ensure it's accessible during development
  const publicDir = path.resolve(contentBase, "public");
  const publicPath = path.join(publicDir, "rss.xml");

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(publicPath, feed.xml({ indent: true }));
  console.log(`RSS feed also copied to public directory: ${publicPath}`);
}

let rssGenerated = false;

export default function rssPlugin() {
  return {
    name: "vite-plugin-rss",
    apply: "build",
    enforce: "post",
    // 使用 buildEnd 钩子代替 closeBundle
    buildEnd: async () => {
      if (!rssGenerated) {
        try {
          console.log("RSS generation triggered from plugin buildEnd hook");
          await generateRSS();
          rssGenerated = true;
        } catch (error) {
          console.error("Error generating RSS:", error);
        }
      }
    },
  };
}
