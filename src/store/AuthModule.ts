import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { PageAuthMutationType, TokenMutationType, UserMutationType } from '@/store/moduleType/AuthMutationTypes';
import { TokenActionType, UserActionType } from '@/store/moduleType/AuthActionTypes';
import { AuthService } from '@/restApi';
import { IAdminUserMe } from '@/model/admin/AdminUserModel';
import { AdminService } from '@/restApi/service/AdminService';
import AuthConfig from '@/core/auth/config';
import axios from 'axios';
import { LoadingMutationType } from '@/store/moduleType/LoadingMutationType';
import { isUser } from '@/core/auth/utils';

@Module( {
    namespaced: true,
} )
export default class AuthModule extends VuexModule {

    public token!: string | null; //멤버 변수는 state 로 이용된다.
    public me: IAdminUserMe | null=null;
    public count: number=0;
    public signupName: string='';
    private refreshToken: string | null=null;
    private loggedIn: boolean=false;
    private errorType:number=-1;
    private loading: boolean=false;
    private pageAuth: boolean=true;

    get isPageAuth(): boolean{
        return this.pageAuth;
    }

    get isLoading(): boolean{
        return this.loading;
    }

    get errorLog(): number{
        return this.errorType;
    }

    get isLoggedIn(): boolean{
        return this.loggedIn;
    }

    get isAuth(): boolean {
        return !!this.token;
    }

    get isRefreshAuth(): boolean {
        return !!this.refreshToken;
    }

    get isMe(): IAdminUserMe | null {
        return this.me;
    }

    @Mutation
    public [PageAuthMutationType.IS_AUTH]( pageAuth: boolean): void {
        this.pageAuth=pageAuth;
    }

    @Mutation
    public [LoadingMutationType.IS_LOADING]( isLoading: boolean): void {
        this.loading=isLoading;
    }

    @Mutation
    public [UserMutationType.LOG_IN](loggedIn: boolean): void {
        this.loggedIn=loggedIn;
    }

    @Mutation
    public [UserMutationType.ERROR_LOG]( log: number ): void {
        this.errorType=log;
    }

    @Mutation
    public [TokenMutationType.GET_TOKEN](token: string | null): void {
        // console.log('token=', this.token);
        if (token !== null) {
            this.token=token;
            // AuthService.setAuthToken( this.token );
            // localStorage.setItem('token', this.token);
            localStorage.setItem( AuthConfig.TOKEN_KEY, this.token );
        }
    }


    @Mutation
    public [TokenMutationType.GET_REFRESH_TOKEN](refreshToken: string | null): void {
        if (refreshToken !== null) {
            this.refreshToken=refreshToken;
            localStorage.setItem( AuthConfig.REFRESH_TOKEN_KEY, this.refreshToken );
        }
    }

    @Mutation
    public [UserMutationType.INFO](me: IAdminUserMe): void {
        this.me=me;
        localStorage.setItem( AuthConfig.ME_KEY, JSON.stringify( this.me ) );
    }

    @Mutation
    public [UserMutationType.INFO_UPDATE](): void {
        this.me=JSON.parse( isUser() as string );
        // console.log( this.me );
    }


    @Mutation
    public [UserMutationType.LOGOUT](): void {
        localStorage.removeItem( AuthConfig.TOKEN_KEY );
        localStorage.removeItem( AuthConfig.ME_KEY );
        localStorage.removeItem( AuthConfig.REFRESH_TOKEN_KEY );
        this.token=null;
        this.me=null;
        delete axios.defaults.headers.common.Authorization;
    }


    //새로고침시 localstorage 에 있는 token 값 존재 확인하여 데이터를
    @Action( { rawError: true } )
    public [TokenActionType.SIGN_IN_BY_TOKEN](payload: { token: string, refreshToken: string }) {

        const { token, refreshToken }=payload;
        // console.log( 'store=', token );
        this.context.commit( TokenMutationType.GET_TOKEN, token );
        this.context.commit( TokenMutationType.GET_REFRESH_TOKEN, refreshToken );

       /* return AdminService.getMe()
          .then( ( data: any )=>{
            console.log('UserMe=', data );
            this.context.commit(UserMutationType.INFO, data );
            return Promise.resolve('signin status');
          }).catch((error: any)=>{
                console.log( error );
            });*/
    }


    /**
     * 로그인~
     * @param payload
     */
    @Action( { rawError: true } )
    public [UserActionType.LOGIN](payload: { id: string, password: string }): Promise<any> {
        const { id, password }=payload;
        //LOGIN_ACTION
        return AuthService.login( id, password )
            .then( (data: any)=>{
                // console.log( 'login 전송 완료', data );

                /*{
                grantType: 'Bearer',
                accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0Z…uiCx_GFCWmrL3v0kZ7kZbImP_nu8BBjAm1WQhvHhC0aIZx-bA',
                accessTokenExpiresIn: 60,
                refreshToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2M…4VVpu4E8aNKTGu2wVmc9-Z5AKF7h_BmefCgZwQeFfCnDHg3og',
                refreshTokenExpiresIn: 172800
                }*/
                this.context.commit( TokenMutationType.GET_TOKEN, data.accessToken );
                this.context.commit( TokenMutationType.GET_REFRESH_TOKEN, data.refreshToken );

                return AdminService.getMe()
                    .then( (data: any)=>{
                        // console.log( 'UserMe=', data );
                        this.context.commit( UserMutationType.INFO, data );
                        return Promise.resolve( 'signin status' );
                    } );
            } ).catch( (error: any)=>{
                return Promise.reject( error );
            } );
    }


}
