# GetHub - GitHub 下载加速器

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/hexrs/gethub)

[English Readme](README.md)

一个简洁、快速、现代化的 GitHub 文件下载加速应用。本项目基于 Cloudflare Workers 构建，作为一个高效的代理来获取和流式传输 GitHub 上的资源，包括源码、发行版（Releases）和原始文件（Raw files）。

## ✨ 功能特性

- **现代化的用户界面**：一个简洁、美观且响应式的操作界面。
- **高性能**：借助 Cloudflare 的全球网络，实现低延迟的访问和下载。
- **安全可靠**：严格验证传入的 URL，仅允许下载来自特定 GitHub 格式的文件，防止滥用。
- **易于部署**：通过简单的几个步骤即可部署到您自己的 Cloudflare 账户。
- **完全开源**：项目完全开源，您可以自由使用、修改和分发。

## 🚀 工作原理

本应用主要由两部分组成：

1.  **前端**：一个基于 Bootstrap 构建的静态 HTML 页面，用于接收用户输入的 GitHub URL。
2.  **后端**：一个 Cloudflare Worker 脚本，负责处理核心逻辑：
    -   接收前端发来的请求。
    -   根据白名单（源码、Releases、Raw）严格验证 URL 格式的合法性。
    -   如果 URL 合法，则从原始 GitHub 地址请求文件，并以“流”的形式将文件内容传回给用户，从而实现加速下载。
    -   如果 URL 不合法，则返回 `400 Bad Request` 错误。

## 部署你自己的版本

您可以在几分钟内将此项目部署到您自己的 Cloudflare Workers 上，完全免费。

### 环境要求

-   一个 [Cloudflare 账户](https://dash.cloudflare.com/sign-up)。
-   在您的电脑上安装好 [Node.js](https://nodejs.org/en/) 和 `npm`。
-   在您的电脑上安装好 `git`。

### 第一步：克隆仓库

首先，将本项目的代码克隆到您的本地电脑：

```bash
git clone https://github.com/hexrs/gethub.git
cd gethub
```

### 第二步：安装依赖

安装项目所需的依赖包，其中包含了 Cloudflare 的命令行工具 Wrangler。

```bash
npm install
```

### 第三步：登录 Cloudflare

使用 Wrangler 登录您的 Cloudflare 账户。此命令会打开一个浏览器窗口，请求您授权登录。

```bash
npx wrangler login
```

### 第四步：部署 Worker

将此应用部署到 Cloudflare。Wrangler 会引导您完成首次部署的设置。

```bash
npx wrangler deploy
```

部署成功！Wrangler 会在命令行中返回给您一个专属的 `.workers.dev` 网址，您自己的 GitHub 下载加速器现在已经全球在线了。

## 📄 开源许可

本项目基于 [MIT 许可](LICENSE) 开源。
