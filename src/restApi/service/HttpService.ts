import axios, { AxiosResponse } from 'axios';
import JwtService from '@/core/auth/jwtService';
import store from '@/store';
import { LoadingMutationType } from '@/store/moduleType/LoadingMutationType';
import { AlertMutationTypes } from '@/store/moduleType/AlertMutationTypes';

// import router from '@/router';
// swagger - http://ec2-15-165-28-115.ap-northeast-2.compute.amazonaws.com:8090/api/swagger-ui/index.html#/test
//http://ec2-15-165-28-115.ap-northeast-2.compute.amazonaws.com:8080/api
////.env 파일 환경 변수는 무조건 VUE_APP_ 이라는 prefix 가 서두에 붙어야 한다.
axios.defaults.baseURL=process.env.VUE_APP_API_BASE_URL;
axios.defaults.headers.post['Content-Type']='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin']='*';

//json web token 설정.
const jwt=new JwtService( axios );

type RequestAllKey='method' | 'url' | 'params' | 'headers' | 'data' | 'onDownloadProgress' | 'responseType';
//타입 T의 프로퍼티의 집합 K로 타입을 구성한다. 이 유틸리티는 타입의 프로퍼티들을 다른 타입에 매핑시키는 데 사용될 수 있다. Record<K, V>로 쓰인다. 여기서 K는 key 이고, V는 Value 다.
type AjaxType=Record<RequestAllKey, any>;
// reqCall 인자값이 필요한 이유는 최종 데이터 리턴으로 받을 때 순수하게 response 값을 받아야 할 때가 있다
//( 예 파일 다운로드 할때- response 의 content-disposition 와  content-type 이 필요로 하기에 순수하게 response 를 넘겨줘야 한다.
const request=(method: string, url: string, data: any | null=null, reqCall: boolean | null=null): Promise<any>=>{
    // console.log( 'data status=', method, data, url );
    //로딩 바 노출
    store.commit( `Auth/${ LoadingMutationType.IS_LOADING }`, true );
    let reqObj: Partial<AjaxType>;

    if (method === 'get') {
        reqObj=(data !== null) ? { method, url, params: data } : { method, url };
    } else if (method === 'upload') {
        reqObj={
            method: 'post',
            url,
            data,
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8;'
            }
        };
    } else {
        //method 가 post 이면서 파일 다운로드 형식일 때
        if (reqCall !== null && method==='post') {
            reqObj={
                method,
                url,
                data,
                responseType:'blob'  // 파일 다운로드시 중요.
            };
        }else{
            reqObj={ method, url, data };
        }
    }
    return axios( reqObj ).then( (res: AxiosResponse)=>{
        // console.log( res.data )
        // 응답하는 값 전체를 받아야 할 경우 4번째 인자값이 true ( 보통 파일 다운로드시 )
        setTimeout( ()=>{
            //로딩 바 숨김.
            store.commit( `Auth/${ LoadingMutationType.IS_LOADING }`, false );
        }, 300 );
        return ( reqCall !==null )? res : res.data;
    } ).catch( (error: any)=>{
        //로딩 바 숨김.
        store.commit( `Auth/${ LoadingMutationType.IS_LOADING }`, false );
        //여기서 별도로 error.response 를 넘겨 줘야 각 api 호출시 catch 부분에서 error 의 인자값을 확인할 수 있다.
        console.log( error );
        const {status}=error.response;
        if (status === 502 || status === 500)  {
            // alert( '서버와의 연결에 문제가 발생하였습니다.\n'+'새로고침 후 재접속 부탁드립니다.' );
            store.commit( `Alert/${ AlertMutationTypes.SERVER_ERROR }`, true );
        }else if (status === 404) {
            store.commit( `Alert/${ AlertMutationTypes.NOT_FOUND }`, true );
            // alert( '요청하신 페이지를 찾을 수 없습니다.' );
        }
        throw error.response;
    } );
};

const requestCancel=(method: string, error: any)=>{
    if (method === 'get') {
        axios.isCancel( error );
    }
};
export { request, requestCancel };
