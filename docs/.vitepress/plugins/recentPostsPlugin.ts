import { Plugin } from "vite";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getPosts(dir: string): any[] {
  let posts: any[] = [];

  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 递归遍历子目录
      posts = posts.concat(getPosts(filePath));
    } else if (stat.isFile() && file.endsWith(".md")) {
      // 处理 Markdown 文件
      const content = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(content);

      // 只处理 published: true 的文件
      if (data.published) {
        const relativePath = path.relative(
          path.resolve(__dirname, "../../"),
          filePath,
        );
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

export default function recentPostsPlugin(): Plugin {
  return {
    name: "vitepress-recent-posts",
    configureServer(server) {
      server.middlewares.use("/api/recent-posts", (req, res) => {
        const postsDir = path.resolve(__dirname, "../../");
        let posts = getPosts(postsDir);

        // Sort posts by date
        posts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

        // Return the latest 6 posts
        posts = posts.slice(0, 6);

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(posts));
      });
    },
  };
}
