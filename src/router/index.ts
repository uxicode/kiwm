import Vue from 'vue';
import store from '@/store';
import VueRouter, { RawLocation, Route, RouteConfig, RouteRecord } from 'vue-router';
import { UserRoutes } from '@/router/users';
import { EventsRoute } from '@/router/events';
import { BannerRoute } from '@/router/banners';
import { ContactRoute} from '@/router/contact';
import { AppSettingsRoute } from "@/router/appSettings";
import { AdminRoute } from '@/router/admin';
import { LoginRoute } from '@/router/login';
import { DashBoardRoute } from '@/router/dashboard';
import { CommunityRoute } from '@/router/community';
import { PointRoutes } from '@/router/point';
import { PushRoute } from '@/router/push';
import { EmailRoute } from '@/router/email';
import {MembershipRoute} from '@/router/membership';
import { DirectViewRoute } from "@/router/directView";
import {MainImageRoute} from "@/router/mainImage";
import { getAuthority, getToken, isUserLoggedIn } from '@/core/auth/utils';
import { PageAuthMutationType, UserMutationType } from '@/store/moduleType/AuthMutationTypes';
import { AlertMutationTypes } from '@/store/moduleType/AlertMutationTypes';


Vue.use( VueRouter );

/*  아래는 라우터구성의 기본 설명.
{
    path: RouteURLManage.ADMIN,   //라우터 주소
    name: 'adminList',  // 라우터 name --> vue 클래스 내에서 this.$router.push({name:'adminList'}) 이런식으로 접근할 때 사용. 권장하지 않음.
    meta: {
        layout: 'side',  // App.ts 에서 초기 화면 레이아웃 정할 때 쓰인다. 값이 'side' 일 경우 좌측 사이드 메뉴가 노출되게 된다.
        renderClass: 'login' //  FullType.ts 에 정의 되어 있고 class="wrapper" 에 addClass 할 클래스 이름
        auth: true,  // 인증 권한이 필요한 화면 -> 하단 beforeEach 전역 가드에서 설정하고 있다.
       authName: AuthorityType.EVENT_LIVE  // 각 화면의 권한 code name 을 지정하고 있다. 하단 beforeEach 에서 user me 데이터와 비교해 화면에 접근/불가를 판별하고 있다.
    },
    components: { default: ()=>import('@/views/admin/AdminList'), header: Header } // default : 컴포넌트 로드 , header: 상단 header 컴포넌트 지정.
}
*/
const routes: Array<RouteConfig>=[
    ...DashBoardRoute,
    ...LoginRoute,
    ...PointRoutes,
    ...BannerRoute,
    ...UserRoutes,
    ...EventsRoute,
    ...ContactRoute,
    ...AppSettingsRoute,
    ...AdminRoute,
    ...CommunityRoute,
    ...DirectViewRoute,
    ...PushRoute,
    ...EmailRoute,
    ...MembershipRoute,
    ...MainImageRoute,
    {
        path: '*',
        name: 'notfound',
        meta: {
            layout: 'full'
        },
        components: { default: ()=>import('@/views/notfound/NotFound')}
    }
];

const router=new VueRouter( {
    mode: 'history',
    base: process.env.VUE_APP_BASE_URL,
    routes,
} );

router.beforeEach( (to, from, next)=>{
    if (to.meta !== undefined) {
        const token=getToken();
        const metaInfo=to.meta;


        /* routes 설정의 각 라우트 객체를 라우트 레코드 라고 한다. 그 라우트와 일치하는 모든 라우트 레코드는  to($route 객체) 에 matched 라는 배열로 노출된다.
        if( to.matched.some( (recordItem:RouteRecord) => recordItem.meta.auth ) ){

        }
        */

        // console.log( 'meta.auth=', metaInfo.auth, ': token=', token );
        //로그인 상태 인지 파악
        if (metaInfo.auth) {
            //우선 token 값이 있는 사용자 인지 파악 ( store 의 isAuth )
            if (token) {
                // 로그인한 user 정보 및 token 가져오기 값이 false 일때
                if (!isUserLoggedIn()) {
                    //인증 필요하다는 팝업 필요
                    store.commit( `Alert/${ AlertMutationTypes.VALID_AUTH }`, false );
                    return next( '/login' );
                }else{
                    //화면 권한
                    if (metaInfo.authName) {
                        // console.log( to, from );
                        const findIdx=getAuthority().findIndex( (item: string)=> item === metaInfo.authName );
                        // console.log( findIdx, getAuthority()[findIdx] );
                        if (findIdx !== -1) {
                            return next();
                        }else{
                            // alert( '접근 권한이 없습니다.' );
                            store.commit( `Auth/${ PageAuthMutationType.IS_AUTH }`, false );
                            return next('/dashboard');
                        }
                    }else{
                        return next();
                    }
                }
            }else{
                console.log( '인증이 필요합니다' );
                return next( '/login' );
            }
        }
    }
    return next();
} );
export type AnyFunction<RETURN_T=any>=(...args: any[])=>RETURN_T;
export type ErrorHandlerFunction<RETURN_T=any>=(e: Error)=>RETURN_T;
const originalPush=VueRouter.prototype.push;
function augmentedPush(location: RawLocation): Promise<Route>;
function augmentedPush(location: RawLocation, onResolve?: AnyFunction, onReject?: ErrorHandlerFunction): void;
function augmentedPush(this: VueRouter, location: RawLocation, onResolve?: AnyFunction, onReject?: ErrorHandlerFunction): void | Promise<Route> {
    const boundOriginalPush=originalPush.bind( this );
    if (onResolve || onReject) {
        return boundOriginalPush( location, onResolve, onReject );
    } else {
        return boundOriginalPush( location )
            // @ts-ignore
            .catch( (err: any)=>{
                // console.log( err.from.path, err.to.path );
                if (err.from.path === err.to.path) {
                    return Promise.resolve( err.from );
                }
                if (VueRouter.isNavigationFailure( err, VueRouter.NavigationFailureType.redirected )) {
                    // whatever, we are fine if it's aborted due to navigation redirect
                    return Promise.resolve( err.from );
                }
                // rethrow error
                // console.log( { err } );
                /*if( err.name ==='NavigationDuplicated' ){
                    return '';
                }*/
                return Promise.reject( err );
            } );
    }
}
VueRouter.prototype.push=augmentedPush;

export default router;
