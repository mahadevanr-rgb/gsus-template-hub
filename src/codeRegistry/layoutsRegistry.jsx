import { Footer, HeroSection, Navbar, Sidebar } from "@/components/layout/ReusableLayout";
import footerSource from "@/components/layout/ReusableLayout/Footer.jsx?raw";
import footerConfigSource from "@/components/layout/ReusableLayout/Footer.config.js?raw";
import heroSectionSource from "@/components/layout/ReusableLayout/HeroSection.jsx?raw";
import navbarSource from "@/components/layout/ReusableLayout/Navbar.jsx?raw";
import sidebarSource from "@/components/layout/ReusableLayout/Sidebar.jsx?raw";

const layoutSections = [
  { slug: "top-navbar", name: "Sticky Navbar with Search & Profile", installName: "Navbar", category: "Headers & Navbars", component: Navbar, description: "A responsive top navigation bar with branded identity, quick links, search, notifications, profile actions, and an upgrade CTA.", dependencies: ["lucide-react"], size: "~3.2 KB", sourceCode: navbarSource, files: [{ path: "components/layout/ReusableLayout/Navbar.jsx", content: navbarSource }] },
  { slug: "persistent-sidebar", name: "Persistent Workspace Sidebar", installName: "Sidebar", category: "Sidebars", component: Sidebar, description: "A desktop-persistent sidebar with grouped application links, active navigation treatment, storage usage, settings, and support actions.", dependencies: ["lucide-react"], size: "~3.8 KB", sourceCode: sidebarSource, files: [{ path: "components/layout/ReusableLayout/Sidebar.jsx", content: sidebarSource }] },
  { slug: "gradient-hero", name: "Gradient Product Hero", installName: "HeroSection", category: "Hero", component: HeroSection, description: "A high-impact landing-page hero with launch announcement, gradient headline, conversion actions, and a code preview card.", dependencies: ["lucide-react"], size: "~3.5 KB", sourceCode: heroSectionSource, files: [{ path: "components/layout/ReusableLayout/HeroSection.jsx", content: heroSectionSource }] },
  { slug: "newsletter-footer", name: "Multi-Column Dark Footer with Newsletter", installName: "Footer", category: "Footers", component: Footer, description: "A responsive configurable footer with navigation, social links, newsletter signup, and legal navigation.", dependencies: ["lucide-react"], size: "~3.4 KB", sourceCode: footerSource, files: [{ path: "components/layout/ReusableLayout/Footer.jsx", content: footerSource }, { path: "components/layout/ReusableLayout/Footer.config.js", content: footerConfigSource }] },
];

export default layoutSections;
