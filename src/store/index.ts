import Vue from 'vue';
import Vuex from 'vuex';
import { TokenActionType } from '@/store/moduleType/AuthActionTypes';
import { getToken } from '@/core/auth/utils';
import CommunityModule from '@/store/CommunityModule';
import DirectViewModule from '@/store/DirectViewModule';
import EventManageModule from '@/store/EventManageModule';
import MembershipModule from '@/store/MembershipModule';
import NotiModule from '@/store/NotiModule';
import AuthModule from '@/store/AuthModule';
import UserManageModule from '@/store/UserManageModule';
import SideBarModule from '@/store/SideBarModule';
import AdminManageModule from '@/store/AdminManageModule';
import ContactModule from "@/store/ContactModule";
import AppSettingMgModule from "@/store/AppSettingManageModule";
import BannerModule from '@/store/BannerModule';
import AlertModule from '@/store/AlertModule';

Vue.use( Vuex );

const store=new Vuex.Store( {
    state: {},
    modules: {
        Auth: AuthModule,
        UserMg: UserManageModule,
        SideMenu: SideBarModule,
        AdminMg: AdminManageModule,
        ContactMg: ContactModule,
        EventMg: EventManageModule,
        AppSettingMg: AppSettingMgModule,
        CommunityMg: CommunityModule,
        MembershipMg: MembershipModule,
        NotiMg: NotiModule,
        BannerMg:BannerModule,
        DirectViewMg: DirectViewModule,
        Alert:AlertModule
    }
} );

const { token, refreshToken }=localStorage;
//새로고침시 토큰이 있는지 체크
// 토큰이 있다면 uer 인증을 통해 정보롤
if (getToken()) {
    // console.log( '여기는 init()/  token 존재하는 경우 ', token);
    store.dispatch( `Auth/${ TokenActionType.SIGN_IN_BY_TOKEN }`, { token, refreshToken } )
        .catch( (error: any)=>{
            console.log( 'SIGN_IN_BY_TOKEN=', error );
        } );
}
/*const { token, refreshToken }=localStorage;
if (token) {
    console.log( '여기는 init()/  token 존재하는 경우 ', token);
    store.commit( `Auth/${ TokenMutationType.SIGN_IN_BY_TOKEN }`, { token, refreshToken } );
}*/
export default store;
