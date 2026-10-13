# TemplateHub — AI Context & Technical Blueprint

> **Instructions for AI Models**: This document contains the full architecture, purpose, component registry schemas, folder structure, and engineering conventions of the **TemplateHub** repository. Use this context directly to understand any part of the codebase without needing exploratory file scans.

---

## 1. Project Overview & Purpose

**TemplateHub** is an enterprise-grade, modular UI component and template library application built with **React 19**, **Vite 8**, and **Tailwind CSS**.

### Key Objectives:
- **Interactive Component Catalog**: Showcase customizable, copy-paste-ready UI components across 11 primary categories:
  1. **Buttons** (10 styles: Primary, Secondary, Outline, Ghost, Gradient, Shadow, Animated, Pulse, Icon, Floating)
  2. **Cards** (44+ distinct domain-specific card designs across Content, Events, Finance, Notifications, Pricing, Profile, Social, Stats, Tasks)
  3. **Forms** (29+ atomic inputs and field controls: Text, Password, Email, Number, MultiSelect, RangeSlider, Rating, RichText, SignaturePad, OTP, DatePicker, etc.)
  4. **Form Compositions** (Schema-driven drag-and-drop assembled forms powered by `@dnd-kit`)
  5. **Layouts** (Headers, Sticky Navbars, Persistent Sidebars, Gradient Hero, Multi-Column Footers)
  6. **Notifications** (Alerts, Banners, Snackbars, Toasts, Confirm Dialogs, Status Dots, Progress Notifications)
  7. **Data Display** (DataTables, Timelines, Skeletons, Loaders, Avatar Groups, Stat Displays, Tags, Kbd, Dividers)
  8. **Accordion** (Numbered, Filter, Simple, Icon, Form, and Accordion Primitives)
  9. **Modal & Overlay System** (13 variants: Modals, Form Modals, Dialogs, Confirm Dialogs, Alert Dialogs, Drawers, Bottom Sheets, Side Sheets, Popovers, Tooltips, Context Menus, Dropdown Menus, Command Menus)
  10. **File System Suite** (18 full file upload, preview, validation, queue list, client-side crop, canvas compression, and avatar upload components)
- **Live Previews & Code Inspection**: Real-time interactive playground, customizable props controls, tabbed source code inspection, AST/code extraction, and single-click clipboard copying.
- **Form Compositions Builder**: Interactive form assembler powered by `@dnd-kit`, allowing developers to construct composed forms from atomic input components and export/sync them.
- **Dual-Storage Backend**: Powered by **Supabase** with seamless, automatic fallback to browser **LocalStorage** for offline or credential-free operation.
- **Export & Packaging**: Direct code copy, CLI-ready install contracts, and full `.zip` downloading using `jszip`.

---

## 2. Tech Stack & Dependencies

| Area | Technologies | Version / Notes |
|---|---|---|
| **Core Framework** | React & React DOM | `^19.2.5` |
| **Build Tooling** | Vite & `@vitejs/plugin-react` | `^8.0.10` / `^6.0.1` |
| **Routing** | React Router (`react-router-dom`) | `^7.18.2` |
| **Styling** | Tailwind CSS v3, PostCSS, Autoprefixer, Sass | `tailwindcss ^3.4.1`, `postcss ^8.5.14`, `sass ^1.104.0` |
| **Drag and Drop** | `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` | `^6.3.1`, `^10.0.0`, `^3.2.2` |
| **Icons** | `lucide-react` | `^1.14.0` |
| **Backend & DB** | Supabase JS Client (`@supabase/supabase-js`) | `^2.109.0` with LocalStorage fallback |
| **Export Tooling** | `jszip` | `^3.10.1` |
| **Path Alias** | `@/` mapped to `<project_root>/src/` | Configured in `vite.config.js` |

---

## 3. Comprehensive Folder Structure

