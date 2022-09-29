interface IReport {
    reportSeq: number;
    reportTargetType: string;
    reportReasonType: string;
    reportMember: {
        id: string;
        memberSeq: number;
        postCount: number;
        replyCount: number;
    };
    targetMember: {
        id: string;
        memberSeq: number;
        postCount: number;
        replyCount: number;
    };
    title: string;
    replyCount: number;
    publishYN: string;
    postSeq: number;
    replySeq: number;
    createdAt: string;
}

interface IReportDetail {
    reportSeq: number;
    reportTargetType: string;
    reportReasonType: string;
    reportMember: {
        memberSeq: number;
        id: string;
        name: string;
        nickname: string;
    };
    targetMember: {
        memberSeq: number;
        id: string;
        name: string;
        nickname: string;
        postCount: number;
        replyCount: number;
    };
    title: string;
    replyCount: number;
    publishYN: string;
    postSeq: number;
    replySeq: number;
    post: {
        postSeq: number;
        title: string;
        content: string;
        viewCount: number;
        likeCount: number;
        replyCount: number;
        reportCount: number;
        publishYN: string;
        replies: Array<{
           replySeq: number;
           content: string;
           reportCount: number;
           publishYN: string;
           memberId: string;
           createdAt: string;
        }>;
        memberId: string;
        memberName: string;
        memberNickname: string;
        hashtags: string[];
        createdAt: string;
    };
    createdAt: string;
}

interface IReportMember {
    memberSeq: number;
    id: string;
    reportReasonType: string;
    createdAt: string;
}

export {
    IReport, IReportDetail, IReportMember
};
