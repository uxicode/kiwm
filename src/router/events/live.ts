import { RouteURLManage } from '@/router/url';
import Header from '@/components/header/header.vue';
import { AuthorityType } from '@/core/data/AuthorityType';

export const LiveRoute=[
    {
        path: RouteURLManage.EVENT_LIVE,
        name: 'liveEventList',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.EVENT_LIVE
        },
        components: { default: ()=>import('@/views/event/live/LiveEventList'), header: Header }, // 라이브 이벤트 리스트
    },
    {
        path: RouteURLManage.ADD_EVENT_LIVE,
        name: 'addLiveEvent',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.EVENT_LIVE
        },
        components: { default: ()=>import('@/views/event/live/AddLiveEvent'), header: Header }, // 라이브 이벤트 등록
    },
    {
        path: `${RouteURLManage.EVENT_LIVE_DETAIL}/:id`,
        name: 'liveEventDetail',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.EVENT_LIVE
        },
        components: { default: ()=>import('@/views/event/live/LiveEventDetail'), header: Header }, // 라이브 이벤트 상세
    },
    {
        path: `${RouteURLManage.EVENT_LIVE_DETAIL}/:id/manual`,
        name: 'liveEventDrawManual',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.EVENT_LIVE
        },
        components: { default: ()=>import('@/views/event/live/LiveEventDrawManual'), header: Header}, // 라이브 이벤트 수동 추첨
    }
];
