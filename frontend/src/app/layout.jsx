import './globals.css';

export const metadata = {
  title: 'English Janala | Best Platform to Learn English',
  description: 'Interactive English vocabulary learning platform with pronunciation, flashcards, quizzes, and streak tracking.',
  icons: {
    icon: '/assets/logo.png',
  },
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
