import { request } from '@/restApi';
import { Community } from '@/restApi/base';

class CommunityService {

    // 타임라인 목록
    public static getTimelineList(payload: {timelineType: string, page?: number, isUse?: boolean, query?: string}): Promise<any> {
        return request('get', `${Community.BASE_URL}/timeline`, payload);
    }

    // 타임라인 갱신
    public static updateTimelineList(): Promise<any> {
        return request('put', `${Community.BASE_URL}/timeline`);
    }

    // 타임라인 게시 끔
    public static setTimelinePostOff(postSeq: number): Promise<any> {
        return request('put', `${Community.BASE_URL}/timeline/${postSeq}/off`);
    }

    // 타임라인 게시 켬
    public static setTimelinePostOn(postSeq: number): Promise<any> {
        return request('put', `${Community.BASE_URL}/timeline/${postSeq}/on`);
    }

    // 팬 게시판 - 글 목록
    public static getFanPostList(payload: {
        page: number,
        fanQueryType?: string,
        publishYN?: string,
        query?: string,
        memberSeq?: string | number,
    }): Promise<any> {
        return request('get', `${Community.BASE_URL}/fan`, { ...payload});
    }

    // 팬 게시판 - 글 상세
    public static getFanPostDetail(postSeq: number): Promise<any> {
        return request('get', `${Community.BASE_URL}/fan/${postSeq}`);
    }

    // 팬 게시판 - 글 비공개
    public static setFanPostOff(postSeq: number): Promise<any> {
        return request('put', `${Community.BASE_URL}/fan/${postSeq}/off`);
    }

    // 팬 게시판 - 글 공개
    public static setFanPostOn(postSeq: number): Promise<any> {
        return request('put', `${Community.BASE_URL}/fan/${postSeq}/on`);
    }

    // 팬 게시판 - 댓글 비공개
    public static setFanReplyOff(postSeq: number, replies: number[]): Promise<any> {
        return request('put', `${Community.BASE_URL}/fan/${postSeq}/reply/off`, {replies});
    }

    // 팬 게시판 - 댓글 공개
    public static setFanReplyOn(postSeq: number, replies: number[]): Promise<any> {
        return request('put', `${Community.BASE_URL}/fan/${postSeq}/reply/on`, {replies});
    }

    // 신고 목록
    public static getReportList(page: number=1, payload: {
        startDateAt?: string,
        endDateAt?: string,
        reportTargetType?: string,
        reportReasonType?: string,
        publishYN?: string,
        reportQueryType?: string,
        query?: string
    }): Promise<any> {
        return request('get', `${Community.BASE_URL}/report`, {page, ...payload});
    }

    // 신고 상세
    public static getReportDetail(reportSeq: number): Promise<any> {
        return request('get', `${Community.BASE_URL}/report/${reportSeq}`);
    }

    // 글 신고 목록
    public static getPostReportMemberList(postSeq: number, page: number=1): Promise<any> {
        return request('get', `${Community.BASE_URL}/report/post/${postSeq}`, page);
    }

    // 댓글 신고 목록
    public static getReplyReportMemberList(replySeq: number, page: number=1): Promise<any> {
        return request('get', `${Community.BASE_URL}/report/reply/${replySeq}`, page);
    }

}

export {
    CommunityService
};
