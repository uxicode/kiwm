import { RouteURLManage } from '@/router/url';
import Header from '@/components/header/header.vue';
import { AuthorityType } from '@/core/data/AuthorityType';

export const CheckInRoute=[
  {
    path: RouteURLManage.DIRECT_VIEW_CHECKIN,
    name: 'directViewCheckIn',
    meta: {
      layout: 'side',
      auth: true,
      authName: AuthorityType.DIRECT_CHECK_IN
    },
    components: { default: ()=>import('@/views/directview/checkIn/CheckInList'), header: Header }, //
  }
];
