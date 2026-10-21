import './globals.css';

export const metadata = {
  title: 'English Janala | Best Platform to Learn English',
  description:
    'Interactive English vocabulary learning platform with pronunciation, flashcards, timed quizzes, and streak tracking.',
  keywords: ['English learning', 'vocabulary', 'Bangla to English', 'flashcards', 'pronunciation', 'quiz arena'],
  authors: [{ name: 'English Janala Team' }],
  icons: {
    icon: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
  openGraph: {
    title: 'English Janala | Best Platform to Learn English',
    description:
      'Master English vocabulary step by step with interactive lessons, pronunciation practice, and quizzes.',
    url: 'https://english-janala.vercel.app',
    siteName: 'English Janala',
    images: [
      {
        url: '/assets/hero-student.png',
        width: 800,
        height: 600,
        alt: 'English Janala Learning Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'English Janala | Learn English with Confidence',
    description: 'Learn English vocabulary step-by-step with interactive quizzes and audio pronunciation.',
    images: ['/assets/hero-student.png'],
  },
};

export const viewport = {
  themeColor: '#00BCFF',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/logo.png" />
      </head>
      <body className="min-h-screen antialiased selection:bg-brand-500 selection:text-white transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
