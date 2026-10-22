'use client';

import React, { useState } from 'react';
import { Volume2, Info, Heart, CheckCircle2 } from 'lucide-react';
import { speakWord } from '@/lib/speech';

export const WordCard = ({
  word,
  onOpenDetails,
  isSaved = false,
  onToggleSave,
  isLearned = false,
  onMarkLearned,
  audioSpeed = 1.0,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handlePronounce = async (e) => {
    e.stopPropagation();
    setIsSpeaking(true);
    await speakWord(word.word, audioSpeed);
    setIsSpeaking(false);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    onToggleSave(word);
  };

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between hover:translate-y-[-4px]">
      {/* Top Bar: Points / Learned & Heart Bookmark */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            Level {word.level}
          </span>
          {isLearned && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3 h-3" />
              <span>Learned</span>
            </span>
          )}
        </div>

        {/* Save / Heart Button */}
        <button
          onClick={handleHeartClick}
          aria-label="Save Word"
          className={`p-1.5 rounded-xl transition-all active:scale-75 ${
            isSaved
              ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40'
              : 'text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 dark:hover:bg-slate-700'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      {/* Main Vocabulary Content */}
      <div className="text-center my-2 space-y-1.5">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight group-hover:text-brand-500 transition-colors">
          {word.word}
        </h3>

        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Meaning / Pronunciation
        </div>

        {/* Meaning and Pronunciation */}
        <div className="font-bangla text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200">
          <span>{word.meaning}</span>
          <span className="text-slate-300 dark:text-slate-600 mx-1.5">/</span>
          <span className="text-brand-600 dark:text-brand-400">{word.pronunciation}</span>
        </div>
      </div>

      {/* Bottom Action Buttons (Details & Sound) */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2.5">
        {/* Info Details Button */}
        <button
          onClick={() => onOpenDetails(word.id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-brand-50 dark:hover:bg-brand-950/50 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 text-xs font-semibold transition-all active:scale-95"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Details</span>
        </button>

        {/* Pronunciation Sound Button */}
        <button
          onClick={handlePronounce}
          aria-label="Listen Pronunciation"
          className={`flex items-center justify-center p-2.5 rounded-xl transition-all active:scale-90 ${
            isSpeaking
              ? 'bg-brand-500 text-white animate-pulse shadow-md shadow-brand-500/30'
              : 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 hover:bg-brand-500 hover:text-white shadow-sm'
          }`}
        >
          <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
        </button>
      </div>
    </div>
  );
};
