interface IPoint{
    gradeSeq: number;
    gradeCode: string; //플래티텀 C05, 골드C4 , 실버C03, 브론즈C02, 일반C01
    gradeName: string;//플래티텀, 골드, 실버, 브론즈, 일반
    gradeStartAt: number | string;
    gradeEndAt: number | string;
    rewardPer: number;
    mdDiscountPer: number;
    freeAdmisTicket:number;
    fastTrackYn: string;
    preEnterance: number;
    preTicketResDay: number;
    preTicketResHour: number;
    freeBookFeeYn: string;
    priorityInvitationYn: string;
    createdAt: string;
}

interface IPointGuideItems{
    id: string;
    name: string;
    engName: string;
    gradeGuide?: string;
    guideSeq: number | string;
}
interface IPointGuide{
    id: string;
    name: string;
    pointGuides: IPointGuideItems[];
}
interface IModifyPointGuide{
    gradeGuide: string;
    gradeName: string;
    guideSeq: string | number;
}
interface IPointPolicyItems{
    id: string;
    name: string;
    pointAmt: number;
    policySeq: number;
    description?: string;
}
interface IPointPolicy{
    id: string;
    name: string;
    policies: IPointPolicyItems[];
}

export { IPointGuide, IPointPolicy, IPointGuideItems, IPointPolicyItems, IModifyPointGuide, IPoint };
