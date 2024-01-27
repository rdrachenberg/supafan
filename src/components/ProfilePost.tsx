'use client';

import { type RouterOutputs } from "@/trpc/shared";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { HeartIcon, ImageIcon, LockIcon, MessageCircleIcon, TextIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProfilePostComments from "./ProfilePostComments";


type Props = {
    post: NonNullable<
        RouterOutputs['profile']['getProfileByUsername']['profile']
        >['post'][0];
    isSubscribed: boolean;
};
export default function ProfilePost({post, isSubscribed}: Props) {
    const router = useRouter();
    const [showComments, setComments] = useState(false);

    const toggleLike = api.like.toggleLike.useMutation({
        onSuccess: () => {
            router.refresh()
        },
    })

    return (
        <Card>
            {post.image_url && isSubscribed &&  (
                <img className='w-full rounded-md bg-slate-300' src={post.image_url} />
            )}
            {post.video_url && isSubscribed && (
                <video className='w-full rounded-md bg-slate-300' controls src={post.video_url} />
            )}
            <CardHeader className='flex flex-row items-center pb-4 text-xl font-semibold'>
                <span className='mr-2 mt-1.5'>
                    {post.type === 'text' && <TextIcon className='size-5'/>}
                    {post.type === 'image' && <ImageIcon className='size-5'/>}
                    {post.type === 'video' && <VideoIcon className='size-5'/>}
                </span>
                <span>
                    {post.title}
                </span>
            </CardHeader>
            <CardContent className='pb-0'>
                <CardDescription>{post.text}</CardDescription>
            </CardContent>
            <CardFooter>
                <div className="mt-4 w-full flex flex-col items-start space-y-4">
                    {!isSubscribed && (
                        <Link href='/signup'>
                            <Button variant={'secondary'}>
                                <LockIcon className='mr-1 size-4'/>
                                Join to unlock
                            </Button>
                        </Link>
                    )}
                    {isSubscribed && (
                        <div className='flex space-x-4'>
                        <Button 
                            variant='secondary' 
                            className='flex items-center space-x-2'
                            onClick={() => {
                                toggleLike.mutate({
                                    postId: post.id
                                })
                            }}
                        >
                            <HeartIcon className='size-5 text-gray-500' />
                            <span className='text-gray-700'>{post.like.length}</span>
                        </Button>
                        <Button 
                            variant={'secondary'} 
                            className='flex items-center space-x-2'
                            onClick={() => setComments(!showComments)}
                        >
                            <MessageCircleIcon className='size-5 text-gray-500' />
                            <span className='text-gray-700'>{post.comment.length}</span>
                        </Button>
                    </div>
                    )}
                    {showComments && (
                        <ProfilePostComments post={post}/>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}