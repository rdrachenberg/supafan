'use client';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { type RouterOutputs } from "@/trpc/shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type Props = {
    profile: NonNullable<RouterOutputs['profile']['getProfileByUsername']['profile']>;
}
export default function ProfileTiers({ profile }: Props) {
    const supabase = createClient();
    const router = useRouter();

    async function handleJoin() {
        const { data: { session } } = await supabase.auth.getSession();
        
        if(!session) {
            router.push('/signup');
        } else {
           const response = await fetch(`/api/checkout?creator_profile_id=${profile.id}`); 
           const data = await response.json();
           router.push(data.url);
        }
    }
    return (
        <section className='pb-20 pt-10'>
            <h2 className='mb-6 text-center text-2xl font-semibold'>
                Choose your membership
            </h2>
            <Card className='mx-auto w-full max-w-[500px]'>
                <CardHeader>
                    <CardTitle>Subscribe</CardTitle>
                    <CardDescription>$10/month</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <Button className='w-full' onClick={handleJoin}>Join</Button>
                    <p>Get complete access to all text, media, and video post for just $5 per month</p>
                </CardContent>
            </Card>
        </section>
    )
}