```
gsus-template-hub-main/
├── .env.example                         # Sample Supabase environment configuration
├── index.html                           # HTML entrypoint
├── package.json                         # Project scripts and dependencies
├── postcss.config.js                    # PostCSS configuration
├── tailwind.config.js                   # Tailwind theme, colors, animations
├── vite.config.js                       # Vite config with '@' alias to '/src'
├── supabase-schema.sql                  # Supabase table schemas & RLS policies
│
├── docs/                                # Internal architecture & button documentation
│   ├── ARCHITECTURE.md                  # High-level architecture guide
│   ├── BUTTONS_COLLECTION.md            # Button component index
│   └── BUTTONS_QUICK_REFERENCE.md       # Button props & variant reference
│
├── scripts/                             # Maintenance and automated refactoring scripts
│   ├── clean_and_fix.cjs
│   ├── cleanup.js
│   ├── ensure_all_components.cjs
│   ├── fix_all_imports.cjs
│   ├── fix_card_imports.cjs
│   ├── fix_targeted_components.cjs
│   ├── normalize_card_paths.cjs
│   ├── purge_scss.cjs
│   ├── restore_authentic_components.cjs
│   ├── restore_pages.cjs
│   └── validate_imports.cjs
│
└── src/
    ├── main.jsx                         # ReactDOM root initialization
    ├── App.jsx                          # App root with ThemeProvider & BrowserRouter
    ├── App.css                          # App shell base styling
    ├── index.css                        # Tailwind directives & core font imports
    │
    ├── router/                          # Routing infrastructure
    │   ├── routes.jsx                   # Route array definition mapping paths to views
    │   └── AppRouter/
    │       └── AppRouter.jsx            # Wraps Routes with MainLayout
    │
    ├── context/                         # Global React context providers
    │   └── ThemeContext.jsx             # Dark/Light theme state & local persistence
    │
    ├── hooks/                           # Custom React hooks
    │   └── useTheme.js                  # Hook to consume ThemeContext
    │
    ├── constants/                       # Static definitions & constants
    │   ├── appConstants.js              # App metadata & global defaults
    │   ├── componentTypes.js            # Category enum & registry keys (including FILE_SYSTEM)
    │   └── routes.js                    # Navigation route constants
    │
    ├── services/                        # API and Persistence Layer
    │   ├── db.js                        # Unified storage interface (Supabase + LocalStorage fallback)
    │   ├── storage/                     # Storage layer helpers
    │   └── supabase/
    │       ├── client.js                # Initialized Supabase client instance
    │       ├── components.service.js    # Component CRUD operations
    │       ├── projects.service.js      # Project configuration services
    │       └── sync.service.js          # Registry cloud synchronization
    │
    ├── utils/                           # Shared utility helpers
    │   ├── fieldAdapter.js              # Form field schema normalization
    │   └── installContract.js           # Generates CLI installation instructions
    │
    ├── lib/                             # Library bridges & re-exports
    │   ├── db.js
    │   ├── fieldAdapter.js
    │   ├── installContract.js
    │   └── supabase.js
    │
    ├── styles/                          # Design tokens & Global stylesheets
    │   ├── globals.css                  # Global utilities, scrollbars, glassmorphism
    │   ├── variables.css                # CSS variables (colors, borders, shadows)
    │   └── typography.css               # Font scale and text classes
    │
    ├── codeRegistry/                    # Source-of-truth metadata & code definitions
    │   ├── codeRegistry.js              # Unified entry aggregating all component registries
    │   ├── previewImages.js             # Screenshot/preview references
    │   ├── accordionRegistry.js         # Accordion components registry
    │   ├── cardsRegistry.js             # Cards registry (44+ cards)
    │   ├── formsRegistry.js             # Form inputs and field components registry
    │   ├── formCompositionsRegistry.js  # Composed form patterns registry
    │   ├── layoutsRegistry.jsx          # Layout templates registry
    │   ├── modalOverlayRegistry.js      # Modal & Overlay registry (13 components)
    │   ├── fileSystemRegistry.js        # File System registry aggregator (< 30 lines)
    │   ├── file-system/                 # Modular File System registry slices (all < 150 lines)
    │   │   ├── uploadComponents.js
    │   │   ├── previewComponents.js
    │   │   ├── progressComponents.js
    │   │   ├── validationComponents.js
    │   │   └── processingComponents.js
    │   ├── accordion/                   # Code definitions & source for accordions
    │   ├── buttons/                     # Code definitions & source for 10 button styles
    │   ├── cards/                       # Code definitions grouped by category
    │   │   ├── content/                 # Feature, recommendation, testimonial, article, blog, media
    │   │   ├── events/                  # Appointment, booking, event
    │   │   ├── finance/                 # Billing, invoice, payment, transaction
    │   │   ├── notifications/           # Alert, feedback, notification, review, status
    │   │   ├── pricing/                 # Comparison, ecommerce, pricing, service, subscription
    │   │   ├── profile/                 # Contact, job, profile, team, user
    │   │   ├── social/                  # Social, photo profiles, video
    │   │   ├── stats/                   # Analytics, KPI, metric, progress, stat, stats
    │   │   └── tasks/                   # Course, kanban, project, task
    │   ├── data-display/                # Code definitions for data tables, badges, timelines, etc.
    │   ├── form-compositions/           # Composed form template source code
    │   ├── forms/                       # Form input element source definitions
    │   └── notifications/               # Alert & notification element source code
    │
    ├── components/                      # Application Shell & Core UI Primitives
    │   ├── layout/                      # Main layout frames
    │   │   ├── Header/                  # Global application header with search & theme switch
    │   │   ├── Sidebar/                 # Navigation sidebar with category links
    │   │   ├── Footer/                  # Standard footer
    │   │   ├── MainLayout/              # Root layout shell wrapping pages
    │   │   └── ReusableLayout/          # Standalone layout showcase templates (Hero, Navbar, Sidebar, Footer)
    │   └── common/                      # Cross-cutting UI atoms & molecules
    │       ├── Accordion/               # Base Accordion primitives
    │       ├── AddToProjectModal/       # Modal to export/save component to project
    │       ├── Avatar/                  # Avatar atom
    │       ├── Badge/                   # Badge atom
    │       ├── Card/                    # Base Card atom
    │       ├── ComponentDetailsView/    # Universal detail page renderer (Code/Preview tabs)
    │       ├── FileSystem/              # Core reusable file upload & manipulation primitives (all < 275 lines)
    │       │   ├── AvatarUpload.jsx
    │       │   ├── DocumentUpload.jsx
    │       │   ├── FileDropZone.jsx
    │       │   ├── FileList.jsx
    │       │   ├── FilePreview.jsx
    │       │   ├── FileUpload.jsx
    │       │   ├── ImageCompressor.jsx
    │       │   ├── ImageCropModal.jsx
    │       │   ├── ImageUpload.jsx
    │       │   ├── MultipleFileUpload.jsx
    │       │   ├── UploadProgress.jsx
    │       │   ├── fileFormatUtils.js
    │       │   ├── fileRecordProcessor.js
    │       │   ├── fileUtils.js
    │       │   ├── fileValidationUtils.js
    │       │   ├── imageCanvasUtils.js
    │       │   ├── index.js
    │       │   ├── uploadSimulationUtils.js
    │       │   ├── useFileDragDrop.js
    │       │   └── useFileManager.js
    │       ├── Logo/                    # App logo brand mark
    │       ├── Overlay/                 # Core overlay foundation (Portal, Trapping, Transitions)
    │       │   ├── OverlayPrimitive.jsx
    │       │   ├── index.js
    │       │   └── useOverlay.js
    │       ├── SearchBar/ & SearchInput/
    │       ├── ShowcaseCard/            # Grid preview card for component catalogs
    │       ├── StatCard/                # Metric presentation card
    │       └── ThemeToggle/             # Dark/light toggle button
    │
    └── pages/                           # Feature Views & Page Modules
        ├── Home/                        # Dashboard view with stats and quick navigation
        │   ├── HomePage.jsx
        │   └── components/ (TemplatesSection, DashboardStats, StatCard)
        ├── Buttons/                     # Button catalog & detail playground
        │   ├── ButtonsPage.jsx
        │   ├── ButtonDetails.jsx
        │   └── components/ (Animated, Floating, Ghost, Gradient, Icon, Outline, Primary, Pulse, Secondary, Shadow)
        ├── Cards/                       # Card catalog & detail view
        │   ├── CardsPage.jsx
        │   ├── CardDetails.jsx
        │   └── components/ (44+ distinct card component implementations)
        ├── Forms/                       # Form inputs & field primitives (29 components)
        │   ├── FormsPage.jsx
        │   ├── FormDetails.jsx
        │   └── components/ (TextInput, Password, Select, OTP, DatePicker, RangeSlider, MultiSelect, RichText, Signature, etc.)
        ├── FormCompositions/            # Full assembled forms & composition editor
        │   ├── FormCompositionsPage.jsx
        │   ├── FormCompositionDetails.jsx
        │   └── components/ (CreateProjectForm, LoginForm, ContactForm, OTPForm, ResetPassword)
        ├── Layouts/                     # App layouts, navbars, sidebars, footers, hero
        │   ├── LayoutsPage.jsx
        │   └── LayoutDetails.jsx
        ├── Notifications/               # Alerts, toasts, banners, snackbars, confirm dialogs (12 components)
        │   ├── NotificationsPage.jsx
        │   ├── NotificationDetails.jsx
        │   ├── NotificationPreview.jsx
        │   ├── notification.config.js
        │   └── components/ (Alert, Banner, ConfirmDialog, InlineMessage, NotificationBadge, NotificationCard, NotificationItem, NotificationList, ProgressNotification, Snackbar, StatusDot, Toast)
        ├── DataDisplay/                 # Tables, timelines, loaders, skeletons, avatars (18 components)
        │   ├── DataDisplayPage.jsx
        │   ├── DataDisplayDetails.jsx
        │   └── components/ (AvatarGroup, BarLoader, DataCard, DataTable, Divider, DotsLoader, EmptyState, Kbd, Misc, ProgressBar, PulseLoader, Skeleton, SkeletonCard, Spinner, StatDisplay, Tag, Timeline, Tooltip)
        ├── Accordion/                   # Collapsible accordion components (6 variants)
        │   ├── AccordionPage.jsx
        │   ├── AccordionDetails.jsx
        │   └── components/ (Numbered, Filter, Simple, Icon, Form, Primitive)
        ├── ModalOverlay/                # Modal & Overlay System (13 variants)
        │   ├── ModalOverlayPage.jsx
        │   ├── ModalOverlayDetails.jsx
        │   └── components/ (Modal, FormModal, Dialog, ConfirmDialog, AlertDialog, Drawer, BottomSheet, SideSheet, Popover, Tooltip, ContextMenu, DropdownMenu, CommandMenu)
        └── FileSystem/                  # File System & Upload Suite (< 50 lines orchestrator + sections)
            ├── FileSystemPage.jsx       # Clean orchestrator (< 50 lines)
            ├── FileSystemDetails.jsx    # Universal details view (< 140 lines)
            ├── fileSystem.config.js     # Component metadata
            ├── sections/                # Page sections (Header, Stats, CardPreview, InteractiveGrid)
            └── components/              # 18 interactive showcase demo components
```

