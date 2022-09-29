import Header from '@/components/header/header.vue';
import { RouteURLManage } from '@/router/url';
import { AuthorityType } from '@/core/data/AuthorityType';

export const PointRoutes=[
    {
        path: RouteURLManage.POINT,
        name: 'pointList',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.GRADE  // 등급/포인트
        },
        components: { default: ()=>import('@/views/point/PointList'), header: Header }//회원정보 관리 리스트
    },
    {
        path: RouteURLManage.POINT_GRADE_MODIFY,
        name: 'pointModify',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.GRADE  // 등급/포인트
        },
        components: { default: ()=>import('@/views/point/PointGradeDetail'), header: Header } //등급/포인트 등급 상세/수정
    },
    {
        path: RouteURLManage.POINT_POLICY_MODIFY,
        name: 'pointPolicyModify',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.GRADE  // 등급/포인트
        },
        components: { default: ()=>import('@/views/point/PointPolicyDetail'), header: Header } //포인트  상세/수정
    },
    {
        path: RouteURLManage.POINT_GUIDE_MODIFY,
        name: 'pointGuideModify',
        meta: {
            layout: 'side',
            auth: true,
            authName: AuthorityType.GRADE  // 등급/포인트
        },
        components: { default: ()=>import('@/views/point/PointGuideDetail'), header: Header }//등급/포인트 가이드  상세/수정
    }
];
