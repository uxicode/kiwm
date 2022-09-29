import { IFilter } from '@/model/filter/IFilter';

export class DataProviderType{
    public static SNS_TYPE: string='snsType';
    public static GENDER_TYPE: string='genderType';
    public static AGE_BEND_TYPE: string='agebandType';
    public static MEMBER_QUERY_TYPE: string='memberQueryType';
    public static MEMBER_QUERY_ID_TYPE: string='ID';
    public static EVENT_MEMBER_QUERY_TYPE: string='eventQueryType';
    public static EVENT_MEMBER_DEFAULT_QUERY_TYPE: string='TI';
    public static MEMBER_STATUS_TYPE: string='memberStatusType';
    public static MEMBER_QUIT_TYPE: string='memberQuitType';
    public static MEMBER_GRADE_TYPE: string='memberGradeType';
    public static TERMS_TYPE: string='termsType';
    public static FAQ_TYPE: string='faqType';
    public static NOTIFICATION_TYPE: string='notificationType';
    public static CONTACT_TYPE: string='contactType';
    public static CONTACT_STATUS_TYPE: string='contactStatusType';
    public static CONTACT_QUERY_TYPE: string='contactQueryType';
    public static CONTACT_DEFAULT_QUERY_TYPE: string='TI';
    public static CONTACT_REMOVE_TYPE: string='contactRemoveType';
    public static ITEM_TYPE: string='itemType';
    public static ITEM_DETAIL_TYPE: string='itemDetailType';
    public static ITEM_STATUS_TYPE: string='itemStatusType';
    public static EVENT_DRAW_TYPE: string='eventDrawType';
    public static EVENT_STATUS_TYPE: string='eventStatusType';
    public static EVENT_BENEFIT_TYPE: string='eventBenefitType';
    public static BANNER_PUBLISH: string='bannerPublishYN'; //앱 게시여부
    public static NOTICE_STATUS_TYPE: string='postYn';
    public static REG_FROM: string='regDateFrom';
    public static REG_TO: string='regDateTo';
    public static START_AT: string='startDateAt';
    public static END_AT: string='endDateAt';
    public static FILE_APPEND_KEY: string='file';
    /*{ val:'GO', txt: '상품형' },
{ val:'TI',  txt: '참여형'},
{ val:'PO', txt: '포인트형'},*/
    public static EVENT_GOODS_TYPE: string='GO';
    public static EVENT_INVOLVED_TYPE: string='TI';
    public static EVENT_POINT_TYPE: string='PO';

    public static EVENT_MEMBER_QUERY_ID_TYPE: string='AI';
/*{ val: 'OR', txt: '선착순' },
{ val: 'MI', txt: '선착순+랜덤' },
{ val: 'RA', txt: '랜덤추첨' },
{ val: 'MA', txt: '수동' },*/
    public static DRAW_FIRST_COME: string='OR';
    public static DRAW_MIXED: string='MI';
    public static DRAW_RANDOM: string='RA';
    public static DRAW_MANUAL: string='MA';

    /*private itemDetailType: IFilter[]=[
        {val:'SI', txt:'사인회'},
        {val:'CH', txt:'자선행사'},
        {val:'CA', txt:'캠핑'},
        {val:'GO', txt:'상품증정'},
        {val:'PO', txt:'포인트증정'},
    ];*/
    public static ITEM_DETAIL_SIGNING: string='SI';
    public static ITEM_DETAIL_CHARITY: string='CH';
    public static ITEM_DETAIL_CHAMPING: string='CA';
    public static ITEM_DETAIL_GOODS: string='GO';
    public static ITEM_DETAIL_POINT: string='PO';


    public static AUTHORITY: string='authority';

    public static APP_POST_STATUS_TYPE: string = 'isUse';
    public static PUBLISH_STATUS_TYPE: string = 'publishYN';
    public static FAN_QUERY_TYPE: string = 'fanQueryType';
    public static FAN_QUERY_ID_TYPE: string = 'ID';
    public static FAN_DEFAULT_QUERY_TYPE: string = 'TI';
    public static REPORT_QUERY_TYPE: string = 'reportQueryType';
    public static REPORT_DEFAULT_QUERY_TYPE: string = 'TI';
    public static REPORT_REASON_TYPE: string = 'reportReasonType';
    public static REPORT_TARGET_TYPE: string = 'reportTargetType';

