
import Link from 'next/link';
import Image from 'next/image';


const sidebarItems = [
  
  { href: '/discover', label: 'Discover', iconPath: '/planet.png' }, 
  { href: '/hackathons', label: 'Hackathons', iconPath: '/star.png' },
  { href: '/people', label: 'People', iconPath: '/person.png' },
  { href: '/bounties', label: 'Bounties', iconPath: '/target.png' },
  { href: '/projects', label: 'Projects', iconPath: '/laptop.png' },
  { href: '/tech-owners/protocol-labs', label: 'Technology Owners', iconPath: '/briefcase.png' }, 
];

export default function Sidebar() {
  

  return (
    <aside className="hidden lg:flex lg:w-64 p-4 flex-col border-r border-gray-700/50 flex-shrink-0 h-screen bg-[#1B1B22]">
       
       

      <nav className="flex flex-col space-y-2">
        {sidebarItems.map((item) => {
          
          const isCurrent = item.label === 'Technology Owners'; 

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium
                ${isCurrent
                  ? ' from-[#9667FA] to-[#4075FF] text-white'
                  : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200' 
                }`}
            >
              {item.iconPath && (
                    <Image
                      src={item.iconPath}
                      alt={`${item.label} icon`} 
                     
                      width={20} 
                      height={20} 
                      className="flex-shrink-0" 
                     
                    />
                  )}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
    </aside>
  );
}