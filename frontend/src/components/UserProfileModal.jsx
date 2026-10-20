'use client';

import React from 'react';
import { X, Flame, Zap, Bookmark, Award, LogOut, CheckCircle2 } from 'lucide-react';
import { signOut } from '@/lib/auth-client';
import { Button } from './ui/Button';

export const UserProfileModal = ({
  isOpen,
  onClose,
  user,
  streak = 1,
  xp = 50,
  learnedCount = 0,
  savedCount = 0,
  onLogout,
}) => {
  if (!isOpen || !user) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      console.warn('Signout API fallback:', e);
    }
    if (onLogout) onLogout();
    onClose();
  };

  const rank =
    xp >= 500
      ? 'Vocabulary Master 🏆'
      : xp >= 250
      ? 'Language Enthusiast 🌟'
      : xp >= 100
      ? 'Active Learner 🚀'
      : 'Novice Explorer 🌱';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="relative mb-3">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || 'User'}
                className="w-20 h-20 rounded-full object-cover border-4 border-brand-500 shadow-lg shadow-brand-500/20"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-500 to-sky-400 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-brand-500/20">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white dark:border-slate-900">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {user.name || 'English Learner'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{user.email}</p>

          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 text-xs font-semibold border border-brand-200 dark:border-brand-800">
            <Award className="w-3.5 h-3.5" />
            <span>{rank}</span>
          </div>
        </div>

        {/* Learning Statistics Grid */}
        <div className="grid grid-cols-2 gap-3 my-6">
          <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/60">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
              <Flame className="w-4 h-4" />
              <span className="text-xs font-semibold">Streak</span>
            </div>
            <div className="text-2xl font-black text-amber-700 dark:text-amber-300">
              {streak} <span className="text-xs font-normal">days</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-brand-50/70 dark:bg-brand-950/30 border border-brand-200/60 dark:border-brand-800/60">
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-semibold">Total XP</span>
            </div>
            <div className="text-2xl font-black text-brand-700 dark:text-brand-300">
              {xp} <span className="text-xs font-normal">points</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-semibold">Learned</span>
            </div>
            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
              {learnedCount} <span className="text-xs font-normal">words</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/60">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
              <Bookmark className="w-4 h-4" />
              <span className="text-xs font-semibold">Bookmarked</span>
            </div>
            <div className="text-2xl font-black text-purple-700 dark:text-purple-300">
              {savedCount} <span className="text-xs font-normal">words</span>
            </div>
          </div>
        </div>

        {/* Logout Action */}
        <Button
          variant="outline"
          onClick={handleSignOut}
          icon={<LogOut className="w-4 h-4" />}
          className="w-full text-rose-600 border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40"
        >
          Sign Out of Account
        </Button>
      </div>
    </div>
  );
};
