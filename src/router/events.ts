import { LiveRoute } from '@/router/events/live';
import { GeneralRoute } from '@/router/events/general';
import { GiftRoute } from '@/router/events/gift';

export const EventsRoute=[
    ...LiveRoute,
    ...GeneralRoute,
    ...GiftRoute
];
