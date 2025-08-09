# GetHub - GitHub Accelerator

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/hexrs/gethub)

[中文说明](README_CN.md)

A simple, fast, and modern web application for accelerating downloads from GitHub. Built with Cloudflare Workers, this project acts as a proxy to fetch and stream GitHub assets, including source code, releases, and raw files.

## ✨ Features

- **Modern UI:** A clean and responsive user interface.
- **High Performance:** Leverages the Cloudflare global network for low-latency access.
- **Secure:** Strictly validates incoming URLs to only allow downloads from specified GitHub formats.
- **Easy to Deploy:** One-click deployment to your own Cloudflare account.
- **Open Source:** Free to use, modify, and distribute.

## 🚀 How It Works

The application consists of two parts:

1.  **Frontend:** A static HTML page built with Bootstrap that captures the user-provided GitHub URL.
2.  **Backend:** A Cloudflare Worker script that:
    -   Receives the request from the frontend.
    -   Validates the URL against a whitelist of allowed GitHub formats (source, release, raw).
    -   If valid, it fetches the file from the original GitHub URL and streams it back to the user, adding appropriate headers to ensure a smooth download experience.
    -   If invalid, it returns a `400 Bad Request` error.

## Deploy Your Own Version

You can deploy your own instance of GetHub to Cloudflare Workers in just a few minutes. It's completely free.

### Prerequisites

-   A [Cloudflare account](https://dash.cloudflare.com/sign-up).
-   [Node.js](https://nodejs.org/en/) and `npm` installed on your machine.
-   `git` installed on your machine.

### Step 1: Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/hexrs/gethub.git
cd gethub
```

### Step 2: Install Dependencies

Install the necessary dependencies, including the Cloudflare Wrangler CLI:

```bash
npm install
```

### Step 3: Log in to Cloudflare

Authenticate Wrangler with your Cloudflare account. This will open a browser window asking you to log in and authorize the application.

```bash
npx wrangler login
```

### Step 4: Deploy the Worker

Deploy the application to Cloudflare. Wrangler will guide you through the initial setup.

```bash
npx wrangler deploy
```

That's it! Wrangler will provide you with your unique `.workers.dev` URL, and your personal GitHub download accelerator will be live.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
