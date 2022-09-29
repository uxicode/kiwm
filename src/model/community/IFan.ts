interface IFanPost {
    postSeq: number;
    title: string;
    content: string;
    viewCount: number;
    likeCount: number;
    replyCount: number;
    reportCount: number;
    publishYN: string;
    memberId: string;
    memberName: string;
    memberNickname: string;
    createdAt: string;
}

interface IFanPostDetail {
    postSeq: number;
    title: string;
    content: string;
    viewCount: number;
    likeCount: number;
    replyCount: number;
    reportCount: number;
    publishYN: string;
    replies: Array<{
       replySeq: number,
       content: string,
       reportCount: number,
       publishYN: string,
       memberId: string,
       createdAt: string,
    }>;
    memberId: string;
    memberName: string;
    memberNickname: string;
    hashtags: string[];
    createdAt: string;
}

export {
    IFanPost, IFanPostDetail
};
