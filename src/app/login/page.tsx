import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

type Props = {
    searchParams: {
        message?: string
    }
}
export default function LoginPage({searchParams}: Props) {
    async function logIn(formData: FormData) {
        'use server';
        
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        

        const { error } = await supabase.auth.signInWithPassword({
            email, 
            password, 
        });

       

        if(error) {
            const message = error.message ?? 'somthing went wrong man';
            return redirect(`/login?message=${message}`)
        }

        return redirect(`/`)
    }
    return (
        <div className='flex min-h-screen flex-col items-center justify-center px-4 py-8'>
            <div className='w-full max-w-md space-y-8'>
                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Log In</h2>
                <form action={logIn} className='mt-8 space-y-6'>
                    <Input required type='email' name='email' id='email' placeholder='Email'/>
                    <Input required type='password' name='password' id='password' placeholder='Password'/>
                    <Button className='w-full text-white'>Continue</Button>
                </form>
                <Link href='/signup' className='mt-2 block text-center text-blue-600'>Click here to sign up</Link>
                {searchParams?.message && (
                    <p className='mt-4 bg-foreground/10 p-4 text-center text-foreground'>
                        {searchParams.message}
                    </p>
                )}
            </div>
        </div>
    )
}