'use client';

import React, { useState } from 'react';
import { X, Volume2, CheckCircle, Sparkles, BookOpen, Quote, Layers } from 'lucide-react';
import { speakWord } from '@/lib/speech';
import { Button } from './ui/Button';

export const WordDetailModal = ({
  isOpen,
  onClose,
  wordDetail,
  isLoading = false,
  onCompleteLearning,
  isLearned = false,
  audioSpeed = 1.0,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen) return null;

  const handlePronounce = async () => {
    if (!wordDetail?.word) return;
    setIsSpeaking(true);
    await speakWord(wordDetail.word, audioSpeed);
    setIsSpeaking(false);
  };

  const handleComplete = () => {
    if (onCompleteLearning && wordDetail?.id) {
      onCompleteLearning(wordDetail.id, wordDetail.points || 10);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isLoading ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Loading word details...</p>
          </div>
        ) : wordDetail ? (
          <div className="space-y-6">
            {/* Header: Word, Parts of speech, Pronunciation audio */}
            <div className="text-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 text-xs font-semibold mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>{wordDetail.partsOfSpeech || 'Vocabulary'}</span>
                <span className="mx-1">•</span>
                <span>+{wordDetail.points || 10} XP</span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {wordDetail.word}
                </h2>
                <button
                  onClick={handlePronounce}
                  aria-label="Pronounce"
                  className={`p-2.5 rounded-full transition-all active:scale-90 ${
                    isSpeaking
                      ? 'bg-brand-500 text-white animate-pulse'
                      : 'bg-brand-50 dark:bg-brand-950/60 text-brand-500 hover:bg-brand-500 hover:text-white'
                  }`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="font-bangla text-2xl font-bold text-slate-700 dark:text-slate-200 mt-2">
                <span>{wordDetail.meaning}</span>
                <span className="text-slate-300 dark:text-slate-600 mx-2">/</span>
                <span className="text-brand-500">{wordDetail.pronunciation}</span>
              </div>
            </div>

            {/* Example Sentence */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                <Quote className="w-3.5 h-3.5 text-brand-500" />
                <span>Example Sentence</span>
              </div>
              <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base italic leading-relaxed">
                &ldquo;{wordDetail.sentence || 'No example sentence available for this word.'}&rdquo;
              </p>
            </div>

            {/* Synonyms */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5 text-brand-500" />
                <span>Synonyms</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {wordDetail.synonyms && wordDetail.synonyms.length > 0 ? (
                  wordDetail.synonyms.map((syn, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 text-xs font-medium border border-sky-200 dark:border-sky-800"
                    >
                      {syn}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">No synonyms listed</span>
                )}
              </div>
            </div>

            {/* Complete Learning CTA Button */}
            <div className="pt-2">
              <Button
                variant={isLearned ? 'secondary' : 'primary'}
                size="lg"
                onClick={handleComplete}
                icon={<CheckCircle className="w-5 h-5" />}
                className="w-full font-bangla text-base"
              >
                {isLearned ? 'Already Completed (বন্ধ করুন)' : 'Complete Learning (শেখা শেষ করুন)'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-500 dark:text-slate-400">
            Word details not found.
          </div>
        )}
      </div>
    </div>
  );
};
