import {IGiftDetailForm, IGiftForm} from '@/model/event/IGift';
import {ILive, IModifyLive, IAddLiveEvent, IGame, ILiveDetail} from '@/model/event/ILive';
import { request } from '@/restApi';
import { Event } from '@/restApi/base';
import { IAttachImage } from '@/model/file/IAttachImage';
import { IADDGeneral, IModifyGeneral } from '@/model/event/IGeneral';

class EventService {

    // 경품 목록
    public static getGiftList(params: {
        page: number,
        itemStatusType?: string,
        itemType?: string,
        query?: string,
    }): Promise<any> {
        return request( 'get', `${ Event.BASE_URL }/item`, {...params} );
    }

    // 경품 등록
    public static addGift(payload: IGiftForm): Promise<any> {
        return request( 'post', `${ Event.BASE_URL }/item`, payload );
    }

    // 경품 상세
    public static getGiftDetail(itemSeq: number): Promise<any> {
        return request( 'get', `${ Event.BASE_URL }/item/${ itemSeq }` );
    }

    // 경품 수정
    public static setGiftDetail(itemSeq: number, payload: IGiftDetailForm): Promise<any> {
        return request('put', `${Event.BASE_URL}/item/${itemSeq}`, payload);
    }

    // 경품 삭제
    public static deleteGift(itemSeq: number): Promise<any> {
        return request( 'delete', `${ Event.BASE_URL }/item/${ itemSeq }` );
    }

    // 경품 이미지 업로드
    public static uploadGiftImage(image: any): Promise<any> {
        return request('upload', `${Event.BASE_URL}/item/image`, image);
    }

    /**
     * 이벤트 리스트
     * @param payload
     */
    public static getEventList( payload:{
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
    }):Promise<any> {
        return request( 'get', `${ Event.BASE_URL }/general`, { ...payload } );
    }

    /**
     * 이벤트 목록 ( 필터 적용버전 )
     * @param page
     * @param params
     */
    public static getEventListFilterApply(page:number, params:{
        bannerYN?: string,
        eventBenefitType?: string,
        eventDrawType?: string,
        eventStatusType?: string,
        startDateAt?: string,
        endDateAt?: string,
        query?: string,
    }):Promise<any> {
        return request( 'get', `${ Event.BASE_URL }/general`, { page: page, ...params } );
    }

    /**
     * 이벤트 등록
     * @param payload
     */
    public static setAddGeneralEvent( payload: IADDGeneral ):Promise<any> {
        return request( 'post', `${ Event.BASE_URL }/general`, payload );
    }

    /**
     * 일반 이벤트 상세
     * @param eventSeq
     */
    public static getGeneralEventDetail(eventSeq: number): Promise<any> {
        return request( 'get', `${ Event.BASE_URL }/general/${ eventSeq }` );
    }

    /**
     * 일반 이벤트 디테일 수정
     * @param eventSeq
     * @param payload
     */
    public static setModifyGeneralEventDetail(eventSeq: number, payload: IModifyGeneral): Promise<any> {
        return request( 'put', `${ Event.BASE_URL }/general/${ eventSeq }`, payload );
    }

    /**
     * 이벤트 긴급마감
     * @param eventSeq
     */
    public static setGeneralEventEnd(eventSeq: number ): Promise<any> {
        return request( 'put', `${ Event.BASE_URL }/general/${ eventSeq }/status/end` );
    }

    /**
     * 이벤트 삭제
     * @param eventSeq
     */
    public static deleteGeneralEvent(eventSeq: number ): Promise<any> {
        return request( 'delete', `${ Event.BASE_URL }/general/${ eventSeq }` );
    }

    /**
     * 이벤트 응모 현황
     * @param eventSeq
     * @param params
     */
    public static getGeneralEventStatusList( eventSeq: number, params:{
        startDateAt? : string,
        endDateAt? : string,
        agebandType?: string,
        genderType?: string,
        memberQueryType?: string,
        memberGradeType?: string,
        snsType?: string,
        query?: string,
        page?: number
    } ): Promise<any> {
        return request( 'get', `${ Event.BASE_URL }/general/${ eventSeq }/member/applicant`, params );
    }

    /**
     * 이벤트 당첨 목록
     * @param eventSeq
     * @param payload
     */
    public static getGeneralEventWinnerList(  eventSeq: number,  payload:{page?: number} ) {
        return request( 'get', `${ Event.BASE_URL }/general/${ eventSeq }/member/winner`, {payload} );
    }

    /**
     * 이벤트 자동 추첨
     * @param eventSeq
     */
    public static setGeneralEventDraw( eventSeq: number): Promise<any> {
        return request( 'put', `${ Event.BASE_URL }/general/${ eventSeq }/status/draw` );
    }

    /**
     * 이벤트 수동 추첨
     * @param eventSeq
     * @param payload
     */
    public static setGeneralEventDrawManual( eventSeq: number, payload:{ members:number[] }): Promise<any> {
        return request( 'put', `${ Event.BASE_URL }/general/${ eventSeq }/status/draw-manual`, payload );
    }

    ///api/admin/event/general/{eventSeq}/status/guide

