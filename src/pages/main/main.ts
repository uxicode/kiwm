import Vue from 'vue';
import App from './App';
import router from '@/router';
import store from '@/store';
import '@/filters/index';
import '@/components/common/validation/validation';
import '../../../node_modules/flatpickr/dist/flatpickr.min.css';   // flatpickr (  datepicker )

/* //공통 이벤트에 대한 후크를 사용하여 서비스 작업자 등록을 단순화한다.*/
// import  '@/registerServiceWorker';

//사스 파일은 하나로 통일시키는 것이 좋다 여러개를 여기서 로드 시키면 여러번 호출된다.
import '@/assets/scss/all.scss';

Vue.config.productionTip = false;

/**
 * 공통 에러 이벤트 핸들러
 * @param err
 * @param vm
 * @param info
 */
Vue.config.errorHandler = (err: Error, vm: Vue, info: string) => {
  console.log(`Error ${err.toString()}\n info: ${info}`, err, '에러난 해당 component=', vm.$vnode.tag );
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
