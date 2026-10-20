'use client';

import React, { useState, useEffect } from 'react';
import {
  RotateCcw,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  CheckCircle,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { speakWord } from '@/lib/speech';
import { Button } from './ui/Button';

export const FlashcardArena = ({
  words = [],
  onMarkLearned,
  audioSpeed = 1.0,
}) => {
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (words && words.length > 0) {
      setDeck(words);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [words]);

  const currentWord = deck[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  const handlePronounce = async (e) => {
    e.stopPropagation();
    if (!currentWord) return;
    setIsSpeaking(true);
    await speakWord(currentWord.word, audioSpeed);
    setIsSpeaking(false);
  };

  const handleMastered = () => {
    if (currentWord && onMarkLearned) {
      onMarkLearned(currentWord.id, 10);
    }
    handleNext();
  };

  if (!currentWord || deck.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto">
        <p className="text-slate-500 dark:text-slate-400">Loading flashcards deck...</p>
      </div>
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive 3D Study Deck</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Vocabulary Flashcards
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Click the card to flip between English and বাংলা অর্থ
        </p>
      </div>

      {/* Progress & Deck Controls */}
      <div className="flex items-center justify-between mb-4 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span>
          Card {currentIndex + 1} of {deck.length}
        </span>
        <button
          onClick={handleShuffle}
          className="flex items-center gap-1 text-brand-500 hover:text-brand-600 font-medium"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Shuffle Deck</span>
        </button>
      </div>

      {/* 3D Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-80 sm:h-96 cursor-pointer perspective-1000 select-none group"
      >
        <div
          className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Card Front: English */}
          <div className="absolute inset-0 backface-hidden bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700/80 flex flex-col justify-between items-center text-center">
            <div className="w-full flex justify-between items-center">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
                Level {currentWord.level}
              </span>
              <button
                onClick={handlePronounce}
                className={`p-2.5 rounded-full transition-all active:scale-90 ${
                  isSpeaking
                    ? 'bg-brand-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-brand-500 hover:text-white'
                }`}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                {currentWord.word}
              </h3>
              <p className="text-sm font-semibold text-brand-500">
                /{currentWord.pronunciation}/
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Click to reveal Bangla meaning</span>
            </div>
          </div>

          {/* Card Back: Bangla */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-tr from-brand-500 to-sky-500 text-white rounded-3xl p-8 shadow-xl border border-brand-400 flex flex-col justify-between items-center text-center">
            <div className="w-full flex justify-between items-center">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
                বাংলা অর্থ (Meaning)
              </span>
              <button
                onClick={handlePronounce}
                className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all active:scale-90 backdrop-blur-sm"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="font-bangla text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow">
                {currentWord.meaning}
              </h3>
              <p className="font-bangla text-lg text-white/90">
                উচ্চারণ: <span className="font-bold">{currentWord.pronunciation}</span>
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Click to flip back to English</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation and Feedback Controls */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Previous / Next buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrev}
            icon={<ChevronLeft className="w-4 h-4" />}
          >
            Prev
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleNext}
            icon={<ChevronRight className="w-4 h-4" />}
          >
            Next
          </Button>
        </div>

        {/* Mastered / Need Practice */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            className="flex-1 sm:flex-initial"
          >
            Review Later
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleMastered}
            icon={<CheckCircle className="w-4 h-4" />}
            className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
          >
            Got It (+10 XP)
          </Button>
        </div>
      </div>
    </section>
  );
};
