import SubscriberMetrics from '@/components/SubscriberMetrics';
import SubscriberTable from '@/components/SubscriberTable';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { api } from '@/trpc/server';
export default async function CreatorAnalyticsPage() {
    const subscriptions = await api.subscribe.getSubscriptions.query();
    // console.log(subscriptions)
    const active = subscriptions?.reduce((acc, subscription) => {
        if(subscription.active) {
            return acc + 1
        }
        return acc;
    }, 0);
    
    const canceled = subscriptions?.reduce((acc, subscription) => {
        if(!subscription.active) {
            return acc + 1
        }
        return acc;
    }, 0);
    
    const mrr = subscriptions?.reduce((acc, subscription) => {
        if(subscription.active) {
            return acc + Number(subscription.amount)
        }
        return acc;
    }, 0);

    return (
        <Card>
            <CardHeader className='text-xl font-semibold'>
                View your stats
            </CardHeader>
            <CardContent>
                <SubscriberMetrics mrr={mrr} active={active} canceled={canceled}/>
                <SubscriberTable subscriptions={subscriptions}/>
            </CardContent>
        </Card>
    )
}