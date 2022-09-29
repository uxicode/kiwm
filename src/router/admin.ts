import Header from '@/components/header/header.vue';
import { RouteURLManage } from '@/router/url';
import { AuthorityType } from '@/core/data/AuthorityType';

export const AdminRoute=[
    {
        path: RouteURLManage.ADMIN,
        name: 'adminList',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.MANAGER
        },
        // beforeEnter: getIsAuth,
        components: { default: ()=>import('@/views/admin/AdminList'), header: Header } // 어드민 리스트
    },
    {
        path: RouteURLManage.ADD_ADMIN,
        name: 'addAdminList',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.MANAGER
        },
        // beforeEnter: getIsAuth,
        components: { default: ()=>import('@/views/admin/AddAdmin'), header: Header } // 어드민 추가
    },
    {
        path: `${RouteURLManage.ADMIN_DETAIL}/:id`,
        name: 'aminDetail',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.MANAGER
        },
        // beforeEnter: getIsAuth,
        components: { default: ()=>import('@/views/admin/AdminDetail'), header: Header } // 어드민 상세
    },
    {
        path: RouteURLManage.CROWD,
        name: 'crowd',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.CROWD  // 혼잡도
        },
        components: { default: ()=>import('@/views/crowd/CrowdList'), header: Header }//혼잡도 관리 리스트
    },
    {
        path: RouteURLManage.ADD_CROWD,
        name: 'addCrowd',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.CROWD  // 혼잡도
        },
        components: { default: ()=>import('@/views/crowd/AddCrowd'), header: Header }//혼잡도 추가
    },
    {
        path: `${RouteURLManage.MODIFY_CROWD}/:id`,
        name: 'crowdDetail',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.CROWD  // 혼잡도 상세
        },
        components: { default: ()=>import('@/views/crowd/CrowdDetail'), header: Header }//혼잡도 상세 및 수정
    }
];
