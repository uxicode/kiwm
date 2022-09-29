import { request } from '@/restApi';
import { Dashboard } from '@/restApi/base';


class DashboardService {

    //대시보드 요
    public static getSummary(): Promise<any> {
        return request( 'get', `${ Dashboard.BASE_URL }/summary` );
    }

    //대시보드 배너 목록
    public static getBannerList(): Promise<any> {
        //data.contents / data.currentAt
        return request( 'get', `${ Dashboard.BASE_URL }/banner` );
    }

    //대시보드 문의 목록
    public static getContactList(): Promise<any> {
        //data.contents / data.currentAt
        return request( 'get', `${ Dashboard.BASE_URL }/contact` );
    }

    //대시보드 팬게시판 목록
    public static getFanList(): Promise<any> {
        //data.contents / data.currentAt
        return request( 'get', `${ Dashboard.BASE_URL }/fan` );
    }

}

export {
    DashboardService
};
