import {IGame, ILive, ILiveDetail } from '@/model/event/ILive';
import {Promise} from 'es6-promise';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { EventService } from '@/restApi';
import {IGift} from '@/model/event/IGift';
import { EventMgMutationType } from '@/store/moduleType/EventManageMutationType';
import { EventMgActionType } from '@/store/moduleType/EventManageActionType';
import { IGeneral, IGeneralDetail } from '@/model/event/IGeneral';
import { IEnterEvent } from '@/model/event/IEnterEvent';

@Module({
    namespaced: true,
})
export default class EventManageModule extends VuexModule {
    private eventItems: IGeneral[]=[];
    private eventListTotalNum: number=0;
    private eventListPageEndNum: number=0;
    private eventListPageSizeNum: number=0;

    private gifts: IGift[]=[];
    private giftTotalNum: number = 0;
    private giftPageSizeNum: number = 0;
    private giftPageEndNum: number = 0;
    private gift: IGift | null = null;

    private liveEvents: ILive[]=[];
    private liveListTotalNum: number=0;
    private liveListPageEndNum: number=0;
    private liveListPageSizeNum: number=0;
    private liveEventDetail: ILiveDetail | null = null;

    private gameList: IGame[] = [];
    //라이브 이벤트 응모 현황 데이터
    private enterLiveEvt: IEnterEvent[]=[];
    private enterLiveEvtListTotalNum: number=0;
    private enterLiveEvtListPageEndNum: number=0;
    private enterLiveEvtListPageSizeNum: number=0;

    private liveEvtWinner: IWinner[]=[];
    private liveEvtWinnerTotalNum: number = 0;
    private liveEvtWinnerPageSizeNum: number = 0;
    private liveEvtWinnerPageEndNum: number = 0;

    private generalEventDetail: IGeneralDetail | null =null;

    //이벤트 응모 현황 데이터
    private enterGeneralEvt:IEnterEvent[]=[];
    private enterGeneralEvtListTotalNum: number = 0;
    private enterGeneralEvtListPageEndNum:number=0;
    private enterGeneralEvtListPageSizeNum: number=0;

    private generalEvtWinner: IWinner[]=[];
    private generalEvtWinnerTotalNum: number = 0;
    private generalEvtWinnerPageSizeNum: number = 0;
    private generalEvtWinnerPageEndNum: number = 0;


    private selectedFilterOptions: { [key: string]: string }={};
    private filterChk: boolean=false;


    get isFilter(): boolean {
        return this.filterChk;
    }

    get selectedFilterData() {
        return this.selectedFilterOptions;
    }

    //start :  일반이벤트 데이터 ================================================
    get eventItemList(): IGeneral[] {
        return this.eventItems;
    }

    get eventListTotal(): number {
        return this.eventListTotalNum;
    }

    get eventListPageEnd(): number {
        return this.eventListPageEndNum;
    }

    get eventListPageSize(): number {
        return this.eventListPageSizeNum;
    }
    //일반이벤트 상세
    get eventDetailData(): IGeneralDetail | null{
        return this.generalEventDetail;
    }
    //end :  일반이벤트 데이터 ================================================


    //start : 응모현황 보기 데이터 ================================================
    // 이벤트 응모 현황 데이터
    get enterGeneralEventData(): IEnterEvent[]{
        return this.enterGeneralEvt;
    }

    get enterGeneralEvtListTotal(): number {
        return this.enterGeneralEvtListTotalNum;
    }

    get enterGeneralEvtListPageEnd(): number {
        return this.enterGeneralEvtListPageEndNum;
    }

    get enterGeneralEvtListPageSize(): number {
        return this.enterGeneralEvtListPageSizeNum;
    }
    //end : 응모현황 보기 데이터 ================================================


    //start : 당첨자 보기 ================================================
    get generalEvtWinnerData(): IWinner[] {
        return this.generalEvtWinner;
    }
    get generalEvtWinnerListTotal(): number {
        return this.generalEvtWinnerTotalNum;
    }
    get generalEvtWinnerListPageEnd(): number {
        return this.generalEvtWinnerPageSizeNum;
    }
    get generalEvtWinnerListPageSize(): number {
        return this.generalEvtWinnerPageSizeNum;
    }
    //end : 당첨자 보기 ================================================

    get giftList(): IGift[] {
        return this.gifts;
    }

    get giftTotal(): number {
        return this.giftTotalNum;
    }

    get giftPageSize(): number {
        return this.giftPageSizeNum;
    }

