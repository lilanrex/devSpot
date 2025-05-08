
'use client';

import React from 'react';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  const activeBorderColor = 'border-[#4E52F5]'; 
  const activeTextColor = 'text-white';
  return (
    <div >
      <nav className="-mb-px flex space-x-6" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`whitespace-nowrap py-3 px-1 border-b-2 text-sm font-medium
              ${activeTab === tab
                ? `${activeBorderColor} ${activeTextColor}`
                : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500' 
              }`}
            aria-current={activeTab === tab ? 'page' : undefined}
           
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}