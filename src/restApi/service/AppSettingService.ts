import { INoticeDetailForm, INoticeForm } from '@/model/appsetting/INotice';
import { request } from '@/restApi';
import { AppSetting } from '@/restApi/base';
import { ITermsDetailForm, ITermsForm } from "@/model/appsetting/ITerms";
import { IFaqForm, IFaqModifyForm } from "@/model/appsetting/IFaq";
import { IVersion } from '@/model/appsetting/IVersion';

class AppSettingService {

    // 공지 목록
    public static getNoticeList(params: {
        page?: number,
        postYn?: string,
        query?: string,
        regDateForm?: string,
        regDateTo?: string,
    }): Promise<any> {
        return request( 'get', `${ AppSetting.BASE_URL }/notice`, params );
    }

    public static getNoticeListFilterApply(page: number, params: {
        postYn?: string,
        query?: string,
        regDateForm?: string,
        regDateTo?: string,
    }): Promise<any> {
        return request( 'get', `${ AppSetting.BASE_URL }/notice`, { page: page, ...params } );
    }

    // 공지 등록
    public static addNotice(payload: INoticeForm): Promise<any> {
        return request( 'post', `${ AppSetting.BASE_URL }/notice`, payload );
    }


    // 공지 상세
    public static getNoticeDetail(postSeq: number): Promise<any> {
        return request( 'get', `${ AppSetting.BASE_URL }/notice/${ postSeq }` );
    }


    // 공지 수정
    public static setNoticeDetail(postSeq: number, payload: INoticeDetailForm): Promise<any> {
        return request( 'put', `${ AppSetting.BASE_URL }/notice/${ postSeq }`, payload );
    }


    // 공지 삭제
    public static deleteNotice(postSeq: number): Promise<any> {
        return request( 'delete', `${ AppSetting.BASE_URL }/notice/${ postSeq }` );
    }


    // 약관 목록
    public static getTermsList(): Promise<any> {
        return request( 'get', `${ AppSetting.BASE_URL }/terms` );
    }

    // 약관 등록
    public static addTerms(payload: ITermsForm): Promise<any> {
        return request( 'post', `${ AppSetting.BASE_URL }/terms`, payload );
    }


    // 약관 상세
    public static getTermsDetail(termSeq: number): Promise<any> {
        return request( 'get', `${ AppSetting.BASE_URL }/terms/${ termSeq }` );
    }


    // 약관 수정
    public static setTermsDetail(termSeq: number, payload: ITermsDetailForm): Promise<any> {
        return request( 'put', `${ AppSetting.BASE_URL }/terms/${ termSeq }`, payload );
    }


    // 약관 삭제
    public static deleteTerms(termSeq: number): Promise<any> {
        return request( 'delete', `${ AppSetting.BASE_URL }/terms/${ termSeq }` );
    }

    // 약관 수정상세팝업
    public static getTermsModifyDetailList(termSeq: number): Promise<any> {
        return request( 'get', `${ AppSetting.BASE_URL }/terms/history/${ termSeq }` );
    }

    //약관 순서 정렬
    public static setTermsListSort(payload: Array<{ termOrder: number, termSeq: number }>): Promise<any> {
        return request( 'post', `${ AppSetting.BASE_URL }/terms/updateOrder`, payload );
    }


    // 자주묻는질문 목록
    public static getFaqList(payload: { faqType?: string }): Promise<any> {
        return request( 'get', `${ AppSetting.BASE_URL }/faq`, { ...payload } );
    }

    // 자주묻는질문 등록
    public static addFaq(payload: IFaqForm): Promise<any> {
        return request( 'post', `${ AppSetting.BASE_URL }/faq`, payload );
    }

    // 자주묻는질문 상세
    public static getFaqDetail(postSeq: number): Promise<any> {
        return request( 'get', `${ AppSetting.BASE_URL }/faq/${ postSeq }` );
    }

    // 자주묻는질문 수정
    public static setFaqDetail(postSeq: number, payload: IFaqModifyForm): Promise<any> {
        return request( 'put', `${ AppSetting.BASE_URL }/faq/${ postSeq }`, payload );
    }

    // 자주묻는질문 삭제
    public static deleteFaq(postSeq: number): Promise<any> {
        return request( 'delete', `${ AppSetting.BASE_URL }/faq/${ postSeq }` );
    }

    //자주묻는질문 정렬
    public static setFaqListSort(faqs: number[ ]): Promise<any> {
        return request( 'put', `${ AppSetting.BASE_URL }/faq`, { faqs } );
    }

    // 자주묻는질문 수정
    public static getAppVersionList(): Promise<any> {
        return request( 'get', `${ AppSetting.BASE_URL }/version` );
    }

    public static setAppVersion( payload: IVersion ): Promise<any> {
        return request( 'put', `${ AppSetting.BASE_URL }/version`, payload );
    }


}

export {
    AppSettingService
};