    get giftPageEnd(): number {
        return this.giftPageEndNum;
    }

    get giftDetail(): IGift | null {
        return this.gift;
    }

    get liveEventList(): ILive[] {
        return this.liveEvents;
    }

    get liveListTotal(): number {
        return this.liveListTotalNum;
    }

    get liveListPageEnd(): number {
        return this.liveListPageEndNum;
    }

    get liveListPageSize(): number {
        return this.liveListPageSizeNum;
    }

    get liveEventDetailData(): ILiveDetail | null {
        return this.liveEventDetail;
    }

    get gameData(): IGame[] {
        return this.gameList;
    }

    get enterLiveEvtData(): IEnterEvent[] {
        return this.enterLiveEvt;
    }

    get enterLiveEvtListTotal(): number {
        return this.enterLiveEvtListTotalNum;
    }

    get enterLiveEvtListPageEnd(): number {
        return this.enterLiveEvtListPageEndNum;
    }

    get enterLiveEvtListPageSize(): number {
        return this.enterLiveEvtListPageSizeNum;
    }

    get liveEvtWinnerData(): IWinner[] {
        return this.liveEvtWinner;
    }

    get liveEvtWinnerListTotal(): number {
        return this.liveEvtWinnerTotalNum;
    }

    get liveEvtWinnerListPageSize(): number {
        return this.liveEvtWinnerPageSizeNum;
    }

    get liveEvtWinnerListPageEnd(): number {
        return this.liveEvtWinnerPageEndNum;
    }

    @Mutation
    public [EventMgMutationType.IS_FILTER]( isFilter: boolean ): void {
        this.filterChk=isFilter;
    }

    @Mutation
    public [EventMgMutationType.SET_FILTER]( filterOptions: {[key: string]: string} ): void {
        this.selectedFilterOptions=filterOptions;
    }

    @Mutation
    public [EventMgMutationType.RESET_FILTER](): void {
        this.filterChk=false;
    }

    @Mutation
    public [EventMgMutationType.GIFT_TOTAL](total: number): void {
        this.giftTotalNum=total;
    }

    @Mutation
    public [EventMgMutationType.GIFT_PAGE_SIZE](num: number): void {
        this.giftPageSizeNum=num;
    }

    @Mutation
    public [EventMgMutationType.GIFT_PAGE_END](num: number): void {
        this.giftPageEndNum=num;
    }

    @Mutation
    public [EventMgMutationType.UPDATE_GIFT_LIST](payload: {gifts: IGift[], count: number, size: number, end: number}): void {
        const {gifts, count, size, end} = payload;
        this.gifts = gifts;
        this.giftTotalNum = count;
        this.giftPageSizeNum = size;
        this.giftPageEndNum = end;
    }

    @Mutation
    public [EventMgMutationType.UPDATE_GIFT_DETAIL](gift: IGift): void {
        this.gift = gift;
    }

    @Mutation
    public [EventMgMutationType.UPDATE_EVENT_LIST](items: { eventItems: IGeneral[], count: number, size: number, end: number }): void {
        // console.log('token=', this.token);
        const { eventItems, count, size, end }=items;
        this.eventItems = eventItems;
        this.eventListTotalNum = count;
        this.eventListPageSizeNum = size;
        this.eventListPageEndNum = end;
    }

    @Mutation
    public [EventMgMutationType.UPDATE_LIVE_LIST](items: { liveEvents: ILive[], count: number, size: number, end: number }): void {
        // console.log('token=', this.token);
        const { liveEvents, count, size, end }=items;
        this.liveEvents = liveEvents;
        this.liveListTotalNum = count;
        this.liveListPageSizeNum = size;
        this.liveListPageEndNum = end;
    }

    @Mutation
    public [EventMgMutationType.UPDATE_LIVE_DETAIL](data: ILiveDetail): void {
        this.liveEventDetail = data;
    }

    @Mutation
    public [EventMgMutationType.UPDATE_ENTER_LIVE_EVENT](payload: {items: IEnterEvent[], count: number, size: number, end: number}): void {
        const {items, count, size, end} = payload;
        this.enterLiveEvt = items;
        this.enterLiveEvtListTotalNum = count;
        this.enterLiveEvtListPageSizeNum = size;
        this.enterLiveEvtListPageEndNum = end;
    }

