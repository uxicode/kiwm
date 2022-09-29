import { request } from '@/restApi';
import { Member } from '@/restApi/base';

class UserService {

    public static getMemberList( params: {
        page: number,
        memberStatusTypes?: string,
        genderTypes?: string,
        agebandTypes?: string,
        memberQueryType?: string,
        query?: string,
    }): Promise<any> {
        return request( 'get', `${ Member.BASE_URL }`, { ...params } );
    }

    public static getMemberListSearchToApply(page: number, params: {
        query: string,
        memberQueryType?: string
    }): Promise<any> {
        return request( 'get', `${ Member.BASE_URL }`, { page: page, ...params } );
    }

    ///api/member/{memberSeq}
    public static getMemberDetail(memberSeq: number): Promise<any> {
        return request( 'get', `${ Member.BASE_URL }/${ memberSeq }` );
    }

    ///api/admin/member/{memberSeq}/quit

    public static getWithDrawalMemberDetail(memberSeq: number): Promise<any> {
        return request( 'get', `${ Member.BASE_URL }/${ memberSeq }/quit` );
    }

    //강제 탈퇴 시키기
    public static deleteMemberByWithDraw(memberSeq: number): Promise<any> {
        return request( 'delete', `${ Member.BASE_URL }/${ memberSeq }/force` );
    }

    //영구 탈퇴 시키기
    public static deleteMemberByBlock(memberSeq: number): Promise<any> {
        return request( 'delete', `${ Member.BASE_URL }/${ memberSeq }/block` );
    }

    // 회원 비밀번호 초기화
    public static setChangePassword(memberSeq: number):  Promise<any> {
        return request( 'put', `${ Member.BASE_URL }/${ memberSeq }/reset-password` );
    }

    //회원 메모 수정
    public static setMemoByMemberSeq(memberSeq: number, memo: string): Promise<any> {
        return request( 'put', `${ Member.BASE_URL }/${ memberSeq }/memo`, {memo} );
    }

}


export {
    UserService
};
