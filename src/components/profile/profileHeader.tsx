import Image from 'next/image';
import Link from 'next/link';
import { TechnologyOwner } from '@/libs/types';
import { FollowButton } from '../ui/followButton';


import {  LinkIcon } from 'lucide-react'; // Example using Linkedin and Twitter

const SocialLink = ({ href, icon: Icon, label }: { href?: string | null, icon: React.ElementType, label?: string }) => {
    if (!href) return null;
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 p-1 hover:bg-gray-700/50 rounded-md"
            aria-label={label}
            title={label}
        >
            <Icon className="h-5 w-5" />
        </Link>
    );
};

interface ProfileHeaderProps {
  owner: TechnologyOwner | null;
  isFollowing: boolean;
  isPending: boolean;
  onFollowToggle: () => void;
}

export default function ProfileHeader({ owner, isFollowing, isPending, onFollowToggle }: ProfileHeaderProps) {

  
  if (!owner) {
    return (
      <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between mb-4 md:mb-6 pb-4 md:pb-6 border-b border-gray-700 gap-4 opacity-50 pointer-events-none px-4 sm:px-6 py-4 sm:py-6">
         <div className="flex items-center space-x-3 sm:space-x-4">
          
           <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gray-700 rounded-2xl animate-pulse flex-shrink-0"></div>
           <div>
               <div className="h-3 w-20 sm:h-4 sm:w-24 bg-gray-700 rounded mb-1 animate-pulse"></div>
               <div className="h-6 w-32 sm:h-8 sm:w-40 bg-gray-700 rounded animate-pulse"></div>
           </div>
         </div>
         <div className="flex items-center space-x-2 self-end sm:self-center">
             <div className="h-7 w-7 bg-gray-700 rounded animate-pulse"></div>
             <div className="h-7 w-7 bg-gray-700 rounded animate-pulse"></div>
             <div className="h-9 w-24 sm:h-10 sm:w-32 bg-gray-700 rounded animate-pulse"></div>
         </div>
      </div>
    );
  }

  return (
    
    <div className="bg-[#1B1B22] rounded-[20px] flex flex-col sm:flex-row items-center sm:items-center justify-between mb-4 md:mb-6 py-4 px-4 sm:py-6 sm:px-6 border-b border-gray-700 gap-4">

     
      <div className="flex items-center space-x-3 sm:space-x-4">
       
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-[156px] lg:h-[156px] flex-shrink-0">
          <Image
            src={owner.logoUrl || "/placeholder-logo.png"}
            alt={`${owner.name || 'Owner'} logo`}
            fill
            className="bg-white rounded-2xl object-cover"
            priority
            sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 128px, 156px" // Adjust sizes based on your layout
          />
        </div>
       
        <div className="min-w-0">
          
          <p className="mb-0.5 text-white text-xs sm:text-sm md:text-base font-semibold leading-tight sm:leading-7 truncate"> {/* Added truncate */}
            {owner.category}
          </p>
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold leading-tight sm:leading-normal">
            {owner.name}
          </h1>
        </div>
      </div>

      
      <div className="flex flex-col items-end space-y-2 self-end sm:self-stretch flex-shrink-0 pt-2"> {/* Changed space-y-20 to space-y-2 */}

        <FollowButton
            isFollowing={isFollowing}
            isPending={isPending}
            onFollowToggle={onFollowToggle}
            ownerName={owner.name}
            
        />

        <div className='flex items-center space-x-1 sm:space-x-2'>
         
          <SocialLink href={owner.linkedInUrl} icon={LinkIcon} label={`${owner.name} on LinkedIn`} />
          <SocialLink href={owner.linkedInUrl} icon={LinkIcon} label={`${owner.name} on X/Twitter`} />
          <SocialLink href={owner.linkedInUrl} icon={LinkIcon} label={`${owner.name}'s Website`} />
        </div>
      </div>
    </div>
  );
}