    @Mutation
    public [EventMgMutationType.UPDATE_LIVE_EVENT_WINNER](payload: {items: any[], count: number, size: number, end: number}): void {
        const {items, count, size, end} = payload;
        this.liveEvtWinner = items;
        this.liveEvtWinnerTotalNum= count;
        this.liveEvtWinnerPageSizeNum = size;
        this.liveEvtWinnerPageEndNum = end;
    }

    @Mutation
    public [EventMgMutationType.SET_GAME](data: IGame[]) {
        this.gameList = data;
    }

    @Mutation
    public [EventMgMutationType.UPDATE_GENERAL_DETAIL](data: IGeneralDetail): void {
        this.generalEventDetail = data;
    }

    //이벤트 응모 현황 데이터 업데이트.
    @Mutation
    public [EventMgMutationType.UPDATE_ENTER_GENERAL_EVENT](payload: {items: IEnterEvent[], count: number, size: number, end: number}): void {
        const {items, count, size, end} = payload;
        this.enterGeneralEvt = items;
        this.enterGeneralEvtListTotalNum= count;
        this.enterGeneralEvtListPageSizeNum = size;
        this.enterGeneralEvtListPageEndNum = end;
    }

    //다엄자 보기 데이터 업데이트
    @Mutation
    public [EventMgMutationType.UPDATE_GENERAL_EVENT_WINNER](payload: {items: any[], count: number, size: number, end: number}): void {
        const {items, count, size, end} = payload;
        this.generalEvtWinner = items;
        this.generalEvtWinnerTotalNum= count;
        this.generalEvtWinnerPageSizeNum = size;
        this.generalEvtWinnerPageEndNum = end;
    }

    //UPDATE_GENERAL_EVENT_WINNER

    @Action( { rawError: true } )
    public [EventMgActionType.EVENT_LIST](payload:{
        page?:number,
        bannerPublishYN?: string,
        eventBenefitType?: string,
        eventDrawType?: string,
        eventStatusType?: string,
        startDateAt?: string,
        endDateAt?: string,
        query?: string,
        memberSeq?: string | number,
        eventQueryType?: string,
    }): Promise<IGeneral[]> {
        return EventService.getEventList( payload )
            .then( (data: any)=>{
                this.context.commit( EventMgMutationType.UPDATE_EVENT_LIST,
                    {
                        eventItems: data.contents,
                        count: data.contentCount,
                        size: data.pageSize,
                        end: data.pageEnd
                    } );
                return Promise.resolve( data.contents );
            } ).catch( (error: any)=>{
                return Promise.reject( error );
            } );
    }


    @Action( { rawError: true } )
    public [EventMgActionType.GENERAL_DETAIL_VIEW](payload:{eventSeq: number}): Promise<IGeneralDetail[]> {
        const { eventSeq }=payload;
        return EventService.getGeneralEventDetail(eventSeq)
            .then( (data: any)=>{
                // console.log( 'filterToData=', filterToData );
                this.context.commit( EventMgMutationType.UPDATE_GENERAL_DETAIL, data );
                return Promise.resolve( data );
            } )
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }

    /**
     * 이벤트 응모 현황 데이터 받기.
     * @param payload
     */
    @Action( { rawError: true } )
    public [EventMgActionType.ENTER_GENERAL_EVENT](payload:{
        eventSeq: number,
        page?: number,
        startDateAt? : string,
        endDateAt? : string,
        agebandType?: string,
        genderType?: string,
        memberQueryType?: string,
        memberGradeType?: string,
        snsType?: string,
        query?: string,
    }): Promise<IEnterEvent[]> {
        const { eventSeq, page, startDateAt, endDateAt, agebandType, genderType, memberQueryType, memberGradeType, snsType, query}=payload;
        return EventService.getGeneralEventStatusList(eventSeq, {page, startDateAt, endDateAt, agebandType, genderType, memberQueryType, memberGradeType, snsType, query} )
            .then( (data: any)=>{
                // console.log( 'filterToData=', filterToData );
                this.context.commit( EventMgMutationType.UPDATE_ENTER_GENERAL_EVENT, {
                    items: data.contents,
                    count: data.contentCount,
                    size: data.pageSize,
                    end: data.pageEnd
                } );
                return Promise.resolve( data.contents );
            } )
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }


