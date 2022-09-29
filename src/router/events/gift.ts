import { RouteURLManage } from '@/router/url';
import Header from '@/components/header/header.vue';
import { AuthorityType } from '@/core/data/AuthorityType';

export const GiftRoute=[
    {
        path: RouteURLManage.EVENT_GIFT,
        name: 'eventItem',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.EVENT_ITEM
        },
        // beforeEnter: getIsAuth,
        components: { default: ()=>import('@/views/event/gift/GiftList'), header: Header }, // 이벤트 경품 리스트
    },
    {
        path: RouteURLManage.ADD_EVENT_GIFT,
        name: 'addEventItem',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.EVENT_ITEM
        },
        // beforeEnter: getIsAuth,
        components: { default: ()=>import('@/views/event/gift/AddGift'), header: Header }, // 이벤트 경품 등록
    },
    {
        path: `${ RouteURLManage.EVENT_GIFT_DETAIL }/:id`,
        name: 'eventItemDetail',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.EVENT_ITEM
        },
        // beforeEnter: getIsAuth,
        components: { default: ()=>import('@/views/event/gift/GiftDetail'), header: Header }, // 이벤트 경품 상세
    },

];
