
import { User } from '@/libs/types';
import Image from 'next/image';
import { Search, Bell, ChevronDown } from 'lucide-react'; 

interface HeaderProps {
    user: User | null;
}

export default function Header({ user }: HeaderProps) {
  console.log('Header received user prop:', user);
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-gray-700/50 flex-shrink-0">
       
       <div className="flex items-center bg-gray-800 rounded-md px-3 py-1.5 w-[50%]">
         <Search className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search for hackathons, companies, developers, events and discussions"
          className="bg-transparent text-sm text-gray-300 placeholder-gray-500 focus:outline-none w-full"
        />
      </div>

     
      <div className="flex items-center space-x-4 ml-4"> 
      <button
       className="text-gray-400 hover:text-gray-200 p-1.5 rounded-full hover:bg-gray-700/50 flex items-center justify-center"
       aria-label="Notifications"
    >
        <Image
            
            src="/notif.png"
            alt="" 
            width={17.286}
            height={21.351}
           
            className="flex-shrink-0"
            
        />
    </button>

        
        {user ? ( 
          <button className="flex items-center space-x-2 text-sm text-gray-300 hover:bg-gray-700/50 p-1 rounded-md">
             <Image
                
                src={user.avatarUrl || "/placeholder-avatar.png"}
                alt={user.name}
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
            
             <div className="h-9 w-24 bg-gray-700 rounded animate-pulse"></div>
        )}
      </div>
    </header>
  );
}
