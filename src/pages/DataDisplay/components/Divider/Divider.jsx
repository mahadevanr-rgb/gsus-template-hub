import React from 'react';

export default function Divider(props) {
  return <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 text-white">{props.children || 'Divider'}</div>;
}
