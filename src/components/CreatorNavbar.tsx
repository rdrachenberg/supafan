'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChartIcon, BookPlus, EditIcon, UserIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import SignOut from './SignOut';

export default function CreatorNavbar() {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <div className='flex items-center justify-between space-x-6 py-3'>
            <Tabs
                onValueChange={(value) => {
                    console.log(value);
                    router.push(value);
                }}
                defaultValue={pathname}
            >
                <TabsList>
                    <TabsTrigger value='/creator/profile'>
                        <UserIcon className='mr-1 size-4' />
                        Profile
                    </TabsTrigger><TabsTrigger value='/creator/post'>
                        <EditIcon className='mr-1 size-4' />
                        Create
                    </TabsTrigger><TabsTrigger value='/creator/posts'>
                        <BookPlus className='mr-1 size-4' />
                        Post
                    </TabsTrigger><TabsTrigger value='/creator/analytics'>
                        <BarChartIcon className='mr-1 size-4' />
                        Analytics
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            <SignOut />
        </div>
    )
}