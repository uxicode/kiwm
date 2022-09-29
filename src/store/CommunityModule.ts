import {IFanPost, IFanPostDetail} from '@/model/community/IFan';
import {IReport, IReportDetail, IReportMember} from '@/model/community/IReport';
import {ITimeline} from '@/model/community/ITimeline';
import {CommunityActionType} from '@/store/moduleType/CommunityActionType';
import {CommunityMutationType} from '@/store/moduleType/CommunityMutationType';
import {Promise} from 'es6-promise';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { CommunityService } from '@/restApi/service/CommunityService';

@Module({
    namespaced: true
})
export default class CommunityModule extends VuexModule {
    // 타임라인
    private timelineType: string = 'NO';
    private timelineItems: ITimeline[] = [];
    private timelineListTotalNum: number=0;
    private timelineListPageSizeNum: number=0;
    private timelineListPageEndNum: number=0;

    // 팬 게시판
    private fanPostItems: IFanPost[] = [];
    private fanPostListTotalNum: number=0;
    private fanPostListPageSizeNum: number=0;
    private fanPostListPageEndNum: number=0;
    private fanPostDetailData: IFanPostDetail | null = null;

    // 신고글
    private reportItems: IReport[] = [];
    private reportListTotalNum: number=0;
    private reportListPageSizeNum: number=0;
    private reportListPageEndNum: number=0;
    private reportDetailData: IReportDetail | null = null;
    private reportMemberItems: IReportMember[] = [];
    private reportMemberListTotalNum: number=0;
    private reportMemberListPageSizeNum: number=0;
    private reportMemberListPageEndNum: number=0;

    // 필터
    private filterChk: boolean = false;
    private selectedFilterOptions: { [key: string]: string }={};

    get currentTimelineType(): string {
        return this.timelineType;
    }

    get timelineList(): ITimeline[] {
        return this.timelineItems;
    }

    get timelineListTotal(): number {
        return this.timelineListTotalNum;
    }

    get timelineListPageSize(): number {
        return this.timelineListPageSizeNum;
    }

    get fanPostList(): IFanPost[] {
        return this.fanPostItems;
    }

    get fanPostListTotal(): number {
        return this.fanPostListTotalNum;
    }

    get fanPostListPageSize(): number {
        return this.fanPostListPageSizeNum;
    }

    get fanPostDetail(): IFanPostDetail | null {
        return this.fanPostDetailData;
    }

    get reportList(): IReport[] {
        return this.reportItems;
    }

    get reportListTotal(): number {
        return this.reportListTotalNum;
    }

    get reportListPageSize(): number {
        return this.reportListPageSizeNum;
    }

    get reportDetail(): IReportDetail | null {
        return this.reportDetailData;
    }

    get reportMemberList(): IReportMember[] | null {
        return this.reportMemberItems;
    }

    get reportMemberListTotal(): number {
        return this.reportMemberListTotalNum;
    }

    get reportMemberListPageSize(): number {
        return this.reportMemberListPageSizeNum;
    }

    @Mutation
    private [CommunityMutationType.SET_TIMELINE_TYPE](timelineType: string): void {
        this.timelineType = timelineType;
    }

    @Mutation
    public [CommunityMutationType.IS_FILTER](isFilter: boolean): void {
        this.filterChk = isFilter;
    }

    @Mutation
    public [CommunityMutationType.SET_FILTER](filterOptions: {[key: string]: string}): void {
        this.selectedFilterOptions = filterOptions;
    }

    @Mutation
    public [CommunityMutationType.RESET_FILTER](): void {
        this.filterChk = false;
    }

    @Mutation
    private [CommunityMutationType.UPDATE_TIMELINE_LIST](items:
        {timelineItems: ITimeline[], count: number, size: number, end: number}): void {
        const {timelineItems, count, size, end} = items;
        this.timelineItems = timelineItems;
        this.timelineListTotalNum = count;
        this.timelineListPageSizeNum = size;
        this.timelineListPageEndNum = end;
    }

    @Mutation
    private [CommunityMutationType.UPDATE_FAN_POST_LIST](items:{
        fanPostItems: IFanPost[], count: number, size: number, end: number
    }): void {
        const {fanPostItems, count, size, end} = items;
        this.fanPostItems = fanPostItems;
        this.fanPostListTotalNum = count;
        this.fanPostListPageSizeNum = size;
        this.fanPostListPageEndNum = end;
    }

    @Mutation
    public [CommunityMutationType.UPDATE_FAN_POST_DETAIL](data: IFanPostDetail): void {
        this.fanPostDetailData = data;
    }

    @Mutation
    public [CommunityMutationType.UPDATE_REPORT_LIST](items: {
        reportItems: IReport[], count: number, size: number, end: number
    }): void {
        const {reportItems, count, size, end} = items;
        this.reportItems = reportItems;
        this.reportListTotalNum = count;
        this.reportListPageSizeNum = size;
        this.reportListPageEndNum = end;
    }

