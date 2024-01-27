import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const creatorProfileId = searchParams.get('creator_profile_id') as string;

        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        const referer = headers().get('referer');

        const { data: { session } } = await supabase.auth.getSession();
        const {data: profile } = await supabase
            .from('profile')
            .select('*')
            .eq('user_id', session?.user.id ?? '')
            .single();

        if(!profile || !creatorProfileId) {
            return NextResponse.json('Unauthorized', {status: 401})
        }

        const {data: subscription } = await supabase
            .from('subscription')
            .select('*')
            .eq('fan_profile_id', profile.id)
            .eq('creator_profile_id', creatorProfileId)
            .single();

        if(subscription) {
            const billingPortal = await stripe.billingPortal.sessions.create({
                customer: subscription.stripe_customer_id,
            });

            return NextResponse.json({ url: billingPortal.url });
        }
        // console.log('profile.id: ' + profile.id);
        // console.log('creatorProfileId: ' + creatorProfileId);

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
              {
                price: "price_1OcvB8CAd2vd3BsyliseIMB0",
                quantity: 1,
              },
            ],
            metadata: {
              fanProfileId: profile.id,
              creatorProfileId,
            },
            customer_email: profile.email,
            billing_address_collection: "auto",
            mode: "subscription",
            success_url: `${referer}?session_id={CHECKOUT_SESSION_ID}`,
          });
        return NextResponse.json({ url: checkoutSession.url});

    } catch (error) {
        console.log(error);

        return NextResponse.json('Error', { status: 500 });
    }
}