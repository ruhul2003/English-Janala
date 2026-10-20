'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { ProgressStats } from '@/components/ProgressStats';
import { SearchBar } from '@/components/SearchBar';
import { LevelSelector } from '@/components/LevelSelector';
import { WordCard } from '@/components/WordCard';
import { WordDetailModal } from '@/components/WordDetailModal';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { SavedWordsDrawer } from '@/components/SavedWordsDrawer';
import { FlashcardArena } from '@/components/FlashcardArena';
import { QuizArena } from '@/components/QuizArena';
import { FaqSection } from '@/components/FaqSection';
import { AuthModal } from '@/components/AuthModal';
import { UserProfileModal } from '@/components/UserProfileModal';
import { useLearningStorage } from '@/lib/useLearningStorage';
import { useSession } from '@/lib/auth-client';
import {
  fetchLevels,
  fetchWordsByLevel,
  fetchWordDetail,
  fetchAllWords,
  syncUserWithDB,
  saveWordToDB,
  saveQuizToDB,
} from '@/lib/api';
import { fireConfetti, fireFireworks } from '@/lib/confetti';

export default function Home() {
  const [activeTab, setActiveTab] = useState('learn');
  const [levels, setLevels] = useState([]);
  const [activeLevelId, setActiveLevelId] = useState(1);
  const [words, setWords] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [isLoadingWords, setIsLoadingWords] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Word Detail Modal state
  const [selectedWordDetail, setSelectedWordDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  // Auth Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [customUser, setCustomUser] = useState(null);

  // Ref for scrolling to vocabulary section
  const vocabSectionRef = useRef(null);

  // Storage and learning hook
  const {
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
  } = useLearningStorage();

  // Better Auth Session
  const { data: session } = useSession();
  const currentUser = session?.user || customUser;

  // Sync user with MongoDB database upon login
  useEffect(() => {
    if (currentUser?.email) {
      syncUserWithDB(currentUser);
    }
  }, [currentUser]);

  // Initial fetch: Levels and All Words
  useEffect(() => {
    async function initData() {
      const [levelsData, allWordsData] = await Promise.all([
        fetchLevels(),
        fetchAllWords(),
      ]);
      setLevels(levelsData);
      setAllWords(allWordsData);
    }
    initData();
  }, []);

  // Fetch words when activeLevelId changes
  useEffect(() => {
    async function loadLevelWords() {
      if (!activeLevelId) return;
      setIsLoadingWords(true);
      try {
        const data = await fetchWordsByLevel(activeLevelId);
        setWords(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoadingWords(false);
      }
    }
    loadLevelWords();
  }, [activeLevelId]);

  // Handle Level Selection
  const handleSelectLevel = (levelNo) => {
    setActiveLevelId(levelNo);
    setSearchQuery(''); // Reset search on level click
  };

  // Handle Search input
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      setActiveLevelId(null); // Reset active level button when searching as per requirement #7!
    } else {
      setActiveLevelId(1);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveLevelId(1);
  };

  // Filter words based on active level or global search query
  const displayedWords = useMemo(() => {
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      return allWords.filter(
        (w) =>
          w.word.toLowerCase().includes(q) ||
          w.meaning.toLowerCase().includes(q) ||
          w.pronunciation.toLowerCase().includes(q)
      );
    }
    return words;
  }, [searchQuery, allWords, words]);

  // Open details modal
  const handleOpenDetails = async (wordId) => {
    setIsDetailOpen(true);
    setIsLoadingDetail(true);
    try {
      const detail = await fetchWordDetail(wordId);
      setSelectedWordDetail(detail);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  // Complete learning handler
  const handleCompleteLearning = (wordId, points) => {
    markWordLearned(wordId, points);
    fireConfetti();
  };

  // Scroll to vocabulary section from Hero CTA
  const handleGetStarted = () => {
    setActiveTab('learn');
    if (vocabSectionRef.current) {
      vocabSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quiz completion handler
  const handleQuizComplete = (finalScore, totalQuestions = 8) => {
    if (currentUser?.email) {
      saveQuizToDB(currentUser.email, finalScore, totalQuestions);
    }
    if (finalScore >= 40) {
      fireFireworks();
    } else {
      fireConfetti();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedWords.length}
        theme={theme}
        toggleTheme={toggleTheme}
        user={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Areas based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'learn' && (
          <>
            {/* Hero Banner */}
            <HeroBanner
              onGetStarted={handleGetStarted}
              totalWords={allWords.length || 105}
            />

            {/* Learning Statistics Dashboard */}
            <ProgressStats
              streak={streak}
              xp={xp}
              learnedCount={learnedWordIds.length}
              savedCount={savedWords.length}
              totalWords={allWords.length || 105}
              audioSpeed={audioSpeed}
              onChangeAudioSpeed={changeAudioSpeed}
            />

            {/* Search Input Bar (Requirement #7) */}
            <div ref={vocabSectionRef}>
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
                totalResults={displayedWords.length}
                isSearching={searchQuery.trim().length > 0}
              />
            </div>

            {/* Lesson Levels Selector (Requirements #1 & #3) */}
            {!searchQuery && (
              <LevelSelector
                levels={levels}
                activeLevelId={activeLevelId}
                onSelectLevel={handleSelectLevel}
                isLoading={isLoadingWords}
              />
            )}

            {/* Vocabulary Word Cards Grid (Requirement #2) */}
            <section className="w-full max-w-6xl mx-auto px-4 my-8">
              {isLoadingWords ? (
                <LoadingSkeleton count={6} />
              ) : displayedWords.length === 0 ? (
                <EmptyState
                  title="No Words Found"
                  description="এই লেসনে বা সার্চের ফলাফলে কোনো শব্দ খুঁজে পাওয়া যায়নি।"
                  onReset={handleClearSearch}
                />
              ) : (
                <div
                  id="word-container"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {displayedWords.map((word) => (
                    <WordCard
                      key={word.id}
                      word={word}
                      onOpenDetails={handleOpenDetails}
                      isSaved={isWordSaved(word.id)}
                      onToggleSave={toggleSaveWord}
                      isLearned={isWordLearned(word.id)}
                      onMarkLearned={markWordLearned}
                      audioSpeed={audioSpeed}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {/* Flashcards Arena Tab */}
        {activeTab === 'flashcards' && (
          <FlashcardArena
            words={words.length > 0 ? words : allWords}
            onMarkLearned={handleCompleteLearning}
            audioSpeed={audioSpeed}
          />
        )}

        {/* Quiz Arena Tab */}
        {activeTab === 'quiz' && (
          <QuizArena
            words={allWords.length > 0 ? allWords : words}
            onQuizComplete={handleQuizComplete}
            audioSpeed={audioSpeed}
          />
        )}

        {/* Saved Words Drawer Tab */}
        {activeTab === 'saved' && (
          <SavedWordsDrawer
            savedWords={savedWords}
            onRemoveWord={toggleSaveWord}
            onOpenDetails={handleOpenDetails}
            onSwitchToLearn={() => setActiveTab('learn')}
            audioSpeed={audioSpeed}
          />
        )}

        {/* FAQ Section Tab */}
        {activeTab === 'faq' && <FaqSection />}
      </main>

      {/* Vocabulary Detail Modal (Requirement #4) */}
      <WordDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        wordDetail={selectedWordDetail}
        isLoading={isLoadingDetail}
        onCompleteLearning={handleCompleteLearning}
        isLearned={selectedWordDetail ? isWordLearned(selectedWordDetail.id) : false}
        audioSpeed={audioSpeed}
      />

      {/* Authentication Modal with Google Sign In */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onGuestLogin={(guest) => setCustomUser(guest)}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        streak={streak}
        xp={xp}
        learnedCount={learnedWordIds.length}
        savedCount={savedWords.length}
        onLogout={() => setCustomUser(null)}
      />

      {/* Modern Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/logo.png"
              alt="English Janala Logo"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="font-bold text-slate-800 dark:text-white">English</span>
            <span className="font-bangla font-bold text-brand-500">জানালা</span>
            <span className="text-xs text-slate-400 ml-2">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>

          {/* Social Thumbnails */}
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity hover:scale-110 transform"
            >
              <Image src="/assets/fb-thumb.png" alt="Facebook" width={22} height={22} />
            </a>
            <a
              href="https://github.com/ruhul2003/English-Janala"
              target="_blank"
              rel="noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity hover:scale-110 transform"
            >
              <Image src="/assets/github-thumb.png" alt="GitHub" width={22} height={22} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity hover:scale-110 transform"
            >
              <Image src="/assets/instagram-thumb.png" alt="Instagram" width={22} height={22} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity hover:scale-110 transform"
            >
              <Image src="/assets/youtube-thumb.png" alt="YouTube" width={22} height={22} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
