# TemplateHub Project Architecture

## Overview
TemplateHub is a modular, scalable React application designed to serve as a component and template hub for modern web interfaces.

## Directory Structure

```
src/
├── app/                  # Application root, router, and global providers
│   ├── App.jsx           # Root layout and router host
│   ├── routes.jsx        # Route definitions
│   └── providers.jsx     # App-level Context / Providers (Router, Theme)
├── codeRegistry/         # Source-of-truth metadata & code definitions for templates
│   ├── buttons/
│   ├── cards/
│   ├── forms/
│   ├── data-display/
│   ├── notifications/
│   └── form-compositions/
├── components/
│   ├── ui/               # Reusable presentation atoms & components
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── forms/
│   │   ├── data-display/
│   │   └── feedback/
│   ├── shared/           # Cross-cutting primitives (Avatar, Logo, StatCard, etc.)
│   └── layout/           # App-level shell (MainLayout, Header, Sidebar, Footer)
├── features/             # Feature slices (Dashboard, Buttons, Cards, Forms, etc.)
│   ├── dashboard/
│   ├── buttons/
│   ├── cards/
│   ├── forms/
│   ├── form-compositions/
│   ├── notifications/
│   ├── data-display/
│   ├── sync/
│   └── shared/
├── services/             # External APIs and Supabase service layer
│   └── supabase/
│       ├── client.js
│       ├── components.service.js
│       ├── projects.service.js
│       └── sync.service.js
├── hooks/                # Reusable React hooks
│   └── useTheme.js
├── constants/            # Application routes, categories, and constants
│   ├── routes.js
│   ├── componentTypes.js
│   └── appConstants.js
├── utils/                # Utility helpers (adapters, contracts)
│   ├── fieldAdapter.js
│   └── installContract.js
├── context/              # React context providers
│   └── ThemeContext.jsx
└── styles/               # Global tokens and modular CSS
    ├── variables.css
    ├── globals.css
    ├── utilities.css
    └── typography.css
```

## Conventions
- Use `@/` path alias to reference `src/` modules.
- Reusable UI elements belong in `components/ui/`.
- Domain-specific views belong in `features/<domain>/`.
- Database operations belong in `services/supabase/`.
