// mermaid-preprocessor.mjs
import fs from "fs";
import path from "path";
import {
  getMermaidHash,
  getImageUrl,
  renderMermaidToImage,
} from "./mermaid-renderer.mjs";

// 处理 Markdown 文件中的 Mermaid 代码块
export async function processMermaidInMarkdown(markdown, outputDir, baseUrl) {
  // 正则表达式匹配 Mermaid 代码块
  const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/g;
  let match;
  let processedMarkdown = markdown;
  const imagePromises = [];

  while ((match = mermaidRegex.exec(markdown)) !== null) {
    const mermaidCode = match[1];
    const mermaidBlock = match[0];

    // 为每个图生成唯一的哈希值
    const hash = getMermaidHash(mermaidCode);

    // 渲染 Mermaid 为图片
    const renderPromise = renderMermaidToImage(mermaidCode, outputDir, hash)
      .then(() => {
        // 替换 Markdown 中的 Mermaid 代码块为图片链接
        const imgUrl = getImageUrl(baseUrl, hash);
        processedMarkdown = processedMarkdown.replace(
          mermaidBlock,
          `![Mermaid Diagram](${imgUrl})`,
        );
      })
      .catch((err) => {
        console.error(`Error processing mermaid diagram: ${err.message}`);
      });

    imagePromises.push(renderPromise);
  }

  // 等待所有图片处理完成
  await Promise.all(imagePromises);
  return processedMarkdown;
}
