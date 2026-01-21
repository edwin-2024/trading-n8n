# ⚡ Trading N8N Monorepo

> A powerful, node-based trading automation platform built with modern web technologies.

![TurboRepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

## 📖 Overview

**Trading N8N** is a monolithic repository (monorepo) designed to facilitate the creation, management, and execution of automated trading strategies. Inspired by n8n, it provides a visual node-based editor for defining logic and an executor service for running it.

## 🏗 Architecture

The project is structured as a **Turborepo** monorepo containing the following applications:

### 🖥️ Apps

*   **`apps/client`**:
    *   **Tech**: React, Vite, Tailwind CSS, React Flow.
    *   **Role**: The frontend user interface. Allows users to visually build trading workflows with drag-and-drop nodes (Triggers, Actions, Logic).
*   **`apps/backend`**:
    *   **Tech**: Node.js, Express, Mongoose.
    *   **Role**: The core API server. Manages user authentication, saves workflow configurations to the database, and handles API requests from the client.
*   **`apps/executor`**:
    *   **Tech**: Node.js, Redis (implied/likely for queues), Database.
    *   **Role**: The background worker service. Responsible for actually executing the active workflows, verifying conditions, and placing trades.

### 📦 Packages

*   **`packages/common`**: Shared types, interfaces, and utility functions used across all apps.
*   **`packages/db`**: Database schemas and connection logic (MongoDB/Mongoose).
*   **`packages/ui`**: Shared UI components.
*   **`packages/eslint-config`**: Shared ESLint configurations.
*   **`packages/typescript-config`**: Shared TSConfig layouts.

## 🚀 Getting Started

Follow these steps to get the entire platform running locally.

### Prerequisites

*   **Node.js**: >= 18
*   **Bun** (Optional but recommended for package management)
*   **MongoDB**: A running instance (local or Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/trading-n8n-monorepo.git
cd trading-n8n-monorepo
```

### 2. Install Dependencies

We use **Turbo** to manage dependencies across the monorepo.

```bash
npm install
# OR if using Bun
bun install
```

### 3. Environment Setup

You will likely need to set up `.env` files in `apps/backend`, `apps/client`, and `apps/executor`.
*(Check `.env.example` files in those directories if available)*

### 4. Start Development Server

Run the development command from the root. Turbo will orchestrate starting all apps in parallel.

```bash
npm run dev
# OR
turbo run dev
```

This will typically start:
*   **Client**: `http://localhost:5173` (or similar)
*   **Backend**: `http://localhost:3000`

## 🛠 Commands

*   `npm run build`: Build all apps and packages.
*   `npm run lint`: Lint all apps and packages.
*   `npm run check-types`: Run TypeScript type checking.
*   `npm run format`: Format code using Prettier.

## 🤝 Contributing

1.  Fork the repo
2.  Create your feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add some amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

---
*Built with ❤️ for generic trading automation.*
