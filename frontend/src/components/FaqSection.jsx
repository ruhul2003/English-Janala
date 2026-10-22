'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, BookOpen, Volume2, ShieldCheck } from 'lucide-react';

const FAQ_DATA = [
  {
    id: 1,
    category: 'Lessons',
    question: 'English Janala প্ল্যাটফর্মে কতগুলো Lesson বা Level আছে?',
    answer:
      'English Janala-তে মোট ১০টি ক্রমান্বয়ে সাজানো Lesson রয়েছে। বেসিক শব্দভাণ্ডার থেকে শুরু করে নিত্যদিনের কথোপকথনের শব্দাবলী ধাপে ধাপে শেখার উপযোগী করে তৈরি করা হয়েছে।',
  },
  {
    id: 2,
    category: 'Pronunciation',
    question: 'শব্দের সঠিক উচ্চারণ কীভাবে শুনতে পারব?',
    answer:
      'যেকোনো Word Card অথবা Details Modal এ থাকা Sound/Speaker আইকনে ক্লিক করলেই ব্রাউজারের কৃত্রিম বুদ্ধিমত্তা চালিত Speech Synthesis এর মাধ্যমে নিখুঁত ইংরেজি উচ্চারণ শুনতে পারবেন। আপনি সেটিংস থেকে অডিওর স্পিড (0.75x slow, 1x normal) নিয়ন্ত্রণ করতে পারবেন।',
  },
  {
    id: 3,
    category: 'Learning',
    question: 'Flashcards এবং Quiz Arena কীভাবে কাজ করে?',
    answer:
      'Flashcards মোডে ক্লিক করে আপনি 3D কার্ড ফ্লিপ করে ইংরেজি শব্দের বাংলা অর্থ যাচাই করতে পারেন। Quiz Arena তে ১৫ সেকেন্ডের টাইমারে ৪টি অপশন থেকে সঠিক বাংলা অর্থ নির্বাচন করে নিজের স্কোর ও স্ট্রিক বাড়াতে পারেন।',
  },
  {
    id: 4,
    category: 'Bookmarks',
    question: 'Saved Words বা বুকমার্ক কীভাবে কাজ করে?',
    answer:
      'যেকোনো Word Card এ থাকা Heart আইকনে ক্লিক করলেই শব্দটি আপনার Saved Words সেকশনে জমা হবে। পরবর্তীতে আপনি রিভিশনের জন্য সংরক্ষিত শব্দগুলো আলাদাভাবে অনুশীলন করতে পারবেন।',
  },
  {
    id: 5,
    category: 'Account',
    question: 'Google Sign In এবং Better Auth এর সুবিধা কী?',
    answer:
      'Better Auth ও Google Sign In এর মাধ্যমে এক ক্লিকেই আপনার গুগলের অ্যাকাউন্টে নিরাপদ লগইন করতে পারবেন। ফলে আপনার অর্জিত XP পয়েন্ট, শেখা শব্দ এবং ডেইলি স্ট্রিক ডিভাইসে সংরক্ষিত থাকবে।',
  },
  {
    id: 6,
    category: 'Progress',
    question: 'XP পয়েন্ট এবং Daily Streak কীভাবে বৃদ্ধি পায়?',
    answer:
      'প্রতিটি নতুন শব্দ শেখা শেষ করলে (+১০ XP) এবং কুইজে সঠিক উত্তর দিলে পয়েন্ট বাড়ে। পরপর কয়েকদিন প্ল্যাটফর্মে এসে অনুশীলন করলে আপনার Daily Streak বাড়ে।',
  },
];

export const FaqSection = () => {
  const [openId, setOpenId] = useState(1);
  const [search, setSearch] = useState('');

  const filteredFaqs = FAQ_DATA.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="w-[95%] max-w-5xl mx-auto px-2 sm:px-4 py-12 animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 text-xs font-semibold mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          সাধারণ জিজ্ঞাসা (FAQ)
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
          English Janala প্ল্যাটফর্মের ব্যবহারবিধি ও ফিচার সম্পর্কে বিস্তারিত জানুন
        </p>

        {/* FAQ Search */}
        <div className="mt-6 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/70 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-800 dark:text-white hover:text-brand-500 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 font-bold">
                    {faq.category}
                  </span>
                  <span className="font-bangla text-base sm:text-lg">{faq.question}</span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-brand-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 font-bangla leading-relaxed border-t border-slate-50 dark:border-slate-700/40 animate-slide-up">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="p-8 text-center text-slate-400 font-bangla">
            আপনার খোঁজা প্রশ্নের কোনো উত্তর পাওয়া যায়নি।
          </div>
        )}
      </div>
    </section>
  );
};
