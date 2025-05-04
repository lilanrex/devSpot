
import { TechnologyOwner, Hackathon, User } from './types';



const MOCK_USER: User = {
    name: "Russell French",
    role: "Developer",
    avatarUrl: "/Oval.png" 
};

const MOCK_TO_PROTOCOL_LABS: TechnologyOwner = {
  id: 'protocol-labs',
  name: 'Protocol Labs',
  logoUrl: '/Project logo.png', 
  category: 'Software research',
  websiteUrl: 'protocol@labs.ai', 
  industry: 'Software Development',
  employeeCount: '201-500 employees',
  location: 'San Francisco, United States',
  description: 'Protocol Labs is an innovative network driving breakthroughs in computing to push humanity forward. We connect more than 600 tech startups, funds, accelerators, foundations, open source projects, service providers, and other organizations. Our work spans the entire R&D pipeline, across fields like web3, AI, AR, VR, neurotech, hardware, and more.\n\nSubscribe to our newsletter to get the latest updates from around the network: https://pl.fi/updatesSubscribe',
  linkedInUrl: 'https://linkedin.com/...', 
  technologies: ['Filecoin', 'IPFS', 'libp2p'],
  isFollowedByUser: false, 
};

const MOCK_HACKATHONS_PROTOCOL_LABS: Hackathon[] = [
   {
    id: 'hackathon-1',
    organizerName: 'Protocol Labs',
    organizerLogoUrl: '/Project logo.png', 
    title: 'Quantum Shift',
    status: 'Live',
    type: 'Virtual Hackathon',
    date: 'May 9, 2025',
    participantCount: 1391,
  },
  
];



export const getCurrentUser = async (): Promise<User | null> => {
    console.log('Fetching current user...');
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_USER;
}

export const getTechnologyOwner = async (id: string): Promise<TechnologyOwner | null> => {
  console.log(`Workspaceing TO with id: ${id}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  if (id === 'protocol-labs') {
    
    return MOCK_TO_PROTOCOL_LABS;
  }
   if (id === 'empty-owner') { 
    return {
        ...MOCK_TO_PROTOCOL_LABS, 
        id: 'empty-owner',
        name: 'Empty Labs Inc.',
        isFollowedByUser: false
     };
   }
  return null; 
};

export const getHackathonsByOwner = async (ownerId: string): Promise<Hackathon[]> => {
   console.log(`Workspaceing hackathons for owner: ${ownerId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  if (ownerId === 'protocol-labs') {
      return MOCK_HACKATHONS_PROTOCOL_LABS;
  }
 
  return [];
};

export const followTechnologyOwner = async (id: string): Promise<boolean> => {
  console.log(`Following TO: ${id}`);
  await new Promise(resolve => setTimeout(resolve, 300));
  console.log(`Successfully followed ${id}`);
  return true; 
};

export const unfollowTechnologyOwner = async (id: string): Promise<boolean> => {
  console.log(`Unfollowing TO: ${id}`);
  await new Promise(resolve => setTimeout(resolve, 300));
   console.log(`Successfully unfollowed ${id}`);
  return true; 
};