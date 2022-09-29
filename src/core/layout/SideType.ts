import { Vue, Component } from 'vue-property-decorator';
import SideBar from '@/components/sideBar/sideBar.vue';
import NoticePopup from '@/components/common/modal/noticePopup.vue';
import { IMenu, IMenuSet } from '@/model/sidebar/ISideMenu';
import SideBarService from '@/service/sidebar/SideBarService';
import WithRender from './SideType.html';
import { namespace } from 'vuex-class';
import { PageAuthMutationType } from '@/store/moduleType/AuthMutationTypes';

const Auth=namespace( 'Auth' );

@WithRender
@Component( {
    components: {
        SideBar,
        NoticePopup
    },
} )
export default class SideType extends Vue {

    @Auth.Mutation
    private [PageAuthMutationType.IS_AUTH]!: (pageAuth: boolean)=>void;

    @Auth.Getter
    private isPageAuth!: boolean;

    //메뉴 데이터
    private sideBarInfo: SideBarService=new SideBarService();

    private isNoticePopup: boolean=false;
    private currentPopupStatus: string='';
    private PAGE_AUTH_ERROR: string = 'historyBack';

    private modalMsgData:Array<{[key: string]: string}>= [
        {status:this.PAGE_AUTH_ERROR, desc: '접근 권한이 없습니다.'}
    ];

    /**
     * 공통 모달에 알맞는 상세 텍스트 전달.
     */
    get modalMsg(): string{
        const findItem=this.modalMsgData.filter((item:{[key:string]:string}) => item.status === this.currentPopupStatus);
        return (findItem.length>0)? findItem[0].desc : '';
    }


    get menuItems(): IMenuSet[] {
        return this.sideBarInfo.menuItems;
    }

    set menuItems(items) {
        this.sideBarInfo.menuItems=items;
    }

    public onSideMenuClick(mIdx: number, sIdx: number, lsIdx?: number) {
        // console.log( 'side click : mIdx=', mIdx, ':: sIdx=', sIdx, ':lsIdx=', lsIdx);

        const menuItem=this.sideBarInfo.menuItems[mIdx].menus[sIdx];
        let linkInfo: string='';
        if (lsIdx === undefined) {
            linkInfo=menuItem.path;
        } else {
            if (menuItem.children !== undefined) {
                linkInfo=menuItem.children[lsIdx].path;
            }
        }
        // console.log( this.$route.path, linkInfo );
        //현재 라우트 주소와 신규로 클릭 이동되는 라우트 주소값이 같을 경우 여기서 종료.( router/index.ts  에서 NavigationDuplicated  에 대한 처리가 없다면 아래 코드 활성화 필요 )
        // if( this.$route.path === linkInfo){ return; }
        this.$router.push( { path: linkInfo } )
            .then( ()=>{
                // console.log( linkInfo, ' 로 이동' );
                if (!this.isPageAuth) {
                    this.openNoticePopup( this.PAGE_AUTH_ERROR );
                }
            } );

    }
    public onNoticePopupClick(result: boolean) {
        this.isNoticePopup=false;
        if (result) {
            if (this.currentPopupStatus === this.PAGE_AUTH_ERROR) {
                this[PageAuthMutationType.IS_AUTH]( true );
            }
        }
    }

    private openNoticePopup( status: string='') {
        this.isNoticePopup=true;
        this.currentPopupStatus=status;
    }
}
