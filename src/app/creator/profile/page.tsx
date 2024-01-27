import CreatorProfile from "@/components/CreatorProfile";
import { api } from "@/trpc/server"
import { notFound } from "next/navigation";

export default async function CreatorProfilePage() {
    const profile = await api.profile.getCreatorProfile.query();
    
    if(!profile) {
        notFound();
    }
    
    return (
        <CreatorProfile profile={profile} />
    )
}