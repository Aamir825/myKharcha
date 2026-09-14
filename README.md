# 💸 MyKharcha — Household Expense & Budget Tracker

**MyKharcha** is a modern, responsive household money management and expense tracking web application. Designed for families and individuals, it helps you stay on top of monthly budgets, visualize spending rhythms, inspect daily expenses via an interactive calendar, and analyze category breakdowns with a calm and intuitive user experience.

---

## ✨ Features

- **📊 Comprehensive Dashboard (Overview)**
  - Real-time monthly budget tracker with percentage usage and progress bar.
  - Calculated **Safe Daily Spend** and **Remaining Budget** metrics.
  - **Spending Rhythm** chart showing daily expense distribution across the month.
  - **Category Buckets** breakdown highlighting top spending areas.
  - Quick access mini-calendar and selected day activity log.

- **📅 Interactive Calendar View**
  - Month-at-a-glance spending calendar with daily expense totals.
  - Click any day to inspect all purchases made on that specific date.
  - One-click modal to log new expenses directly for the selected date.

- **💳 Expenses Ledger**
  - Searchable transaction ledger with real-time text query filtering.
  - Category dropdown filter (e.g., Home Rent, Grocery, Electricity Bill, Vehicle Gas, Water Bill, etc.).
  - Total filtered amounts and item counts.
  - Easy deletion and item management.

- **📈 Summary & Insights**
  - **Category Distribution**: Visual percentage bars for all household categories.
  - **Key Signals**: Highlights average active day spending, peak spending days, and largest category buckets.
  - **4-Month History Trend**: Multi-month comparison bars to understand financial trajectory over time.

- **⚙️ Settings & Customization**
  - Configurable default monthly budget (in PKR).
  - Built-in **Dark Mode** & **Light Mode** theme switcher with instant persistence.

- **📱 Fixed & Scrollable Layout**
  - Fixed desktop sidebar and top header with live synchronization status, breadcrumbs, and user profiles.
  - Independent, smooth scrollable main content viewport.
  - Mobile-responsive navigation bar for small screens.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Base UI primitives in `/ui`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Geist Variable & DM Sans / Manrope
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 📁 Project Structure

```text
MyKharcha/
├── ui/                   # Shadcn UI component primitives (Button, Card, Dialog, Select, etc.)
├── src/
│   ├── components/       # Core layout components (Layout.jsx, Header.jsx, Sidebar.jsx)
│   ├── hooks/            # Business logic & state management (useMyKharcha.js)
│   ├── lib/              # Utilities & class name merger (utils.js)
│   ├── pages/            # Page views
│   │   ├── Dashboard.jsx # Overview dashboard with charts & metrics
│   │   ├── Calendar.jsx  # Day-by-day spending calendar
│   │   ├── Expenses.jsx  # Searchable transaction list
│   │   ├── Insights.jsx  # Summary & 4-month history views
│   │   └── Settings.jsx  # Budget configuration & appearance theme
│   ├── App.jsx           # Router configuration
│   ├── index.css         # Tailwind v4 theme & CSS design tokens
│   └── main.jsx          # React application entry point
├── components.json       # Shadcn UI configuration
├── jsconfig.json         # Path alias definitions (@, @/ui)
├── tailwind.config.js    # Tailwind configuration
└── vite.config.js        # Vite build & plugin setup
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18+ or 20+) installed on your machine.

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd MyKharcha
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173` to view the application.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Starts Vite dev server with Hot Module Replacement (HMR) |
| **Build** | `npm run build` | Compiles production assets into the `dist/` folder |
| **Preview** | `npm run preview` | Locally previews the production build |
| **Lint** | `npm run lint` | Runs Oxlint to check code quality and syntax |

---

## 📄 License
This project is private and intended for personal/household expense management.
