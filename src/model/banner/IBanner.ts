interface IEventBanner{
    applyCount: number;
    eventStatusType: string;
    eventType: string;
    image: string,
    period: {
        startDateAt: string,
        startTimeAt: string
        endDateAt: string,
        endTimeAt: string,
    },
    subtitle: string;
    title: string;
}

interface IBanner{
    bannerSeq: number;
    bannerType: string;
    createdAt: string;
    event: IEventBanner,
    eventSeq: number;
    image: string;
    isPublish: boolean;
    isAppBannerPublish: boolean;
    noticeSeq:number;
    period: {
        startDateAt: string,
        startTimeAt: string
        endDateAt: string,
        endTimeAt: string,
    },
    subtitle: string,
    title: string,
    url: string
}

interface IModifyBanner{
    image: string;
    isPublish: boolean;
    period: {
        endDateAt:string,
        endTimeAt: string,
        startDateAt:string,
        startTimeAt: string,
    },
    title: string;
    url: string;
}

interface IAddBanner{
    bannerType: string;
    eventSeq: number;
    image: string;
    isPublish: boolean;
    noticeSeq: number;
    period: {
        endDateAt: string,
        endTimeAt: string,
        startDateAt: string,
        startTimeAt: string
    },
    title: string;
    url: string;
}

export { IBanner, IModifyBanner, IAddBanner};
