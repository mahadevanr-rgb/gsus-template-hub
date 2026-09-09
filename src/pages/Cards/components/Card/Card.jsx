import React from 'react';

export function Card({ children, className = '' }) {
  return <div className={`rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md p-6 ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = '' }) {
  return <div className={`border-b border-slate-800/80 pb-4 mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`text-lg font-bold text-white tracking-tight ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = '' }) {
  return <p className={`text-xs text-slate-400 mt-1 leading-relaxed ${className}`}>{children}</p>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`border-t border-slate-800/80 pt-4 mt-4 flex items-center justify-between ${className}`}>{children}</div>;
}

export default Card;
