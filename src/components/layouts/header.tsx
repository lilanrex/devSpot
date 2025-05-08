import Link from 'next/link';
import Image from 'next/image';
import { User } from '@/libs/types';
import { Search, Bell, ChevronDown } from 'lucide-react';
// import { Menu } from 'lucide-react'; // For hamburger menu later

interface HeaderProps {
  user: User | null;
  
}

export default function Header({ user /*, onMenuToggle */ }: HeaderProps) {

  return (
   
    <header className="h-16 bg-[#1B1B22] border-b border-gray-700/50 flex-shrink-0 w-full">
      
      <div className="flex items-center justify-between h-full w-full py-2 px-4 gap-4 sm:gap-6">
      

        
        <div className="flex-shrink-0">
         
          
          <Link href="/" aria-label="DevSpot Home">
            <Image
              src="/White Logo.png"
              alt="DevSpot Logo"
              width={120}
              height={30}
              priority
              className="block"
            />
          </Link>
        </div>

        
        <div className="
          flex items-start              {/* Figma: align-items: flex-start */}
          gap-4                       {/* Figma: gap: 16px */}
          bg-[#2B2B31]                {/* Figma: background */}
          border border-[#424248]     {/* Figma: border */}
          rounded-xl                  {/* Figma: border-radius (12px) */}
          py-2 px-3                   {/* Figma: padding (8px 12px) */}
         w-[45%] sm:w-[50%] md:w-[55%] lg:w-[39.5%]
        ">
          <Search className="h-5 w-5 text-gray-400 flex-shrink-0 mt-[1px]" /> {/* Adjust mt for alignment with input if needed */}
          <input
            type="text"
            placeholder="Search for hackathons, companies, developers, events and discussions"
            className="bg-transparent text-sm text-gray-300 placeholder-gray-500 focus:outline-none w-full"
          />
        </div>

        
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <button
            className="text-gray-400 hover:text-gray-200 p-1.5 rounded-full hover:bg-gray-700/50 flex items-center justify-center"
            aria-label="Notifications"
          >
            <Image
              src="/notif.png"
              alt="Notifications"
              width={18}
              height={21}
              className="flex-shrink-0"
            />
          </button>

          {user ? (
            <button className="flex items-center space-x-2 text-sm text-gray-300 hover:bg-gray-700/50 p-1 rounded-md">
              <Image
                src={user.avatarUrl || "/placeholder-avatar.png"}
                alt={user.name || 'User Avatar'}
                width={28}
                height={28}
                className="rounded-full flex-shrink-0"
              />
              <div className='text-left hidden md:block'>
                <span className='block font-medium text-gray-200'>{user.name}</span>
                <span className='block text-xs text-gray-400'>{user.role}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
            </button>
          ) : (
             <div className="flex items-center space-x-2">
               <div className="h-7 w-7 bg-gray-700 rounded-full animate-pulse"></div>
               <div className="h-8 w-24 bg-gray-700 rounded animate-pulse hidden md:block"></div>
             </div>
          )}
        </div>
      </div> 
    </header>
  );
}