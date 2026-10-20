'use client';

import React from 'react';
import { Bookmark, Volume2, Trash2, Info, BookOpen } from 'lucide-react';
import { speakWord } from '@/lib/speech';
import { Button } from './ui/Button';

export const SavedWordsDrawer = ({
  savedWords = [],
  onRemoveWord,
  onOpenDetails,
  onSwitchToLearn,
  audioSpeed = 1.0,
}) => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-semibold mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Bookmarked Vocabulary</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Saved Words ({savedWords.length})
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review and practice the words you have saved for revision
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onSwitchToLearn}
          icon={<BookOpen className="w-4 h-4" />}
        >
          Explore More Lessons
        </Button>
      </div>

      {savedWords.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800/60 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            No saved words yet
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto font-bangla">
            যেকোনো Word Card এর Heart icon এ ক্লিক করে আপনার পছন্দের শব্দগুলো এখানে সংরক্ষণ করতে পারেন।
          </p>
          <Button
            size="md"
            onClick={onSwitchToLearn}
            className="mt-6"
          >
            Start Learning
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedWords.map((word) => (
            <div
              key={word.id}
              className="group bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700/60 flex items-center justify-between hover:shadow-md transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                    {word.word}
                  </h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500">
                    Lvl {word.level}
                  </span>
                </div>
                <p className="font-bangla text-base font-medium text-slate-600 dark:text-slate-300">
                  {word.meaning} <span className="text-slate-400">/</span> {word.pronunciation}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Audio button */}
                <button
                  onClick={() => speakWord(word.word, audioSpeed)}
                  aria-label="Pronounce"
                  className="p-2 rounded-xl text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/60 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                {/* Details button */}
                <button
                  onClick={() => onOpenDetails(word.id)}
                  aria-label="Details"
                  className="p-2 rounded-xl text-slate-500 hover:text-brand-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <Info className="w-4 h-4" />
                </button>

                {/* Delete button */}
                <button
                  onClick={() => onRemoveWord(word)}
                  aria-label="Remove"
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
