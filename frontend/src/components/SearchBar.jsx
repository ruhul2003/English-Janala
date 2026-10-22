'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  totalResults,
  isSearching = false,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && searchQuery) {
      onClearSearch();
    }
  };

  return (
    <div className="w-[95%] max-w-3xl mx-auto px-2 sm:px-4 my-6">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-slate-400 pointer-events-none" aria-hidden="true">
          <Search className="w-5 h-5 text-brand-500" />
        </div>

        <input
          type="text"
          role="searchbox"
          aria-label="Search vocabulary words"
          placeholder="Search words by English or বাংলা অর্থ (e.g. Apple, চমৎকার)..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-12 pr-12 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-sm sm:text-base text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={onClearSearch}
            aria-label="Clear Search query"
            title="Clear search (Esc)"
            className="absolute right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search results banner */}
      {isSearching && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center justify-between mt-2.5 px-2 text-xs text-slate-500 dark:text-slate-400"
        >
          <span>
            Searching across all lessons: <strong className="text-brand-500">{searchQuery}</strong>
          </span>
          <span className="font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 px-2 py-0.5 rounded-md">
            {totalResults} word{totalResults === 1 ? '' : 's'} found
          </span>
        </div>
      )}
    </div>
  );
};
