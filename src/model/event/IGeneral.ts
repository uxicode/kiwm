interface IGeneral{
    // bannerYN: string | boolean; //배너 개시여
    bannerPublishYN: string; //배너 게시 여부
    bannerRegisterYN: string; //배너 등록 여부
    createdAt: string | Date;
    eventBenefitType: string; //상품형/참여형/포인트형
    eventDrawType:string; // 추첨유형 - 선택/선택+랜덤/랜덤/수동
    applyCount: number; // 응모현황수
    eventSeq: number; // 이벤트 uuid
    eventStatusType:string; // 이벤트 상태
    image: string;
    image2: string;  //팬커뮤니티 이미지
    itemDetailType: string;  //상품증정 / 포인트 증정 /자선행사/사인회/ 캠프
    period: {
        endDateAt: string | Date;
        endTimeAt: string | Date;
        startDateAt: string | Date;
        startTimeAt: string | Date;
    };
    title: string;
}
interface IADDGeneral{
    candidateCount: number;
    caution: string;
    content: string;
    contentImages: string[];
    eventBenefitType: string;
    eventDrawType: string;
    image: string;
    image2: string;  //팬커뮤니티 이미지
    itemDetailType: string;
    itemSeq: number;
    period: { endDateAt: string; endTimeAt: string; startDateAt: string; startTimeAt: string };
    point: number;
    subtitle: string; //max 22자
    title: string; //max 18자
    winnerCount: number;
}

interface IModifyGeneral{
    caution: string;
    content: string;
    contentImages: string[];
    image: string;
    image2: string;  //팬커뮤니티 이미지
    itemSeq: number;
    period: { endDateAt: string; endTimeAt: string; startDateAt: string; startTimeAt: string };
    subtitle: string; //max 22자
    title: string; //max 18자
}


interface IGeneralDetail{
    applyCount: number;
    // bannerYN: string;
    bannerPublishYN: string; //배너 게시 여부
    bannerRegisterYN: string; //배너 등록 여부
    candidateCount: number;
    caution: string;
    content: string;
    contentImages: string[];
    createdAt: string | Date;
    eventBenefitType: string;
    eventDrawType: string;
    eventSeq: number;
    eventStatusType: string;
    image: string;
    image2: string;  //팬커뮤니티 이미지
    drawAt: string;
    item: {
        count: number;
        countUnlimit: boolean;
        createdAt: string | Date;
        image: string;
        itemDetailType: string;
        itemSeq: number;
        itemStatusType: string;
        itemType: string;
        name: string;
        point: number;
        price: number
    };
    itemDetailType: string;
    period: {
        endDateAt: string;
        endTimeAt: string;
        startDateAt: string;
        startTimeAt: string;
    };
    point: number | string;
    subtitle: string;
    title: string;
    winnerCount: number;
}

export { IGeneral, IADDGeneral, IGeneralDetail, IModifyGeneral};
