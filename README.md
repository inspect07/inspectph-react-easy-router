# @inspectph/react-easy-router

![npm version](https://img.shields.io/npm/v/@inspectph/react-easy-router)
![npm downloads](https://img.shields.io/npm/dm/@inspectph/react-easy-router)
![License](https://img.shields.io/npm/l/@inspectph/react-easy-router)

A simple React router wrapper with support for protected routes, role-based access, and layouts.

## Installation

```bash
npm install @inspectph/react-easy-router
# Ensure peer dependencies are installed
npm install react react-dom react-router-dom
```

## Features

- Config-driven routing
- Protected routes for authentication
- Role-based access control
- Layout support per route
- Works with React Router v6+

## Usage

### 1. Define Your Routes

```tsx
// src/routes.tsx
import type { RouteConfig } from "@inspectph/react-easy-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";

export const routes: RouteConfig[] = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    protected: true,
    redirectTo: "/login",
    layout: DashboardLayout,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
    protected: true,
    roles: ["admin"],
    redirectTo: "/dashboard",
    layout: DashboardLayout,
  },
  { path: "*", element: <NotFound /> },
];
```

### 2. Use RouterProvider

```tsx
// src/App.tsx
import { RouterProvider } from "@inspectph/react-easy-router";
import { routes } from "./routes";

export default function App() {
  const isAuthenticated = true; // replace with your auth state
  const userRole = "admin"; // replace with your user role

  return (
    <RouterProvider
      routes={routes}
      isAuthenticated={isAuthenticated}
      userRole={userRole}
    />
  );
}
```

### 3. Layout Example

```tsx
// src/layouts/DashboardLayout.tsx
import React from "react";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <header>Dashboard Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default DashboardLayout;
```

### 4. Protected Route Behavior

- Visiting `/dashboard` without being authenticated redirects to `/login`.
- Visiting `/admin` as a non-admin redirects to `/dashboard`.

## API Reference

### RouterProvider Props

- `routes: RouteConfig[]` - Array of route configs
- `isAuthenticated: boolean` - Current authentication state
- `userRole?: string` - Current user role (for role-based routes)

### RouteConfig

- `path: string` - Route path
- `element: ReactNode` - Page component
- `protected?: boolean` - Marks route as protected
- `roles?: string[]` - Allowed roles for this route
- `redirectTo?: string` - Redirect path if unauthorized (default: `/login`)
- `layout?: ComponentType<{ children: ReactNode }>` - Optional layout wrapper

## License

MIT © [Inspect](https://github.com/inspectph)
