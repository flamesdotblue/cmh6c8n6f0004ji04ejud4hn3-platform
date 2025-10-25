import React from 'react';
import { Search, Filter } from 'lucide-react';

export default function SearchBar({ query, onQueryChange, filters, onFiltersChange, courseOptions = [], typeOptions = [] }) {
  const handleSelect = (key) => (e) => onFiltersChange({ ...filters, [key]: e.target.value });

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search by title, course, or author..."
              className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
          <div className="relative">
            <Filter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
              aria-label="Filter by course"
              value={filters.course}
              onChange={handleSelect('course')}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-8 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {courseOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              aria-label="Filter by type"
              value={filters.type}
              onChange={handleSelect('type')}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {typeOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              aria-label="Sort"
              value={filters.sort}
              onChange={handleSelect('sort')}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="recent">Sort: Recent</option>
              <option value="size">Sort: Size</option>
              <option value="title">Sort: Title</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
