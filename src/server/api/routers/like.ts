import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const likeRouter = createTRPCRouter({
    toggleLike: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
        const {data: like} = await ctx.db
            .from('like')
            .select('*')
            .eq('post_id', input.postId)
            .eq('user_id', ctx.userId)
            .single();

        if(like) {
            await ctx.db
                .from('like')
                .delete()
                .eq('id', like.id);
            return true;
        } else {
            await ctx.db
                .from('like')
                .insert({ post_id: input.postId, user_id: ctx.userId});
            return true;
        }
    }),
});