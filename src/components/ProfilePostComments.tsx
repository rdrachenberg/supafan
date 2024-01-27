import { type RouterOutputs } from "@/trpc/shared";
import { Input } from '@/components/ui/input';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

dayjs.extend(relativeTime);

type Props = {
    post: NonNullable<
    RouterOutputs['profile']['getProfileByUsername']['profile']
    >['post'][0];
}
export default function ProfilePostComments({post}: Props) {
    const [comment, setComment] = useState('');
    const router = useRouter();
    const createComment = api.comment.createComment.useMutation({
        onSuccess: () => {
            setComment('');
            router.refresh();
        }
    });
    return (
        <section className='w-full'>
            <div className='flex w-full items-center space-x-2'>
                <Input className='flex-1' placeholder='Add a comment' onChange={(event) => setComment(event.target.value)} value={comment}/>
                <Button onClick={() => {
                    createComment.mutate({text: comment, postId: post.id})
                }}>Submit</Button>
            </div>
            <div className='space-y-5 pt-5'>
                {post.comment.map((comment) => (
                    <ProfilePostComment key={comment.id} comment={comment}/>
                ))}
            </div>
        </section>
    )
}

function ProfilePostComment({ comment }: { comment: NonNullable<
    RouterOutputs['profile']['getProfileByUsername']['profile']
    >['post'][0]['comment'][0];
}) {
    const postedAt = dayjs().to(comment.created_at)
    return (
        <div className='flex items-start gap-4 text-sm'>
            <Avatar className='siz-10 border'>
                <AvatarImage src={`https://avatar.vercel.sh/${comment.profile?.username}`}/>
            </Avatar>
            <div className='grid gap-1.5'>
                <div className='flex items-center gap-2'>
                    <div className='font-semibold'>
                        {comment.profile?.username}
                    </div>
                    <div className='text-xs text-gray-500'>
                        {postedAt}
                    </div>
                </div>
                <div>{comment.text}</div>
            </div>
        </div>
    )
}