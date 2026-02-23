# 苏浩楷个人网站（简历 + Papers + 学习笔记）

## 项目结构

- `index.html`：主页与简历信息
- `papers.html`：论文与研究产出页面
- `notes.html`：学习笔记页面
- `styles.css`：全站样式
- `script.js`：移动端菜单、滚动动画、年份更新

## 本地使用

建议用本地服务打开（Markdown 与公式渲染更稳定）：

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`。

## GitHub Pages（推荐）

本仓库已提供自动部署工作流：`/Users/suhaokai/Documents/New project 2/.github/workflows/deploy-pages.yml`。  
完成以下一次性设置后，以后只需 `git push`：

1. 把仓库推到 GitHub，并确保默认分支是 `main`。
2. 在 GitHub 仓库设置里进入 `Settings -> Pages`，`Source` 选择 `GitHub Actions`。
3. 推送任意提交后，Actions 会自动部署，访问形如：`https://<你的用户名>.github.io/<仓库名>/`。

## 建议你优先修改

- `index.html` 中 `联系方式` 区域的邮箱和链接
- `papers.html` 中论文标题、摘要与PDF/代码链接
- `notes.html` 中笔记标题与文章链接