    public static MANAGER_QUERY_TYPE: string='managerQueryType';
    public static MANAGER_DEFAULT_QUERY_TYPE: string='ID';
    public static CROWD_ZONE_TYPE: string='zoneType'; // 혼잡도 유형  - 'G': 출입구, 'P': 통로
    public static CROWD_LEVEL: string='level';   // 혼잡상태 - H: 상, M: 중, L: 하
    public static CROWD_LEVEL_HIGH: string='H';   // 혼잡상태 - H: 상, M: 중, L: 하
    public static CROWD_LEVEL_MID: string='M';   // 혼잡상태 - H: 상, M: 중, L: 하
    public static CROWD_LEVEL_LOW: string='L';   // 혼잡상태 - H: 상, M: 중, L: 하

    /*{val: 'LO' , txt: '휴면'},
    {val: 'QU' , txt: '탈퇴'},
    {val: 'FO' , txt: '탈퇴(강제)'},
    {val: 'BL' , txt: '탈퇴(영구)'},*/
/*    private memberStatusType: IFilter[]=[
        {val: 'AC' , txt: '활동'},
        {val: 'LO' , txt: '휴면'},
        {val: 'QU' , txt: '탈퇴'},
        {val: 'FO' , txt: '탈퇴(강제)'},
        {val: 'BL' , txt: '탈퇴(영구)'},
    ];*/
    public static ACTIVITY_STATUS: string='AC';
    public static RESTING_STATUS: string='LO';
    public static WITHDRAWAL_STATUS: string='QU';
    public static FORCED_DROP_OUT_STATUS: string='FO';
    public static BLOCK_WITHDRAWAL_STATUS: string='BL';

    public static POINT_ADD_TYPE: string = 'addType'; // 포인트 적립 유형
    public static POINT_KIND_TYPE: string = 'kindQueryType'; // 포인트 종류 조건
    public static POINT_REASON_TYPE: string = 'pointReasonType'; // 포인트 입력 사유

    public static PUSH_TYPE: string = 'pushType';
    public static PUSH_DETAIL_TYPE: string = 'pushDetailType';
    public static GENERAL_EVENT_PUSH_DETAIL_TYPE: string = 'generalEventPushDetailType';
    public static LIVE_EVENT_PUSH_DETAIL_TYPE: string = 'liveEventPushDetailType';
    public static GAME_PUSH_DETAIL_TYPE: string = 'gamePushDetailType';
    public static NOTICE_PUSH_DETAIL_TYPE: string = 'noticePushDetailType';
    public static COMMENT_PUSH_DETAIL_TYPE: string = 'commentPushDetailType';
    public static CONTACT_PUSH_DETAIL_TYPE: string = 'contactPushDetailType';
    public static AD_PUSH_DETAIL_TYPE: string = 'adPushDetailType';
    public static PUSH_TARGET_TYPE: string = 'pushTargetType';
    public static PUSH_SEND_TYPE: string = 'pushSendType';
    public static PUSH_SEND_STATUS_TYPE: string = 'pushSendStatusType';
    public static PUSH_QUERY_TYPE: string = 'pushQueryType';
    public static PUSH_DEFAULT_QUERY_TYPE: string = 'TI';
    public static ADD_PUSH_TYPE: string = 'addPushType';

    public static EMAIL_TYPE: string = 'emailType';
    public static EMAIL_CASE_TYPE: string = 'emailCaseType';
    public static EMAIL_CASE_DETAIL_TYPE: string = 'emailCaseDetailType';
    public static EMAIL_SENDER_TYPE: string = 'emailSenderType';


    public static BANNER_TYPE: string='bannerType';

    public static GRADE_QUERY_TYPE: string='gradeQueryType';
    public static POINT_QUERY_TYPE: string='pointQueryType';
    public static POINT_QUERY_DEFAULT_TYPE: string='ID';

    public static CHECKIN_QUERY_TYPE: string='checkinQueryType';
    public static CHECKIN_VICTORY_QUERY_TYPE: string='checkinVictoryQueryType';
    public static CHECKIN_VICTORY_DEFAULT_QUERY_TYPE: string='ID';

    public static SEASON_TYPE: string='season';
    public static CHECKIN_QUERY_ID_TYPE: string='ID';

/*{ val: 'C01', txt: '진행예정' },
{ val: 'C02', txt: '진행중' },
{ val: 'C03', txt: '마감일' },
{ val: 'C04', txt: '마감' },
{ val: 'C05', txt: '추첨완료' },
{ val: 'C06', txt: '종료' },*/
    public static EVENT_STEP1: string='C01';
    public static EVENT_STEP2: string='C02';
    public static EVENT_STEP3: string='C03';
    public static EVENT_STEP4: string='C04';
    public static EVENT_STEP5: string='C05';
    public static EVENT_STEP6: string='C06';

/*{val: 'GE', txt: '일반 이벤트' },
{val: 'LI', txt: '라이브 이벤트' },
{val: 'NO', txt: '공지사항' },
{val: 'UR', txt: '외부링크' }*/
    public static BANNER_TYPE_LIVE_EVENT: string='LI';
    public static BANNER_TYPE_GENERAL_EVENT: string='GE';
    public static BANNER_TYPE_NOTICE: string='NO';
    public static BANNER_TYPE_LINK_URL: string='UR';

