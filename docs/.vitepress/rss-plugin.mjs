// rss build plugin
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import RSS from "rss";
import { createMarkdownRenderer } from "vitepress";

// 替换 __dirname 的获取方式
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseUrl = "https://chenpeel.github.io/";
const contentBase = path.join(__dirname, "..");

async function generateFeedItems() {
  const categories = ["Tools", "CS", "Math", "Literature", "Stories"];
  const items = [];
  const md = await createMarkdownRenderer();

  function addItemToFeed(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");
    const { data, content: body } = matter(content);

    if (categories.includes(data.category) && data.published !== false) {
      const htmlContent = md.render(body);
      const item = {
        title: data.title,
        description: htmlContent,
        link: `${baseUrl}${filePath.replace(contentBase, "").replace(/\.md$/, ".html")}`,
        date: new Date(data.date),
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

  function walkDir(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Skip .vitepress directory and node_modules
        if (file === ".vitepress" || file === "node_modules") {
          return;
        }
        walkDir(filePath);
      } else if (filePath.endsWith(".md")) {
        addItemToFeed(filePath);
      }
    });
  }

  walkDir(contentBase);
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
  const outputDir = path.resolve(__dirname, "dist");
  const outputPath = path.join(outputDir, "rss.xml");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, feed.xml({ indent: true }));
  console.log(`RSS feed written to: ${outputPath}`);

  // Also copy to docs/public directory to ensure it's accessible during development
  const publicDir = path.resolve(__dirname, "..", "public");
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
