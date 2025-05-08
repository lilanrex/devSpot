'use client';

import { useState, useEffect, useTransition } from 'react';
import { useParams } from 'next/navigation';
import { getTechnologyOwner, getHackathonsByOwner, followTechnologyOwner, unfollowTechnologyOwner } from '@/libs/api';
import { TechnologyOwner, Hackathon } from '@/libs/types';

import ProfileHeader from '@/components/profile/profileHeader';
import ProfileInfo from '@/components/profile/profileInfo';
import TechnologyTags from '@/components/profile/technologyTags';
import AboutSection from '@/components/profile/aboutSection';
import HackathonCard from '@/components/profile/hackathonCard';
//import { Tabs } from '@/components/ui/tabs';
import { FollowButton } from '@/components/ui/followButton'; 

type ProfileTab = 'Overview' | 'Hackathons';

export default function TechnologyOwnerProfilePage() {
    const params = useParams();
    const id = params.id as string;

    const [owner, setOwner] = useState<TechnologyOwner | null>(null);
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const [activeTab, setActiveTab] = useState<ProfileTab>('Overview');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentIsFollowing, setCurrentIsFollowing] = useState(false);
    const [isFollowPending, startFollowTransition] = useTransition();

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const ownerData = await getTechnologyOwner(id);
                if (!ownerData) { throw new Error('Technology Owner not found.'); }
                setOwner(ownerData);
                setCurrentIsFollowing(!!ownerData.isFollowedByUser);
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

    const handleFollowToggle = () => {
        if (!owner) return;
        startFollowTransition(async () => {
            const optimisticState = !currentIsFollowing;
            setCurrentIsFollowing(optimisticState);
            try {
                if (optimisticState) {
                    await followTechnologyOwner(owner.id);
                } else {
                    await unfollowTechnologyOwner(owner.id);
                }
            } catch (fetchError) {
                console.error("Failed to update follow status:", fetchError);
                setCurrentIsFollowing(!optimisticState);
            }
        });
    };

    const handleTabChange = (tab: string) => {
       
        if (tab === 'Overview' || tab === 'Hackathons') {
            setActiveTab(tab);
        }
        
    };

    if (isLoading) return <div>Loading profile...</div>;
    if (error) return <div>Error loading profile: {error}</div>;
    if (!owner) return <div>Technology Owner profile not found.</div>;

    const hasHackathons = hackathons.length > 0;

    const renderEmptyHackathonState = () => (
        <div className="text-center py-6">
            <p className="text-gray-400 mb-2">
                {owner.name} hasn't hosted any hackathons yet.
            </p>
            {!currentIsFollowing ? (
                <>
                    <p className="text-gray-500 text-sm mb-4">
                        Follow them to stay updated!
                    </p>
                    <FollowButton
                        isFollowing={currentIsFollowing}
                        isPending={isFollowPending}
                        onFollowToggle={handleFollowToggle}
                        ownerName={owner.name}
                        className="mx-auto"
                    />
                </>
            ) : (
                 <p className="text-gray-500 text-sm">
                    You'll get notified with any new updates!
                </p>
            )}
        </div>
      );
      const hackathonSectionContainerClasses = "bg-[#1B1B22] rounded-xl px-6 py-2 flex flex-col items-start gap-2 self-stretch";

    return (
        <div >
            
             <ProfileHeader
                owner={owner}
                isFollowing={currentIsFollowing}
                isPending={isFollowPending}
                onFollowToggle={handleFollowToggle}
                activeTab={activeTab} 
                onTabChange={handleTabChange}
             />

             
            
            

          
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4 w-full -mt-2">

              
                <div
                 
                  className={` md:w-auto max-w-[276px] md:col-span-3 space-y-4 rounded-xl pt-6 px-0 pb-6 min-h-[500px] ${
                    activeTab === 'Overview' ? 'block' : 'hidden'
                  }`}
                
                 >
                   <div className='bg-[#1B1B22]  pb-2 pr-2 rounded-2xl'>
                     <ProfileInfo owner={owner} />
                   </div>
                  
                     <TechnologyTags tags={owner.technologies} />
                   
                </div>
                
                <div className={`md:col-span-9 space-y-4 rounded-xl pt-4 pb-4 md:pt-6 md:pb-6 px-0 ${activeTab === 'Hackathons' ? 'md:col-span-12' : 'md:col-span-9'}`}> {/* Example: Expand right column */}
                    <div>
                      
                        {activeTab === 'Overview' && (
                            <div >
                                <AboutSection description={owner.description} />
                                <div className={`${hackathonSectionContainerClasses} mt-4`}>
                                    <h3 className="text-sm font-semibold text-white mb-1.5 ">Hackathons</h3>
                                    {hasHackathons
                                        ? hackathons.map(h => <HackathonCard key={h.id} hackathon={h} />)
                                        : renderEmptyHackathonState()
                                    }
                                </div>
                            </div>
                        )}
                       
                       {activeTab === 'Hackathons' && (
                             <div>
                                <div className='rounded-xl py-2 flex flex-col items-start gap-2 self-stretch pl-0 pr-2'> 
                                    
                                    {hasHackathons
                                        ? <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 md:gap-6 w-full ">
                                             {hackathons.map(h => <HackathonCard key={h.id} hackathon={h} />)}
                                          </div>
                                        : renderEmptyHackathonState()
                                    }
                                </div>
                             </div>
                         )}
                    </div>
                 </div>
                 

            </div> 
        </div>
    );
}