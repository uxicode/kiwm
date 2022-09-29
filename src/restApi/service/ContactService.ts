import {request} from '@/restApi';
import {Contact} from '@/restApi/base';

class ContactService {
    /**
     * 문의 목록
     * @param payload
     */
    public static getContactList(payload: {
        page?: number,
        contactStatusType?: string,
        contactType?: string,
        endDateAt?: string,
        startDateAt?: string
    }): Promise<any> {
        return request('get', `${Contact.BASE_URL}`, payload);
    }

    /**
     * 문의 상세
     * @param contactSeq
     */
    public static getContactDetail(contactSeq: number): Promise<any> {
        return request('get', `${Contact.BASE_URL}/${contactSeq}`);
    }

    /**
     * 문의 삭제
     * @param contactSeq
     */
    public static deleteContact(contactSeq: number, params: {contactRemoveType: string, memo: string}): Promise<any> {
        return request('delete', `${Contact.BASE_URL}/${contactSeq}`, params);
    }

    /**
     * 답변 등록
     * @param contactSeq
     * @param content
     */
    public static setContactAnswer(contactSeq: number, content: string): Promise<any> {
        return request('post', `${Contact.BASE_URL}/${contactSeq}/answer`, {content});
    }

}

export {
    ContactService
};
