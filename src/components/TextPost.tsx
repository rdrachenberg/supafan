'use client'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';
export default function TextPost() {
    const router = useRouter();
    const createPost = api.post.createPost.useMutation({
        onSuccess: () => {
            router.push('/creator/posts')
            router.refresh()
        }
    })

    function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get('title') as string;
        const text = formData.get('text') as string;
        createPost.mutate({ title, text, type: 'text'});
    }

    return (
        <form onSubmit={onSubmit}>
            <Input id='title' name='title' className='mb-4 p-4 text-xl' placeholder='Add a title' required />
            <Textarea id='text' name='text' className='h-60 p-4 text-base' placeholder='Tell a story' />
            <div className='mt-4 flex items--center justify-between'>
                <span />
                <Button disabled={createPost.isLoading}>
                    {createPost.isLoading ? 'Publishing...' : 'Publish'}
                    </Button>
            </div>
        </form>
    )
}