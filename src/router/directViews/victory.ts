import { RouteURLManage } from '@/router/url';
import Header from '@/components/header/header.vue';
import { AuthorityType } from '@/core/data/AuthorityType';

export const VictoryRoute=[
  {
    path: RouteURLManage.DIRECT_VIEW_VICTORY,
    name: 'victoryItem',
    meta: {
      layout: 'side',
      auth: true,
      authName: AuthorityType.DIRECT_VICTORY
    },
    // beforeEnter: getIsAuth,
    components: { default: ()=>import('@/views/directview/victory/VictoryList'), header: Header }, // 직관승요 리스트
  }
];
