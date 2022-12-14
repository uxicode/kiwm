import {Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { RouteMeta } from 'vue-router';
import { AdminManageMutationType } from '@/store/moduleType/AdminManageMutationType';
import { AdminService } from '@/restApi/service/AdminService';
import { LoadingMutationType } from '@/store/moduleType/LoadingMutationType';
import { UserMutationType } from '@/store/moduleType/AuthMutationTypes';
import { AlertMutationTypes } from '@/store/moduleType/AlertMutationTypes';
import FullType from '@/core/layout/FullType';
import SideType from '@/core/layout/SideType';
import PwdChangePopup from '@/components/header/pwdChangePopup.vue';
import NoticePopup from '@/components/common/modal/noticePopup.vue';
import WithRender from './App.html';
import { Mutation } from 'vuex-module-decorators';

const AdminMg=namespace( 'AdminMg' );
const Auth=namespace( 'Auth' );
const Alert=namespace( 'Alert' );

@WithRender
@Component( {
    components: {
        FullType,
        SideType,
        PwdChangePopup,
        NoticePopup,
    }
} )
export default class App extends Vue {

    @Alert.Mutation
    public [AlertMutationTypes.SERVER_ERROR]!:( status: boolean)=>void;

    @Alert.Mutation
    public [AlertMutationTypes.NOT_FOUND]!:( status: boolean)=>void;

    @Alert.Mutation
    public [AlertMutationTypes.VALID_AUTH]!:( status: boolean)=>void;

    @Auth.Mutation
    private [LoadingMutationType.IS_LOADING]!: (isLoading: boolean)=>void;

    @Auth.Mutation
    private [UserMutationType.LOGOUT]!: ()=>void;

    @AdminMg.Mutation
    private [AdminManageMutationType.PASSWORD_CHANGE]!: ( chk: boolean)=> void;


    @Alert.Getter
    private isServerError!: boolean;

    @Alert.Getter
    private isNotFound!: boolean;

    @Alert.Getter
    private isValidAuth!: boolean;

    @Auth.Getter
    private  isLoading!: boolean;

    @Auth.Getter
    private isLoggedIn!: boolean;

    @AdminMg.Getter
    private isPwdChk!: boolean;

    private isErrorPopup: boolean=false;
    private isNoticePopup: boolean=false;
    private currentPopupStatus: string='';
    private PASSWORD_CHANGE_COMPLETE: string = 'passwordChangeComplete';
    private PASSWORD_CHANGE_FAIL: string = 'passwordChangeFail';
    private OLD_PASSWORD_FORM_ERROR: string = 'oldPasswordFormError';
    private ERROR_SERVER: string = 'errorServer';
    private ERROR_NOT_FOUND: string = 'errorNotFound';
    private INVALID_AUTH: string = 'invalidAuth';
    private modalMsgData:Array<{[key: string]: string}>= [
        {status:this.PASSWORD_CHANGE_COMPLETE, desc:'?????? ?????? ????????? ?????? ???????????????.\n'+'????????? ???????????? ????????? ?????? ??????????????? ???????????????.'},
        {status:this.PASSWORD_CHANGE_FAIL, desc:'?????? ?????? ????????? ?????? ???????????????.'},
        {status:this.OLD_PASSWORD_FORM_ERROR, desc:'?????? ??????????????? ?????? ?????????????????????.'},
        {status:this.ERROR_SERVER, desc:'???????????? ????????? ????????? ?????????????????????.\n'+'???????????? ??? ????????? ??????????????????.' },
        {status:this.ERROR_NOT_FOUND, desc:'???????????? ???????????? ?????? ??? ????????????.' },
        {status:this.INVALID_AUTH, desc:'????????? ???????????????.' },
    ];

    /**
     * ?????? ????????? ????????? ?????? ????????? ??????.
     */
    get modalMsg(): string{
        const findItem=this.modalMsgData.filter((item:{[key:string]:string}) => item.status === this.currentPopupStatus);
        return (findItem.length>0)? findItem[0].desc : '';
    }

    get isLoadingModel() {
        return this.isLoading;
    }

    get layout() {
        const meta=this.$route.meta as RouteMeta;
        if (meta !== undefined) {
            if (meta.layout === 'full') {
                return 'full-type';
            }
        }
        return 'side-type';
    }

    get isPwdPopupChk(): boolean {
        // console.log( 'isPwdChk=', this.isPwdChk );
        return this.isPwdChk;
    }

    get serverErrorModel() {
        return this.isServerError;
    }

    get notFoundModel() {
        return this.isNotFound;
    }

    get isValidAuthModel() {
        return this.isValidAuth;
    }

    public updated() {

        if (this.serverErrorModel) {
            this.openNoticePopup( this.ERROR_SERVER );
        }

        if (this.notFoundModel) {
            this.openNoticePopup( this.ERROR_NOT_FOUND );
        }

        if (!this.isValidAuthModel) {
            this.openNoticePopup( this.INVALID_AUTH );
        }

        // console.log( 'isServerError=', this.serverErrorModel );
        // console.log( 'isNotFound=',  this.notFoundModel );
        // console.log( 'isValidAuthModel=', this.isValidAuthModel );

    }

    public onPwdPopupClose() {
        this[AdminManageMutationType.PASSWORD_CHANGE]( false );
    }

    private openNoticePopup( status: string='') {
        this.isNoticePopup=true;
        this.currentPopupStatus=status;
    }

    public onNoticePopupClick(result: boolean) {
        this.isNoticePopup=false;
        if (result) {
            switch ( this.currentPopupStatus ) {
                case this.PASSWORD_CHANGE_COMPLETE:  //???????????? ?????? ?????????
                    this.onPwdPopupClose();
                    this[UserMutationType.LOGOUT]();
                    this.$router.push({path:'/login'})
                        .catch((error:any)=>{
                            console.log( error );
                            alert( '??????????????? ??????');
                        });
                    break;
                case this.OLD_PASSWORD_FORM_ERROR:
                    (this.$refs.pwdChangePopup as any).clear();
                    break;
                case this.ERROR_SERVER:  // 500 ?????? ?????? ???
                    this[AlertMutationTypes.SERVER_ERROR]( false );
                    break;
                case this.ERROR_NOT_FOUND: // 404 not found ?????? ?????? ???
                    this[AlertMutationTypes.NOT_FOUND]( false );
                    break;
                case this.INVALID_AUTH: //?????????/ ????????? ????????? ??????
                    this[AlertMutationTypes.VALID_AUTH]( true );
                    break;
            }
        }
    }

    public onPwdChangeClick( result: boolean, pwd:{ oldPassword:string, newPassword: string} ) {
        if (result) {
            if (pwd !== null) {
                this.changePasswordFetch( pwd );
            }
        }else{
            //this.onPwdPopupClose();
        }
    }

    public changePasswordFetch( pwd:{ oldPassword:string, newPassword: string}) {
        AdminService.setPassword( pwd )
            .then( (data)=>{
                this.openNoticePopup( this.PASSWORD_CHANGE_COMPLETE );
            } ).catch( (error: any)=>{
            console.log( error );

            const {status, code}=error.data;
            //?????? ?????? ?????? ????????????
            if (status === 400 && code === 700) {
                this.openNoticePopup( this.OLD_PASSWORD_FORM_ERROR );
            }else{
                this.openNoticePopup( this.PASSWORD_CHANGE_FAIL );
            }
        } );
    }

}
