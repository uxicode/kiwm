import {request} from '@/restApi';
import { Notification} from '@/restApi/base';


class NotiService {
    // 푸시 목록
    public static getPushList(payload: {
        page?: number,
        startDateAt?: string,
        endDateAt?: string,
        pushDetailType?: string,
        pushQueryType?: string,
        pushSendStatusType?: string,
        pushSendType?: string,
        pushType?: string,
        query?: string
    }): Promise<any> {
        return request('get', `${Notification.BASE_URL}/push`, payload);
    }

    // 푸시 등록
    public static addPush(payload: {
        content: string,
        eventSeq: number,
        pushDetailType: string,
        pushSendType: string,
        pushType: string,
        sendDateAt: string,
        sendTimeAt: string,
        title: string,
        url: string
    }): Promise<any> {
        return request('post', `${Notification.BASE_URL}/push`, payload);
    }

    // 푸시 상세
    public static getPushDetail(pushSeq: number): Promise<any> {
        return request('get', `${Notification.BASE_URL}/push/${pushSeq}`);
    }

    // 푸시 수정
    public static modifyPush(pushSeq: number, payload: {
        content: string,
        eventSeq: number,
        pushDetailType: string,
        pushSendType: string,
        pushType: string,
        sendDateAt: string,
        sendTimeAt: string,
        title: string,
        url: string
    }): Promise<any> {
        return request('put', `${Notification.BASE_URL}/push/${pushSeq}`, payload);
    }

    // 푸시 삭제
    public static deletePush(pushSeq: number): Promise<any> {
        return request('delete', `${Notification.BASE_URL}/push/${pushSeq}`);
    }

    // 푸시 재발송
    public static setPushRetry(pushSeq: number): Promise<any> {
        return request('post', `${Notification.BASE_URL}/push/${pushSeq}/retry`);
    }

    // 푸시 이벤트 목록
    public static getPushEventList(pushType: string): Promise<any> {
        return request('get', `${Notification.BASE_URL}/push/event`, {pushType});
    }

    // 푸시 템플릿
    public static getPushTemplate(payload: {
        eventSeq?: number,
        pushDetailType?: string,
        pushType?: string
    }): Promise<any> {
        return request('get', `${Notification.BASE_URL}/push/template`, payload);
    }

    // 이메일 목록
    public static getEmailList(payload: {
        page?: number,
        startDateAt?: string,
        endDateAt?: string,
        emailType?: string,
        emailCaseType?: string,
        emailCaseDetailType?: string
    }): Promise<any> {
        return request('get', `${Notification.BASE_URL}/email`, payload);
    }

    // 이메일 등록
    public static addEmailPush(effectiveDateAt: string): Promise<any> {
      return request('post', `${Notification.BASE_URL}/email`, {effectiveDateAt});
    }

    // 이메일 템플릿 목록
    public static getEmailTemplateList(): Promise<any> {
        return request('get', `${Notification.BASE_URL}/email/template`, {});
    }

}

export {
    NotiService
};
