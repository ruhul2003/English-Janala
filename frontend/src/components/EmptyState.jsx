'use client';

import React from 'react';
import Image from 'next/image';
import { SearchX, RotateCcw } from 'lucide-react';
import { Button } from './ui/Button';

export const EmptyState = ({
  title = 'No Words Found',
  description = 'No vocabulary words match your selection or search query.',
  onReset,
}) => {
  return (
    <div className="w-[95%] max-w-xl mx-auto my-12 p-8 sm:p-10 text-center bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm animate-fade-in">
      <div className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center">
        <Image
          src="/assets/alert-error.png"
          alt="No Words"
          width={64}
          height={64}
          className="object-contain drop-shadow"
        />
      </div>

      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-bangla">
        {description}
      </p>

      {onReset && (
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          icon={<RotateCcw className="w-4 h-4" />}
        >
          Reset Filter / View All
        </Button>
      )}
    </div>
  );
};
