// mermaid-renderer.mjs
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import crypto from "crypto";

const execAsync = promisify(exec);

// 确保图片目录存在
export function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 计算 Mermaid 代码的 MD5 哈希值
export function getMermaidHash(mermaidCode) {
  return crypto.createHash("md5").update(mermaidCode).digest("hex");
}

// 获取图片 URL
export function getImageUrl(baseUrl, hash) {
  return `${baseUrl}mermaid-images/mermaid-${hash}.png`;
}

// 渲染 Mermaid 为图片
export async function renderMermaidToImage(mermaidCode, outputDir, hash) {
  // 确保输出目录存在
  ensureDirectoryExists(outputDir);

  const imgFileName = `mermaid-${hash}.png`;
  const imgPath = path.join(outputDir, imgFileName);

  // 创建临时 Mermaid 文件
  const tempMmdFile = path.join(outputDir, `temp-${hash}.mmd`);
  fs.writeFileSync(tempMmdFile, mermaidCode);

  try {
    // 使用 mmdc 渲染 Mermaid 为图片
    await execAsync(
      `npx mmdc -i "${tempMmdFile}" -o "${imgPath}" -b transparent`,
    );

    // 删除临时文件
    fs.unlinkSync(tempMmdFile);

    return imgPath;
  } catch (err) {
    console.error(`Error rendering mermaid diagram: ${err.message}`);
    // 删除临时文件
    if (fs.existsSync(tempMmdFile)) {
      fs.unlinkSync(tempMmdFile);
    }
    throw err;
  }
}
