import { useState } from "react";
import { defaultFooterConfig } from "./Footer.config";
import { Building2, Circle, Hexagon, Layers3, LayoutTemplate, Sparkles } from "lucide-react";



const brandIcons = { LayoutTemplate, Sparkles, Layers3, Building2, Circle, Hexagon };
const layoutGridClasses = { columns: { 2: "md:grid-cols-2 lg:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4", 5: "md:grid-cols-2 lg:grid-cols-5" }, centered: "md:grid-cols-1", minimal: "md:grid-cols-2", split: "md:grid-cols-2" };
const widthClasses = { narrow: "max-w-4xl", standard: "max-w-6xl", wide: "max-w-7xl", full: "max-w-none" };
const typographyValues = { small: 12, medium: 14, large: 16 };
const socialIcons = {
  Instagram: ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>,
  Facebook: ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.4 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.1H7.6V13h2.7v8h3.1Z" /></svg>,
  YouTube: ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.2 7a3 3 0 0 0-2.1-2.1C19.2 4.4 12 4.4 12 4.4s-7.2 0-9.1.5A3 3 0 0 0 .8 7 31 31 0 0 0 .3 12a31 31 0 0 0 .5 5 3 3 0 0 0 2.1 2.1c1.9.5 9.1.5 9.1.5s7.2 0 9.1-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-5 31 31 0 0 0-.5-5ZM9.6 15.5v-7l6.1 3.5-6.1 3.5Z" /></svg>,
  LinkedIn: ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.2 3.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM3.7 8.5h3v11.8h-3V8.5Zm4.9 0h2.9v1.6h.1a3.2 3.2 0 0 1 2.9-1.8c3.1 0 3.7 2 3.7 4.6v7.4h-3v-6.6c0-1.6 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8v6.7h-3V8.5h.3Z" /></svg>,
  X: ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 3H22l-6.8 7.8L23.2 21h-6.3L12 14.8 6.4 21H3.2l7.3-8.4L2.8 3h6.5l4.4 5.8L18.9 3Zm-1.1 16h1.7L8.2 4.9H6.4L17.8 19Z" /></svg>,
  TikTok: ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.6 7.2a6.4 6.4 0 0 1-4.1-1.5v8.1a5.7 5.7 0 1 1-5-5.6v3.1a2.7 2.7 0 1 0 2 2.6V2.5h3a6.3 6.3 0 0 0 4.1 4.7v3a9.4 9.4 0 0 1-4.1-1.4" /></svg>,
  GitHub: ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.8 2.1 3.4 1.6.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.1 1.2a10.7 10.7 0 0 1 5.7 0c2.1-1.5 3.1-1.2 3.1-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3 0 4.3-2.6 5.2-5.1 5.5.4.3.8 1 .8 2v3c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" /></svg>,
};

