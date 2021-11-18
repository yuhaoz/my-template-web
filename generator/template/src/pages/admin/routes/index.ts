import { RouteConfig } from "vue-router";

type RouteItem = {
    title?: string;
    meta: {
        icon?: string; // iconfont图标
        title?: string; // title
        isMenuGroup?: boolean; // 是否为菜单中的父节点
        [key: string]: string | any;
    };
    children?: Array<RouteItem>;
} & RouteConfig;

export const webpage: RouteItem = {
    name: "webpage",
    path: "/index",
    meta: {
        icon: "md-clock",
        page: "webpage"
    },
    redirect: "/welcome",
    component: () => import("@/components/layout/main-wrapper"),
    children: [
        {
            path: "/welcome",
            name: "welcome",
            meta: {
                // icon: "icon-line-stack",
                title: "主页",
                schemaId: "webpage:page1"
            },
            component: () => import("@/pages/admin/views/welcome")
        },
        {
            path: "/page1",
            name: "page1",
            meta: {
                // icon: "icon-line-stack",
                title: "测试页面1",
                schemaId: "webpage:page1"
            },
            component: () => import("@/components/layout/blank"),
            redirect: "/page1/manage",
            children: [
                {
                    name: "page_manage",
                    path: "manage",
                    // title: "测试页面1-1",
                    meta: {
                        // icon: "icon-line-stack",
                        title: "表单列表",
                        schemaId: "webpage:page1"
                    },
                    component: () => import("@/pages/admin/views/test1")
                }
            ]
        },
        {
            path: "/page2",
            name: "page2",
            meta: {
                // icon: "icon-folder",
                title: "测试页面2",
                schemaId: "webpage:page2",
                isMenuGroup: true
            },
            component: () => import("@/components/layout/blank"),
            redirect: "/page2/manage2",
            children: [
                {
                    name: "page_manage2",
                    path: "manage2",
                    // title: "测试页面2-1",
                    meta: {
                        // icon: "icon-folder",
                        title: "测试页面2-1",
                        schemaId: "webpage:page2"
                    },
                    component: () => import("@/pages/admin/views/test2")
                },
                {
                    name: "page_manage2-2",
                    path: "manage2-2",
                    // title: "测试页面2-2",
                    meta: {
                        // icon: "icon-folder",
                        title: "测试页面2-2",
                        schemaId: "webpage:page2"
                    },
                    component: () => import("@/pages/admin/views/test2")
                }
            ]
        }
    ]
};

export const appRouter = {
    name: "main",
    path: "/",
    title: "main",
    redirect: "/index",
    meta: {},
    component: () => import("@/components/layout"),
    children: [webpage]
};
export const routes = [
    appRouter,
    {
        name: "login",
        path: "/login",
        title: "登录",
        component: () => import("@/views/login")
    },
    {
        name: "401",
        path: "/401",
        component: () => import("@/views/errors/401")
    },
    {
        name: "404",
        path: "/*",
        component: () => import("@/views/errors/404")
    }
];
