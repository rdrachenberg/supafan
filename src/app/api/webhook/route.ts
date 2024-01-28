/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createClient } from "@/utils/supabase/server";
import { headers, cookies } from "next/headers";
import {  NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature')!;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body, 
            signature, 
            process.env.STRIPE_WEBHOOK_SECRET!,
        );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        
        return NextResponse.json(`Webhook error: ${error.message}`, {status: 400,});
    }

    const session = event.data.object as Stripe.Checkout.Session;
    console.log(event.type);

    if(event.type === 'checkout.session.completed') {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
        );
        console.log(subscription)

        if(
            !session?.metadata?.fanProfileId || 
            !session?.metadata?.creatorProfileId
        ) {
            return NextResponse.json('Metadata is required', { status: 400 });
        }

        await supabase.from('subscription').insert({
            fan_profile_id: Number(session?.metadata?.fanProfileId),
            creator_profile_id: Number(session?.metadata?.creatorProfileId),
            stripe_customer_id: subscription.customer as string,
            amount: session.amount_total as number,
            active: true,
        });
    } else if(event.type === 'customer.subscription.deleted') {
        const subscription = event.data.object as Stripe.Subscription;

        await supabase
            .from('subscription')
            .update({
                active: subscription.status === 'active',
            })
            .eq('stripe_customer_id', subscription.customer as string)
    }

    return NextResponse.json(null, { status: 200 });
}