function safeHref(value) {
  const href = String(value || "").trim();
  if (!href) return "";
  if (/^(#|\/)/.test(href)) return href;
  try {
    const url = new URL(href);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function BrandMark({ brand, accent, BrandIcon }) {
  const [failed, setFailed] = useState(false);
  const hasLogo = Boolean(brand.logoSrc && !failed);
  return <span className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl" style={{ width: hasLogo ? "fit-content" : 40, maxWidth: hasLogo ? Math.max(64, Math.min(240, brand.logoWidth || 160)) : 40, height: hasLogo ? "auto" : 40, maxHeight: hasLogo ? Math.max(24, Math.min(80, brand.logoMaxHeight || 48)) : 40, background: hasLogo ? "transparent" : `linear-gradient(135deg, ${accent}, #a855f7 60%, #ec4899)` }}>
    {hasLogo ? <img src={brand.logoSrc} alt={`${brand.name} logo`} style={{ display: "block", width: "auto", height: "auto", maxWidth: Math.max(64, Math.min(240, brand.logoWidth || 160)), maxHeight: Math.max(24, Math.min(80, brand.logoMaxHeight || 48)), objectFit: brand.logoFit === "cover" ? "cover" : "contain", objectPosition: brand.logoAlignment === "center" ? "center" : "left center" }} onError={() => setFailed(true)} /> : <BrandIcon className="h-5 w-5 shrink-0 text-white" aria-hidden="true" />}
  </span>;
}

/** Responsive footer. Pass onSubscribe to handle newsletter submissions. */
export default function Footer({
  onNavigate,
  onSubscribe,
  footerConfig,
  brandName,
  brandDescription,
  brandIcon,
  logoSrc,
  accentColor,
  showSocialLinks,
  instagramUrl,
  facebookUrl,
  youtubeUrl,
  linkedinUrl,
  showNewsletter,
}) {
  const cfg = { ...defaultFooterConfig, ...(footerConfig || {}) };
  cfg.brand = { ...defaultFooterConfig.brand, ...(cfg.brand || {}) };
  cfg.appearance = { ...defaultFooterConfig.appearance, ...(cfg.appearance || {}) };
  cfg.newsletter = { ...defaultFooterConfig.newsletter, ...(cfg.newsletter || {}) };
  cfg.bottom = { ...defaultFooterConfig.bottom, ...(cfg.bottom || {}) };
  const brand = { ...cfg.brand, name: brandName ?? cfg.brand.name, description: brandDescription ?? cfg.brand.description, icon: brandIcon ?? cfg.brand.icon, logoSrc: logoSrc ?? cfg.brand.logoSrc };
  const appearanceOverrides = footerConfig?.appearance || {};
  const modeColors = cfg.appearanceMode === "light"
    ? { background: "#f8fafc", heading: "#0f172a", body: "#475569", link: "#475569", linkHover: "#4f46e5", divider: "#e2e8f0" }
    : {};
  const appearance = { ...cfg.appearance, ...modeColors, ...appearanceOverrides, accent: accentColor ?? footerConfig?.accentColor ?? cfg.accentColor ?? appearanceOverrides.accent ?? cfg.appearance.accent };
  const socials = footerConfig?.socials || [
    { platform: "Instagram", url: instagramUrl ?? "https://instagram.com", enabled: true },
    { platform: "Facebook", url: facebookUrl ?? "https://facebook.com", enabled: true },
    { platform: "YouTube", url: youtubeUrl ?? "https://youtube.com", enabled: true },
    { platform: "LinkedIn", url: linkedinUrl ?? "https://linkedin.com", enabled: true },
  ];
  const displaySocials = showSocialLinks ?? cfg.showSocialLinks;
  const newsletter = { ...cfg.newsletter, show: showNewsletter ?? cfg.newsletter.show };
  const BrandIcon = brandIcons[brand.icon] || LayoutTemplate;
  const [email, setEmail] = useState("");
  const submitNewsletter = (event) => {
    event.preventDefault();
    if (email.trim()) onSubscribe?.(email.trim());
  };
  const highlightNewsletterInput = (event) => {
    event.currentTarget.style.borderColor = appearance.accent;
    event.currentTarget.style.boxShadow = `0 0 0 3px color-mix(in srgb, ${appearance.accent} 22%, transparent)`;
  };
  const resetNewsletterInput = (event) => {
    event.currentTarget.style.borderColor = appearance.divider;
    event.currentTarget.style.boxShadow = "none";
  };
  const alignClass = { left: "text-left", center: "text-center", right: "text-right" }[cfg.contentAlignment] || "text-left";
  const justifyClass = { left: "justify-start", center: "justify-center", right: "justify-end" }[cfg.contentAlignment] || "justify-start";
  const widthClass = widthClasses[cfg.contentWidth] || widthClasses.standard;
  const layoutClass = cfg.layout === "centered" ? "lg:grid-cols-1" : cfg.layout === "minimal" ? "lg:grid-cols-2" : cfg.layout === "split" ? "lg:grid-cols-2" : (layoutGridClasses.columns[cfg.columns] || layoutGridClasses.columns[4]);
  const sectionGap = { compact: "gap-y-8", comfortable: "gap-y-10", spacious: "gap-y-14" }[cfg.verticalSpacing] || "gap-y-10";
  const fontSize = typographyValues[appearance.typographySize] || typographyValues.medium;
  const iconColor = cfg.socialIconColor === "custom" ? cfg.socialCustomColor : cfg.socialIconColor === "monochrome" ? appearance.body : appearance.accent;
  const visibleGroups = (cfg.linkGroups || []).filter((group) => group.visible && group.title);
  const stackNewsletterForm = cfg.layout === "columns" && Number(cfg.columns) >= 5;

  return (
    <footer className="templatehub-footer w-full px-4 sm:px-6 lg:px-8" style={{ backgroundColor: appearance.background, color: appearance.body, borderTop: cfg.showTopBorder ? `1px solid ${appearance.divider}` : "none", fontSize }}>
      <div className={`mx-auto ${widthClass}`} style={{ paddingTop: appearance.paddingTop, paddingBottom: appearance.paddingBottom }}>
        <div className={`grid min-w-0 gap-x-8 ${sectionGap} ${layoutClass} ${cfg.layout === "centered" ? "justify-items-center" : ""} ${alignClass}`}>
          <section className={`min-w-0 ${cfg.layout === "centered" ? "flex flex-col items-center" : ""}`}>
            <div className="flex w-full min-w-0 flex-nowrap items-center justify-start gap-3">
              <BrandMark key={brand.logoSrc || "brand-icon"} brand={brand} accent={appearance.accent} BrandIcon={BrandIcon} />
              <span className="min-w-0 flex-1 font-bold" title={brand.name} style={{ display: "block", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: appearance.heading }}>{brand.name}</span>
            </div>
            {brand.showDescription && brand.description && <p className={`mt-4 max-w-sm leading-relaxed ${cfg.contentAlignment === "center" ? "mx-auto" : ""}`}>{brand.description}</p>}
            {displaySocials && <div className={`mt-5 flex flex-wrap items-center ${{ left: "justify-start", center: "justify-center", right: "justify-end" }[cfg.socialAlignment] || justifyClass}`} style={{ gap: cfg.socialGap }}>
              {socials.filter((item) => item.enabled && item.url && safeHref(item.url)).map((item) => {
                const Icon = socialIcons[item.platform];
                if (!Icon) return null;
                const iconStyle = cfg.socialStyle === "circle" ? "rounded-full" : cfg.socialStyle === "rounded square" ? "rounded-lg" : "rounded-none";
                const iconBackground = cfg.socialStyle === "plain" ? "transparent" : cfg.socialIconColor === "brand" ? `${appearance.accent}22` : "#64748b22";
                return <a key={item.id || item.platform} className={`inline-flex items-center gap-2 p-2 transition-colors hover:opacity-75 ${iconStyle}`} style={{ color: iconColor, backgroundColor: iconBackground }} href={safeHref(item.url)} target="_blank" rel="noopener noreferrer" aria-label={item.platform}>
                  <Icon size={Math.max(14, Math.min(36, cfg.socialIconSize || 20))} />
                  {cfg.socialDisplay === "icons with labels" && <span>{item.platform}</span>}
                </a>;
              })}
            </div>}
          </section>
          {visibleGroups.map((group) => <nav className="min-w-0" key={group.id || group.title} aria-label={group.title}>
            <h2 className="font-semibold" style={{ color: appearance.heading }}>{group.title}</h2>
            <ul className="mt-4 flex flex-col" style={{ gap: appearance.linkSpacing }}>
              {(group.links || []).filter((link) => link.label?.trim() && safeHref(link.url)).map((link, index) => <li key={link.id || `${link.label}-${index}`}>
                <a href={safeHref(link.url)} onClick={() => onNavigate?.(link.label)} className="inline-flex min-h-8 items-center break-words transition-colors hover:underline" style={{ color: appearance.link, "--footer-link-hover": appearance.linkHover }} onMouseEnter={(event) => { event.currentTarget.style.color = appearance.linkHover; }} onMouseLeave={(event) => { event.currentTarget.style.color = appearance.link; }}>{link.label}</a>
              </li>)}
            </ul>
          </nav>)}
          {newsletter.show && <section className="min-w-0">
            <h2 className="font-semibold" style={{ color: appearance.heading }}>{newsletter.heading}</h2>
            {newsletter.description && <p className="mt-3 leading-relaxed">{newsletter.description}</p>}
            <form onSubmit={submitNewsletter} className={`mt-4 flex min-w-0 gap-2 ${stackNewsletterForm ? "flex-col items-stretch" : "flex-wrap"}`} style={{ marginTop: newsletter.spacing }}>
              <label className="sr-only" htmlFor="templatehub-newsletter-email">Email address</label>
              <input id="templatehub-newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} onFocus={highlightNewsletterInput} onBlur={resetNewsletterInput} onMouseEnter={highlightNewsletterInput} onMouseLeave={(event) => { if (document.activeElement !== event.currentTarget) resetNewsletterInput(event); }} placeholder={newsletter.placeholder} className={`${stackNewsletterForm ? "w-full" : "min-w-0 flex-1"} rounded-xl border px-3 py-2.5 outline-none transition-shadow`} style={{ minHeight: newsletter.size === "large" ? 52 : newsletter.size === "compact" ? 36 : 44, borderColor: appearance.divider, backgroundColor: cfg.appearanceMode === "light" ? "#ffffff" : "#0f172a", color: appearance.heading, boxShadow: "none" }} />
              <button type="submit" aria-label={newsletter.buttonLabel} className={`${stackNewsletterForm ? "w-full" : "shrink-0"} rounded-xl px-4 py-2.5 font-semibold text-white`} style={{ minHeight: newsletter.size === "large" ? 52 : newsletter.size === "compact" ? 36 : 44, backgroundColor: appearance.accent }}>{newsletter.buttonLabel}</button>
            </form>
            {!onSubscribe && <p className="mt-2 text-xs opacity-70">Connect an onSubscribe handler to process signups.</p>}
          </section>}
        </div>
        {cfg.bottom.show && <div className="mt-12 flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between" style={{ borderTop: cfg.bottom.showDivider ? `1px solid ${appearance.divider}` : "none" }}>
          <p>{cfg.bottom.yearMode === "hidden" ? "" : `${cfg.bottom.yearMode === "custom" ? cfg.bottom.year : new Date().getFullYear()} `}{cfg.bottom.copyrightText}</p>
          <nav className={`flex flex-wrap gap-x-5 gap-y-2 ${justifyClass}`} aria-label="Legal links">
            {[[cfg.bottom.privacyLabel, cfg.bottom.privacyUrl], [cfg.bottom.termsLabel, cfg.bottom.termsUrl]].filter(([label, url]) => label && safeHref(url)).map(([label, url]) => <a key={label} href={safeHref(url)} onClick={() => onNavigate?.(label)} className="transition-opacity hover:opacity-70">{label}</a>)}
          </nav>
        </div>}
      </div>
    </footer>
  );
}