    /**
     * 이벤트 안내 임시 저장
     * @param eventSeq
     * @param payload
     */
    public static setGeneralEventToSaveGuide( eventSeq: number, payload:{guide: string, guideImages?:string[]}): Promise<any> {
        return request( 'put', `${ Event.BASE_URL }/general/${ eventSeq }/status/guide`, payload );
    }

    /**
     * 이벤트 종료( 발표 )
     * @param eventSeq
     * @param payload
     */
    public static setGeneralEventClose( eventSeq: number, payload:{guide: string, guideImages?:string[]}): Promise<any> {
        return request( 'put', `${ Event.BASE_URL }/general/${ eventSeq }/status/close`, payload );
    }

    /**
     * 일반 이벤트 이미지  업로드
     * @param formData
     */
    public static uploadGeneralImage( formData: FormData ): Promise<IAttachImage> {
        return request('upload', `${Event.BASE_URL}/general/image`, formData );
    }

    /**
     * 일반이벤트 경품 목록
     * @param payload
     */
    public static getGeneralEventGiftList(payload:{itemType: string, itemDetailType?: string}):Promise<any>{
        const {itemType, itemDetailType}=payload;
        return request( 'get', `${ Event.BASE_URL }/general/item`, { itemType, itemDetailType } );
    }

    // 라이브 이벤트 목록
    public static getLiveEventList(params:{
        page?:number,
        startDateAt? : string,
        endDateAt? : string,
        eventBenefitType?: string,
        eventDrawType?: string,
        // bannerYN?: string,
        bannerPublishYN?: string,
        eventStatusType?: string,
        query?: string,
        memberSeq?: string | number,
        eventQueryType?: string,
    }): Promise<any> {
        return request('get', `${Event.BASE_URL}/live`, {...params });
    }



    // 라이브 이벤트 목록 ( 필터 적용버전 )
    public static getLiveListFilterApply(page:number, params:{
        startAt?: string,
        endAt?: string,
        eventBenefitType?: string,
        eventDrawType?: string,
        bannerYN?: string,
        eventStatusType?: string,
        query?: string,
    }):Promise<any> {
        return request( 'get', `${ Event.BASE_URL }/live`, { page: page, ...params } );
    }

    // 라이브 이벤트 등록
    public static addLiveEvent(params: IAddLiveEvent): Promise<ILive> {
        return request('post', `${Event.BASE_URL}/live`, params);
    }

    // 라이브 이벤트 상세
    public static getLiveEventDetail(eventSeq: number): Promise<ILiveDetail> {
        return request('get', `${Event.BASE_URL}/live/${eventSeq}`);
    }

    // 라이브 이벤트 수정
    public static setLiveEventDetail(eventSeq: number, params: IModifyLive): Promise<ILive> {
        return request('put', `${Event.BASE_URL}/live/${eventSeq}`, params);
    }

    // 라이브 이벤트 삭제
    public static deleteLiveEvent(eventSeq: number): Promise<any> {
        return request('delete', `${Event.BASE_URL}/live/${eventSeq}`);
    }

    // 라이브 이벤트 응모 목록
    public static getLiveEventStatusList(eventSeq: number, params: {
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
        return request('get', `${Event.BASE_URL}/live/${eventSeq}/member/applicant`, params);
    }

    // 라이브 이벤트 당첨 목록
    public static getLiveEventWinnerList(eventSeq: number, payload: { page?: number }): Promise<any> {
        return request('get', `${Event.BASE_URL}/live/${eventSeq}/member/winner`, {payload});
    }

    // 라이브 이벤트 종료
    public static setLiveEventClose(eventSeq: number, payload:{guide: string, guideImages?:string[]}): Promise<any> {
        return request('put', `${Event.BASE_URL}/live/${eventSeq}/status/close`, payload );
    }

    // 라이브 이벤트 자동 추첨
    public static setLiveEventDraw(eventSeq: number): Promise<any> {
        return request('put', `${Event.BASE_URL}/live/${eventSeq}/status/draw`);
    }

    // 라이브 이벤트 수동 추첨
    public static setLiveEventDrawManual(eventSeq: number, payload:{ members:number[] }): Promise<any> {
        return request('put', `${Event.BASE_URL}/live/${eventSeq}/status/draw-manual`, payload);
    }

    // 라이브 이벤트 긴급마감
    public static setLiveEventEnd(eventSeq: number): Promise<any> {
        return request('put', `${Event.BASE_URL}/live/${eventSeq}/status/end`);
    }

    // 라이브 이벤트 이미지 업로드
    public static uploadLiveEventImage(formData: FormData): Promise<IAttachImage> {
        return request('upload', `${Event.BASE_URL}/live/image`, formData);
    }

    // 라이브 이벤트 경품 목록
    public static getLiveEventGift(params: {itemType: string, itemDetailType?: string}): Promise<any> {
        return request('get', `${Event.BASE_URL}/live/item`, params);
    }

    // 라이브 이벤트 안내
    public static setLiveEventToSaveGuide( eventSeq: number, payload:{guide: string, guideImages?:string[]}): Promise<any> {
        return request( 'put', `${ Event.BASE_URL }/live/${ eventSeq }/status/guide`, payload );
    }

    // 라이브 이벤트 게임 목록
    public static getGameList(): Promise<IGame[]> {
        return request('get', `${Event.BASE_URL}/live/game`);
    }

}

export {
    EventService
};
