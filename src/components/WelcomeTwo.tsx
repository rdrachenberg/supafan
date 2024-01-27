/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/unbound-method */
'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export default function WelcomeTwo() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const updateProfile = api.profile.updateProfile.useMutation();

    return (
        <Card className='w-[400px]'>
            <CardHeader>
                <CardTitle>Let's Name Your SupaFan Account</CardTitle>
                <CardDescription>There is already more than 250k createors on SupaFan and there is about to be one more! </CardDescription>
            </CardHeader>
            <CardContent>
                <form className='flex flex-col gap-4'>
                    <div className='flex flex-col space-y-1.5'>
                        <Label htmlFor="name">Page name</Label>
                        <Input id='name' placeholder='Your page name' onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className='flex flex-col space-y-1.5'>
                        <Label htmlFor="username">Username</Label>
                        <Input id='username' placeholder='Your username' onChange={e => setUsername(e.target.value)} required />
                    </div>

                </form>
            </CardContent>
            <CardFooter className='flex flex-col space-y-4'>
                <Button 
                    className='w-full' 
                    onClick={() => {
                    updateProfile.mutate({name, username})
                    router.push('/creator/profile')
                    }}>Next
                </Button>
                <Button 
                    variant='ghost' 
                    className='w-full'
                    onClick={router.back}
                    >Back
                </Button>
            </CardFooter>
        </Card>
    )
}