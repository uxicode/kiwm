import { request } from '@/restApi';
import { Auth } from '@/restApi/base';
import { getRefreshToken } from '@/core/auth/utils';


class AuthService {

  public static login(uid: string, password: string): Promise<any> {
    return request( 'post', `${ Auth.BASE_URL }/login`, {
      id: uid,
      password: password,
      // accessTokenExpiresInSec: 20 //테스트 expire( 초 )
    } );
  }

  //리프레시 토큰 전송
  //accessToken: string | null,
  public static fetchRefreshToken(): Promise<any> {
    return request( 'post', `${ Auth.BASE_URL }/login-token`, {
      // accessToken: accessToken,
      refreshToken: getRefreshToken()
      // accessTokenExpiresInSec: 30
    });
  }

}


export {
  AuthService
};
