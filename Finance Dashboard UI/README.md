# VaultFinance - Premium Finance Dashboard

VaultFinance is a sleek, highly interactive, and responsive finance dashboard created to track and understand financial activity with an emphasis on a premium user experience.

## ✨ Features
- **Comprehensive Overviews**: High-level statistical summaries (Balance, Income, Expenses, Savings) dynamically presented.
- **Interactive Visualizations**: Dynamic Area Charts mapping income vs. expenses, and an intuitive Pie Chart breaking down categorical spending using `recharts`.
- **Advanced Transactions Engine**: Fast client-side search, real-time filtering (Income/Expense), and contextual sorting integrated deeply onto the transactions module.
- **RBAC Simulation**: Fully functioning front-end Role-Based Access Control using React Context. Toggling between "Admin" and "Viewer" accurately restrains actions (e.g. disabling the Quick Transfer action, hiding Edit tooltips, removing the '+ New Transaction' action).
- **Actionable Insights**: An observations area highlights intelligent takeaways (like top spending categories and saving projection).
- **Report Export**: Transactions can be successfully downloaded directly to a CSV natively from the dashboard.
- **Fluid Micro-interactions**: Integrates `framer-motion` for fluid staggered load-ins and robust UI hover states based on modern glassmorphism.

## 🛠️ Tech Stack
- **Framework**: Frontend built with [React](https://react.dev) and initialized using fast compiling [Vite](https://vitejs.dev/) with robust TypeScript support.
- **Styling**: Uses the latest **Tailwind CSS v4** to leverage modern CSS variables natively, delivering a custom Glassmorphic Dark Mode design system.
- **Icons**: Sleek standard iconography by [Lucide React](https://lucide.dev).
- **Charts**: Interactive visuals powered by [Recharts](https://recharts.org/).
- **Animation**: Physics-based staggered element transitions via [Framer Motion](https://www.framer.com/motion/).

## 🚀 Setup Instructions
Ensure that you have [Node.js](https://nodejs.org/) installed before proceeding.

### 1. Installation
Navigate into the root directory of the application and run `npm install` to download all necessary dependencies.
```bash
npm install
```

### 2. Running Locally
Spin up the fast Vite development server by running:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` to interact with the dashboard live!

## 💡 Overview of Approach
The project architectural approach was intentionally highly modular, isolated, and readable, ensuring solid scalability:
- **Layout Abstraction (`Layout.tsx`, `Header.tsx`, `Sidebar.tsx`)**: Extracts structural boilerplate away from the core content domains. They act as persistent frames preventing unneeded re-rendering.
- **Orchestration Component (`Dashboard.tsx`)**: Acts exclusively as a responsive CSS Grid array to pull specialized, granular components together, ensuring code length stays optimally short per file.
- **Strategic State Management**: The `RoleContext` is cleanly elevated to the absolute top of the tree above `App.tsx` to prevent painful prop-drilling. In contrast, heavy search/filter functionality and complex memory calculations (like `useMemo` for sorting transaction lists) remain highly local to the exact components that consume them, severely cutting down on overhead rendering bottlenecks.
- **Fallback Empty States**: Features like the transaction list inherently anticipate negative interactions (e.g., searching for gibberish), presenting clear and aesthetically pleasant placeholder states ("No matching transactions found") to safeguard UI/UX flow.