---

## 4. Application Routes Map

| Route Path | View Component | Description |
|---|---|---|
| `/` & `/dashboard` | `HomePage` | Dashboard overview, component counters, category cards |
| `/buttons` | `ButtonsPage` | Interactive buttons catalog & variant showcase |
| `/buttons/:id` | `ButtonDetails` | Button code view, props playground & copy modal |
| `/cards` | `CardsPage` | Categorized card library (44+ domain cards) |
| `/cards/:id` | `CardDetails` | Card preview, source code inspection & export |
| `/forms` | `FormsPage` | Form input atoms & field elements (29 primitives) |
| `/forms/:id` | `FormDetails` | Form element live tester & code snippet |
| `/form-compositions` | `FormCompositionsPage` | Multi-field composed forms & drag-and-drop form builder |
| `/form-compositions/:id` | `FormCompositionDetails` | Live composed form playground & JSON schema editor |
| `/layouts` | `LayoutsPage` | Page layout templates (Navbars, Sidebars, Footers, Hero) |
| `/layouts/:slug` | `LayoutDetails` | Full layout live interactive demo & raw source |
| `/notifications` | `NotificationsPage` | Feedback elements (Toasts, Modals, Banners, Snackbars) |
| `/notifications/:id` | `NotificationDetails` | Notification playground with trigger controls |
| `/data-display` | `DataDisplayPage` | Data presentation primitives (Tables, Timelines, Skeletons) |
| `/data-display/:id` | `DataDisplayDetails` | Data display inspector & sample data manipulation |
| `/accordion` | `AccordionPage` | Accordion variant showcase |
| `/accordion/:id` | `AccordionDetails` | Accordion behavior playground & source code |
| `/modal-overlay` | `ModalOverlayPage` | 13-variant overlay showcase & live interactive playground |
| `/modal-overlay/:id` | `ModalOverlayDetails` | Overlay live playground, props inspector & code copy |
| `/file-system` | `FileSystemPage` | 18-component file upload, validation, preview & processing suite |
| `/file-system/:id` | `FileSystemDetails` | File system component playground, live demo & source inspection |

