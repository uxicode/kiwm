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
        {status:this.PASSWORD_CHANGE_COMPLETE, desc:'비밀 번호 변경이 완료 되었습니다.\n'+'변경된 비밀번호 확인을 위해 재로그인이 필요합니다.'},
        {status:this.PASSWORD_CHANGE_FAIL, desc:'비밀 번호 변경이 실패 하였습니다.'},
        {status:this.OLD_PASSWORD_FORM_ERROR, desc:'기존 비밀번호를 잘못 입력하셨습니다.'},
        {status:this.ERROR_SERVER, desc:'서버와의 연결에 문제가 발생하였습니다.\n'+'새로고침 후 재접속 부탁드립니다.' },
        {status:this.ERROR_NOT_FOUND, desc:'요청하신 페이지를 찾을 수 없습니다.' },
        {status:this.INVALID_AUTH, desc:'인증이 필요합니다.' },
    ];

    /**
     * 공통 모달에 알맞는 상세 텍스트 전달.
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
                case this.PASSWORD_CHANGE_COMPLETE:  //패스워드 변경 완료후
                    this.onPwdPopupClose();
                    this[UserMutationType.LOGOUT]();
                    this.$router.push({path:'/login'})
                        .catch((error:any)=>{
                            console.log( error );
                            alert( '로그인이동 에러');
                        });
                    break;
                case this.OLD_PASSWORD_FORM_ERROR:
                    (this.$refs.pwdChangePopup as any).clear();
                    break;
                case this.ERROR_SERVER:  // 500 에러 났을 때
                    this[AlertMutationTypes.SERVER_ERROR]( false );
                    break;
                case this.ERROR_NOT_FOUND: // 404 not found 에러 났을 때
                    this[AlertMutationTypes.NOT_FOUND]( false );
                    break;
                case this.INVALID_AUTH: //로그인/ 인증이 필요한 경우
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
            //기존 비밀 번호 틀린경우
            if (status === 400 && code === 700) {
                this.openNoticePopup( this.OLD_PASSWORD_FORM_ERROR );
            }else{
                this.openNoticePopup( this.PASSWORD_CHANGE_FAIL );
            }
        } );
    }

}
