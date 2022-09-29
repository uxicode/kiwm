export enum BaseRouteURL{
    EVENT='/event',
    MEMBERSHIP='/membership',
    CONTACT='/contact',
    COMMUNITY='/community',
    APP_SETTINGS='/app-setting',
    ADMIN='/manage-admin',
    BANNER='/banner',
    DIRECT_VIEW='/direct-view',
    MAIN_IMAGE='/main/images',
    CROWD='/crowd',
    POINT='/point',
    EMAIL='/email'

}


export class RouteURLManage{
    public static LOGIN: string='/login';  //로그인
    public static USERS: string='/users'; //회원정보 관리
    public static DASHBOARD: string='/dashboard'; //회원정보 관리
    public static MEMBERSHIP_LIST: string=`${BaseRouteURL.MEMBERSHIP}`; //멤버쉽 이력 관리
    public static MEMBERSHIP_DETAIL: string=`${BaseRouteURL.MEMBERSHIP}/detail`; //멤버쉽 이력 상세
    // public static MEMBERSHIP_BENEFITS: string=`${BaseRouteURL.MEMBERSHIP}/benefits`; //멤버쉽 혜택 관리
    public static MAIN_IMAGE: string=`${BaseRouteURL.MAIN_IMAGE}`; // 메인 이미지 관리
    public static ADD_BANNER: string=`${BaseRouteURL.BANNER}/add`; // 메인배너 관리
    public static BANNER_LIST: string=`${BaseRouteURL.BANNER}`; // 메인배너 관리
    public static BANNER_DETAIL: string=`${BaseRouteURL.BANNER}/detail`; // 메인배너 관리
    public static EVENT_LIVE: string=`${BaseRouteURL.EVENT}/live`; //라이브 이벤트
    public static ADD_EVENT_LIVE: string=`${BaseRouteURL.EVENT}/live/add`; // 라이브 이벤트 등록
    public static EVENT_LIVE_DETAIL: string=`${BaseRouteURL.EVENT}/live/detail`; // 라이브 이벤트 상세
    public static EVENT_GENERAL: string=`${BaseRouteURL.EVENT}/general`;  // 일반 이벤트
    public static ADD_EVENT_GENERAL: string=`${BaseRouteURL.EVENT}/general/add`;  // 일반 이벤트 추가
    public static EVENT_GENERAL_DETAIL: string=`${BaseRouteURL.EVENT}/general/detail`;  // 일반 이벤트 추가
    public static EVENT_GIFT: string=`${BaseRouteURL.EVENT}/gift`; //경품 관리
    public static EVENT_GIFT_DETAIL: string=`${BaseRouteURL.EVENT}/gift/detail`; // 경품 상세
    public static ADD_EVENT_GIFT: string=`${BaseRouteURL.EVENT}/gift/add`; // 경품 등록
    public static CONTACT_LIST: string=`${BaseRouteURL.CONTACT}`; // 1:1 문의
    public static CONTACT_DETAIL: string=`${BaseRouteURL.CONTACT}/detail`; // 1:1 문의 상세
    public static DIRECT_VIEW_VICTORY: string=`${BaseRouteURL.DIRECT_VIEW}/victory`; // 직관 승요 관리
    public static DIRECT_VIEW_CHECKIN: string=`${BaseRouteURL.DIRECT_VIEW}/checkin`; // 체크인 내역 관리
    public static COMMUNITY_TIMELINE: string=`${BaseRouteURL.COMMUNITY}/timeline`; // 타임라인 관리
    public static COMMUNITY_FAN: string=`${BaseRouteURL.COMMUNITY}/fan`; //팬게시판 관리
    public static COMMUNITY_FAN_DETAIL: string=`${BaseRouteURL.COMMUNITY}/fan/detail`; //팬게시판 상세
    public static COMMUNITY_REPORT: string=`${BaseRouteURL.COMMUNITY}/report`; // 신고글 관리
    public static COMMUNITY_REPORT_DETAIL: string=`${BaseRouteURL.COMMUNITY}/report/detail`; // 신고글 상세
    public static PUSH: string='/push';  //push 관리
    public static ADD_PUSH: string='/push/add';  //push 등록
    public static MODIFY_PUSH: string='/push/modify';  //push 수정
    // public static EMAIL: string='/email'; // 이메일 관리
    public static EMAIL: string=`${BaseRouteURL.EMAIL}`; // 이메일 발송내역
    // public static EMAIL_SEND_LIST: string=`${BaseRouteURL.EMAIL}`; // 이메일 발송내역
    public static EMAIL_TEMPLATE: string=`${BaseRouteURL.EMAIL}/template`; // 이메일 템플릿 관리
    public static APP_SETTINGS_FAQ: string=`${BaseRouteURL.APP_SETTINGS}/faq`; // 자주묻는 질문 관리
    public static ADD_APP_SETTINGS_FAQ: string=`${BaseRouteURL.APP_SETTINGS}/faq/add`; // 자주묻는 질문 관리 등록
    public static APP_SETTINGS_FAQ_DETAIL: string=`${BaseRouteURL.APP_SETTINGS}/faq/detail`; // 자주묻는 질문 관리 상세
    public static APP_SETTINGS_NOTICE: string=`${BaseRouteURL.APP_SETTINGS}/notice`; // 공지사항
    public static ADD_APP_SETTINGS_NOTICE: string=`${BaseRouteURL.APP_SETTINGS}/notice/add`; // 공지사항 등록
    public static APP_SETTINGS_NOTICE_DETAIL: string=`${BaseRouteURL.APP_SETTINGS}/notice/detail`; // 공지사항 상세
    public static APP_SETTINGS_VERSION: string=`${BaseRouteURL.APP_SETTINGS}/version`;// 버전 관리
    public static APP_SETTINGS_VERSION_MODIFY: string=`${BaseRouteURL.APP_SETTINGS}/version/modify`;// 버전 수정하기
    public static TERMS: string='/terms'; // 약관 관리
    public static APP_SETTINGS_TERMS: string=`${BaseRouteURL.APP_SETTINGS}/terms`; //약관
    public static ADD_APP_SETTINGS_TERMS: string=`${BaseRouteURL.APP_SETTINGS}/terms/add`; //약관 등록
    public static APP_SETTINGS_TERMS_DETAIL: string=`${BaseRouteURL.APP_SETTINGS}/terms/detail`; //약관 상세
    public static NOTICE: string='/notice'; //공지사항 관리
    public static ADMIN: string=`${BaseRouteURL.ADMIN}`; // 관리자 리스트
    public static ADD_ADMIN: string=`${BaseRouteURL.ADMIN}/add`;  // 관리자 추가
    public static ADMIN_DETAIL: string=`${BaseRouteURL.ADMIN}/detail`;  // 관리자 상세
    public static CROWD: string=`${BaseRouteURL.CROWD}`;  // 혼잡도 리스트
    public static ADD_CROWD: string=`${BaseRouteURL.CROWD}/add`;  // 혼잡도 등록
    public static MODIFY_CROWD: string=`${BaseRouteURL.CROWD}/modify`;  // 혼잡도 수정
    public static DELETE_CROWD: string=`${BaseRouteURL.CROWD}/delete`;  // 혼잡도 삭제
    public static DOWNLOAD_CROWD: string=`${BaseRouteURL.CROWD}/excel/down`;  // 혼잡도 파일 다운로드
    public static POINT: string=`${BaseRouteURL.POINT}`;  // 등급/포인트 리스트
    public static POINT_GRADE_MODIFY: string=`${BaseRouteURL.POINT}/grade/modify`;  // 등급/포인트 리스트 수정
    public static POINT_GUIDE_MODIFY: string=`${BaseRouteURL.POINT}/guide/modify`;  // 포인트 가이드 수정
    public static POINT_POLICY_MODIFY: string=`${BaseRouteURL.POINT}/policy/modify`;  // 포인트 가이드 수정

}
/*

export enum RouteURLManage{
  LOGIN='/login',  //로그인
  USERS='/users', //회원정보 관리
  MEMBERSHIP='/membership/list', //멤버쉽 이력 관리
  MEMBERSHIP_POINT='/membership/point', //등급/포인트 관리
  MEMBERSHIP_BENEFITS='/membership-benefits', //멤버쉽 혜택 관리
  BANNER='/banner', // 메인배너 관리
  EVENT_LIVE='/event/live', //라이브 이벤트
  ADD_EVENT_LIVE='/event/live/add', // 라이브 이벤트 등록
  EVENT_LIVE_DETAIL='/event/live/detail', // 라이브 이벤트 상세
  EVENT_LIVE_RAFFLE='/event/live/raffle', // 라이브 이벤트 수동 추첨
  EVENT_GENERAL='/event/general',  // 일반 이벤트
  EVENT_ITEM='/event/gift', //경품 관리
  ADD_EVENT_ITEM='/event/gift/add', // 경품 등록
  EVENT_GIFT_DETAIL='/event/gift/detail', // 경품 상세
  ADD_EVENT_GENERAL='/event/general/add',  // 일반 이벤트
  contact='/contact', // 1:1 문의
  contact_DETAIL='/contact/detail/:id', // 1:1 문의 상세
  contact2='/contact2', // 직관 승요 관리
  contact3='/contact3', // 체크인 내역 관리
  COMMUNITY_TIMELINE='/community/timeline', // 타임라인 관리
  COMMUNITY_FAN='/community/fan', //팬게시판 관리
  COMMUNITY_REPORT='/community/report', // 신고글 관리
  PUSH='/push',  //push 관리
  EMAIL='/email', // email 관리
  APP_SETTINGS_FAQ='/app-setting/faq', // 자주묻는 질문 관리
  ADD_APP_SETTINGS_FAQ='/app-setting/faq/add', // 자주묻는 질문 관리 등록
  APP_SETTINGS_FAQ_DETAIL='/app-setting/faq/detail', // 자주묻는 질문 관리 상세
  APP_SETTINGS_NOTICE='/app-setting/notice', // 공지사항
  ADD_APP_SETTINGS_NOTICE='/app-setting/notice/add', // 공지사항 등록
  APP_SETTINGS_NOTICE_DETAIL='/app-setting/notice/detail', // 공지사항 상세
  APP_SETTINGS_VERSION='/version', // 버전 관리
  TERMS='/terms', // 약관 관리
  NOTICE='/notice', //공지사항 관리
  ADMIN='/manage-admin/list', // 관리자 관리
  ADD_ADMIN='/manage-admin/add',  // 관리자 관리
}
*/