    @Mutation
    public [CommunityMutationType.UPDATE_REPORT_DETAIL](data: IReportDetail): void {
        this.reportDetailData = data;
    }

    @Mutation
    public [CommunityMutationType.UPDATE_REPORT_MEMBER_LIST](items: {
        memberItems: IReportMember[], count: number, size: number, end: number
    }): void {
        const {memberItems, count, size, end} = items;
        this.reportMemberItems = memberItems;
        this.reportMemberListTotalNum = count;
        this.reportMemberListPageSizeNum = size;
        this.reportMemberListPageEndNum = end;
    }

    @Action({rawError: true})
    private [CommunityActionType.TIMELINE_LIST](payload: {
        timelineType: string,
        page?: number,
        filterInfo?: { [key: string]: string }
    }): Promise<any> {
        const {timelineType, page, filterInfo} = payload;
        this.context.commit(CommunityMutationType.SET_TIMELINE_TYPE, timelineType);
        this.context.commit(CommunityMutationType.SET_FILTER, payload);
        this.context.commit(CommunityMutationType.IS_FILTER, true);
        return CommunityService.getTimelineList({timelineType, page, ...filterInfo})
            .then((data: any) => {
               this.context.commit(CommunityMutationType.UPDATE_TIMELINE_LIST, {
                   timelineItems: data.contents,
                   count: data.contentCount,
                   size: data.pageSize,
                   end: data.pageEnd
               });
               return Promise.resolve(data.contents);
            });
    }

    @Action({rawError: true})
    private [CommunityActionType.FAN_POST_LIST](payload: {
        page: number,
        fanQueryType?: string,
        publishYN?: string,
        query?: string,
        memberSeq?: string | number,
    }): Promise<any> {
        // const {page, filterInfo} = payload;
        return CommunityService.getFanPostList(payload) ///page, {...filterInfo}
            .then((data: any) => {
               this.context.commit(CommunityMutationType.UPDATE_FAN_POST_LIST, {
                  fanPostItems: data.contents,
                   count: data.contentCount,
                   size: data.pageSize,
                   end: data.pageEnd
               });
               return Promise.resolve(data.contents);
            });
    }

    @Action({rawError: true})
    private [CommunityActionType.FAN_POST_DETAIL_VIEW](postSeq: number): Promise<any> {
        return CommunityService.getFanPostDetail(postSeq)
            .then( (data: any) => {
                // console.log(data);
                this.context.commit(CommunityMutationType.UPDATE_FAN_POST_DETAIL, data);
                return Promise.resolve( data );
            });
    }

    @Action({rawError: true})
    private [CommunityActionType.REPORT_LIST](payload: {page?: number,
        filterInfo:{[key: string]: string}}): Promise<any> {
        const {page, filterInfo} = payload;
        return CommunityService.getReportList(page, {...filterInfo})
            .then((data: any) => {
                this.context.commit(CommunityMutationType.UPDATE_REPORT_LIST, {
                   reportItems: data.contents,
                   count: data.contentCount,
                   size: data.pageSize,
                   end: data.pageEnd
                });
                return Promise.resolve(data.contents);
        });
    }

    @Action({rawError: true})
    private [CommunityActionType.REPORT_DETAIL_VIEW](reportSeq: number): Promise<any> {
        return CommunityService.getReportDetail(reportSeq)
            .then((data: IReportDetail) => {
                this.context.commit(CommunityMutationType.UPDATE_REPORT_DETAIL, data);
                return Promise.resolve(data);
            });
    }

    @Action({rawError: true})
    private [CommunityActionType.POST_REPORT_MEMBER_LIST](payload: {postSeq: number, page?: number}): Promise<any> {
        const {postSeq, page} = payload;
        return CommunityService.getPostReportMemberList(postSeq, page)
            .then((data: any) => {
               this.context.commit(CommunityMutationType.UPDATE_REPORT_MEMBER_LIST, {
                  memberItems: data.contents,
                  count: data.contentCount,
                  size: data.pageSize,
                  end: data.pageEnd
               });
               return Promise.resolve(data.contents);
            });
    }

    @Action({rawError: true})
    private [CommunityActionType.REPLY_REPORT_MEMBER_LIST](payload: {replySeq: number, page?: number}): Promise<any> {
        const {replySeq, page} = payload;
        return CommunityService.getReplyReportMemberList(replySeq, page)
            .then((data: any) => {
                this.context.commit(CommunityMutationType.UPDATE_REPORT_MEMBER_LIST, {
                    memberItems: data.contents,
                    count: data.contentCount,
                    size: data.pageSize,
                    end: data.pageEnd
                });
                return Promise.resolve(data.contents);
            });
    }

}
