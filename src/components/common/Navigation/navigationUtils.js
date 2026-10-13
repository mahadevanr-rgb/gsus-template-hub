/**
 * Navigation utility helpers
 */

/**
 * Check if a path is active, taking query params and trailing slashes into account
 * @param {string} currentPath - The current window or router pathname
 * @param {string} targetPath - The path of the navigation item
 * @param {boolean} exact - If true, matches exact path; if false, matches prefix
 */
export function isPathActive(currentPath, targetPath, exact = false) {
  if (!currentPath || !targetPath) return false;

  const normalize = (p) => {
    // Strip query strings and trailing slashes
    const clean = p.split('?')[0].split('#')[0];
    return clean.length > 1 && clean.endsWith('/') ? clean.slice(0, -1) : clean;
  };

  const curr = normalize(currentPath);
  const target = normalize(targetPath);

  if (target === '/' || exact) {
    return curr === target;
  }

  return curr === target || curr.startsWith(`${target}/`);
}

/**
 * Generate breadcrumb trail from a pathname string
 * @param {string} pathname - current location pathname (e.g. "/navigation/stepper")
 * @param {Record<string, string>} labelMap - optional map of slug to display name
 */
export function generateBreadcrumbsFromPath(pathname, labelMap = {}) {
  if (!pathname || pathname === '/') {
    return [{ label: 'Home', path: '/', isCurrent: true }];
  }

  const segments = pathname.split('/').filter(Boolean);
  const trail = [{ label: 'Home', path: '/', isCurrent: false }];

  let accumulated = '';
  segments.forEach((seg, idx) => {
    accumulated += `/${seg}`;
    const isCurrent = idx === segments.length - 1;
    const label =
      labelMap[seg] ||
      seg
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

    trail.push({
      label,
      path: accumulated,
      isCurrent,
    });
  });

  return trail;
}

/**
 * Safe in-app back navigation with fallback
 * Prevents leaving the application when no browser history exists or when opened directly.
 * @param {Function} navigate - React Router navigate function
 * @param {string} fallbackPath - Route to navigate to if no prior history in app
 */
export function navigateBackOrFallback(navigate, fallbackPath = '/navigation') {
  if (typeof window !== 'undefined' && window.history?.state?.idx > 0) {
    navigate(-1);
  } else {
    navigate(fallbackPath, { replace: true });
  }
}
