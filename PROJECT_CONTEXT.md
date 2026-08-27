# TemplateHub — Full Project Context Document

## 1. என்ன இந்த Project? (What is this?)

**TemplateHub** is a React component library / showcase app.

Developers-ku ready-made UI components (Buttons, Forms, Notifications, Data Display) provide pannum.
Oru component-a paarkkalam, source code copy pannalam, future-la CLI through install pannalam.

---

## 2. Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI framework |
| Vite | Build tool + dev server |
| React Router v7 | Client-side routing |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| Supabase | Optional cloud database |
| @dnd-kit | Drag & drop (inventory/ecommerce pages) |
| JSZip | Future: component download as zip |

---

## 3. Folder Structure — Epdi Organize Pannirukkom

```
src/
├── components/
│   ├── atoms/          → Smallest UI pieces (actual component implementations)
│   │   └── buttons/    → PrimaryButton.jsx, AnimatedButton.jsx, etc.
│   ├── molecules/      → Composed UI (Sidebar.jsx, Header.jsx)
│   ├── organisms/      → Page-level sections (TemplatesSection, SyncBanner)
│   └── layout/         → MainLayout.jsx (wraps every page)
│
├── pages/              → One file per route
│   ├── Dashboard.jsx
│   ├── ButtonsPage.jsx / ButtonDetails.jsx
│   ├── FormsPage.jsx / FormDetails.jsx
│   ├── NotificationsPage.jsx / NotificationDetails.jsx
│   ├── DataDisplayPage.jsx / DataDisplayDetails.jsx
│   ├── SyncPage.jsx    → Manual Supabase sync trigger
│   ├── ecommerce/      → EcommercePage (commented out in sidebar, WIP)
│   ├── inventory/      → InventoryPage (WIP)
│   └── create-project/ → CreateProjectPage (WIP)
│
├── registry/           → 🗂 LOCAL DATA STORE (single source of truth)
│   ├── index.js        → getAllComponents(), getComponent(slug), searchComponents()
│   ├── buttons/        → primary-button.js, animated-button.js, etc.
│   ├── forms/          → index.js + individual form component files
│   ├── notifications/  → index.js + individual files
│   └── data-display/   → index.js + individual files
│
├── lib/
│   ├── supabase.js     → Supabase client (reads from .env)
│   ├── db.js           → All DB queries (Supabase first, local fallback)
│   └── installContract.js → CLI install manifest + clipboard helper
│
└── context/
    └── ThemeContext.jsx → Theme state (if used)
```

---

## 4. Data Flow — Epdi Work Aguthu

### Registry (Local Static Data)
```
registry/buttons/primary-button.js
  └── exports: { id, name, slug, category, description, sourceCode, component, ... }

registry/index.js
  └── imports all → exports getAllComponents(), getComponent(slug), etc.
```

### DB Layer (db.js)
```
fetchAllComponents()
  ├── Supabase configured? → fetch from DB
  └── Not configured?      → getAllComponents() from registry (fallback)

fetchComponent(slug)       → same pattern
fetchComponentsByCategory() → same pattern
fetchSearchResults(query)  → same pattern
```

### Page Rendering Flow
```
URL: /buttons
  → App.jsx → <ButtonsPage />
    → <MainLayout> (Sidebar + Header + Footer wrapper)
      → reads registry → shows component list
        → click component → /buttons/primary-button
          → <ButtonDetails> → fetchComponent(slug) → shows preview + source code
```

---

## 5. Routes (App.jsx)

| Path | Page |
|------|------|
| `/` | Dashboard (hero + KPI cards + categories + popular) |
| `/buttons/*` | Buttons list + detail |
| `/forms/*` | Forms list + detail |
| `/notifications/*` | Notifications list + detail |
| `/data-display/*` | Data Display list + detail |
| `/ecommerce/*` | Ecommerce templates (WIP) |
| `/inventory/*` | Inventory templates (WIP) |
| `/create-project/*` | Project creator (WIP) |
| `/sync` | Manual Supabase sync page |
| `*` | Redirect to `/` |

---

