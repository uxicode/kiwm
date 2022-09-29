import { RouteURLManage } from '@/router/url';
import Header from '@/components/header/header.vue';
import { AuthorityType } from '@/core/data/AuthorityType';

export const GeneralRoute=[
    {
        path: RouteURLManage.EVENT_GENERAL,
        name: 'eventGeneral',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.EVENT_GENERAL
        },
        components: { default: ()=>import('@/views/event/general/GeneralEventList'), header: Header }, // 일반 이벤트 리스트
    },
    {
        path: RouteURLManage.ADD_EVENT_GENERAL,
        name: 'addEventGeneral',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.EVENT_GENERAL
        },
        components: { default: ()=>import('@/views/event/general/AddGeneralEvent'), header: Header }, // 일반 이벤트 추가
    },
    {
        path: `${RouteURLManage.EVENT_GENERAL_DETAIL}/:id`,
        name: 'EventGeneralDetail',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.EVENT_GENERAL
        },
        components: { default: ()=>import('@/views/event/general/GeneralEventDetail'), header: Header }, // 일반 이벤트 상세
    },
    {
        path: `${RouteURLManage.EVENT_GENERAL_DETAIL}/:id/manual`,
        name: 'EventGeneralDetailManual',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.EVENT_GENERAL
        },
        components: { default: ()=>import('@/views/event/general/GeneralEventDrawManual'), header: Header }, // 일반 이벤트 수동추첨
    }
];
