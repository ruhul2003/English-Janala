/**
 * Web Speech API Utility for English Janala
 */

let cachedVoices = [];

// Cache available voices when loaded
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

/**
 * Check if browser supports speech synthesis
 */
export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/**
 * Speak word with rate control and voice selection
 */
export function speakWord(text, rate = 1.0, lang = 'en-US') {
  return new Promise((resolve) => {
    if (!isSpeechSupported() || !text) {
      resolve(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const cleanText = String(text).trim();
      if (!cleanText) {
        resolve(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = lang;
      utterance.rate = Math.max(0.5, Math.min(2.0, Number(rate) || 1.0));
      utterance.pitch = 1.0;

      const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
      const englishVoice =
        voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Natural') ||
              v.name.includes('Google') ||
              v.name.includes('Samantha') ||
              v.name.includes('David'))
        ) || voices.find((v) => v.lang.startsWith('en'));

      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onend = () => resolve(true);
      utterance.onerror = (e) => {
        console.warn('Speech synthesis error:', e);
        resolve(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Failed to trigger speech synthesis:', err.message);
      resolve(false);
    }
  });
}
