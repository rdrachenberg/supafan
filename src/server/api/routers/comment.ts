import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const commentRouter = createTRPCRouter({
    createComment: protectedProcedure.input(z.object({postId: z.number(), text: z.string() })).mutation(async ({ ctx, input}) => {
        const {data: profile} = await ctx.db.from('profile').select('*').eq('user_id', ctx.userId).single();

        if(!profile) {
            return false;
        }

        await ctx.db.from('comment').insert([
            { profile_id: profile.id, post_id: input.postId, text: input.text }, 
        ]);
        return true;
    })
})