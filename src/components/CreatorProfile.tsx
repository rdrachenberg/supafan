'use client';

import { RouterOutputs } from "@/trpc/shared"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import uploadFile from "@/lib/uploadFile";

type Props = {
    profile: NonNullable<RouterOutputs['profile']['getCreatorProfile']>
}
export default function CreatorProfile ({ profile }: Props) {
    const supabase = createClient()
    const router = useRouter();
    const updateProfile = api.profile.updateProfile.useMutation({
        onSuccess: () => {
            router.refresh();
        }
    });

    function onsubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const name = formData.get('name') as string;
        const username = String(formData.get('username')).replace(/\s+/g, '');
        const about = formData.get('about') as string;
        updateProfile.mutate({ name, username, about});
    }

    async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if(file) {
           const url = await uploadFile(supabase, file, 'avatars');
           updateProfile.mutate({ avatar_url: url});
        }
    }

    async function uploadCover(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if(file) {
           const url = await uploadFile(supabase, file, 'covers');
           updateProfile.mutate({ cover_url: url});
        }
    }


    return (
        <Card>
            <CardHeader className='flex flex-row items-center justify-between text-xl font-semibold'>
                <span>Customize your profile</span>
                <Button asChild>
                    <Link target='_blank' href={`${profile.username}`}>
                        <ExternalLinkIcon className='mr-1 size-4'/>
                        Preview
                    </Link>
                </Button>
            </CardHeader>
            <form onSubmit={onsubmit}>
                <CardContent>
                    <div className='flex flex-col gap-6'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700' htmlFor='name'>
                                Name of page
                            </label>
                            <Input id='name' name='name' placeholder='Your page name' defaultValue={profile.name} required />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700' htmlFor='username'>
                                Username
                            </label>
                            <Input id='username' name='username' placeholder='Your username' defaultValue={profile.username} required />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700' htmlFor='about'>
                                What are you creating
                            </label>
                            <Input id='about' name='about' placeholder='My page is for...' defaultValue={profile.about ?? ''} required />
                        </div>
                        <div>
                            <p className='block text-sm font-medium text-gray-700'>
                                Avatar image (400px x 400px)
                            </p>
                            <Avatar>
                                <AvatarImage src={profile.avatar_url ?? `https://avatar.vercel.sh/${profile.username}`} />
                            </Avatar>
                            <input type='file' id='avatar_url' className='hidden' accept='image/*' onChange={uploadAvatar}/>
                            <Button type='button' size='sm' variant={'secondary'} className='mt-2'>
                                <label htmlFor='avatar_url' className='cursor-pointer'>
                                    Upload Avatar
                                </label>
                            </Button>
                        </div>
                        <div>
                            <p className='block text-sm font-medium text-gray-700'>
                                Cover image (1600px x 400px)
                            </p>
                            {profile.cover_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={profile.cover_url} className='object-fit h-[200px] w-auto rounded-lg' alt='cover'/>
                            ) : (
                                <div className='h-[200px] w-full rounded-lg bg-gray-100' />
                            )}
                            <input type='file' id='cover_url' className='hidden' accept='image/*' onChange={uploadCover}/>
                            <Button type='button' size='sm' variant={'secondary'} className='mt-2'>
                                <label htmlFor='cover_url' className='cursor-pointer'>
                                    Upload Cover
                                </label>
                            </Button>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button disabled={updateProfile.isLoading}>
                        {updateProfile.isSuccess ? 'Saved' : 'Save'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}