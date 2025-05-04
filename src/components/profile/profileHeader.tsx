import Image from 'next/image';
import Link from 'next/link';
import { TechnologyOwner } from '@/libs/types';
import { FollowButton } from '../ui/followButton';

import { JapaneseYen, TowerControlIcon, LinkIcon, Linkedin } from 'lucide-react'; // Added Linkedin

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-6 border-b border-gray-700 gap-4 opacity-50 pointer-events-none">
         <div className="flex items-center space-x-4">
           <div className="w-[156px] h-[156px] bg-gray-700 rounded-2xl animate-pulse"></div>
           <div>
               <div className="h-4 w-24 bg-gray-700 rounded mb-1 animate-pulse"></div>
               <div className="h-8 w-40 bg-gray-700 rounded animate-pulse"></div>
           </div>
         </div>
         <div className="flex items-center space-x-2 sm:space-x-3">
             <div className="h-7 w-7 bg-gray-700 rounded animate-pulse"></div>
             <div className="h-7 w-7 bg-gray-700 rounded animate-pulse"></div>
             <div className="h-8 w-32 bg-gray-700 rounded animate-pulse"></div>
         </div>
      </div>
    );
  }

  
  return (
    <div className="bg-[#1B1B22] rounded-[20px] flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 py-6 px-6 border-b border-gray-700 gap-4">

      
      <div className="flex items-center space-x-4">
        <Image
          src={owner.logoUrl || "/placeholder-logo.png"}
          alt={`${owner.name || 'Owner'} logo`}
          width={156}
          height={156}
          className="flex-shrink-0 bg-white rounded-2xl object-cover"
          priority
        />
        <div>
          <p className="mb-0.5 text-white text-base font-semibold leading-7">
            {owner.category}
          </p>
          <h1 className="text-white text-[32px] font-bold leading-normal">
            {owner.name}
          </h1>
        </div>
      </div>

      
      <div className="flex flex-col items-end space-y-20 pt-2 self-stretch flex-shrink-0"> {/* Adjusted space-y */}

        
        <FollowButton
            isFollowing={isFollowing}
            isPending={isPending}
            onFollowToggle={onFollowToggle}
            ownerName={owner.name}
           
        />
      
        <div className='flex items-center space-x-2'>
          
          <SocialLink href={owner.linkedInUrl} icon={LinkIcon} label={`${owner.name} on LinkedIn`} />
         
          <SocialLink href={owner.linkedInUrl} icon={LinkIcon} label={`${owner.name} on X/Twitter`} />
        
          <SocialLink href={owner.linkedInUrl} icon={LinkIcon} label={`${owner.name}'s Website`} />
          
        </div>
      </div>
    </div>
  );
}