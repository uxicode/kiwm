import store from '@/store';
import {NavigationGuardNext, Route} from 'vue-router';

/**
 * 라우터 가드~ index.getters.isAuth 의 값에 따라 결정.
 * 즉 인증된 사용자이면 rqPath 로 지정된 경로로 접근되고 그렇지 않다면 루트경로(로그인)으로 이동시킨다.
 * @param to 대상 Route객체로 이동 ( to.path , to.name 등이 있다 )
 * @param from 현재 라우트로 오기전 라우트
 * @param next 파이프라인의 다음 훅으로 이동. 훅이 없는 경우 네비게이션은 승인.
 */
const getIsAuth = (to: Route, from: Route, next: NavigationGuardNext): void => {
  // console.log(to, from );
  const loginPath: string =`/login?rqPath=${encodeURIComponent(to.path)}`;
  // AuthModule 의 isAuth() 에서 - token 유무(true/false) 체크를 한다.
  //token 값이 있다면 해당하는 라우터로 진행 시킨다.
    const isAuth=store.getters['Auth/isAuth'];
    // const {token}=localStorage;
    // console.log( '인증 Auth=', isAuth );
    if (isAuth){
        return next();
    }
    // console.log( 'loginPath=', loginPath );
    next(loginPath);
};

export {getIsAuth};