---

## 5. Core Architectural Patterns

### 1. Unified Code Registry Architecture (`src/codeRegistry/`)
Every component across all categories has a corresponding Registry metadata object conforming to a unified contract:
```javascript
{
  id: "basic-file-upload",
  slug: "basic-file-upload",
  name: "Basic File Upload",
  category: "file-system",
  subCategory: "Single Upload",
  tag: "Upload",
  theme: "indigo",
  version: "v1.0.0",
  description: "A complete single-file upload solution with integrated dropzone, format checking, live preview, smooth progress bar, and removal controls.",
  framework: "react",
  language: "javascript",
  styling: "tailwind",
  dependencies: ["lucide-react"],
  tags: ["upload", "file", "single-upload", "dropzone", "progress"],
  files: [
    {
      name: "FileUpload.jsx",
      path: "components/common/FileSystem/FileUpload.jsx",
      content: "// Full source code as string..."
    }
  ],
  component: BasicFileUploadDemo,
  sourceCode: "import React from 'react'...",
  uses: ["Single document upload", "Attachment inputs", "Form attachments"]
}
```

- **`codeRegistry.js`** aggregates registries from all 11 modules:
  - `buttons/`
  - `cardsRegistry.js`
  - `formsRegistry.js`
  - `formCompositionsRegistry.js`
  - `layoutsRegistry.jsx`
  - `accordionRegistry.js`
  - `modalOverlayRegistry.js`
  - `fileSystemRegistry.js`
