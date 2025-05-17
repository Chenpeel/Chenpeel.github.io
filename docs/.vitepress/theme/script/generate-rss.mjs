// Standalone RSS generation script
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import RSS from "rss";
import { createMarkdownRenderer } from "vitepress";
import { processMermaidInMarkdown } from "./mermaid-preprocessor.mjs";

// Get paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseUrl = "https://chenpeel.github.io/";
const projectRoot = path.resolve(__dirname, "../../../.."); // 修正拼写错误，projectRoos -> projectRoot
const contentBase = path.join(projectRoot, "docs"); // 修正路径计算
const distDir = path.join(contentBase, ".vitepress", "dist");
const publicDir = path.join(contentBase, "public");
const mermaidImagesDir = path.join(publicDir, "mermaid-images");

// 添加调试信息
console.log("Script location:", __dirname);
console.log("Content base directory:", contentBase);
console.log("Public directory:", publicDir);
console.log("Mermaid images directory:", mermaidImagesDir);

async function generateFeedItems() {
  console.log("Starting to gather RSS feed items...");
  const categories = ["Tools", "CS", "Math", "Literature", "Stories"];
  const items = [];

  try {
    const md = await createMarkdownRenderer(contentBase);

    // 确保 mermaid 图片目录存在
    if (!fs.existsSync(mermaidImagesDir)) {
      fs.mkdirSync(mermaidImagesDir, { recursive: true });
    }

    async function addItemToFeed(filePath) {
      try {
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
          // Calculate relative path from contentBase
          const relativePath = path.relative(contentBase, filePath);

          const item = {
            title: data.title || "Untitled",
            description: htmlContent,
            link: `${baseUrl}${relativePath.replace(/\.md$/, ".html")}`,
            date: data.date ? new Date(data.date) : new Date(),
          };

          // Check for duplicates
          if (!items.some((existingItem) => existingItem.link === item.link)) {
            items.push(item);
            console.log(`Added item to RSS: ${item.title} - ${item.link}`);
          } else {
            console.log(`Skipped duplicate item: ${item.title}`);
          }
        }
      } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
      }
    }
    async function walkDir(dir) {
      try {
        const files = fs.readdirSync(dir);
        const promises = [];

        for (const file of files) {
          const filePath = path.join(dir, file);

          try {
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
          } catch (err) {
            console.error(`Error accessing ${filePath}:`, err);
          }
        }

        await Promise.all(promises);
      } catch (err) {
        console.error(`Error reading directory ${dir}:`, err);
      }
    }

    await walkDir(contentBase);
    console.log(`Found ${items.length} items for RSS feed.`);
    return items;
  } catch (error) {
    console.error("Error in generateFeedItems:", error);
    return [];
  }
}

async function generateRSS() {
  console.log("Starting RSS feed generation...");

  try {
    const feed = new RSS({
      title: "Chenpeel",
      description:
        "乐只君子,福履将之 feedId:80283127044613120+userId:68880753051241472",
      feed_url: `${baseUrl}rss.xml`,
      site_url: baseUrl,
      language: "zh-CN",
    });

    const items = await generateFeedItems();

    if (items.length === 0) {
      console.warn("Warning: No items found for the RSS feed.");
    }

    items.forEach((item) => feed.item(item));
    // Ensure dist directory exists
    if (!fs.existsSync(distDir)) {
      console.log(`Creating dist directory: ${distDir}`);
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Write to VitePress dist directory
    const outputPath = path.join(distDir, "rss.xml");
    fs.writeFileSync(outputPath, feed.xml({ indent: true }));
    console.log(`RSS feed written to dist directory: ${outputPath}`);

    // Also write to public directory
    if (!fs.existsSync(publicDir)) {
      console.log(`Creating public directory: ${publicDir}`);
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const publicPath = path.join(publicDir, "rss.xml");
    fs.writeFileSync(publicPath, feed.xml({ indent: true }));
    console.log(`RSS feed also written to public directory: ${publicPath}`);

    return { success: true, message: "RSS feed generated successfully" };
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return { success: false, error: error.message };
  }
}

// Execute the function when this script is run directly
generateRSS().then((result) => {
  if (result.success) {
    console.log("RSS generation complete!");
  } else {
    console.error("RSS generation failed:", result.error);
    process.exit(1);
  }
});
