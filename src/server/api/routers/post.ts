import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from 'zod';

export const postRouter = createTRPCRouter({
    createPost: protectedProcedure.input(z.object({
        title: z.string(),
        type: z.string(),
        text: z.string().optional(),
        image_url: z.string().optional(),
        video_url: z.string().optional(),
    })).mutation(async ({ ctx, input}) => {
        const {data: profile} = await ctx.db.from('profile').select('id').eq('user_id', ctx.userId).single();

        if(profile) {
            await ctx.db.from('post').insert({
                title: input.title,
                type: input.type,
                text: input.text,
                image_url: input.image_url,
                video_url: input.video_url,
                profile_id: profile.id,
                user_id: ctx.userId
            })

            return true;
        }
    }),

    getPosts: protectedProcedure.query(async ({ ctx }) => {
        const {data: posts} = await ctx.db.from('post').select('*, profile(*), comment(*), like(*)').order('created_at', {ascending: false});

        return posts;
    })
})