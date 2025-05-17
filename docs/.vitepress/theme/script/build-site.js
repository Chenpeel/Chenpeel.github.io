import { build } from "vitepress";
import { fileURLToPath } from "url";
import path from "path";
import { generateRSS } from "../plugins/rss-plugin.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

async function buildSite() {
  try {
    // 传递源码目录路径作为参数
    await build(rootDir);
    console.log("Site built successfully.");

    // 生成完网站后再生成RSS
    try {
      await generateRSS();
      console.log("RSS generated successfully.");
    } catch (rssError) {
      console.error("Error generating RSS:", rssError);
      // RSS生成错误不影响整体构建结果
    }
  } catch (error) {
    console.error("Error building site:", error);
    process.exit(1);
  }
}

buildSite();
