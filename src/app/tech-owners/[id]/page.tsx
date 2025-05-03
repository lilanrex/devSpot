
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getTechnologyOwner, getHackathonsByOwner } from '@/libs/api';
import { TechnologyOwner, Hackathon } from '@/libs/types';

import ProfileHeader from '@/components/profile/profileHeader';
import ProfileInfo from '@/components/profile/profileInfo';
import TechnologyTags from '@/components/profile/technologyTags';
import AboutSection from '@/components/profile/aboutSection';
import HackathonCard from '@/components/profile/hackathonCard';
import { Tabs } from '@/components/ui/tabs';
import { EmptyState } from '@/components/ui/emptyState';

type ProfileTab = 'Overview' | 'Hackathons';

export default function TechnologyOwnerProfilePage() {
  const params = useParams();
  const id = params.id as string;


  const [owner, setOwner] = useState<TechnologyOwner | null>(null);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [activeTab, setActiveTab] = useState<ProfileTab>('Overview');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const ownerData = await getTechnologyOwner(id);
        if (!ownerData) { throw new Error('Technology Owner not found.'); }
        setOwner(ownerData);
        const hackathonData = await getHackathonsByOwner(id);
        setHackathons(hackathonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

 
  if (isLoading) 
  if (error) {  }
  if (!owner) { return <EmptyState message="Technology Owner profile not found." />; }

  
  const hasHackathons = hackathons.length > 0;
  const emptyStateMessage = `${owner.name} hasn't hosted any hackathons yet.`;

  return (
    
    <div>
     
      <ProfileHeader owner={owner} />

      <div className="my-6">
            <Tabs
                tabs={['Overview', 'Hackathons']}
                activeTab={activeTab}
                onTabChange={(tab) => setActiveTab(tab as ProfileTab)}
                
            />
         
      </div>


     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

       
        <div
         className={`md:col-span-1  space-y-4 rounded-xl p-6 ${
          
          activeTab !== 'Overview' ? 'hidden' : ''
        }`}
        >
          <div className='bg-[#1B1B22] px-6 py-6 rounded-2xl'>
          <ProfileInfo owner={owner} />
        
          </div>
          <div className='bg-[#1B1B22] px-6 py-6 rounded-2xl'>
          
          <TechnologyTags tags={owner.technologies} />
          </div>
        </div>

       
        <div className="md:col-span-2  rounded-xl p-6">
            
            <div>
                {activeTab === 'Overview' && (
                    <div className="space-y-20">
                       
                        <AboutSection description={owner.description} />
                        
                        <div className='bg-[#1B1B22] rounded-2xl px-6 py-6 '>
                            <h3 className="text-sm font-semibold  text-gray-400 mb-3 uppercase tracking-wider">
                                Hackathons
                            </h3>
                            {hasHackathons
                                ? hackathons.map(h => <HackathonCard key={h.id} hackathon={h} />)
                                : <EmptyState message={emptyStateMessage} />
                            }
                        </div>
                    </div>
                )}
                {activeTab === 'Hackathons' && (
                    <div>
                        
                        {hasHackathons
                             ? hackathons.map(h => <HackathonCard key={h.id} hackathon={h} />)
                             : <EmptyState message={emptyStateMessage} />
                         }
                    </div>
                )}
            </div>
        </div> 
      </div>
    </div> 
  );
}