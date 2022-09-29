import Header from '@/components/header/header.vue';

export const DashBoardRoute=[
    {
        path: '/',
        redirect: '/dashboard',
        name: 'main',
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
            layout: 'side',
            auth: true,
        },
        // beforeEnter: getIsAuth,
        components: { default: ()=>import('@/views/dashboard/DashBoard'), header: Header }, //template
    }
];

