// build for rss
import { build } from "vitepress";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildSite() {
  try {
    await build({
      root: path.resolve(__dirname, ".."),
      outDir: path.resolve(__dirname, "dist"),
    });
    console.log("Site built successfully.");
  } catch (error) {
    console.error("Error building site:", error);
    process.exit(1);
  }
}

buildSite();
