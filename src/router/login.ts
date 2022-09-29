import { RouteURLManage } from '@/router/url';
import { NavigationGuardNext, Route } from 'vue-router';
import { isUserLoggedIn } from '@/core/auth/utils';

export const LoginRoute=[
    {
        path: RouteURLManage.LOGIN,
        name: 'login',
        meta: { layout: 'full', renderClass: 'login' },
        beforeEnter: (to:Route, from:Route, next:NavigationGuardNext)=>{
            //로그인한 user 정보 및 token 가져오기 - 값이 있을 경우 main  으로 보냄.
            if (isUserLoggedIn()) {
                return next( '/');
            }
            return next();
        },
        component: ()=>import('@/views/login/LoginForm'), //로그인 랜딩 페이지
    },
];
