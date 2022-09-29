import {RouteURLManage} from '@/router/url';
import Header from '@/components/header/header.vue';
import {AuthorityType} from '@/core/data/AuthorityType';

export const MainImageRoute = [
  {
    path: RouteURLManage.MAIN_IMAGE,
    name: 'mainImage',
    meta: {
      layout: 'side',
      auth: true,
      authName: AuthorityType.MAIN_IMAGE
    },
    // beforeEnter: getIsAuth,
    components: {default: () => import('@/views/homescreen/MainImage'), header: Header}, // 자주묻는질문 관리 리스트
  }
];
