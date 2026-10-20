'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, BookOpen, Volume2, Award } from 'lucide-react';
import { Button } from './ui/Button';

export const HeroBanner = ({ onGetStarted, totalWords = 105 }) => {
  return (
    <section className="relative overflow-hidden py-8 md:py-16">
      {/* Decorative gradient blur background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-400/10 dark:bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-sky-300/10 dark:bg-sky-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-300 text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <span>Smart English Learning Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              <span className="text-brand-500 underline decoration-brand-200 dark:decoration-brand-800 underline-offset-8">
                English
              </span>{' '}
              is Easy
            </h1>

            <p className="font-bangla text-xl sm:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              আজ থেকেই আপনার ভাষা শেখার যাত্রা শুরু করুন। আপনি যদি নতুন হন অথবা
              আপনার দক্ষতা বাড়াতে চান, আমাদের Interactive Lessons আপনাকে নিয়ে
              যাবে অন্য একটি <span className="font-semibold text-brand-500">Level</span> এ।
            </p>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm">
                <BookOpen className="w-4 h-4 text-brand-500" />
                <span>10 Structured Levels</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm">
                <Volume2 className="w-4 h-4 text-emerald-500" />
                <span>Audio Pronunciation</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm">
                <Award className="w-4 h-4 text-amber-500" />
                <span>{totalWords}+ Curated Words</span>
              </div>
            </div>

            {/* CTA Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                onClick={onGetStarted}
                icon={<ArrowRight className="w-5 h-5 ml-1" />}
                className="w-full sm:w-auto font-bangla text-base"
              >
                পড়া শুরু করুন (Get Started)
              </Button>
            </div>
          </div>

          {/* Right Hero Image Column */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl p-4 flex items-center justify-center">
              {/* Soft decorative background circle */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-brand-100 to-sky-100 dark:from-slate-800 dark:to-slate-800/50 -z-10 shadow-inner" />

              <Image
                src="/assets/hero-student.png"
                alt="English Janala Student"
                width={420}
                height={420}
                className="object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-300"
                priority
              />

              {/* Floating floating floating badge */}
              <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-md shadow-brand-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Daily Goal</div>
                  <div className="text-sm font-bold text-slate-800 dark:text-white">Learn 10 Words</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
