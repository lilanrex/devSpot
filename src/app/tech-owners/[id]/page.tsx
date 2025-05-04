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
import { Tabs } from '@/components/ui/tabs';
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


    return (
        <div>
            <ProfileHeader
                owner={owner}
                isFollowing={currentIsFollowing}
                isPending={isFollowPending}
                onFollowToggle={handleFollowToggle}
            />

            <div className="my-6">
                <Tabs
                    tabs={['Overview', 'Hackathons']}
                    activeTab={activeTab}
                    onTabChange={(tab) => setActiveTab(tab as ProfileTab)}
                />
            </div>

          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              
                <div
                 
                  className={`md:col-span-1 space-y-4 rounded-xl p-6 ${
                    activeTab === 'Overview' ? 'block' : 'hidden'
                  }`}
                
                 >
                   <div className='bg-[#1B1B22] px-6 py-6 rounded-2xl'>
                     <ProfileInfo owner={owner} />
                   </div>
                   <div className='bg-[#1B1B22] px-6 py-6 rounded-2xl'>
                     <TechnologyTags tags={owner.technologies} />
                   </div>
                </div>
                
                <div className={`md:col-span-2 rounded-xl p-6 ${activeTab === 'Hackathons' ? 'md:col-span-3' : 'md:col-span-2'}`}> {/* Example: Expand right column */}
                    <div>
                      
                        {activeTab === 'Overview' && (
                            <div className="space-y-20">
                                <AboutSection description={owner.description} />
                                <div className='bg-[#1B1B22] rounded-2xl px-6 py-6 '>
                                    <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Hackathons</h3>
                                    {hasHackathons
                                        ? hackathons.map(h => <HackathonCard key={h.id} hackathon={h} />)
                                        : renderEmptyHackathonState()
                                    }
                                </div>
                            </div>
                        )}
                       
                        {activeTab === 'Hackathons' && (
                             <div>
                                {hasHackathons
                                    ? hackathons.map(h => <HackathonCard key={h.id} hackathon={h} />)
                                    : renderEmptyHackathonState()
                                }
                             </div>
                         )}
                    </div>
                 </div>
                 

            </div> 
        </div>
    );
}