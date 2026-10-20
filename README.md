# ENGLISH <img width="28px" src="./public/assets/logo.png" align="center" /> JANALA (ইংরেজি জানালা)

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Auth-Better--Auth-00BCFF)](https://www.better-auth.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

English Janala is a modern, interactive English vocabulary learning platform built with **Next.js (App Router, pure JSX)**, **Tailwind CSS**, and **Better Auth** with Google One-Click Sign In. It offers speech pronunciation, 3D interactive flashcards, timed quiz challenges with celebration confetti, daily streak tracking, and bookmarked words revision.

---

## 🌟 Key Features

### 1. 📚 Dynamic Lessons & Word Cards
- **10 Structured Lesson Levels**: Loaded dynamically from the Programming Hero OpenAPI (`/api/levels/all`).
- **Interactive Level Selector**: Highlights the active level with distinct ring and shadow effects.
- **Card Format**: Displays English word, pronunciation, and বাংলা অর্থ (Bengali meaning) with clean typography.
- **Loading Skeletons & Empty States**: Polished shimmer effect while loading and friendly Bengali empty-state notifications.

### 2. 🔊 Web Speech API Pronunciation
- **Native Text-to-Speech**: Crystal-clear English pronunciation powered by the Web Speech API (`SpeechSynthesisUtterance`).
- **Speed Controls**: Adjustable audio playback speed (`0.75x` for learners, `1.0x` standard, `1.25x` quick).
- **Interactive Audio Feedback**: Visual pulse and bounce animation while speaking.

### 3. 🔍 Instant Live Search
- **Real-Time Filtering**: Search across all 105+ words by English or Bengali meaning.
- **Active Level Reset**: Automatically resets the active level button upon typing, allowing global search across all levels.

### 4. 📖 Vocabulary Details Modal
- **Comprehensive Word Information**: Fetched from `/api/word/{id}` showing:
  - English word & phonetics
  - Bengali meaning & Parts of Speech
  - Contextual example sentences
  - Synonyms tags
  - **"Complete Learning" (শেখা শেষ করুন)** button granting XP points and firing celebration confetti.

### 5. ❤️ Saved Words (Bookmarks) Drawer
- **Heart Toggle**: Save any word for quick revision.
- **Dedicated Saved View**: Filter and study all bookmarked words with instant audio playback and removal options.
- **Persistent Storage**: Bookmarks are automatically saved in `localStorage`.

### 6. 🃏 3D Interactive Flashcards Deck
- **Perspective 3D Flip Card**: Flip between the English word on the front and Bengali meaning on the back.
- **Deck Controls**: Shuffle cards, navigate with Previous/Next, or mark cards as "Got It (+10 XP)" vs "Review Later".

### 7. 🏆 Vocabulary Quiz Arena
- **Multiple-Choice Questions**: 4 randomized Bengali options for each word.
- **15-Second Countdown Timer**: Thrilling countdown per question.
- **Streak & Combo Multiplier**: Consecutive correct answers grant bonus XP.
- **Celebration Confetti**: Automatic fireworks burst on completing the quiz with a high score.

### 8. 🔥 Daily Streak & XP Progress Tracker
- **Daily Streak Calculator**: Automatically counts active learning days.
- **Gamified XP**: Earn points by mastering words and winning quizzes.
- **Mastery Progress Bar**: Visual percentage bar tracking completion of all vocabulary.

### 9. 🔐 Better Auth & Google Sign In
- **Modern Authentication**: Powered by [Better Auth](https://better-auth.com).
- **Google One-Click Sign In**: Integrated Google OAuth provider.
- **Email & Password Authentication**: Seamless registration and sign-in.
- **Instant Demo / Guest Mode**: Test the app immediately with a demo guest profile without setup.
- **User Profile Modal**: Displays learner avatar, current rank, streak, and logout options.

### 10. 🌓 Dark & Light Mode
- Complete responsive theme switching with smooth transitions and persistent user preference.

### 11. ❓ Interactive FAQ Accordion
- Rich accordion with keyword search addressing common learner questions.

---

## ⚡ API Endpoints

1. **Get All Levels**
   ```bash
   GET https://openapi.programming-hero.com/api/levels/all
   ```

2. **Get Words by Level ID**
   ```bash
   GET https://openapi.programming-hero.com/api/level/{id}
   # Example:
   GET https://openapi.programming-hero.com/api/level/1
   ```

3. **Get Word Details**
   ```bash
   GET https://openapi.programming-hero.com/api/word/{id}
   # Example:
   GET https://openapi.programming-hero.com/api/word/1
   ```

4. **Get All Words**
   ```bash
   GET https://openapi.programming-hero.com/api/words/all
   ```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.x` or higher (Tested on Node `v22.17.0`)
- npm `9.x` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ruhul2003/English-Janala.git
   cd "English Janala"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables** (Optional for Google OAuth):
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Add your Google OAuth credentials if desired:
   ```env
   BETTER_AUTH_SECRET=your_super_secret_key_32_characters_minimum
   BETTER_AUTH_URL=http://localhost:3000

   GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_client_secret
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📂 Project Structure

```
English Janala/
├── public/
│   └── assets/             # Brand logos, icons, student illustration
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │           └── route.js   # Better Auth catch-all API handler
│   │   ├── globals.css            # Tailwind & Google Fonts configuration
│   │   ├── layout.jsx             # Next.js RootLayout
│   │   └── page.jsx               # Main interactive dashboard
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Badge.jsx          # Reusable badge component
│   │   │   └── Button.jsx         # Accessible button with variants
│   │   ├── AuthModal.jsx          # Google & Email authentication modal
│   │   ├── EmptyState.jsx         # Bengali empty state notice
│   │   ├── FaqSection.jsx         # Accordion FAQ with live search
│   │   ├── FlashcardArena.jsx     # 3D interactive flip card deck
│   │   ├── HeroBanner.jsx         # Responsive hero banner with Bengali copy
│   │   ├── LevelSelector.jsx      # Dynamic lesson buttons with active badge
│   │   ├── LoadingSkeleton.jsx    # Shimmer card skeletons
│   │   ├── Navbar.jsx             # Top navigation, tabs, theme toggle, profile
│   │   ├── ProgressStats.jsx      # Streak, XP bar, audio speed selector
│   │   ├── QuizArena.jsx          # Multiple-choice quiz arena with timer
│   │   ├── SavedWordsDrawer.jsx   # Bookmarks manager
│   │   ├── SearchBar.jsx          # Real-time search with clear button
│   │   ├── UserProfileModal.jsx   # Profile stats and logout
│   │   └── WordCard.jsx           # Vocabulary card with sound and heart
│   └── lib/
│       ├── api.js                 # OpenAPI data fetching and sanitization
│       ├── auth-client.js         # Better Auth client and session hooks
│       ├── auth.js                # Better Auth server configuration
│       ├── confetti.js            # Particle explosion effects
│       ├── speech.js              # Speech synthesis pronunciation helper
│       └── useLearningStorage.js  # LocalStorage hook for streak & bookmarks
├── .env.example
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

---

## 🎓 Developed for
Assignment & Project Work for **Programming Hero** English Vocabulary Learning Platform.