## 6. Registry Entry — Oru Component Epdi Save Aguthu

Every component is a JS object with this shape:

```js
// src/registry/buttons/primary-button.js
export default {
  id: "primary-button",
  name: "Primary Button",
  slug: "primary-button",        // URL slug — must be unique
  category: "buttons",
  description: "...",
  framework: "react",
  language: "javascript",
  styling: "css",
  version: "1.0.0",
  dependencies: [],              // npm packages needed
  tags: ["button", "cta"],
  files: [                       // files to copy when installing
    { name: "PrimaryButton.jsx", path: "components/atoms/buttons/PrimaryButton.jsx" }
  ],
  uses: ["Submit forms", "..."], // use-case descriptions
  sourceCode: `...`,             // raw source code string (shown in UI)
  component: PrimaryButton,      // actual React component (for live preview)
  previewProps: { label: "..." } // default props for preview
}
```

New component add panna:
1. `src/components/atoms/<category>/YourComponent.jsx` create pannu
2. `src/registry/<category>/your-component.js` create pannu (above shape)
3. `src/registry/<category>/index.js` la import + array-la add pannu
4. `src/registry/index.js` la already spread agum (if category index exports it)

---

## 7. Supabase — Ethuku + Epdi Connect Panna

### Ethuku Supabase?
- Ippo data ellam local static — code edit pannama dynamic data venumna Supabase vennum
- Future features: user accounts, favorites, ratings, component analytics
- Team collaboration: multiple people components add panna

### Supabase Connect Steps

**Step 1** — [supabase.com](https://supabase.com) → New Project create pannu

**Step 2** — Settings → API → copy:
- Project URL → `https://xxxx.supabase.co`
- anon/public key

**Step 3** — `.env` file update pannu:
```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Step 4** — Supabase Dashboard → SQL Editor → `supabase-schema.sql` contents paste → Run

```sql
-- Creates 'components' table with RLS (public read, no public write)
create table if not exists components (
  id text primary key, name text, slug text unique,
  category text, description text, ...
);
```

**Step 5** — App run pannu → Dashboard la "Sync to Supabase" button click pannu
- `SyncBanner` component (Dashboard page top-la irukum) → `syncRegistryToSupabase()` call pannum
- Local registry → Supabase DB ku upsert agum

### Supabase illa na?
- App fully works with local registry — no errors
- `supabase.js` null return pannum, `db.js` automatically local fallback use pannum

---

## 8. Key Files Quick Reference

| File | Role |
|------|------|
| `src/registry/index.js` | Single source of truth for all components |
| `src/lib/db.js` | All data fetching (Supabase + fallback) |
| `src/lib/supabase.js` | Supabase client init |
| `src/lib/installContract.js` | CLI install manifest shape |
| `src/App.jsx` | All routes defined here |
| `src/components/layout/MainLayout.jsx` | Sidebar + Header + Footer wrapper |
| `src/components/molecules/Sidebar.jsx` | Nav menu (add new routes here) |
| `supabase-schema.sql` | DB table creation SQL |
| `.env` | Supabase credentials (never commit) |
| `.env.example` | Template for .env |

---

## 9. New Category Add Panna — Step by Step

1. `src/components/atoms/<newcategory>/` folder create pannu → component files add pannu
2. `src/registry/<newcategory>/` folder create pannu → individual JS files + `index.js`
3. `src/registry/index.js` la import pannu → registry array-la spread pannu
4. `src/pages/NewCategoryPage.jsx` + `NewCategoryDetails.jsx` create pannu
5. `src/App.jsx` la route add pannu
6. `src/components/molecules/Sidebar.jsx` la `menuItems` array-la add pannu
7. `src/components/organisms/TemplatesSection.jsx` la `getCategoryData()` la add pannu

---

## 10. Scripts

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint check
```

---

## 11. Future Roadmap (WIP Pages)

- `/ecommerce` — Ecommerce page templates
- `/inventory` — Inventory management templates  
- `/create-project` — Project scaffolding wizard
- CLI: `npx templatehub add <slug>` — installContract.js already has the manifest shape ready
