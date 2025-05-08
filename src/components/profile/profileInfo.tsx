

import React from 'react';
import Image from 'next/image';
import { TechnologyOwner } from '@/libs/types';

import { Link as WebsiteIcon, Tag as IndustryIcon, Users as PeopleIcon, MapPin as LocationIcon } from 'lucide-react';


const InfoItem = ({ IconComponent, text }: { IconComponent: React.ElementType, text?: string | null }) => {
  if (!text) {
    return null;
  }
  return (
      <div className="flex items-center space-x-3 text-base text-[#89898C]"> 
          <IconComponent className="h-5 w-5 flex-shrink-0 text-[#4E52F5]" /> 
          <span>{text}</span>
      </div>
  );
};

interface ProfileInfoProps {
  owner: TechnologyOwner | null;
}

export default function ProfileInfo({ owner }: ProfileInfoProps) {
  if (!owner) {
    
    return (
      <div className="bg-[#1B1B22] rounded-xl px-6 py-5 opacity-50 w-full self-start flex flex-col "> 
        <div className="h-6 w-3/4 bg-gray-700 rounded animate-pulse"></div> 
        <div className="h-[2px] bg-[#2B2B31]/50 w-full animate-pulse"></div>
        <div className="h-6 w-1/2 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-[2px] bg-[#2B2B31]/50 w-full animate-pulse"></div>
        <div className="h-6 w-1/3 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-[2px] bg-[#2B2B31]/50 w-full animate-pulse"></div>
        <div className="h-6 w-2/3 bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

 
  const infoItemsData = [
    { IconComponent: WebsiteIcon, text: owner.websiteUrl },
    { IconComponent: IndustryIcon, text: owner.industry },
    { IconComponent: PeopleIcon, text: owner.employeeCount },
    { IconComponent: LocationIcon, text: owner.location },
  ].filter(item => item.text); 

  return (
    
    <div className="bg-[#1B1B22] rounded-xl px-6 py-5 w-full self-start">
      {infoItemsData.map((item, index) => (
        
        <React.Fragment key={index}> 
          <InfoItem IconComponent={item.IconComponent} text={item.text} />
          {index < infoItemsData.length - 1 && (
            <hr
             
              className="my-3 h-[2px] bg-[#2B2B31] border-0 w-full self-stretch"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}