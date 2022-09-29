import { request } from '@/restApi';
import { Admin } from '@/restApi/base';


class AdminService {
    // 리프레시 토큰 전송
    public static getMe(): Promise<any> {
        return request( 'get', `${ Admin.BASE_URL }/me` );
    }

    /**
     * 현재 접속한 관리자계정 비번 변경
     * @param pwd
     */
    public static setPassword(pwd: { oldPassword: string, newPassword: string }) {
        return request( 'put', `${ Admin.BASE_URL }/me/password`, { ...pwd } );
    }

    public static getManageList(page: number,params: {
        query?: string,
        managerQueryType?: string
    }): Promise<any> {
        return request( 'get', `${ Admin.MANAGER }`, { page: page, ...params } );
    }

    public static getAdminListFilterToApply(page: number, params: {
        query?: string,
        managerQueryType?: string
    }): Promise<any> {
        return request( 'get', `${ Admin.MANAGER }`, { page: page, ...params } );
    }

    public static setAdminAccount(payload: { email: string, id: string, name: string, password: string }): Promise<any> {
        return request( 'post', `${ Admin.MANAGER }`, payload );
    }

    public static setCheckID(id: string): Promise<any> {
        return request( 'post', `${ Admin.MANAGER }/check-id`, { id } );
    }

    public static getAdminDetail(id: number): Promise<any> {
        return request( 'get', `${ Admin.MANAGER }/${id}`);
    }

    public static setAdminDetail(id: number, payload:{authorities:string[], email: string, name: string}): Promise<any> {
        return request( 'put', `${ Admin.MANAGER }/${id}`, payload);
    }
    public static delAdminDetail(id: number): Promise<any> {
        return request( 'delete', `${ Admin.MANAGER }/${id}`);
    }


}


export {
    AdminService
};
