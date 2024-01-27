import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CreatorPost from '@/components/CreatorPost';
import { api } from '@/trpc/server';
export default async function CreatorPostsPage() {
    const posts = await api.post.getPosts.query();

    return (
        <Card>
            <CardHeader className='text-xl font-semibold'>
                All published post
            </CardHeader>
            <CardContent>
                <div className='space-y-6'>
                    {posts?.map((post) => <CreatorPost key={post.id} post={post}/> )}
                </div>
            </CardContent>
        </Card>
    )
}