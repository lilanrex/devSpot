

export interface TechnologyOwner {
    id: string;
    name: string;
    logoUrl: string;
    category: string; 
    websiteUrl?: string;
    industry?: string;
    employeeCount?: string; 
    location?: string;
    description: string;
    linkedInUrl?: string;
    twitterUrl?: string; 
    technologies: string[];
    isFollowedByUser?: boolean; 
  }
  
  export interface Hackathon {
    id: string;
    organizerName: string; 
    organizerLogoUrl: string;
    title: string;
    status: 'Live' | 'Upcoming' | 'Ended'; 
    type: string; 
    date: string; 
    participantCount: number;
  }
  
  
  export interface User {
      name: string;
      role: string; 
      avatarUrl: string;
  }