    //멤버쉽 포인트 상세 > 포인트 적립/차감.
    public static MEMBER_POINT_TYPE_INTO: string='memberPointTypeInfo';
    public static MEMBER_POINT_TYPE_MINUS: string='m';
    public static MEMBER_POINT_TYPE_PLUS: string='p';
}

export class DataProvider{

    private eventMemberQueryType: IFilter[]=[
        {val:'TI', txt:'제목'},
        {val:'CO', txt:'내용'},
        {val:'AI', txt:'응모 ID'},
    ]

    private bannerType: IFilter[]=[
        {val: DataProviderType.BANNER_TYPE_LIVE_EVENT, txt: '라이브 이벤트' },
        {val: DataProviderType.BANNER_TYPE_GENERAL_EVENT, txt: '일반 이벤트' },
        {val: DataProviderType.BANNER_TYPE_NOTICE, txt: '공지사항' },
        {val: DataProviderType.BANNER_TYPE_LINK_URL, txt: '외부링크' },
    ];

    //회원 검색
    private managerQueryType: IFilter[]=[
        {val: 'ID', txt: '아이디' },
        {val: 'NA', txt: '이름' },
    ];
    private crowdLevel: IFilter[]=[
        { txt: '상', val: 'H'},
        { txt: '중', val: 'M'},
        { txt: '하', val: 'L'},
    ];

    //DB 에 반대로 들어가 있어서 순서 변경
    private crowdZoneType: IFilter[]=[
        { txt: '게이트', val: 'P'},
        { txt: '통로', val: 'G'},
    ];

    private bannerPublish: IFilter[]=[
        { txt: 'Y', val: 'Y'},
        { txt: 'N', val: 'N'},
    ];

    //소셜
    private snsType: IFilter[]=[
        { val: 'N', txt: '네이버' },
        { val: 'K', txt: '카카오' },
        { val: 'F', txt: '페이스북' },
        { val:'G', txt:'구글' },
        { val:'A', txt:'애플' },
        { val: 'X', txt: '이메일' }
        ];
    //남녀
    private genderType: IFilter[]=[
        {val: 'M', txt: '남자' },
        {val: 'F', txt: '여자' },
    ];
    //나이대
    private agebandType: IFilter[]=[
        {val: 'C01', txt: '10대'},
        {val: 'C02', txt: '20대'},
        {val: 'C03', txt: '30대'},
        {val: 'C04', txt: '40대'},
        {val: 'C05', txt: '50대'},
        {val: 'C06', txt: '60대 이상'},
    ];
    //회원 검색
    private memberQueryType: IFilter[]=[
        {val: 'ID', txt: '아이디' },
        {val: 'NA', txt: '이름' },
        {val: 'NI', txt: '닉네임' },
        {val: 'PH', txt: '휴대폰 번호' }
    ];

/*    public static ACTIVITY_STATUS: string='AC';
    public static RESTING_STATUS: string='LO';
    public static WITHDRAWAL_STATUS: string='QU';
    public static FORCED_DROP_OUT_STATUS: string='FO';
    public static BLOCK_WITHDRAWAL_STATUS: string='BL';*/
    //활동여부
    private memberStatusType: IFilter[]=[
        {val: DataProviderType.ACTIVITY_STATUS , txt: '활동'},
        {val: DataProviderType.RESTING_STATUS , txt: '휴면'},
        {val: DataProviderType.WITHDRAWAL_STATUS , txt: '탈퇴'},
        {val: DataProviderType.FORCED_DROP_OUT_STATUS , txt: '탈퇴(강제)'},
        {val: DataProviderType.BLOCK_WITHDRAWAL_STATUS , txt: '탈퇴(영구)'},
    ];
    //회원 탈퇴
    private memberQuitType: IFilter[]=[
        { val: 'C01' , txt: '다른 서비스 이용'},
        { val: 'C02' , txt: '자주 이용 안함'},
        { val: 'C03' , txt: '서비스 불만'},
        { val: 'C04' , txt: '시스템 불만'},
        { val: 'C05' , txt: '개인정보 노출'},
        { val: 'C06' , txt: '기타'},
    ];
    //멤버 등급
    private memberGradeType: IFilter[]=[
        { val:'C01', txt:'일반'},
        { val:'C02', txt:'브론즈'},
        { val:'C03', txt:'실버'},
        { val:'C04', txt:'골드'},
        { val:'C05', txt:'플래티넘'}
    ];
    //약관
    private termsType: IFilter[]=[
        { val: 'P', txt: '개인정보 수집 및 이용'},
        { val: 'L', txt: '위치정보 이용'},
        { val: 'M', txt: '마케팅 활용'},
        { val: 'T', txt: '개인정보 위탁',},
        { val: 'U', txt: '서비스 이용',},
    ];
    //알림
    private notificationType: IFilter[]=[
        {val:'P', txt:'push'},
        {val:'S', txt:'sms'},
        {val:'E', txt:'email'},
        {val:'M', txt:'marketing'},
    ];
    //문의
    private contactType: IFilter[]=[
        {val:'EV', txt:'이벤트'},
        {val:'ME', txt:'MD'},
        {val:'TI', txt:'티켓'},
        {val:'ET', txt:'기타'},
    ];
    //문의 상태
    private contactStatusType: IFilter[]=[
        {val:'C01', txt:'미답변'},
        {val:'C02', txt:'답변완료'},
        {val:'C03', txt:'삭제 (관리자)'},
    ];
    //문의 검색 유형
    private contactQueryType: IFilter[] = [
        {val: 'TI', txt: '제목'},
        {val: 'CM', txt: '작성자'},
    ];
    // 문의 삭제
    private contactRemoveType: IFilter[] = [
        {val: 'C01', txt: '부적합한 내용'},
        {val: 'C02', txt: '비속어 사용'},
        {val: 'C03', txt: '영리목적 / 광고'},
        {val: 'C04', txt: '같은 내용 반복 게시'},
        {val: 'C05', txt: '기타'},
    ];

