
import React from 'react';

interface TagProps {
  children: React.ReactNode;
}

export function Tag({ children }: TagProps) {
  return (
    <span
      className="
        inline-flex h-7 px-2 py-0 items-center justify-center gap-1 {/* Layout & Spacing */}
        rounded-2xl {/* New border-radius (16px) */}
        bg-gradient-to-l from-[#9667FA] to-[#4075FF] {/* New Gradient Background */}
        text-white text-sm font-medium leading-6 {/* Typography & Color */}
        {/* Removed: bg-purple-600/30, border, border-purple-500/50, rounded-full */}
      "
    >
      {children}
    </span>
  );
}