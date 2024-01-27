import ProfileHeader from "@/components/ProfileHeader";
import ProfilePost from "@/components/ProfilePost";
import ProfileTiers from "@/components/ProfileTiers";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

type Props = {
    params: {
        username: string;
    };
};

export default async function ProfilePage({ params: { username } }: Props) {
    const {profile, isSubscribed} = await api.profile.getProfileByUsername.query({ username });

    if(!profile) {
        notFound();
    }

    return (
        <div>
            <div className='h-[25vw] w-full bg-gray-200 bg-cover bg-center bg-no-repeat p-4' 
            style={{backgroundImage: `url(${profile.cover_url})`}}
            />
            <div className='mx-auto max-w-4xl px-4 py-8'>
                <ProfileHeader profile={profile} />
                {!isSubscribed && <ProfileTiers profile={profile}/>}
                <section>
                    <h2 className='mb-6 text-center text-2xl font-semibold'>
                        Recent post by {profile.name}
                    </h2>
                    <div className='space-y-6'>
                        {profile.post.map((post) => (
                            <ProfilePost key={post.id} post={post} isSubscribed={isSubscribed} />
                        ))}        
                    </div>
                </section>
            </div>
        </div>
    )

}