    //경품/상품
    private itemType: IFilter[]=[
        {val:'GO', txt:'상품형'},
        {val:'TI', txt:'참여형'},
    ];

    /*public static ITEM_DETAIL_SIGNING: string='SI';
    public static ITEM_DETAIL_CHARITY: string='CH';
    public static ITEM_DETAIL_CHAMPING: string='CA';
    public static ITEM_DETAIL_GOODS: string='GO';
    public static ITEM_DETAIL_POINT: string='PO';*/
    //경품/상품 상세
    private itemDetailType: IFilter[]=[
        {val:DataProviderType.ITEM_DETAIL_SIGNING, txt:'사인회'},
        {val:DataProviderType.ITEM_DETAIL_CHARITY, txt:'자선행사'},
        {val:DataProviderType.ITEM_DETAIL_CHAMPING, txt:'캠핑'},
        {val:DataProviderType.ITEM_DETAIL_GOODS, txt:'상품증정'},
        {val:DataProviderType.ITEM_DETAIL_POINT, txt:'포인트증정'},
    ];
    //상품 상태
    private itemStatusType: IFilter[]=[
        {val:'AC', txt:'운영'},
        {val:'IN', txt:'미운영'},
    ];

   /* public static DRAW_FIRST_COME: string='OR';
    public static DRAW_MIXED: string='MI';
    public static DRAW_RANDOM: string='RA';
    public static DRAW_MANUAL: string='MA';*/
    //이벤트 추첨
    private eventDrawType: IFilter[] = [
        { val: DataProviderType.DRAW_FIRST_COME, txt: '선착순' },
        { val: DataProviderType.DRAW_MIXED, txt: '선착순+랜덤' },
        { val: DataProviderType.DRAW_RANDOM, txt: '랜덤추첨' },
        { val: DataProviderType.DRAW_MANUAL, txt: '수동' },
    ];
    //이벤트 상태
    private eventStatusType: IFilter[] = [
        { val: 'C01', txt: '진행예정' },
        { val: 'C02', txt: '진행중' },
        { val: 'C03', txt: '마감일' },
        { val: 'C04', txt: '마감' },
        { val: 'C05', txt: '추첨완료' },
        { val: 'C06', txt: '종료' },
    ];

/*    public static EVENT_GOODS_TYPE: string='GO';
    public static EVENT_INVOLVED_TYPE: string='TI';
    public static EVENT_POINT_TYPE: string='PO';*/
    //혜택
    private eventBenefitType: IFilter[] = [
        { val:DataProviderType.EVENT_GOODS_TYPE, txt: '상품형' },
        { val:DataProviderType.EVENT_INVOLVED_TYPE,  txt: '참여형'},
        { val:DataProviderType.EVENT_POINT_TYPE, txt: '포인트형'},
    ];
    //게시여부
    private postYn: IFilter[]=[
        { txt: 'Y', val: 'Y'},
        { txt: 'N', val: 'N'},
    ];
    //타임라인 - 앱 게시여부
    private appPostStatusType: IFilter[]=[
        { val: true, txt: '게시'},
        { val: false, txt: '미게시'},
    ];
    // 팬게시판/신고글 - 게시여부
    private publishYN: IFilter[] = [
        {val: 'Y', txt: '게시'},
        {val: 'N', txt: '미게시'},
    ];

