
'use client';

import React, { useState, useTransition } from 'react';
import { Button } from './button';
import { followTechnologyOwner, unfollowTechnologyOwner } from '@/libs/api';
import { UserPlus, UserCheck, Loader2 } from 'lucide-react'; // Import icons

interface FollowButtonProps {
  technologyOwnerId: string;
  initialIsFollowing: boolean;
  ownerName: string;
}

export function FollowButton({ technologyOwnerId, initialIsFollowing, ownerName }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isPending, startTransition] = useTransition();

  const handleFollowToggle = () => {
    startTransition(async () => {
      const optimisticState = !isFollowing;
      setIsFollowing(optimisticState);

      try {
        if (optimisticState) {
          await followTechnologyOwner(technologyOwnerId);
        } else {
          await unfollowTechnologyOwner(technologyOwnerId);
        }
      } catch (error) {
        console.error("Failed to update follow status:", error);
        setIsFollowing(!optimisticState);
      }
    });
  };

 
  const buttonText = isFollowing ? 'Following' : `Follow ${ownerName}`;
 
  const Icon = isFollowing ? UserCheck : UserPlus;

  return (
    <Button
      variant={isFollowing ? 'outline' : 'primary'} 
      size="sm"
      onClick={handleFollowToggle}
      disabled={isPending}
     
      className={`min-w-[110px] flex items-center justify-center gap-1.5 ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Icon className="h-4 w-4" />
      )}
      <span>{isPending ? '...' : buttonText}</span>
    </Button>
  );
}