import { RouteURLManage } from '@/router/url';
import Header from '@/components/header/header.vue';
import { AuthorityType } from '@/core/data/AuthorityType';

export const TermsRoute=[
  {
    path: RouteURLManage.APP_SETTINGS_TERMS,
    name: 'termsList',
    meta: {
      layout: 'side',
      auth: true,
      authName: AuthorityType.BOARD_TERMS
    },
    components: { default: ()=>import('@/views/appsetting/terms/TermsList'), header: Header }, // 약관 리스트
  },
 /* {
    path: RouteURLManage.ADD_APP_SETTINGS_TERMS,
    name: 'addTerms',
    meta: {
      layout: 'side',
      auth: true,
      authName: AuthorityType.BOARD_TERMS
    },
    // beforeEnter: getIsAuth,
    components: { default: ()=>import('@/views/appsetting/terms/AddTerms'), header: Header }, // 이벤트 경품 등록
  },*/
  {
    path: `${ RouteURLManage.APP_SETTINGS_TERMS_DETAIL }/:id`,
    name: 'termsDetail',
    meta: {
      layout: 'side',
      auth: true,
      authName: AuthorityType.BOARD_TERMS
    },
    components: { default: ()=>import('@/views/appsetting/terms/TermsDetail'), header: Header }, // 약관 상세
  }
];
