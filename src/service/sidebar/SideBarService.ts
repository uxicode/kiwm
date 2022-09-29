import { IMenuSet } from '@/model/sidebar/ISideMenu';
import { RouteURLManage } from '@/router/url';

export default class SideBarService{
  private sideMenus: IMenuSet[]=[
    {
      tit: '',
      menus: [{ path: '/dashboard', txt: '대시보드', icon:'icon-home', key:'01', chk: false}]
    },
    {
      tit: '회원 관리',
      menus: [{ path:RouteURLManage.USERS, txt: '회원정보 관리', icon:'icon-user', key:'02', chk: false}]
    },
    {
      tit: '멤버쉽 관리',
      menus: [
        { path:RouteURLManage.MEMBERSHIP_LIST, txt: '멤버쉽 이력 관리', icon:'icon-users' , key:'03-1', chk: false},
        { path: RouteURLManage.POINT, txt: '등급/포인트 관리', icon:'icon-award', key:'03-2', chk: false },
        // { path: RouteURLManage.MEMBERSHIP_BENEFITS, txt: '멤버쉽 혜택 관리', icon:'icon-star', key:'03-3', chk: false },
      ]
    },
    {
      tit: '홈 화면 관리',
      menus: [
          { path:RouteURLManage.MAIN_IMAGE, txt: '메인 이미지 관리', icon:'icon-smartphone', key:'04-1',chk: false },
          { path:RouteURLManage.BANNER_LIST, txt: '메인배너 관리', icon:'icon-copy', key:'04-2',chk: false }
          ]
    },
    {
      tit: '이벤트 관리',
      menus: [
        { path: RouteURLManage.EVENT_LIVE, txt: '라이브 이벤트' , icon:'icon-radio', key:'05',chk: false},
        { path: RouteURLManage.EVENT_GENERAL, txt: '일반 이벤트' , icon:'icon-general-event', key:'06', chk: false},
        { path: RouteURLManage.EVENT_GIFT, txt: '경품 관리' , icon:'icon-gift', key:'07', chk: false},
      ]
    },
    {
      tit: '1:1 문의',
      menus: [{ path: RouteURLManage.CONTACT_LIST, txt: '1:1 문의' , icon:'icon-headphones', key:'08', chk: false},]
    },
    {
      tit: '직관',
      menus: [
        { path: RouteURLManage.DIRECT_VIEW_VICTORY, txt: '직관 승요 관리' , icon:'icon-star', key:'08-1', chk: false},
        { path: RouteURLManage.DIRECT_VIEW_CHECKIN, txt: '체크인 내역 관리' , icon:'icon-check-circle', key:'08-2', chk: false}
      ]
    },
    {
      tit: '커뮤니티 관리',
      menus: [
        { path: RouteURLManage.COMMUNITY_TIMELINE, txt: '타임라인 관리' , icon:'icon-clock', key:'09', chk: false},
        { path: RouteURLManage.COMMUNITY_FAN, txt: '팬게시판 관리' , icon:'icon-clipboard', key:'10',chk: false},
        { path: RouteURLManage.COMMUNITY_REPORT, txt: '신고글 관리', icon:'icon-alert-triangle', key:'11', chk: false},
      ]
    },
    {
      tit: '알림 관리',
      menus: [
        { path: RouteURLManage.PUSH, txt: 'Push 관리' , icon:'icon-bell', key:'12', chk: false},
        // { path: '', txt: 'SMS 관리' , icon:'icon-smartphone', key:'14',chk: false},
        { path: RouteURLManage.EMAIL, txt: 'Email 관리' , icon:'icon-mail', key:'13', chk: false},
      ]
    },
    {
      tit: '앱 설정',
      menus: [
        { path: RouteURLManage.APP_SETTINGS_FAQ, txt: '자주묻는질문 관리' , icon:'icon-help-circle', key:'15', chk: false },
        { path: RouteURLManage.APP_SETTINGS_VERSION, txt: '버전 관리' , icon:'icon-layers', key:'18',chk: false},
        { path: RouteURLManage.APP_SETTINGS_TERMS, txt: '약관 관리' , icon:'icon-file-text', key:'19',chk: false},
        { path: RouteURLManage.APP_SETTINGS_NOTICE, txt: '공지사항 관리' , icon:'icon-notice', key:'20',chk: false},
      ]
    },
    {
      tit: '관리자 관리',
      menus: [
          { path: RouteURLManage.ADMIN, txt: '관리자 관리' , icon:'icon-settings', key:'21', chk: false},
          { path: RouteURLManage.CROWD, txt: '혼잡도 관리' , icon:'icon-video', key:'22', chk: false},
          ]
    }
  ];

  get menuItems() {
    return this.sideMenus;
  }

  set menuItems(items:IMenuSet[]) {
    this.sideMenus=items;
  }

}
