"use client";

import { adaptiveScenarios } from "@/lib/adaptive-demo-data";

export function ScenarioSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="w-full md:w-64">
      <div className="relative">
        <select 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="flex h-9 w-full appearance-none items-center rounded-md border border-surface-border bg-surface-subtle px-3 py-2 text-sm font-medium text-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-400 cursor-pointer"
        >
          {adaptiveScenarios.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-tertiary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
    </div>
  );
}