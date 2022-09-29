import { request } from '@/restApi';
import { Point } from '@/restApi/base';
import { IModifyPointGuide, IPoint } from '@/model/point/IPoint';


class PointService {

    public static getPointList(): Promise<any> {
        return request( 'get', `${ Point.BASE_URL }/meberGrade` );
    }

    public static setPointList( gradeList:IPoint[] ): Promise<any> {
        return request( 'put', `${ Point.BASE_URL }/memberGrade`, gradeList );
    }

    //등급/포인트 가이드 조회
    public static getPointGuide(): Promise<any> {
        return request( 'get', `${ Point.BASE_URL }/pointGuide` );
    }

    //등급/포인트 가이드 수정
    public static setPointGuide(item: IModifyPointGuide[]): Promise<any> {
        return request( 'put', `${ Point.BASE_URL }/pointGuide`, item );
    }

    //포인트 관리 - 포인트 정책 관리
    public static getPointPolicy(): Promise<any> {
        return request( 'get', `${ Point.BASE_URL }/pointPolicy` );
    }

    //포인트 관리 - 포인트 정책 관리 수정
    public static setPointPolicy(item:Array<{
        pointAmt: number,
        policyName: string,
        policySeq:number,
        description?: string
    }>): Promise<any> {
        return request( 'put', `${ Point.BASE_URL }/pointPolicy`, item );
    }

}


export {
    PointService
};
