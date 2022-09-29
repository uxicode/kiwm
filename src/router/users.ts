import Header from '@/components/header/header.vue';
import { RouteURLManage } from '@/router/url';
import { AuthorityType } from '@/core/data/AuthorityType';

export const UserRoutes=[
  {
    path: RouteURLManage.USERS,
    name: 'users',
      meta: {
          layout: 'side',
          auth: true,
          authName: AuthorityType.MEMBER  // 회원 정보 관리
      },
    // beforeEnter: getIsAuth,
    components: { default: ()=>import('@/views/users/UserList'), header: Header }//회원정보 관리 리스트
  }
];