- **Query APIs**: Exposes `getAllComponents()`, `getComponent(slug)`, `getCategories()`, `getComponentsByCategory(category)`, and `searchComponents(query)`.

### 2. File System Management Architecture (`src/components/common/FileSystem/`)
- **`useFileManager.js`**: Central hook managing upload queues, in-flight simulated network requests, abort controllers (`UploadCancel`), retry flows (`UploadRetry`), progress transitions, and memory cleanup for object URLs.
- **`fileUtils.js`**: Utilities for format parsing, MIME validation, dimension extraction from `Image`, format size conversion (`formatBytes`), and canvas transformations.
- **Client-side Canvas Operations**:
  - `ImageCropModal.jsx`: Canvas-based interactive crop tool supporting 1:1, 4:3, 16:9, and free aspect ratios with zoom and pan.
  - `ImageCompressor.jsx`: Real-time image scaling and quality reduction with byte-saving analytics.
- **`FilePreview.jsx` & `FileList.jsx`**: Safe, non-fictitious previews for images, PDFs, code, archives, and spreadsheets.

### 3. Modal & Overlay Architecture (`src/components/common/Overlay/`)
- **`useOverlay.js`**: Universal hook managing open/close state, escape key event listeners, focus trapping, and body scroll locking.
- **`OverlayPrimitive.jsx`**: Portal-rendered backdrop and layout container with smooth transition animations and configurable positions (Center, Top, Drawer Left/Right, Bottom Sheet).

