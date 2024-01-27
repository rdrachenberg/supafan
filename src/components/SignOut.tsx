'use client'
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button";
import  { LogOutIcon } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function SignOut() {
    const supabase = createClient();
    const router = useRouter();

    async function signOut() {
        await supabase.auth.signOut();
        router.refresh();
        router.push('/login')
    }

    return (
        <Button variant={'ghost'} size='sm' onClick={signOut}>
            <LogOutIcon className='mr-2 size-5'/>
            Sign out
        </Button>
    )
    
}