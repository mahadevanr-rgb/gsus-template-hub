export const defaultFooterConfig = {
  layout: "columns", columns: 5, contentWidth: "standard", contentAlignment: "left", verticalSpacing: "comfortable", showTopBorder: true, appearanceMode: "dark",
  brand: { name: "TemplateHub", description: "Beautiful, reusable interface building blocks for teams that move quickly.", showDescription: true, icon: "LayoutTemplate", logoSrc: "", logoWidth: 160, logoMaxHeight: 48, logoFit: "contain", logoAlignment: "left" },
  appearance: { background: "#0b0f19", heading: "#ffffff", body: "#94a3b8", link: "#94a3b8", linkHover: "#818cf8", accent: "#6366f1", divider: "#1f2937", typographySize: "medium", paddingTop: 56, paddingBottom: 28, linkSpacing: 12 },
  linkGroups: [
    { id: "company", title: "Company", visible: true, links: ["About", "Careers", "Contact"].map((label) => ({ label, url: `#${label.toLowerCase().replace(/\s+/g, "-")}` })) },
    { id: "products", title: "Products", visible: true, links: ["Components", "Layouts", "Templates", "Pricing", "Changelog"].map((label) => ({ label, url: `#${label.toLowerCase().replace(/\s+/g, "-")}` })) },
    { id: "service", title: "Service", visible: true, links: ["Documentation", "Tutorials", "UI Kit Figma", "Community"].map((label) => ({ label, url: `#${label.toLowerCase().replace(/\s+/g, "-")}` })) },
  ],
  showSocialLinks: true,
  socials: [
    { id: "instagram", platform: "Instagram", url: "https://instagram.com", enabled: true },
    { id: "facebook", platform: "Facebook", url: "https://facebook.com", enabled: true },
    { id: "youtube", platform: "YouTube", url: "https://youtube.com", enabled: true },
    { id: "linkedin", platform: "LinkedIn", url: "https://linkedin.com", enabled: true },
  ],
  socialDisplay: "icons", socialIconSize: 20, socialStyle: "plain", socialIconColor: "brand", socialCustomColor: "#cbd5e1", socialGap: 10, socialAlignment: "left",
  newsletter: { show: true, heading: "Subscribe for UI updates", description: "A concise monthly digest of new components and design resources.", placeholder: "you@example.com", buttonLabel: "Subscribe", size: "comfortable", spacing: 12 },
  bottom: { show: true, copyrightText: "TemplateHub. All rights reserved.", yearMode: "current", year: 2026, showDivider: true, privacyLabel: "Privacy Policy", privacyUrl: "#privacy", termsLabel: "Terms and Conditions", termsUrl: "#terms" },
};
