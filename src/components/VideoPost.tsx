'use client'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';
import { useState } from 'react';
import { VideoIcon } from 'lucide-react';
import uploadFile from '@/lib/uploadFile';
import { createClient } from '@/utils/supabase/client';
export default function VideoPost() {
    const supabase = createClient()
    const [url, setUrl] = useState('')
    const router = useRouter();
    const createPost = api.post.createPost.useMutation({
        onSuccess: () => {
            router.push('/creator/posts')
            router.refresh()
        }
    })

    async function uploadVideo(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if(file) {
            const url = await uploadFile(supabase, file, 'videos');
            setUrl(url);
        }
    }

    function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get('title') as string;
        const text = formData.get('text') as string;
        createPost.mutate({ title, text, type: 'video', video_url: url});
    }

    return (
        <div>
            {url ? (
                <video src={url} controls className='pb-4' />
             ) : (
                <div className='mb-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-gray-500'>
                    <VideoIcon className='mb-4 size-12'/>
                    <p className='mb-2 '>Drag and drop an video file to upload</p>
                    <input 
                        type='file'
                        id='fileInput'
                        className='hidden'
                        accept='video/*'
                        onChange={uploadVideo}
                    />
                    <Button variant='outline'>
                        <label className='cursor-pointer' htmlFor='fileInput'>
                            Select video file
                        </label>
                    </Button>
                </div>
            )}
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
        </div>
    )
}