    //당첨자 보기
    @Action( { rawError: true } )
    public [EventMgActionType.GENERAL_EVENT_WINNER](payload:{
        eventSeq: number,
        page?: number,
    }): Promise<any[]> {
        const { eventSeq, page }=payload;
        return EventService.getGeneralEventWinnerList( eventSeq, { page } )
            .then( (data: any)=>{
                // console.log( 'filterToData=', filterToData );
                this.context.commit( EventMgMutationType.UPDATE_GENERAL_EVENT_WINNER, {
                    items: data.contents,
                    count: data.contentCount,
                    size: data.pageSize,
                    end: data.pageEnd
                } );
                return Promise.resolve( data.contents );
            } )
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }


    @Action( { rawError: true } )
    public [EventMgActionType.GIFT_LIST](payload: {
        page: number,
        itemStatusType?: string,
        itemType?: string,
        query?: string,
    }): Promise<any> {
        return EventService.getGiftList(payload)
            .then( (data: any)=>{
                this.context.commit( EventMgMutationType.UPDATE_GIFT_LIST, {
                    gifts: data.contents,
                    count: data.contentCount,
                    size: data.pageSize,
                    end: data.pageEnd
                } );
                return Promise.resolve( data.contents );
            } )
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }


    @Action({rawError: true})
    public [EventMgActionType.GIFT_DETAIL](itemSeq: number): Promise<IGift> {
        return EventService.getGiftDetail(itemSeq)
            .then((data: any) => {
                // console.log(data);
                this.context.commit(EventMgMutationType.UPDATE_GIFT_DETAIL, data);
                return Promise.resolve(data);
            })
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }

    @Action({rawError: true})
    public [EventMgActionType.LIVE_LIST](payload:{
        page?:number,
        startDateAt? : string,
        endDateAt? : string,
        eventBenefitType?: string,
        eventDrawType?: string,
        bannerPublishYN?: string,
        eventStatusType?: string,
        query?: string,
        memberSeq?: string | number,
        eventQueryType?: string,
    }): Promise<ILive[]> {
        return EventService.getLiveEventList( payload )
            .then( (data: any)=>{
                this.context.commit( EventMgMutationType.UPDATE_LIVE_LIST,
                    {
                        liveEvents: data.contents,
                        count: data.contentCount,
                        size: data.pageSize,
                        end: data.pageEnd
                    } );
                return Promise.resolve( data.contents );
            } )
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }


    @Action({rawError: true})
    public [EventMgActionType.LIVE_DETAIL_VIEW](eventSeq: number): Promise<ILiveDetail> {
        return EventService.getLiveEventDetail(eventSeq)
            .then((data: any) => {
                // console.log(data);
                this.context.commit(EventMgMutationType.UPDATE_LIVE_DETAIL, data);
                return Promise.resolve(data);
            })
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }

    @Action({rawError: true})
    public [EventMgActionType.GAME_LIST](): Promise<IGame[]> {
        return EventService.getGameList()
            .then(( data: any)=> {
                // console.log(data);
                this.context.commit(EventMgMutationType.SET_GAME, data);
                return Promise.resolve(data);
            })
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }

    @Action({rawError: true})
    public [EventMgActionType.ENTER_LIVE_EVENT](payload: {
        eventSeq: number,
        startDateAt? : string,
        endDateAt? : string,
        agebandType?: string,
        genderType?: string,
        memberQueryType?: string,
        memberGradeType?: string,
        snsType?: string,
        query?: string,
        page?: string
    }): Promise<any> {
        const { eventSeq, startDateAt, endDateAt, agebandType, genderType, memberQueryType, memberGradeType, snsType, query, page }=payload;
        return EventService.getLiveEventStatusList(eventSeq, {startDateAt, endDateAt, agebandType, genderType, memberQueryType, memberGradeType, snsType, query, page})
            .then((data: any) => {
                this.context.commit(EventMgMutationType.UPDATE_ENTER_LIVE_EVENT, {
                    items: data.contents,
                    count: data.contentCount,
                    size: data.pageSize,
                    end: data.pageEnd
                });
                return Promise.resolve(data.contents);
            })
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }

    @Action( { rawError: true } )
    public [EventMgActionType.LIVE_EVENT_WINNER](payload:{
        eventSeq: number,
        page?: number,
    }): Promise<any[]> {
        const { eventSeq, page }=payload;
        return EventService.getLiveEventWinnerList( eventSeq, { page } )
            .then( (data: any)=>{
                // console.log( 'filterToData=', filterToData );
                this.context.commit( EventMgMutationType.UPDATE_LIVE_EVENT_WINNER, {
                    items: data.contents,
                    count: data.contentCount,
                    size: data.pageSize,
                    end: data.pageEnd
                } );
                return Promise.resolve( data.contents );
            } )
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }


}
