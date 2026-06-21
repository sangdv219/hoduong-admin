# Dashboard Architecture (Next.js Modern App Router)

## Overview

This dashboard follows a **Feature-Sliced Architecture** using **Next.js App Router**, optimized for:

- Scalability
- Maintainability
- Reusability
- Team collaboration
- Performance optimization

---

# Project Structure

```bash
src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│
├── components/
│   ├── dashboard/
│   │   ├── layout/
│   │   ├── shared/
│   │   └── views/
│
├── hooks/
├── types/
├── constants/
├── services/
├── stores/
├── lib/
├── utils/
├── data/
└── styles/
```

---

# Layer Responsibilities

---

## app/

Responsible for route management.

### Rules:

- No business logic
- No heavy UI logic
- Only route composition

Example:

```tsx
import DashboardShell from "@/components/dashboard/layout/dashboard-shell";

export default function Page() {
  return <DashboardShell />;
}
```

---

## components/

Responsible for UI rendering.

### Structure:

```bash
components/dashboard/
├── layout/
├── shared/
└── views/
```

---

### layout/

Contains global dashboard layout.

Files:

- sidebar.tsx
- header.tsx
- breadcrumb.tsx
- dashboard-shell.tsx

---

### shared/

Reusable components.

Examples:

- button.tsx
- modal.tsx
- badge.tsx
- table.tsx
- form.tsx

Rules:

Must be domain-independent.

---

### views/

Feature modules.

Structure:

```bash
views/
├── reservation/
├── customers/
├── suppliers/
├── reports/
├── products/
└── system/
```

Each feature owns:

- UI
- hooks
- local types
- validations

---

# State Management Strategy

---

## Local State

Use:

```tsx
useState();
useReducer();
```

For:

- modal
- tabs
- filters

---

## Global State

Use:

Zustand

For:

- sidebar collapse
- current user
- permissions
- theme
- global filters

Structure:

```bash
stores/
├── use-auth-store.ts
├── use-theme-store.ts
└── use-dashboard-store.ts
```

---

# Data Fetching Strategy

---

## Server Side

Use:

- Server Actions
- Route Handlers

For:

- secure mutations
- initial page load

---

## Client Side

Use:

TanStack Query

For:

- cache
- refetch
- background sync

Pattern:

```bash
services/
├── customer.service.ts
├── reservation.service.ts
└── report.service.ts
```

---

# Type System

All shared types:

```bash
types/
├── customer.ts
├── reservation.ts
├── menu.ts
├── report.ts
└── system.ts
```

Rules:

- Avoid inline types
- Export interfaces
- Use DTO naming

Example:

```ts
export interface CustomerDTO {
  id: string;
  name: string;
}
```

---

# Constants

```bash
constants/
├── menu.ts
├── colors.ts
├── routes.ts
├── permissions.ts
└── breadcrumbs.ts
```

Rules:

Static only.

No logic.

---

# Naming Convention

---

## Component

PascalCase

Example:

```tsx
CustomerTable.tsx;
```

---

## Hook

camelCase

Example:

```tsx
useCustomerTable.ts;
```

---

## Store

camelCase

Example:

```tsx
useDashboardStore.ts;
```

---

## Service

camelCase

Example:

```tsx
customerService.ts;
```

---

# Performance Strategy

---

Use:

- dynamic imports
- memoization
- virtualization
- debounce
- pagination
- suspense boundaries

Example:

```tsx
const CustomerView = dynamic(() => import("./customer-view"));
```

---

# Anti-patterns

Avoid:

- God components
- Inline fetch
- Nested prop drilling
- Shared mutable state
- Large page.tsx logic
- Duplicate types
- Hardcoded configs

---

# Recommended Stack

Core:

- Next.js
- TypeScript
- Zustand
- TanStack Query
- React Hook Form
- Zod

UI:

- TailwindCSS
- Shadcn UI

Table:

- TanStack Table

Charts:

- Recharts

Validation:

- Zod

---

# Scalability Roadmap

Phase 1:

- Component split
- Type isolation
- Service layer

Phase 2:

- Zustand store
- Query cache
- Optimistic update

Phase 3:

- RBAC
- Audit log
- Real-time sync

Phase 4:

- Micro frontend ready
- Domain-driven modules
- Multi-tenant architecture

---

# Final Principle

Architecture priority:

1. Separation of concerns
2. Predictable state
3. Feature ownership
4. Reusable UI
5. Typed contracts
6. Scalable boundaries
