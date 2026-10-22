'use client';

import React from 'react';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';

export const LevelSelector = ({
  levels = [],
  activeLevelId,
  onSelectLevel,
  isLoading = false,
}) => {
  return (
    <section className="mt-8 mb-6 mx-auto w-[95%] max-w-[1800px] px-2 sm:px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          <span className="text-brand-500">Let&apos;s</span> Learn Vocabularies
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
          Select a lesson level below to load curated vocabulary cards
        </p>
      </div>

      {/* Dynamic Lesson Buttons Container */}
      <div
        id="level-container"
        className="flex flex-wrap justify-center items-center gap-3 sm:gap-4"
      >
        {levels.map((level) => {
          const isActive = activeLevelId === level.level_no;
          return (
            <button
              key={level.id || level.level_no}
              onClick={() => onSelectLevel(level.level_no)}
              disabled={isLoading}
              className={`group flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 active:scale-95 shadow-sm border ${
                isActive
                  ? 'bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/30 ring-4 ring-brand-500/20 translate-y-[-2px]'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50/50 dark:hover:bg-slate-750'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-brand-500'
                }`}
              >
                <Image
                  src="/assets/fa-book-open.png"
                  alt="Book"
                  width={18}
                  height={18}
                  className="object-contain"
                />
              </div>
              <span>
                Lesson-{level.level_no}
              </span>
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
