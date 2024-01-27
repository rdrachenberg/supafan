/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const subscriptionRouter = createTRPCRouter({
    getSubscriptions: protectedProcedure.query(async ({ ctx }) => {
        const {data: profile, error} = await ctx.db
            .from('profile')
            .select('id')
            .eq('user_id', ctx.userId)
            .single();

        const {data: subscriptions} = await ctx.db
            .from('subscription')
            .select('*, profile!subscription_fan_profile_id_fkey(*)')
            .eq('creator_profile_id', profile?.id!)
            .order('created_at', {ascending: false});
       
        if(subscriptions) console.log(subscriptions);

        if(error) {
            console.log(error);
        }

        return subscriptions ?? [];
    }),
});