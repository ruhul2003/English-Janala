const BASE_URL = 'https://openapi.programming-hero.com/api';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

/**
 * Clean string to prevent null / undefined / falsy text
 */
export function sanitizeString(val, fallback = 'N/A') {
  if (val === null || val === undefined || val === 'null' || val === 'undefined') {
    return fallback;
  }
  const str = String(val).trim();
  return str.length > 0 ? str : fallback;
}

/**
 * Fetch all learning levels
 */
export async function fetchLevels() {
  try {
    const res = await fetch(`${BASE_URL}/levels/all`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Failed to fetch levels: ${res.statusText}`);
    const data = await res.json();
    return Array.isArray(data.data) ? data.data : [];
  } catch (err) {
    console.error('Error fetching levels:', err);
    return Array.from({ length: 10 }, (_, i) => ({
      id: 101 + i,
      level_no: i + 1,
      lessonName: `Lesson ${i + 1}`,
    }));
  }
}

/**
 * Fetch all words for a specific level
 */
export async function fetchWordsByLevel(levelId) {
  try {
    const res = await fetch(`${BASE_URL}/level/${levelId}`);
    if (!res.ok) throw new Error(`Failed to fetch level ${levelId}: ${res.statusText}`);
    const data = await res.json();
    const words = Array.isArray(data.data) ? data.data : [];
    return words.map((w) => ({
      id: w.id,
      level: w.level || levelId,
      word: sanitizeString(w.word, 'Unknown Word'),
      meaning: sanitizeString(w.meaning, 'অর্থ পাওয়া যায়নি'),
      pronunciation: sanitizeString(w.pronunciation, 'উচ্চারণ নেই'),
    }));
  } catch (err) {
    console.error(`Error fetching words for level ${levelId}:`, err);
    return [];
  }
}

/**
 * Fetch detailed word information for modal
 */
export async function fetchWordDetail(wordId) {
  try {
    const res = await fetch(`${BASE_URL}/word/${wordId}`);
    if (!res.ok) throw new Error(`Failed to fetch word ${wordId}: ${res.statusText}`);
    const json = await res.json();
    const data = json.data;
    if (!data) return null;

    return {
      id: data.id,
      level: data.level,
      word: sanitizeString(data.word, 'Unknown Word'),
      meaning: sanitizeString(data.meaning, 'অর্থ পাওয়া যায়নি'),
      pronunciation: sanitizeString(data.pronunciation, 'উচ্চারণ নেই'),
      sentence: sanitizeString(data.sentence, 'No example sentence available.'),
      points: typeof data.points === 'number' ? data.points : 1,
      partsOfSpeech: sanitizeString(data.partsOfSpeech, 'Vocabulary'),
      synonyms: Array.isArray(data.synonyms) && data.synonyms.length > 0
        ? data.synonyms.filter(Boolean)
        : ['None recorded'],
    };
  } catch (err) {
    console.error(`Error fetching word detail for ID ${wordId}:`, err);
    return null;
  }
}

/**
 * Fetch all words across all levels for search and quiz generation
 */
export async function fetchAllWords() {
  try {
    const res = await fetch(`${BASE_URL}/words/all`);
    if (!res.ok) throw new Error(`Failed to fetch all words: ${res.statusText}`);
    const data = await res.json();
    const words = Array.isArray(data.data) ? data.data : [];
    return words.map((w) => ({
      id: w.id,
      level: w.level || 1,
      word: sanitizeString(w.word, 'Unknown Word'),
      meaning: sanitizeString(w.meaning, 'অর্থ পাওয়া যায়নি'),
      pronunciation: sanitizeString(w.pronunciation, 'উচ্চারণ নেই'),
    }));
  } catch (err) {
    console.error('Error fetching all words:', err);
    return [];
  }
}

// ---------------- MongoDB Backend Integration APIs ---------------- //

/**
 * Sync logged-in user with MongoDB database
 */
export async function syncUserWithDB(user) {
  if (!user?.email) return null;
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
        image: user.image,
      }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn('Backend sync offline:', err.message);
    return null;
  }
}

/**
 * Save word to MongoDB
 */
export async function saveWordToDB(userId, word) {
  if (!userId || !word) return;
  try {
    await fetch(`${BACKEND_URL}/api/words/saved`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        wordId: word.id,
        word: word.word,
        meaning: word.meaning,
        pronunciation: word.pronunciation,
        level: word.level,
      }),
    });
  } catch (err) {
    console.warn('Backend save word offline:', err.message);
  }
}

/**
 * Save quiz score to MongoDB
 */
export async function saveQuizToDB(userId, score, totalQuestions) {
  if (!userId) return;
  try {
    await fetch(`${BACKEND_URL}/api/stats/quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, score, totalQuestions }),
    });
  } catch (err) {
    console.warn('Backend quiz score offline:', err.message);
  }
}
