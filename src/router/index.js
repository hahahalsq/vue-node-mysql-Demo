import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/test',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/test.vue'),
                    meta: { title: '测试数据' }
                },
                {
                    path: '/submitform',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/SubmitBaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    path: '/adminInfo',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/adminInfo.vue'),
                    meta: { title: '用户列表' }
                },
                {
                    path: '/houseHold',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/houseHold.vue'),
                    meta: { title: '持有列表' }
                },
                {
                    path: '/houseEdit',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/houseEdit.vue'),
                    meta: { title: '房屋编辑' }
                },
                {
                    path: '/marketList',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/houseEdit.vue'),
                    meta: { title: '房屋市场' }
                },

            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/register',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Register.vue'),
            meta: { title: '注册' }
        },
        {
            path: '/address',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/BaseForm.vue'),
            meta: { title: '三级联动' }
        },


        {
            path: '*',
            redirect: '/404'
        },

    ]
});
