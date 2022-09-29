import { RouteURLManage } from '@/router/url';
import Header from '@/components/header/header.vue';
import { AuthorityType } from '@/core/data/AuthorityType';

export const VersionRoute = [
  {
    path: RouteURLManage.APP_SETTINGS_VERSION,
    name: 'versionList',
    meta: {
      layout: 'side',
      auth: true,
      authName: AuthorityType.BOARD_VERSION
    },
    components: { default: ()=>import('@/views/appsetting/version/VersionList'), header: Header }, // 버전 리스트
  },
  {
    path: RouteURLManage.APP_SETTINGS_VERSION_MODIFY,
    name: 'versionDetail',
    meta: {
      layout: 'side',
      auth: true,
      authName: AuthorityType.BOARD_VERSION
    },
    components: { default: ()=>import('@/views/appsetting/version/VersionDetail'), header: Header }, // 버전 수정하기
  }
];
