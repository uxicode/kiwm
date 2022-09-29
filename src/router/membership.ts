import Header from '@/components/header/header.vue';
import {AuthorityType} from '@/core/data/AuthorityType';
import {RouteURLManage} from '@/router/url';

export const MembershipRoute = [
    {
        path: RouteURLManage.MEMBERSHIP_LIST,
        name: 'membershipList',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.GRADE_HISTORY
        },
        components: {default: () => import('@/views/membership/MembershipList'), header: Header}
    },
    {
        path: `${RouteURLManage.MEMBERSHIP_DETAIL}/:id`,
        name: 'membershipDetail',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.GRADE_HISTORY
        },
        components: {default: () => import('@/views/membership/MembershipDetail'), header: Header}
    }
];
