import React, { useRef, useState } from 'react';
import { Upload, FileText, Folder } from 'lucide-react';

export default function UploadForm({ onUpload }) {
  const formRef = useRef(null);
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [type, setType] = useState('PDF');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !course || !file) {
      setMessage('Please fill title, course, and choose a file.');
      return;
    }
    setSubmitting(true);
    setMessage('');
    try {
      const item = {
        title: title.trim(),
        course: course.trim().toUpperCase(),
        type,
        uploader: 'You',
        size: file.size || 0,
        date: new Date().toISOString(),
        description: description.trim(),
      };
      await new Promise((r) => setTimeout(r, 500));
      onUpload(item);
      setTitle('');
      setCourse('');
      setType('PDF');
      setDescription('');
      setFile(null);
      if (formRef.current) formRef.current.reset();
      setMessage('Upload added to library!');
    } catch (err) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Upload className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-base font-semibold">Upload Material</h2>
          <p className="text-sm text-slate-600">Share notes, slides, question banks, and more.</p>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Data Structures Midterm Review"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Course Code</label>
            <input
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="e.g., CS301"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>PDF</option>
              <option>PPT</option>
              <option>DOCX</option>
              <option>ZIP</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Add a short summary to help others understand the content"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">File</label>
          <div className="mt-1 flex items-center justify-between gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2">
            <div className="flex items-center gap-2 text-slate-600">
              <Folder className="h-4 w-4" />
              <span className="text-sm">
                {file ? `${file.name} • ${(file.size / 1024).toFixed(0)} KB` : 'Choose a file to upload'}
              </span>
            </div>
            <label className="cursor-pointer inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm border border-slate-300 hover:bg-slate-100">
              <FileText className="h-4 w-4" /> Browse
              <input
                type="file"
                className="sr-only"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>
        </div>

        {message && (
          <div className="text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-2 rounded-md">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-70"
        >
          <Upload className="h-4 w-4" />
          {submitting ? 'Uploading...' : 'Add to Library'}
        </button>
      </form>
    </div>
  );
}
