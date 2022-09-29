import { RouteURLManage } from '@/router/url';
import Header from '@/components/header/header.vue';
import { AuthorityType } from '@/core/data/AuthorityType';

export const NoticeRoute=[
    {
        path: RouteURLManage.APP_SETTINGS_NOTICE,
        name: 'noticeList',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.BOARD_NOTICE
        },
        // beforeEnter: getIsAuth,
        components: { default: ()=>import('@/views/appsetting/notice/NoticeList'), header: Header }, // 공지사항 관리 리스트
    },
    {
        path: RouteURLManage.ADD_APP_SETTINGS_NOTICE,
        name: 'addNotice',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.BOARD_NOTICE
        },
        // beforeEnter: getIsAuth,
        components: { default: ()=>import('@/views/appsetting/notice/AddNotice'), header: Header }, // 공지사항 관리 등록
    },
    {
        path: `${ RouteURLManage.APP_SETTINGS_NOTICE_DETAIL }/:id`,
        name: 'noticeDetail',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.BOARD_NOTICE
        },
        // beforeEnter: getIsAuth,
        components: { default: ()=>import('@/views/appsetting/notice/NoticeDetail'), header: Header }, // 공지사항 관리 상세
    }
];
