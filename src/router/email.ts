import Header from '@/components/header/header.vue';
import {AuthorityType} from '@/core/data/AuthorityType';
import {RouteURLManage} from '@/router/url';

export const EmailRoute = [
  {
    path: RouteURLManage.EMAIL,
    name: 'email',
    meta: {
      layout: 'side',
      auth: true,
      authName: AuthorityType.NOTI_EMAIL
    },
    components: {default: () => import('@/views/email/Email'), header: Header},
    children: [
      { path: '', name: 'emailSend', component: () => import('@/views/email/emailSendList/EmailSendList')}, // 이메일 발송 내역
      { path: 'emailTemplate', name: 'emailTemplate', component: () => import('@/views/email/emailTemplate/EmailTemplate')}, // 이메일 템플릿
    ],
  },
 
];
