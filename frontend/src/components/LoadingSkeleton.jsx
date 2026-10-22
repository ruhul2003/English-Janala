'use client';

import React from 'react';

export const LoadingSkeleton = ({ count = 10 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5 w-[95%] max-w-[1800px] mx-auto px-2 sm:px-4 py-8">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="shimmer-wrapper bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-700/60 space-y-4"
        >
          <div className="flex justify-between items-center">
            <div className="w-16 h-5 rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>

          <div className="space-y-2 text-center py-4">
            <div className="w-32 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 mx-auto" />
            <div className="w-40 h-4 rounded bg-slate-100 dark:bg-slate-750 mx-auto" />
            <div className="w-48 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 mx-auto" />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex justify-between gap-3">
            <div className="flex-1 h-9 rounded-xl bg-slate-100 dark:bg-slate-700" />
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700" />
          </div>
        </div>
      ))}
    </div>
  );
};