    // 팬게시판 검색 유형
    private fanQueryType: IFilter[]=[
        { val: 'TI', txt: '제목'},
        { val: 'CO', txt: '내용'},
        { val: 'NA', txt: '이름'},
        { val: 'HA', txt: '해시태그'},
        { val: 'ID', txt: '작성자 ID'},
        { val: 'NI', txt: '닉네임'},
    ];

    // 신고 검색 유형
    private reportQueryType: IFilter[]=[
        {val: 'TI', txt: '제목'},
        {val: 'CO', txt: '내용'},
        {val: 'RM', txt: '신고자'},
        {val: 'TM', txt: '작성자'},
    ];

    //신고 사유
    private reportReasonType: IFilter[]=[
        {val:'C01', txt:'욕설'},
        {val:'C02', txt:'음란성'},
        {val:'C03', txt:'광고성'},
        {val:'C04', txt:'금전관련'},
        {val:'C05', txt:'도배'},
        {val:'C06', txt:'타인비방'},
        {val:'C07', txt:'불법프로그램'},
        {val:'C08', txt:'기타'},
    ];

    // 신고 대상
    private reportTargetType: IFilter[]=[
        {val: 'PO', txt: '게시글'},
        {val: 'RE', txt: '댓글'},
    ];

    //자주묻는질문 유형
    private faqType : IFilter[] = [
      {val: 'ME', txt: '회원'},
      {val: 'TI', txt: '입장권/예매'},
      {val: 'GO', txt: '상품'},
      {val: 'EV', txt: '이벤트/팬서비스'},
      {val: 'ET', txt: '기타'},
    ];

    // 멤버쉽 - 회원 등급
    private gradeQueryType: IFilter[] = [
        { val:'C01', txt:'일반'},
        { val:'C02', txt:'브론즈'},
        { val:'C03', txt:'실버'},
        { val:'C04', txt:'골드'},
        { val:'C05', txt:'플래티넘'}
    ];

    // 멤버쉽 - 회원 조회 조건
    private pointQueryType: IFilter[] = [
        {txt: 'ID(이메일)', val: 'ID'},
        {txt: '이름', val: 'NA'},
        {txt: '전화번호', val: 'PH'},
        {txt: '회원번호', val: 'NI'},
    ];

    //포인트 유형
    private addType: IFilter[] = [
        {val: 'C01', txt: '적립'},
        {val: 'C02', txt: '차감'},
    ];

    //포인트 종류 조건
    private kindQueryType: IFilter[] = [
        {val: 'C01', txt: '게시글 작성'},
        {val: 'C02', txt: '댓글 작성'},
        {val: 'C03', txt: '로그인'},
        {val: 'C04', txt: '직관인증'},
        {val: 'C05', txt: '오프라인 티켓'},
        {val: 'C06', txt: '온라인 티켓'},
        {val: 'C07', txt: '일반 이벤트'},
        {val: 'C08', txt: '라이브 이벤트'},
        {val: 'C16', txt: '관리자 부여'}, // 추가 예정
    ];

    //포인트 입력 사유
    private pointReasonType: IFilter[] = [
        {val: 'C09', txt: '고객 서비스 차원'},
        {val: 'C10', txt: '타 사용자로부터 신고 접수 확인'},
        {val: 'C11', txt: '충성 고객 보상 차원'},
        {val: 'C13', txt: '부적절한 게시글, 댓글 작성'},
        {val: 'C14', txt: '부적절한 1:1 문의사항 작성'},
        {val: 'C15', txt: '직관인증 유효성 여부'},
        {val: 'C16', txt: '기타'},
    ];

