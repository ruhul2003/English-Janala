'use client';

import React from 'react';
import { Flame, Zap, CheckCircle2, Bookmark, Sliders } from 'lucide-react';

export const ProgressStats = ({
  streak = 1,
  xp = 50,
  learnedCount = 0,
  savedCount = 0,
  totalWords = 105,
  audioSpeed = 1.0,
  onChangeAudioSpeed,
}) => {
  const percentCompleted = Math.min(100, Math.round((learnedCount / (totalWords || 1)) * 100));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-6">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100 dark:border-slate-700/60">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-5 border-b border-slate-100 dark:border-slate-700/60">
          {/* Daily Streak */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center">
              <Flame className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Streak</div>
              <div className="text-lg font-black text-slate-800 dark:text-white">
                {streak} <span className="text-xs font-normal text-slate-400">days</span>
              </div>
            </div>
          </div>

          {/* XP Points */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 dark:bg-brand-950/50 text-brand-500 flex items-center justify-center">
              <Zap className="w-5 h-5 fill-brand-500" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Total XP</div>
              <div className="text-lg font-black text-slate-800 dark:text-white">
                {xp} <span className="text-xs font-normal text-slate-400">pts</span>
              </div>
            </div>
          </div>

          {/* Words Learned */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Mastered</div>
              <div className="text-lg font-black text-slate-800 dark:text-white">
                {learnedCount} <span className="text-xs font-normal text-slate-400">/ {totalWords}</span>
              </div>
            </div>
          </div>

          {/* Saved Bookmarks & Speed */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-500 flex items-center justify-center">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Saved</div>
                <div className="text-lg font-black text-slate-800 dark:text-white">
                  {savedCount}
                </div>
              </div>
            </div>

            {/* Audio speed selector button */}
            {onChangeAudioSpeed && (
              <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 p-1 rounded-xl">
                {[0.75, 1.0, 1.25].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => onChangeAudioSpeed(speed)}
                    className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${
                      audioSpeed === speed
                        ? 'bg-white dark:bg-slate-900 text-brand-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 pt-1">
          <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
            <span>Vocabulary Mastery Progress</span>
            <span className="text-brand-500">{percentCompleted}% Completed</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-sky-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentCompleted}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
