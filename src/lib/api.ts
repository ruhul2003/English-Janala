import { Level, Word, WordDetail } from '@/types';

const BASE_URL = 'https://openapi.programming-hero.com/api';

/**
 * Clean string to prevent null / undefined / falsy text
 */
export function sanitizeString(val: any, fallback = 'N/A'): string {
  if (val === null || val === undefined || val === 'null' || val === 'undefined') {
    return fallback;
  }
  const str = String(val).trim();
  return str.length > 0 ? str : fallback;
}

/**
 * Fetch all learning levels
 */
export async function fetchLevels(): Promise<Level[]> {
  try {
    const res = await fetch(`${BASE_URL}/levels/all`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Failed to fetch levels: ${res.statusText}`);
    const data = await res.json();
    return Array.isArray(data.data) ? data.data : [];
  } catch (err) {
    console.error('Error fetching levels:', err);
    // Fallback default levels if network offline
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
export async function fetchWordsByLevel(levelId: number): Promise<Word[]> {
  try {
    const res = await fetch(`${BASE_URL}/level/${levelId}`);
    if (!res.ok) throw new Error(`Failed to fetch level ${levelId}: ${res.statusText}`);
    const data = await res.json();
    const words: Word[] = Array.isArray(data.data) ? data.data : [];
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
export async function fetchWordDetail(wordId: number): Promise<WordDetail | null> {
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
export async function fetchAllWords(): Promise<Word[]> {
  try {
    const res = await fetch(`${BASE_URL}/words/all`);
    if (!res.ok) throw new Error(`Failed to fetch all words: ${res.statusText}`);
    const data = await res.json();
    const words: Word[] = Array.isArray(data.data) ? data.data : [];
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
