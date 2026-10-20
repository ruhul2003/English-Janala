import confetti from 'canvas-confetti';

/**
 * Standard celebratory confetti burst
 */
export function fireConfetti() {
  if (typeof window === 'undefined') return;

  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00BCFF', '#38bdf8', '#fbbf24', '#34d399', '#f43f5e'],
    });
  } catch (err) {
    console.warn('Confetti error:', err);
  }
}

/**
 * Fireworks style celebration for big quiz high score or level completion
 */
export function fireFireworks() {
  if (typeof window === 'undefined') return;

  try {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#00BCFF', '#0284c7', '#38bdf8', '#f59e0b', '#10b981'],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  } catch (e) {
    console.warn('Fireworks confetti error:', e);
  }
}
