import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UploadForm from './components/UploadForm';
import MaterialsList from './components/MaterialsList';

const initialMaterials = [
  {
    id: 'm-1',
    title: 'Discrete Mathematics - Set Theory Notes',
    course: 'CS201',
    type: 'PDF',
    uploader: 'Dr. Patel',
    size: 1240 * 1024,
    date: new Date().toISOString(),
    description: 'Concise notes covering sets, relations, functions with examples.',
  },
  {
    id: 'm-2',
    title: 'Thermodynamics Problem Bank',
    course: 'ME205',
    type: 'DOCX',
    uploader: 'Anita Sharma',
    size: 740 * 1024,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    description: '100+ solved numerical problems for midterm prep.',
  },
  {
    id: 'm-3',
    title: 'Linear Algebra Cheatsheet',
    course: 'MA102',
    type: 'PDF',
    uploader: 'Prof. Gomez',
    size: 380 * 1024,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    description: 'Eigenvalues, eigenvectors, diagonalization quick reference.',
  },
];

export default function App() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ course: 'All', type: 'All', sort: 'recent' });

  const onUpload = (item) => {
    setMaterials((prev) => [{ ...item, id: `m-${Date.now()}` }, ...prev]);
  };

  const filtered = useMemo(() => {
    let data = [...materials];

    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.course.toLowerCase().includes(q) ||
          m.uploader.toLowerCase().includes(q) ||
          (m.description || '').toLowerCase().includes(q)
      );
    }

    if (filters.course !== 'All') {
      data = data.filter((m) => m.course === filters.course);
    }

    if (filters.type !== 'All') {
      data = data.filter((m) => m.type === filters.type);
    }

    if (filters.sort === 'recent') {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (filters.sort === 'size') {
      data.sort((a, b) => (b.size || 0) - (a.size || 0));
    } else if (filters.sort === 'title') {
      data.sort((a, b) => a.title.localeCompare(b.title));
    }

    return data;
  }, [materials, query, filters]);

  const allCourses = useMemo(() => {
    const set = new Set(materials.map((m) => m.course));
    return ['All', ...Array.from(set).sort()];
  }, [materials]);

  const allTypes = useMemo(() => {
    const set = new Set(materials.map((m) => m.type));
    return ['All', ...Array.from(set).sort()];
  }, [materials]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <Header />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6"
        >
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            filters={filters}
            onFiltersChange={setFilters}
            courseOptions={allCourses}
            typeOptions={allTypes}
          />
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="lg:col-span-1"
          >
            <UploadForm onUpload={onUpload} />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <MaterialsList items={filtered} />
          </motion.section>
        </div>
      </main>

      <footer className="mt-12 border-t border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>E-Notes Hub © {new Date().getFullYear()}</p>
          <p className="text-slate-500">Built for students and faculty to learn, share, and succeed.</p>
        </div>
      </footer>
    </div>
  );
}
