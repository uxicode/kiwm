interface IDashboardBanner{
    bannerSeq: number;
    bannerType:  string;
    title:  string;
    subtitle: string;
    isPublish: true,
    period: {
        startDateAt:  string,
        startTimeAt:  string,
        endDateAt:  string,
        endTimeAt:  string,
    },
    eventSeq:number;
    event: {
        eventType: string,
        eventStatusType: string,
        image:string,
        title:string,
        subtitle: string,
        applyCount: number,
        period: {
            startDateAt:string,
            startTimeAt: string,
            endDateAt:string,
            endTimeAt:string,
        }
    },
    noticeSeq: number | string;
    notice: number | string;
    image: string;
    url: string;
    createdAt:  string;
}

interface IDashboardContract{
    contactSeq: number;
    contactType: string;
    contactStatusType: string;
    title: string;
    content: string;
    contactMember: {
        memberSeq: number,
        snsType: string,
        id: string,
        name: string,
        nickname: string,
        phone: string,
        grade: string,
    },
    answerManager: string;
    answerCreatedAt: string;
    answer: string;
    createdAt: string;
}
interface IDashboardFan{
    postSeq: number;
    title:string;
    content:string;
    viewCount: number;
    likeCount:  number;
    replyCount:  number;
    reportCount:  number;
    publishYN: string;
    replies: Array<{
        content: string,
        createdAt: string,
        memberId: string,
        publishYN: string,
        replySeq: number,
        reportCount: number
    }>;
    memberId:string;
    memberName: string;
    memberNickname:string;
    hashtags: string[];
    createdAt: string;
}

interface IDashboardSummary{
    activeMemberCount: number;
    dailySignupMemberCount: number;
    dailyQuitMemberCount: number;
    dailyActiveMemberCount: number;
    dailyCheckinMemberCount: number;
    monthlyActiveMemberCount: number;
    currentAt: string;
}

export { IDashboardBanner, IDashboardContract, IDashboardFan, IDashboardSummary };
