import { request } from '@/restApi';
import { Banner,  MainImg } from '@/restApi/base';
import { IAddBanner, IModifyBanner } from '@/model/banner/IBanner';


class BannerService {

    public static getMainImage(): Promise<any> {
        return request( 'get', `${ MainImg.BASE_URL }/background`);
    }

    public static uploadHomeImage( formData: FormData ): Promise<any> {
        return request('upload', `${MainImg.BASE_URL}/background`, formData );
    }

    public static getBannerList( ): Promise<any> {
        return request( 'get', `${ Banner.BASE_URL }` );
    }
    //배너 정렬( 순번 변경 )
    public static setBannerListSort( banners: number[ ]): Promise<any> {
        return request( 'put', `${ Banner.BASE_URL }`, { banners } );
    }

    //배너 등록
    public static setBannerItem( banners: IAddBanner ): Promise<any> {
        return request( 'post', `${ Banner.BASE_URL }`, banners );
    }

    //배너 상세
    public static getBannerDetail(bannerSeq:number): Promise<any> {
        return request( 'get', `${ Banner.BASE_URL }/${bannerSeq}` );
    }

    //배너 상세 수정
    public static setBannerDetail(bannerSeq:number, payload:IModifyBanner): Promise<any> {
        return request( 'put', `${ Banner.BASE_URL }/${bannerSeq}`, payload );
    }

    //배너 이미지 등록
    public static uploadBannerImage(formData: FormData): Promise<any> {
        return request( 'post', `${ Banner.BASE_URL }/image`, formData );
    }

    //배너 상세
    public static deleteBanner(bannerSeq:number): Promise<any> {
        return request( 'delete', `${ Banner.BASE_URL }/${bannerSeq}` );
    }

    ///api/admin/banner/event/general
    //배너 - 일반 이벤트 목록 가져오기
    public static getEventListByBanner(payload:{query?:string}): Promise<any> {
        return request( 'get', `${ Banner.BASE_URL }/event/general`, payload );
    }

    //배너 - 공지사항 목록~
    public static getNoticeListByBanner(): Promise<any> {
        return request( 'get', `${ Banner.BASE_URL }/notice` );
    }

}


export {
    BannerService
};
