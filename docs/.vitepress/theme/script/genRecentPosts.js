import fs from "fs";
import path from "path";
import matter from "gray-matter";

const skipDirs = new Set([".vitepress", "public", "node_modules", ".git", "gen"]);

function getPosts(dir) {
  let posts = [];

  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (skipDirs.has(file)) {
        return;
      }
      // 递归遍历子目录
      posts = posts.concat(getPosts(filePath));
    } else if (stat.isFile() && file.endsWith(".md")) {
      // 处理 Markdown 文件
      const content = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(content);

      // 只处理 published: true 的文件
      if (data.published) {
        const relativePath = path.relative(path.resolve("./docs"), filePath);
        const urlPath = `/${relativePath.replace(/\.md$/, "")}`;
        posts.push({
          title: data.title,
          description: data.description,
          date: new Date(data.date).toISOString().split("T")[0], // 格式化日期
          path: urlPath,
        });
      }
    }
  });

  return posts;
}

function generateRecentPosts() {
  const postsDir = path.resolve("./docs");
  let posts = getPosts(postsDir);

  // Sort posts by date
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Return the latest 6 posts
  posts = posts.slice(0, 6);

  // Ensure the output directory exists
  const outputDir = path.resolve("./docs");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the posts to a JSON file
  const outputPath = path.join(outputDir, "recent-posts.json");
  fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
}

generateRecentPosts();
