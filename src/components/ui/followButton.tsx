

'use client';
import React from 'react'; 
import { Button } from './button';

import { Loader2, Check } from 'lucide-react';

interface FollowButtonProps {
 
  isFollowing: boolean; 
  isPending: boolean;
  onFollowToggle: () => void;
  ownerName: string; 
  className?: string; 
  
}


export function FollowButton({
    isFollowing,
    isPending,
    onFollowToggle,
    ownerName,
    className = '', 
    
 }: FollowButtonProps) {

  

  const buttonText = isFollowing ? 'Following' : 'Follow';

  return (
    <Button
      variant='primary'
      size="sm" 
      onClick={onFollowToggle} 
      disabled={isPending} 
      className={`
          min-w-[90px] flex items-center justify-center
          ${!isFollowing && !isPending ? 'gap-1' : ''}
          ${isPending ? 'opacity-70 cursor-not-allowed' : ''}
          h-10 px-4 py-2 text-base // Example override from previous step
          ${className} // Append any extra classes passed via props
      `}
      aria-label={isFollowing ? `Unfollow ${ownerName}` : `Follow ${ownerName}`}
    >
      {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>...</span>
            </>
          ) : (
            <>
            {!isFollowing ? (
               
              <span className="font-medium text-base">+</span>
            ) : (
             
              <Check className="h-4 w-4" /> 
            )}
            <span>{buttonText}</span>
          </>
          )}
    </Button>
  );
}