import React from 'react';
import { Download, FileText } from 'lucide-react';

function formatSize(bytes = 0) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

export default function MaterialsList({ items = [] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3">
        <h2 className="text-base font-semibold">Library</h2>
        <p className="text-sm text-slate-600">{items.length} material{items.length === 1 ? '' : 's'} found</p>
      </div>
      <ul className="divide-y divide-slate-200">
        {items.map((m) => (
          <li key={m.id} className="py-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium truncate max-w-[26ch]" title={m.title}>{m.title}</h3>
                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200">{m.course}</span>
                    <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200">{m.type}</span>
                  </div>
                  {m.description && (
                    <p className="text-sm text-slate-600 mt-0.5 line-clamp-2">{m.description}</p>
                  )}
                  <p className="text-xs text-slate-500 mt-1">
                    Uploaded by {m.uploader} • {formatSize(m.size)} • {new Date(m.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Starting download...')}
                  className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
                >
                  <Download className="h-4 w-4" /> Download
                </button>
              </div>
            </div>
          </li>
        ))}
        {items.length === 0 && (
          <li className="py-10 text-center text-sm text-slate-600">No materials match your search. Try adjusting filters.</li>
        )}
      </ul>
    </div>
  );
}
