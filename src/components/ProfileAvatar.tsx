import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { cn } from '@/lib/utils'


type Props = {
    avatarUrl?: string,
    username?: string,
    className?: string,
}
export default function ProfileAvatar({avatarUrl, username, className}: Props) {

    return (
        <Avatar className={cn('mb-4 mt-2 size-20', className)}>
            <AvatarImage src={avatarUrl ?? `https://avatar.vercel.sh/${username}`}/>
        </Avatar>
    )
}