### 4. Dual-Layer Storage Pattern (`src/services/db.js`)
- Attempts queries against Supabase tables (`components`, `form_compositions`).
- Gracefully falls back to `window.localStorage` if Supabase connection fails or is unconfigured.
- Guarantees seamless offline capabilities and 0 setup requirements for evaluation.

### 5. Component Details & Export Workflow
- Detail views use `ComponentDetailsView` with tabbed navigation: **Preview**, **Code**, **Props**, and **Dependencies**.
- Users can copy JSX/CSS snippets directly or download single-file / multi-file bundles packaged via `JSZip`.
- `installContract.js` generates standardized CLI install specifications.

### 6. Form Composition System (`src/pages/FormCompositions/`)
- Forms are modeled as schema compositions referencing base input atoms (`text-input`, `password-input`, `select-dropdown`, `checkbox`, `textarea`, etc.).
- Compositions define field lists, validations, action buttons, and dependencies.
- Supports saving custom compositions directly to Supabase / LocalStorage.

---

## 6. Database Schema (`supabase-schema.sql`)

### `components` Table
```sql
create table if not exists components (
  id           text primary key,
  name         text not null,
  slug         text not null unique,
  category     text not null,
  description  text,
  framework    text default 'react',
  language     text default 'javascript',
  styling      text default 'css',
  version      text default '1.0.0',
  dependencies jsonb default '[]',
  tags         jsonb default '[]',
  files        jsonb default '[]',
  uses         jsonb default '[]',
  author       text default 'TemplateHub',
  created_at   text,
  updated_at   text
);
```

### `form_compositions` Table
```sql
create table if not exists form_compositions (
  id           text primary key,
  name         text not null,
  slug         text not null unique,
  category     text not null,
  version      text default '1.0.0',
  description  text,
  overview     text,
  fields       jsonb default '[]',
  action       jsonb default '{}',
  dependencies jsonb default '[]',
  tags         jsonb default '[]',
  created_at   text,
  updated_at   text
);
```

---

## 7. Developer & AI Engineering Conventions

1. **Path Aliasing**: Always use `@/...` to import from `src/` (e.g., `import { useTheme } from '@/hooks/useTheme'`).
2. **Component Separation**:
   - Presentation atoms belong in `src/pages/<Category>/components/` or `src/components/common/`.
   - Code metadata/strings belong in `src/codeRegistry/<category>/` or dedicated registry files (`modalOverlayRegistry.js`, `fileSystemRegistry.js`, etc.).
   - When adding a new component or category:
     - Add the category identifier to `src/constants/componentTypes.js`.
     - Add the route to `src/router/routes.jsx` and `src/constants/routes.js`.
     - Add navigation item to `src/components/layout/Sidebar/Sidebar.jsx`.
     - Register the component in `src/codeRegistry/codeRegistry.js`.
3. **Theming & Styling**:
   - Tailored for Tailwind CSS with dark mode class strategy (`dark:` classes and CSS variables in `src/styles/variables.css`).
   - Use `useTheme()` from `@/hooks/useTheme` to inspect or toggle theme mode (`light` / `dark`).
4. **Memory Management & Resilience**:
   - For file upload components, always revoke created object URLs (`URL.revokeObjectURL(url)`) upon unmount or file removal to prevent memory leaks.
   - Always handle potential `null`/`undefined` when fetching components or compositions.
   - Maintain the fallback mechanism in `db.js`.