    // 푸시
    private pushType: IFilter[] = [
        {val: 'C01', txt: '라이브 이벤트'},
        {val: 'C02', txt: '일반 이벤트'},
        {val: 'C11', txt: '댓글 알림'},
        {val: 'C21', txt: '1:1 문의'},
        {val: 'C31', txt: '경기'},
        {val: 'C51', txt: '공지사항'},
        {val: 'C61', txt: '광고'},
    ];

    // 푸시 상세 - 전체
    private pushDetailType: IFilter[] = [
        {val: 'C01', txt: '이벤트 시작'},
        {val: 'C02', txt: '이벤트 종료'},
        {val: 'C03', txt: '당첨 안내'},
        {val: 'C11', txt: '댓글 알림'},
        {val: 'C21', txt: '1:1문의답변'},
        {val: 'C31', txt: '경기시작'},
        {val: 'C32', txt: '경기'},
        {val: 'C33', txt: '경기지연'},
        {val: 'C34', txt: '경기종료'},
        {val: 'C35', txt: '경기취소'},
        // {val: 'C41', txt: '체크인'},
        {val: 'C51', txt: '공지사항'},
        {val: 'C52', txt: '긴급 공지'},
        {val: 'C61', txt: '광고 마케팅'},
    ];

    // 푸시 상세 - 라이브 이벤트
    private liveEventPushDetailType: IFilter[] = [
        {val: 'C01', txt: '이벤트 시작'},
        {val: 'C02', txt: '이벤트 종료'},
        {val: 'C03', txt: '당첨 안내'},
    ];

    // 푸시 상세 - 일반 이벤트
    private generalEventPushDetailType: IFilter[] = [
        {val: 'C01', txt: '이벤트 시작'},
        {val: 'C03', txt: '당첨 안내'},
    ];

    // 푸시 상세 - 경기
    private gamePushDetailType: IFilter[] = [
        {val: 'C31', txt: '경기시작'},
        {val: 'C32', txt: '경기'},
        {val: 'C33', txt: '경기지연'},
        {val: 'C34', txt: '경기종료'},
        {val: 'C35', txt: '경기취소'},
        // {val: 'C41', txt: '체크인'},
    ];

    // 푸시 상세 - 공지
    private noticePushDetailType: IFilter[] = [
        {val: 'C51', txt: '공지사항'},
        {val: 'C52', txt: '긴급 공지'},
    ];

    private commentPushDetailType: IFilter[] = [
        {val: 'C11', txt: '댓글 알림'},
    ];

    private contactPushDetailType: IFilter[] = [
        {val: 'C21', txt: '1:1문의답변'},
    ];

    private adPushDetailType: IFilter[] = [
        {val: 'C61', txt: '광고 마케팅'},
    ];

    private pushTargetType: IFilter[] = [
        {val: 'C01', txt: '전체'},
        {val: 'C02', txt: '현장 인원'},
        {val: 'C03', txt: '당첨 인원'},
        {val: 'C04', txt: 'USER'},
    ];

    private pushSendType: IFilter[] = [
        {val: 'C01', txt: '즉시발송'},
        {val: 'C02', txt: '예약발송'},
    ];

    private pushSendStatusType: IFilter[] = [
        {val: 'C01', txt: '발송 예정'},
        {val: 'C02', txt: '발송 성공'},
        {val: 'C03', txt: '발송 실패'},
    ];

    private pushQueryType: IFilter[] = [
        {txt: '제목', val: 'TI'},
        {txt: '내용', val: 'CO'},
        {txt: '발신자', val: 'MA'},
    ];

    private addPushType: IFilter[] = [
        {val: 'C01', txt: '라이브 이벤트'},
        {val: 'C02', txt: '일반 이벤트'},
        {val: 'C61', txt: '광고'},
    ];

    // 이메일
    private emailType: IFilter[] = [
        {val: 'C01', txt: '이벤트'},
        {val: 'C11', txt: '회원'},
        {val: 'C51', txt: '공지'},
        {val: 'C61', txt: '광고'},
    ];

    private emailCaseType: IFilter[] = [
        {val: 'C01', txt: '이벤트 당첨'},
        {val: 'C11', txt: '이메일 인증'},
        {val: 'C12', txt: '가입'},
        {val: 'C13', txt: '탈퇴'},
        {val: 'C14', txt: '비밀번호 재설정'},
        {val: 'C15', txt: '휴면계정'},
        {val: 'C16', txt: '정보수신동의'},
        {val: 'C17', txt: '1:1문의'},
        {val: 'C51', txt: '약관변경'},
        {val: 'C61', txt: '광고마케팅'}
    ];

