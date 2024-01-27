import CreatorNavbar from "@/components/CreatorNavbar";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function CreatorLayout({children}: {children: React.ReactNode}) {
    const profile = await api.profile.getCreatorProfile.query();

    if(!profile){
        redirect('/login');
    }
    if(profile.type === 'fan') {
        redirect('/');
    }
    return (
        <div className='mx-auto flex max-w-4xl flex-col justify-center p-6'> 
            <CreatorNavbar />
            { children }
        </div>
    )
}