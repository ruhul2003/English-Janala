'use client';

import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Timer,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { speakWord } from '@/lib/speech';
import { Button } from './ui/Button';

export const QuizArena = ({
  words = [],
  onQuizComplete,
  audioSpeed = 1.0,
}) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streakCombo, setStreakCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isFinished, setIsFinished] = useState(false);

  // Generate quiz questions from available words
  const generateQuiz = () => {
    if (!words || words.length < 4) return;

    // Pick 8 random words as questions
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    const selectedWords = shuffledWords.slice(0, Math.min(8, words.length));

    const generated = selectedWords.map((qWord) => {
      // 3 wrong distractors
      const wrongDistractors = words
        .filter((w) => w.id !== qWord.id && w.meaning !== qWord.meaning)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((w) => w.meaning);

      const options = [qWord.meaning, ...wrongDistractors].sort(() => Math.random() - 0.5);

      return {
        id: qWord.id,
        word: qWord.word,
        pronunciation: qWord.pronunciation,
        correctAnswer: qWord.meaning,
        options,
      };
    });

    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreakCombo(0);
    setTimeLeft(15);
    setIsFinished(false);
  };

  useEffect(() => {
    generateQuiz();
  }, [words]);

  // Timer countdown
  useEffect(() => {
    if (isFinished || isAnswered || questions.length === 0) return;

    if (timeLeft <= 0) {
      handleAnswerTimeOut();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, isFinished, questions.length]);

  const handleAnswerTimeOut = () => {
    setIsAnswered(true);
    setSelectedOption('__TIMEOUT__');
    setStreakCombo(0);
  };

  const handleSelectOption = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const currentQ = questions[currentIndex];
    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      const bonus = streakCombo >= 2 ? 5 : 0;
      setScore((prev) => prev + 10 + bonus);
      setStreakCombo((prev) => prev + 1);
    } else {
      setStreakCombo(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(15);
    } else {
      setIsFinished(true);
      if (onQuizComplete) {
        onQuizComplete(score, questions.length);
      }
    }
  };

  const currentQ = questions[currentIndex];

  if (!currentQ && !isFinished) {
    return (
      <div className="py-16 text-center max-w-md mx-auto">
        <p className="text-slate-500">Preparing vocabulary quiz...</p>
      </div>
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-2">
          <Trophy className="w-3.5 h-3.5" />
          <span>Challenge Your English Skills</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Vocabulary Quiz Arena
        </h2>
      </div>

      {isFinished ? (
        /* Final Score Card */
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700/80 text-center space-y-6 animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">
              Quiz Completed! 🎉
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-bangla">
              চমৎকার! আপনি সফলভাবে টেস্ট শেষ করেছেন।
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800">
              <div className="text-xs text-brand-600 font-bold uppercase">Total Score</div>
              <div className="text-3xl font-black text-brand-700 dark:text-brand-300">
                {score} <span className="text-xs">XP</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <div className="text-xs text-emerald-600 font-bold uppercase">Questions</div>
              <div className="text-3xl font-black text-emerald-700 dark:text-emerald-300">
                {questions.length}
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={generateQuiz}
            icon={<RotateCcw className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Play Again (আবার খেলুন)
          </Button>
        </div>
      ) : (
        /* Active Quiz Question */
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 dark:border-slate-700/80 space-y-6">
          {/* Header with Timer and Score */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/60 text-xs font-semibold">
            <span className="text-slate-400">
              Question {currentIndex + 1} of {questions.length}
            </span>

            <div className="flex items-center gap-4">
              {streakCombo >= 2 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[11px] font-bold animate-pulse">
                  🔥 {streakCombo}x Combo!
                </span>
              )}

              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
                  timeLeft <= 5
                    ? 'bg-rose-100 text-rose-600 animate-bounce'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Timer className="w-3.5 h-3.5" />
                <span>{timeLeft}s</span>
              </div>

              <span className="font-bold text-brand-500">{score} XP</span>
            </div>
          </div>

          {/* Question Word */}
          <div className="text-center py-4 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Choose the correct বাংলা meaning for:
            </div>
            <div className="flex items-center justify-center gap-3">
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {currentQ.word}
              </h3>
              <button
                onClick={() => speakWord(currentQ.word, audioSpeed)}
                className="p-2 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-500 hover:bg-brand-500 hover:text-white transition-colors"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm font-semibold text-slate-400">
              /{currentQ.pronunciation}/
            </p>
          </div>

          {/* 4 Multiple Choice Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentQ.correctAnswer;

              let btnStyle =
                'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-700';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle =
                    'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
                } else if (isSelected) {
                  btnStyle =
                    'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-700 dark:text-rose-300 font-bold';
                } else {
                  btnStyle = 'opacity-50 border-transparent';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border-2 font-bangla text-lg sm:text-xl font-semibold text-left transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Next Button after answering */}
          {isAnswered && (
            <div className="pt-4 flex justify-end animate-fade-in">
              <Button
                onClick={handleNextQuestion}
                icon={<ArrowRight className="w-4 h-4 ml-1" />}
                className="w-full sm:w-auto"
              >
                {currentIndex + 1 === questions.length ? 'See Final Score' : 'Next Question'}
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
