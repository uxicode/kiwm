import { request } from '@/restApi';
import { Crowd } from '@/restApi/base';

class CrowdService {

    /**
     * 리스트 가져오기
     * @param params
     */
    public static getList( params: {
        level?: string, // H: 상, M: 중, L: 하
        zoneType?: string,
    }): Promise<any> {
        return request( 'get', `${ Crowd.BASE_URL }`, { ...params } );
    }

    /**
     * 혼잡도 등록
     * @param params
     */
    public static setItem( params: {
        cctvId: number,  //카메라 아이디
        count: number,  //
        crowdSeq: number,   // primary key
        low: number, //중
        mid: number,  //하
        zoneName: string, //구역명 - 통로 4-5 / C 출입구
        zoneType: string  //유형 - 통로 G / 게이트 P
    }): Promise<any> {
        return request( 'post', `${ Crowd.BASE_URL }`, { ...params } );
    }

    /**
     * 혼잡도 수정
     * @param crowdSeq
     * @param params
     */
    public static modifyItem( crowdSeq: number, params: {
        cctvId: number,  //카메라 아이디
        count: number,  //
        crowdSeq: number,   // primary key
        low: number, //중
        mid: number,  //하
        zoneName: string, //구역명 - 통로 4-5 / C 출입구
        zoneType: string  //유형 - 통로 G / 게이트 P
    }): Promise<any> {
        return request( 'put', `${ Crowd.BASE_URL }/${crowdSeq}` , {...params} );
    }

    /**
     * 혼잡도 아이템 삭제
     * @param crowdSeq
     * @param params
     */
    public static deleteItem( crowdSeq: number): Promise<any> {
        return request( 'delete', `${ Crowd.BASE_URL }/${crowdSeq}`  );
    }

    /**
     * 혼잡도 아이템 excel 다운로드
     * @param params
     */
    public static  downloadCrowdExcel( params: {
        startAt: string
        endAt: string,
    }): Promise<any> {
        return request( 'post', `${ Crowd.BASE_URL }/excelDown`, {...params},  true);
    }


    public static cellToDownCrowdExcel( seq: number, params: {
        startAt: string
        endAt: string,
    }): Promise<any> {
        return request( 'post', `${ Crowd.BASE_URL }/excelDown/${seq}`, {...params},  true);
    }

}


export {
    CrowdService
};
