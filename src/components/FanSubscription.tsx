/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { type RouterOutputs } from '@/trpc/shared';
import ProfileAvatar from './ProfileAvatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
    subscription: NonNullable<RouterOutputs['profile']['getFanProflie']['subscriptions']>[0];
};
export default function FanSubscription({ subscription }: Props) {
    const router = useRouter();

    async function manageSubscription() {
        const response = await fetch(`/api/checkout?creator_profile_id=${subscription.profile?.id}`); 
           
           const data = await response.json();
           
           router.push(data.url);
    }
    return (
        <section className='w-full space-y-5'>
            <Card className='mx-auto flex w-[450px] items-center p-2'>
                <ProfileAvatar className='mx-4' avatarUrl={subscription.profile?.avatar_url!} username={subscription.profile?.username} /> 
                <div className='flex-grow'>
                    <CardHeader className='p-2'>
                        <CardTitle>{subscription.profile?.name}</CardTitle>
                        <CardDescription>Access to premium content</CardDescription>
                    </CardHeader>
                </div>
                <CardFooter className='flex flex-none flex-col items-center space-y-2 p-2'>
                    <Button asChild className='w-full'>
                        <Link href={`/${subscription.profile?.username}`}>View</Link>
                    </Button>
                    <Button onClick={manageSubscription} variant={'outline'} className='w-full'>Manage</Button>
                </CardFooter>
            </Card>
        </section>
        
    )
}