    private emailCaseDetailType: IFilter[] = [
        {val: 'C01', txt: '이벤트 당첨 안내'},
        {val: 'C11', txt: '가입을 위한 이메일 인증'},
        {val: 'C12', txt: '가입완료 안내'},
        {val: 'C13', txt: '탈퇴완료 안내'},
        {val: 'C14', txt: '비밀번호 재설정 안내'},
        {val: 'C15', txt: '휴면계정 전환 예정 안내'},
        {val: 'C16', txt: '정보수신동의 안내'},
        {val: 'C17', txt: '1:1문의 안내'},
        {val: 'C18', txt: '휴면계정 전환 완료 안내'},
        {val: 'C51', txt: '약관변경 안내'},
        {val: 'C61', txt: '광고마케팅 콘텐츠'},
    ];

    private emailSenderType: IFilter[] = [
      {val: 'MA', txt: '관리자'},
      {val: 'SY', txt: '시스템'},
    ];

    private checkinQueryType: IFilter[] = [
        {val: 'ID', txt: 'ID'},
        {val: 'NA', txt: '이름'},
        {val: 'NI', txt: '닉네임'},
    ];

    private checkinVictoryQueryType: IFilter[] = [
        {val: 'ID', txt: 'ID'},
        {val: 'NA', txt: '이름'},
        {val: 'NI', txt: '닉네임'},
    ];

    private season: IFilter[] = [
        {val: '2022', txt: '2022 시즌'},
        {val: '2021', txt: '2021 시즌'},
    ];

    private authority: IFilter[]=[
        {val:'member', txt:'회원정보 관리'},
        {val:'grade', txt:'등급/포인트 관리'},
        {val:'gradehistory', txt:'멤버쉽 이력 관리'},
        {val:'banner', txt:'메인배너 관리'},
        {val:'mainimage', txt:'메인이미지 관리'},
        {val:'eventlive', txt:'라이브 이벤트'},
        {val:'eventgeneral', txt:'일반 이벤트'},
        {val:'eventitem', txt:'경품 관리'},
        {val:'contact', txt:'1:1 문의'},
        {val:'boardtimeline', txt:'타임라인 관리'},
        {val:'boardfan', txt:'팬게시판 관리'},
        {val:'boardreport	', txt:'신고글 관리'},
        {val:'boardfaq', txt:'자주묻는질문 관리'},
        {val:'vesionapp', txt:'버전 관리'},
        {val:'terms', txt:'약관 관리'},
        {val:'boardnotice', txt:'공지사항 관리'},
        {val:'checkinvictory', txt:'직관 승요 관리'},
        {val:'checkin', txt:'체크인 내역 관리'},
        {val:'notipush'	, txt:'Push 관리'},
        {val:'notiemail', txt:'Email 관리'},
        {val:'manager', txt:'관리자 관리'},
        {val:'crowd', txt:'혼잡도 관리'},
    ];

    private pointTypeInfo: IFilter[]=[
        { txt: '적립', val: 'p' },
        { txt: '차감', val: 'm' },
    ];

