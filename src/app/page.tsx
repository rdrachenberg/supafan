/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import FanSubscription from "@/components/FanSubscription";
import SignOut from "@/components/SignOut";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { api } from '@/trpc/server';
import { redirect } from "next/navigation"
export default async function Home() {
  const {profile, subscriptions} = await api.profile.getFanProflie.query();
  
  console.log(profile)
  
  if(!profile) redirect('/signup');
  if(!profile?.type) redirect('/welcome');
  if(profile?.type === 'creator') redirect('/creator/profile');

  return (
    <div>
      <div className='mx-auto max-w-4xl px-4 py-8'>
        <header className='flex flex-col items-center'>
          <Avatar className='mb-4 mt-2 size-20'>
            <AvatarImage src={profile.avatar_url ?? `https://avatar.vercel.sh/${profile.username}`}/>
          </Avatar>
          <h1 className='pb-5 text-4xl font-bold'>{profile.name}</h1>
        </header>
        <section className='pb-20 pt-10'>
          <h2 className='mb-6 text-center text-2xl font-semibold'>Your active subscriptions</h2>
          <div>
            {subscriptions?.length === 0 && (
              <p className='text-center'>No active subscriptions</p>
            )}
            {subscriptions?.map(subscription => (
              <FanSubscription key={subscription.id} subscription={subscription}/>
            ))}
          </div>
        </section>
      </div>
      <SignOut/>
    </div>
  )
}