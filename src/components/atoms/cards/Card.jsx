import React from "react";

/**
 * Base Card Primitive
 * Provides container and semantic sub-parts (Header, Title, Description, Content, Footer)
 * for all specialized card components across TemplateHub.
 */

export function Card({
  children,
  className = "",
  as: Component = "div",
  hover = false,
  glass = false,
  ...props
}) {
  return (
    <Component
      className={`relative bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-200 ${
        hover ? "hover:shadow-lg hover:-translate-y-0.5 hover:border-slate-200 dark:hover:border-slate-700" : ""
      } ${
        glass ? "backdrop-blur-md bg-white/90 dark:bg-slate-900/90" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div
      className={`flex items-center justify-between p-4 sm:p-5 pb-0 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", as: Component = "h3", ...props }) {
  return (
    <Component
      className={`text-lg font-bold tracking-tight text-slate-900 dark:text-white ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardDescription({ children, className = "", ...props }) {
  return (
    <p
      className={`text-xs text-slate-500 dark:text-slate-400 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`p-4 sm:p-5 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "", ...props }) {
  return (
    <div
      className={`flex items-center justify-between p-4 sm:p-5 pt-0 border-t border-slate-100/80 dark:border-slate-800/80 mt-auto text-xs text-slate-500 dark:text-slate-400 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
