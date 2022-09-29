interface ITimeline {
    postSeq: number;
    timelineType: string;
    title: string;
    imagePath: string;
    url: string;
    isNotice: boolean;
    isUse: boolean;
    viewCount: number;
    startAt: string;
    endAt: string;
    createdAt: string;
}

export {
    ITimeline
};
