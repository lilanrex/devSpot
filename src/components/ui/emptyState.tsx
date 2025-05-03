
import React from 'react';
import { Info } from 'lucide-react'; // Example icon

interface EmptyStateProps {
    message: string;
    description?: string;
}

export function EmptyState({ message, description }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-6 bg-gray-800/50 rounded-lg border border-gray-700/50">
      <Info className="mx-auto h-10 w-10 text-gray-500 mb-3" />
      <p className="text-md font-semibold text-gray-300">{message}</p>
      {description && <p className="mt-1 text-sm text-gray-400">{description}</p>}
    </div>
  );
}