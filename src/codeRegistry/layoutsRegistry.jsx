import { Footer, HeroSection, Navbar, Sidebar } from "@/components/layout/ReusableLayout";
import footerSource from "@/components/layout/ReusableLayout/Footer.jsx?raw";
import heroSectionSource from "@/components/layout/ReusableLayout/HeroSection.jsx?raw";
import navbarSource from "@/components/layout/ReusableLayout/Navbar.jsx?raw";
import sidebarSource from "@/components/layout/ReusableLayout/Sidebar.jsx?raw";

const layoutSections = [
  { slug: "top-navbar", name: "Sticky Navbar with Search & Profile", installName: "Navbar", category: "Headers & Navbars", component: Navbar, description: "A responsive top navigation bar with branded identity, quick links, search, notifications, profile actions, and an upgrade CTA.", dependencies: ["lucide-react"], size: "~3.2 KB", sourceCode: navbarSource },
  { slug: "persistent-sidebar", name: "Persistent Workspace Sidebar", installName: "Sidebar", category: "Sidebars", component: Sidebar, description: "A desktop-persistent sidebar with grouped application links, active navigation treatment, storage usage, settings, and support actions.", dependencies: ["lucide-react"], size: "~3.8 KB", sourceCode: sidebarSource },
  { slug: "gradient-hero", name: "Gradient Product Hero", installName: "HeroSection", category: "Hero", component: HeroSection, description: "A high-impact landing-page hero with launch announcement, gradient headline, conversion actions, and a code preview card.", dependencies: ["lucide-react"], size: "~3.5 KB", sourceCode: heroSectionSource },
  { slug: "newsletter-footer", name: "Multi-Column Dark Footer with Newsletter", installName: "Footer", category: "Footers", component: Footer, description: "A responsive four-column footer with product and resource links, social actions, newsletter signup, and legal navigation.", dependencies: ["lucide-react"], size: "~3.4 KB", sourceCode: footerSource },
];

export default layoutSections;
