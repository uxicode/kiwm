import {RouteURLManage} from '@/router/url';
import Header from '@/components/header/header.vue';
import {AuthorityType} from '@/core/data/AuthorityType';

export const FaqRoute = [
  {
    path: RouteURLManage.APP_SETTINGS_FAQ,
    name: 'faqList',
    meta: {
      layout: 'side',
      auth: true,
      authName: AuthorityType.BOARD_FAQ
    },
    components: {default: () => import('@/views/appsetting/faq/FaqList'), header: Header}, // 자주묻는질문 관리 리스트
  },
  {
    path: RouteURLManage.ADD_APP_SETTINGS_FAQ,
    name: 'addFaq',
    meta: {
      layout: 'side',
      auth: true,
      authName: AuthorityType.BOARD_FAQ
    },
    components: {default: () => import('@/views/appsetting/faq/AddFaq'), header: Header}, // 자주묻는질문 관리 등록
  },
  {
    path: `${RouteURLManage.APP_SETTINGS_FAQ_DETAIL}/:id`,
    name: 'faqDetail',
    meta: {
      layout: 'side',
      auth: true,
      authName: AuthorityType.BOARD_FAQ
    },
    components: {default: () => import('@/views/appsetting/faq/FaqDetail'), header: Header}, // 자주묻는질문 상세
  }
];
