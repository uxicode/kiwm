import { RouteURLManage } from '@/router/url';
import Header from '@/components/header/header.vue';
import { AuthorityType } from '@/core/data/AuthorityType';

export const CommunityRoute = [
    // 타임라인 관리
    {
        path: RouteURLManage.COMMUNITY_TIMELINE,
        name: 'timeline',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.BOARD_TIMELINE
        },
        // beforeEnter: getIsAuth,
        components: { default: ()=>import('@/views/community/timeline/Timeline'), header: Header },
        children: [
            { path: '', name: '', component: () => import('@/views/community/timeline/clubNotice/ClubNotice')}, // 구단 소식
            { path: 'news', name: 'news', component: () => import('@/views/community/timeline/news/News')}, // 뉴스
            { path: 'youtube', name: 'youtube', component: () => import('@/views/community/timeline/youtube/Youtube')}, // 유튜브
            { path: 'photo', name: 'photo', component: () => import('@/views/community/timeline/photo/Photo')}, // 사진
        ],
    },
    // 팬 게시판 관리
    {
        path: RouteURLManage.COMMUNITY_FAN,
        name: 'fanPostList',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.BOARD_FAN
        },
        components: { default: ()=>import('@/views/community/fan/FanPostList'), header: Header }
    },
    // 팬 게시판 상세
    {
        path: `${RouteURLManage.COMMUNITY_FAN_DETAIL}/:id`,
        name: 'fanPostDetail',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.BOARD_FAN
        },
        components: { default: ()=>import('@/views/community/fan/FanPostDetail'), header: Header}
    },
    // 신고글 관리
    {
        path: RouteURLManage.COMMUNITY_REPORT,
        name: 'reportList',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.BOARD_REPORT
        },
        components: { default: ()=>import('@/views/community/report/ReportList'), header: Header}
    },
    // 신고글 상세
    {
        path: `${RouteURLManage.COMMUNITY_REPORT_DETAIL}/:id`,
        name: 'reportDetail',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.BOARD_REPORT
        },
        components: { default: ()=>import('@/views/community/report/ReportDetail'), header: Header}
    }

];
