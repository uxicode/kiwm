import Header from '@/components/header/header.vue';
import { RouteURLManage } from '@/router/url';
import { AuthorityType } from '@/core/data/AuthorityType';

export const ContactRoute=[
  {
    path: RouteURLManage.CONTACT_LIST,
    name: 'mainContact',
    meta: {
      layout: 'side',
        auth: true,
        authName: AuthorityType.CONTACT
    },
    // beforeEnter: getIsAuth,
    components: { default: ()=>import('@/views/contact/ContactList'), header: Header }, // 1:1 문의 리스트
  },
  {
    path: `${RouteURLManage.CONTACT_DETAIL}/:id`,
    name: 'contactDetail',
    meta: {
      layout: 'side',
        auth: true,
        authName: AuthorityType.CONTACT
    },
    // beforeEnter: getIsAuth,
    components: { default: ()=>import('@/views/contact/ContactDetail'), header: Header }, // 1:1 문의 상세
  }
];
