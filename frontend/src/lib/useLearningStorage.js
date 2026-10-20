'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEYS = {
  SAVED_WORDS: 'english_janala_saved_words',
  LEARNED_WORDS: 'english_janala_learned_words',
  XP: 'english_janala_xp',
  STREAK: 'english_janala_streak',
  LAST_ACTIVE_DATE: 'english_janala_last_active',
  AUDIO_SPEED: 'english_janala_audio_speed',
  THEME: 'english_janala_theme',
};

export function useLearningStorage() {
  const [savedWords, setSavedWords] = useState([]);
  const [learnedWordIds, setLearnedWordIds] = useState([]);
  const [xp, setXp] = useState(50);
  const [streak, setStreak] = useState(1);
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const [theme, setTheme] = useState('light');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_WORDS);
      if (saved) setSavedWords(JSON.parse(saved));

      const learned = localStorage.getItem(STORAGE_KEYS.LEARNED_WORDS);
      if (learned) setLearnedWordIds(JSON.parse(learned));

      const storedXp = localStorage.getItem(STORAGE_KEYS.XP);
      if (storedXp) setXp(parseInt(storedXp, 10));

      const storedSpeed = localStorage.getItem(STORAGE_KEYS.AUDIO_SPEED);
      if (storedSpeed) setAudioSpeed(parseFloat(storedSpeed));

      const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      if (storedTheme) {
        setTheme(storedTheme);
        if (storedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }

      const lastActive = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE_DATE);
      const today = new Date().toISOString().slice(0, 10);
      const storedStreak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '1', 10);

      if (!lastActive) {
        localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE_DATE, today);
        localStorage.setItem(STORAGE_KEYS.STREAK, '1');
        setStreak(1);
      } else if (lastActive !== today) {
        const lastDate = new Date(lastActive);
        const currentDate = new Date(today);
        const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

        if (diffDays === 1) {
          const nextStreak = storedStreak + 1;
          setStreak(nextStreak);
          localStorage.setItem(STORAGE_KEYS.STREAK, nextStreak.toString());
        } else if (diffDays > 1) {
          setStreak(1);
          localStorage.setItem(STORAGE_KEYS.STREAK, '1');
        }
        localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE_DATE, today);
      } else {
        setStreak(storedStreak);
      }
    } catch (e) {
      console.warn('Storage read failed:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleSaveWord = useCallback((word) => {
    setSavedWords((prev) => {
      const exists = prev.some((w) => w.id === word.id);
      const updated = exists ? prev.filter((w) => w.id !== word.id) : [word, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.SAVED_WORDS, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save words:', err);
      }
      return updated;
    });
  }, []);

  const isWordSaved = useCallback(
    (wordId) => savedWords.some((w) => w.id === wordId),
    [savedWords]
  );

  const markWordLearned = useCallback((wordId, points = 10) => {
    setLearnedWordIds((prev) => {
      if (prev.includes(wordId)) return prev;
      const updated = [...prev, wordId];
      try {
        localStorage.setItem(STORAGE_KEYS.LEARNED_WORDS, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to mark learned:', err);
      }
      return updated;
    });

    setXp((prev) => {
      const nextXp = prev + points;
      try {
        localStorage.setItem(STORAGE_KEYS.XP, nextXp.toString());
      } catch (err) {
        console.error('Failed to update XP:', err);
      }
      return nextXp;
    });
  }, []);

  const isWordLearned = useCallback(
    (wordId) => learnedWordIds.includes(wordId),
    [learnedWordIds]
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(STORAGE_KEYS.THEME, next);
        if (next === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  }, []);

  const changeAudioSpeed = useCallback((speed) => {
    setAudioSpeed(speed);
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIO_SPEED, speed.toString());
    } catch (e) {
      console.error(e);
    }
  }, []);

  return {
    isLoaded,
    savedWords,
    toggleSaveWord,
    isWordSaved,
    learnedWordIds,
    markWordLearned,
    isWordLearned,
    xp,
    streak,
    audioSpeed,
    changeAudioSpeed,
    theme,
    toggleTheme,
  };
}
