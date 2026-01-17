# Repository Guidelines

本指南用于贡献与维护本仓库的 VitePress 站点内容，提交前请对照以下约定。

## 项目结构与模块组织
- `docs/` 是站点根目录，内容以 Markdown 归档在分类目录下（例：`docs/tools/cmake.md`、`docs/cs/linux/0x00.md`）。
- `docs/public/` 放置静态资源；`docs/public/rss.xml`、`docs/recent-posts.json`、`docs/public/skills-cloud.json` 为生成文件，`docs/skills-cloud.json` 为词云源数据。
- `docs/.vitepress/` 存放配置与主题实现；`docs/.vitepress/dist/`、`docs/.vitepress/cache/` 为构建产物，不手改。

## 自定义主题与组件（保留既有实现）
- Vue 组件位于 `docs/.vitepress/theme/components/`，现有组件包含 `NahidaChat.vue`、`RecentPost.vue`、`SkillsCloud.vue`、`Mermaid.vue`、`NahidaLive2D.vue`、`TextCloud.vue`；修改时请保持已有交互与入口引用。
- 样式集中在 `docs/.vitepress/theme/css/`，常用文件有 `custom.css`、`article.css`、`card.css`、`table.css`、`keyboard.css`、`book.css`、`lantern.css`、`ring.css`、`firework.css`。

## 构建、测试与本地开发
- `npm install`：安装依赖（Node 版本由 Volta 固定为 23.6.0）。
- `npm run docs:dev`：生成 RSS/近期文章并启动本地开发服务器。
- `npm run docs:build`：构建站点到 `docs/.vitepress/dist`，同时刷新 RSS。
- `npm run docs:preview`：预览构建产物。
- `npm run generate:skills_cloud`：生成 `docs/skills-cloud.json` 与 `docs/public/skills-cloud.json`。
- `npm run generate:RP_RSS`：生成近期文章、skills 词云与 RSS。

## 编码风格与命名规范
- JS/TS 延续现有风格：2 空格缩进、双引号、分号；保持与 `docs/.vitepress/` 一致。
- Markdown 需包含 YAML frontmatter，常用字段：`title`、`date`、`category`、`published`。日期格式 `YYYY-MM-DD`。
- `skills_cloud` 用于词云收集：`true` 自动取标题，数组用于精确词条（如 `["Linux", "Docker"]`），`false` 直接排除。
- 文件命名遵循目录惯例，例如 `index.md` 或 `0xNN.md` 系列。

## 测试与验证
- 当前无自动化测试；提交前至少执行 `npm run docs:build` 并用 `npm run docs:preview` 进行页面抽查。

## 提交与 PR 规范
- Commit 信息保持短句、直观（如 `fix live2d`、`Update Docs`）。
- PR 需简要说明、列出影响的页面/组件；涉及 UI 变更请附截图，并注明是否更新了生成文件。
