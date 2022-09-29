import { request } from '@/restApi';
import { Point } from '@/restApi/base';

class MembershipService {
    // 누적포인트 조회
    public static getMembershipList(payload: {
        gradeQueryType?: string,
        pointQueryType?: string,
        query?: string,
        page?: number
    }): Promise<any> {
        return request('get', `${Point.BASE_URL}/point`, payload);
    }

    // 멤버십 상세 유저 정보
    public static getMembershipDetail(userSeq: number): Promise<any> {
        return request('get', `${Point.BASE_URL}/PointDetailUserInfo`, {userSeq});
    }

    // 포인트 입력
    public static setMembershipPoint(payload: {
        pointAmt: number, // 예상 포인트가 아니라 선택된 적립 혹은 차감 포인트 값
        pointDesc: string,
        pointState: string, // p  적립 / m 차감
        pointType: string, // 사유
        userSeq: number,
    }): Promise<any> {
        return request('post', `${Point.BASE_URL}/point`, payload);
    }

    // 포인트 내역
    public static getPointHistory(payload: {
        userSeq: string,
        addType?: string,
        kindQueryType?: string,
        startDateAt?: string,
        endDateAt?: string,
        page?: number
    }): Promise<any> {
        return request('get', `${Point.BASE_URL}/pointDetail`, payload);
    }

}

export {
    MembershipService
};