    private dataGroup=[
        {id: DataProviderType.AUTHORITY, data: this.authority },
        {id: DataProviderType.SNS_TYPE, data: this.snsType },
        {id: DataProviderType.GENDER_TYPE, data: this.genderType },
        {id: DataProviderType.AGE_BEND_TYPE, data: this.agebandType },
        {id: DataProviderType.MEMBER_QUERY_TYPE, data: this.memberQueryType },
        {id: DataProviderType.MEMBER_STATUS_TYPE, data: this.memberStatusType },
        {id: DataProviderType.MEMBER_QUIT_TYPE, data: this.memberQuitType },
        {id: DataProviderType.MEMBER_GRADE_TYPE, data: this.memberGradeType },
        {id: DataProviderType.TERMS_TYPE, data: this.termsType },
        {id: DataProviderType.FAQ_TYPE, data: this.faqType },
        {id: DataProviderType.NOTIFICATION_TYPE, data: this.notificationType },
        {id: DataProviderType.CONTACT_TYPE, data: this.contactType },
        {id: DataProviderType.CONTACT_STATUS_TYPE, data: this.contactStatusType },
        {id: DataProviderType.CONTACT_QUERY_TYPE, data: this.contactQueryType },
        {id: DataProviderType.CONTACT_REMOVE_TYPE, data: this.contactRemoveType },
        {id: DataProviderType.ITEM_TYPE, data: this.itemType },
        {id: DataProviderType.ITEM_DETAIL_TYPE, data: this.itemDetailType },
        {id: DataProviderType.ITEM_STATUS_TYPE, data: this.itemStatusType },
        {id: DataProviderType.EVENT_DRAW_TYPE, data: this.eventDrawType },
        {id: DataProviderType.EVENT_STATUS_TYPE, data: this.eventStatusType },
        {id: DataProviderType.EVENT_BENEFIT_TYPE, data: this.eventBenefitType },
        {id: DataProviderType.BANNER_PUBLISH, data: this.bannerPublish },
        {id: DataProviderType.NOTICE_STATUS_TYPE, data: this.postYn },
        {id: DataProviderType.APP_POST_STATUS_TYPE, data: this.appPostStatusType },
        {id: DataProviderType.PUBLISH_STATUS_TYPE, data: this.publishYN },
        {id: DataProviderType.FAN_QUERY_TYPE, data: this.fanQueryType },
        {id: DataProviderType.REPORT_QUERY_TYPE, data: this.reportQueryType },
        {id: DataProviderType.REPORT_REASON_TYPE, data: this.reportReasonType },
        {id: DataProviderType.REPORT_TARGET_TYPE, data: this.reportTargetType },
        {id: DataProviderType.MANAGER_QUERY_TYPE, data: this.managerQueryType },
        {id: DataProviderType.CROWD_LEVEL, data: this.crowdLevel },
        {id: DataProviderType.CROWD_ZONE_TYPE, data: this.crowdZoneType },
        {id: DataProviderType.POINT_ADD_TYPE, data: this.addType},
        {id: DataProviderType.POINT_KIND_TYPE, data: this.kindQueryType},
        {id: DataProviderType.POINT_REASON_TYPE, data: this.pointReasonType},
        {id: DataProviderType.PUSH_TYPE, data: this.pushType},
        {id: DataProviderType.PUSH_DETAIL_TYPE, data: this.pushDetailType},
        {id: DataProviderType.PUSH_TARGET_TYPE, data: this.pushTargetType},
        {id: DataProviderType.PUSH_SEND_TYPE, data: this.pushSendType},
        {id: DataProviderType.PUSH_SEND_STATUS_TYPE, data: this.pushSendStatusType},
        {id: DataProviderType.PUSH_QUERY_TYPE, data: this.pushQueryType},
        {id: DataProviderType.LIVE_EVENT_PUSH_DETAIL_TYPE, data: this.liveEventPushDetailType},
        {id: DataProviderType.GENERAL_EVENT_PUSH_DETAIL_TYPE, data: this.generalEventPushDetailType},
        {id: DataProviderType.GAME_PUSH_DETAIL_TYPE, data: this.gamePushDetailType},
        {id: DataProviderType.NOTICE_PUSH_DETAIL_TYPE, data: this.noticePushDetailType},
        {id: DataProviderType.COMMENT_PUSH_DETAIL_TYPE, data: this.commentPushDetailType},
        {id: DataProviderType.CONTACT_PUSH_DETAIL_TYPE, data: this.contactPushDetailType},
        {id: DataProviderType.AD_PUSH_DETAIL_TYPE, data: this.adPushDetailType},
        {id: DataProviderType.ADD_PUSH_TYPE, data: this.addPushType},
        {id: DataProviderType.BANNER_TYPE, data: this.bannerType},
        {id: DataProviderType.EMAIL_TYPE, data: this.emailType},
        {id: DataProviderType.EMAIL_CASE_TYPE, data: this.emailCaseType},
        {id: DataProviderType.EMAIL_CASE_DETAIL_TYPE, data: this.emailCaseDetailType},
        {id: DataProviderType.EMAIL_SENDER_TYPE, data: this.emailSenderType},
        {id: DataProviderType.GRADE_QUERY_TYPE, data: this.gradeQueryType},
        {id: DataProviderType.POINT_QUERY_TYPE, data: this.pointQueryType},
        {id: DataProviderType.EVENT_MEMBER_QUERY_TYPE, data: this.eventMemberQueryType},
        {id: DataProviderType.CHECKIN_QUERY_TYPE, data: this.checkinQueryType},
        {id: DataProviderType.CHECKIN_VICTORY_QUERY_TYPE, data: this.checkinVictoryQueryType},
        {id: DataProviderType.SEASON_TYPE, data: this.season},
        {id: DataProviderType.MEMBER_POINT_TYPE_INTO, data: this.pointTypeInfo},
    ];

    public getItem( id: string ): IFilter[] {
        const findIdx=this.dataGroup.findIndex( (item:{id: string, data:IFilter[]})=>item.id === id );
        const { data }= this.dataGroup[findIdx];
        return data;
    }

}
