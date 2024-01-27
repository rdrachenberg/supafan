import { RouterOutputs } from "@/trpc/shared";
import ProfileAvatar from "./ProfileAvatar";

type Props = {
    profile: NonNullable<RouterOutputs['profile']['getProfileByUsername']['profile']>;
}
export default function ProfileHeader({profile }: Props){
    return (
        <header className='-mt-20 flex flex-col items-center'>
            <ProfileAvatar avatarUrl={profile?.avatar_url!} username={profile?.username} />
            <h1 className="text-4xl font-bold">{profile.name}</h1>
            <div className='mb-8 mt-4 space-y-4 text-center'>
                <p className='text-lg'>{profile.about}</p>
                <p className='text-sm text-gray-500'>{profile.post.length} posts</p>
            </div>
        </header>
    )
}