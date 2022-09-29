import Header from '@/components/header/header.vue';
import { RouteURLManage } from '@/router/url';
import { AuthorityType } from '@/core/data/AuthorityType';
import { NavigationGuardNext, Route } from 'vue-router';

export const BannerRoute=[
    {
        path: RouteURLManage.BANNER_LIST,
        name: 'bannerList',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.BANNER
        },
        components: { default: ()=>import('@/views/banner/BannerPage'), header: Header }
    },
    {
        path: `${RouteURLManage.BANNER_DETAIL}/:id`,
        name: 'bannerDetail',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.BANNER
        },
        // beforeEnter: getIsAuth,
        components: { default: ()=>import('@/views/banner/BannerDetail'), header: Header }
    },
    {
        path: RouteURLManage.ADD_BANNER,
        name: 'addBanner',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.BANNER
        },
        // beforeEnter: getIsAuth,
        components: { default: ()=>import('@/views/banner/AddBanner'), header: Header }
    }
];
