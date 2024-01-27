'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSignIcon, InboxIcon, SparkleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import  { useRouter } from 'next/navigation';


export default function WelcomeOne() {
    const updateProfile = api.profile.updateProfile.useMutation({
        onSuccess() {
            router.push('/welcome?step=2')
        },
    });
    const router = useRouter();

    return (
        <Card className='w-[400px]'>
            <CardHeader>
                <CardTitle>Welcome to SupaFan</CardTitle>
                <CardDescription>There is already more than 250k createors on SupaFan and there is about to be one more! </CardDescription>
            </CardHeader>
            <CardContent className='border-t-2 pt-3'>
                <ul className='my-4 sapce-y-3 text-sm '>
                    <li className='flex items-center space-x-4 p-2'>
                        <span className='w-6 text-gray-400'>
                            <SparkleIcon />
                        </span>
                        <span>Start your own SupaFan in just a few steps</span>
                    </li>
                    <li className='flex items-center space-x-4 p-2'>
                        <span className='w-6 text-gray-400'>
                            <InboxIcon />
                        </span>
                        <span>Invite fans and connect with them for free. It&apos;s super simple to start. Signup now!</span>
                    </li>
                    <li className='flex items-center space-x-4 p-2'>
                        <span className='w-6 text-gray-400'>
                            <DollarSignIcon />
                        </span>
                        <span>When your&apos;re ready to earn money, it&apos;s easy to offer paid memberships or sell digital products </span>
                    </li>
                </ul>
            </CardContent>
            <CardFooter className='flex flex-col space-y-4'>
                <Button 
                    className='w-full' 
                    disabled={updateProfile.isLoading}
                    onClick={() => {
                        updateProfile.mutate({ type: 'creator'})
                    }}>Continue
                </Button>
                <Button 
                    variant='ghost' 
                    className='w-full'
                    disabled={updateProfile.isLoading}
                    onClick={() => {
                        updateProfile.mutate({ type: 'fan'})
                    }}>Not a content creator? Join as a fan
                </Button>
            </CardFooter>
        </Card>
    )
}