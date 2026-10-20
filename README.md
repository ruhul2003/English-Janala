# ENGLISH <img width="28px" src="./frontend/public/assets/logo.png" align="center" /> JANALA (ইংরেজি জানালা)

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.21-lightgrey?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Auth-Better--Auth-00BCFF)](https://www.better-auth.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

English Janala is a full-stack English vocabulary learning platform structured into **`frontend/`** and **`backend/`** folders, connected to **MongoDB Atlas (Khoj Database)** with **Better Auth**, Google One-Click Sign In, speech pronunciation, 3D interactive flashcards, timed quiz arena, and daily streak tracking.

---

## 🏗️ Architecture & Folder Structure

```
English Janala/
├── frontend/                     # Next.js 14 App Router (JSX, Tailwind CSS)
│   ├── public/
│   │   └── assets/               # Logos, hero student, badges, icons
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/auth/[...all] # Better Auth catch-all route handler
│   │   │   ├── globals.css       # Tailwind directives & Google Fonts
│   │   │   ├── layout.jsx        # Root HTML layout with metadata
│   │   │   └── page.jsx          # Interactive unified dashboard
│   │   ├── components/
│   │   │   ├── ui/               # Reusable Button and Badge components
│   │   │   ├── AuthModal.jsx     # Google sign-in and email authentication
│   │   │   ├── EmptyState.jsx    # Bengali empty states
│   │   │   ├── FaqSection.jsx    # Interactive FAQ accordion with search
│   │   │   ├── FlashcardArena.jsx# 3D perspective flip card deck
│   │   │   ├── HeroBanner.jsx    # Bengali hero banner with CTA
│   │   │   ├── LevelSelector.jsx # Dynamic lesson level buttons
│   │   │   ├── LoadingSkeleton.jsx# Shimmer card skeletons
│   │   │   ├── Navbar.jsx        # Sticky top navigation & theme switcher
│   │   │   ├── ProgressStats.jsx # Daily streak, XP counter, audio speed
│   │   │   ├── QuizArena.jsx     # Timed multiple-choice quiz arena
│   │   │   ├── SavedWordsDrawer.jsx # Bookmarked vocabulary drawer
│   │   │   ├── SearchBar.jsx     # Real-time search across all lessons
│   │   │   ├── UserProfileModal.jsx # User stats, rank, and logout
│   │   │   └── WordCard.jsx      # Word card with speech and heart toggle
│   │   └── lib/
│   │       ├── api.js            # OpenAPI + MongoDB backend client
│   │       ├── auth-client.js    # Better Auth client hooks
│   │       ├── auth.js           # Better Auth server configuration
│   │       ├── confetti.js       # Confetti and fireworks particle effects
│   │       ├── speech.js         # Web Speech API pronunciation helper
│   │       └── useLearningStorage.js # LocalStorage sync for streak & XP
│   ├── .env.example
│   ├── next.config.mjs
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
│
├── backend/                      # Node.js + Express + MongoDB Server
│   ├── config/
│   │   └── db.js                 # Mongoose connection to MongoDB Atlas
│   ├── models/
│   │   ├── User.js               # Learner profile schema (streak, XP)
│   │   ├── SavedWord.js          # Bookmarked words schema
│   │   ├── LearnedWord.js        # Completed/learned words schema
│   │   └── QuizResult.js         # Quiz performance and score history
│   ├── routes/
│   │   ├── authRoutes.js         # POST /api/auth/sync, GET /profile/:email
│   │   ├── wordRoutes.js         # Saved words & learned words CRUD
│   │   └── statsRoutes.js        # POST /quiz score, GET /summary/:userId
│   ├── .env                      # Contains MONGODB_URI (Khoj database)
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Express server on port 5000
│
├── .gitignore
├── package.json                  # Monorepo orchestration scripts
└── README.md
```

---

## 🍃 MongoDB Database Connection

The backend connects directly to the MongoDB Atlas cluster using Mongoose:

```env
MONGODB_URI=mongodb+srv://hire_loop_db_user:wwiIRfECMOKwPwpl@tilux-server.cltfmst.mongodb.net/Khoj?appName=Tilux-server
```

### Database Collections:
1. **`users`**: Learner profiles, Google authentication email, names, daily streaks, and accumulated XP.
2. **`savedwords`**: Bookmarked words for each user for offline/later study.
3. **`learnedwords`**: Completed vocabulary words with points awarded.
4. **`quizresults`**: History of completed quizzes with score tracking.

---

## ⚡ Backend REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Backend server & database health check |
| `POST` | `/api/auth/sync` | Syncs logged-in user profile with MongoDB |
| `GET` | `/api/auth/profile/:email` | Fetches learner profile, streak, and XP |
| `GET` | `/api/words/saved/:userId` | Gets all bookmarked words for a user |
| `POST` | `/api/words/saved` | Saves/toggles a word in bookmarks |
| `DELETE` | `/api/words/saved/:userId/:wordId` | Removes a word from bookmarks |
| `POST` | `/api/words/learned` | Marks word as learned and awards +10 XP |
| `GET` | `/api/words/learned/:userId` | Returns array of learned word IDs |
| `POST` | `/api/stats/quiz` | Saves quiz score to database |
| `GET` | `/api/stats/summary/:userId` | Returns total streak, XP, and stats |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend && npm install && cd ..
```

### 2. Run Backend Server (Express + MongoDB)
```bash
npm run backend:dev
# or
node backend/server.js
```
The server will start at `http://localhost:5000` and connect to the **Khoj** MongoDB database.

### 3. Run Frontend (Next.js 14)
```bash
npm run frontend:dev
# or
cd frontend && npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build Frontend for Production
```bash
npm run frontend:build
```
