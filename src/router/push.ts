import Header from '@/components/header/header.vue';
import { AuthorityType } from '@/core/data/AuthorityType';
import {RouteURLManage} from '@/router/url';

export const PushRoute = [
    {
        path: `${RouteURLManage.PUSH}`,
        name: 'pushList',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.NOTI_PUSH
        },
        components: {default: () => import('@/views/push/PushList'), header: Header}
    },
    {
        path: `${RouteURLManage.ADD_PUSH}`,
        name: 'addPush',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.NOTI_PUSH
        },
        components: {default: () => import('@/views/push/AddPush'), header: Header}
    },
    {
        path: `${RouteURLManage.MODIFY_PUSH}/:id`,
        name: 'pushDetail',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.NOTI_PUSH
        },
        components: {default: () => import('@/views/push/ModifyPush'), header: Header}
    }
];
