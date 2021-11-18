import flagwind from "@egova/flagwind-core";
import WorkbenchBase = flagwind.WorkbenchBase;
import ApplicationContextBase = flagwind.ApplicationContextBase;
import ApplicationContext from "@/application/context";

import Vue from "vue";
import Router from "vue-router";
import Vuex from "vuex";

import ViewUI from "view-design";

import math from "halo-math";

import "../assets/styles/index.scss";
import { PermissionUtil } from "@/common/utils/permission-util";
import { LoginUtil } from "@/common";
import { iviewInstall } from "@/core/view-design";
/**
 * 提供工作台的基本封装。
 * @class
 * @version 1.0.0
 */
export default class Workbench extends WorkbenchBase {
    private _workspace: Vue | undefined;

    /**
     * 获取当前应用的主工作空间。
     * @property
     * @returns Workspace
     */
    public get workspace(): Vue | undefined {
        return this._workspace;
    }

    /**
     * 初始化工作台的新实例。
     * @param  {ApplicationContextBase} applicationContext
     */
    public constructor(context: ApplicationContextBase) {
        super(context);
    }

    /**
     * 当工作台打开时调用。
     * @async
     * @protected
     * @virtual
     * @param  {Array<string>} args
     * @returns void
     */
    protected async onOpen(args: Array<string>): Promise<void> {
        let context = this.applicationContext as ApplicationContext;

        // 初始化路由程序
        this.initializeRouter(context);

        // 初始化状态管理程序
        this.initializeStore(context);

        // 初始化自定义指令
        this.initializeDirective(context);

        // this.initializeAxios();
        // 初始化组件
        this.initializeComponent(context);
        // 初始化工作空间
        // this._workspace = this.createWorkspace();
        this._workspace = this.createWorkspace(context);
    }

    /**
     * 创建一个工作空间对象。
     * @override
     * @returns IWorkspace
     */
    protected createWorkspace(context: ApplicationContext): Vue {
        let router = context.router;
        let store = context.store;
        return new Vue({
            el: "#app",
            router: router,
            store: store,
            template: '<div id="app"><router-view /></div>'
        }).$mount("#app");
    }

    /**
     * 初始化全局组件。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeComponent(context: ApplicationContext): void {
        // 注册系统组件
        Vue.use(ViewUI);
        Vue.use(iviewInstall);
        Vue.use(math);
    }

    /**
     * 初始化路由程序。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeRouter(context: ApplicationContext): void {
        // 注册路由组件
        Vue.use(Router);

        // 多次点击同一路由报错
        const originalPush = Router.prototype.push;
        Router.prototype.push = function push(location: any) {
            return (<any>originalPush.call(this, location)).catch((err: any) => err);
        };
        // 初始化路由程序
        let router = new Router(context.routerOptions);

        router.beforeEach(async (to: any, from: any, next: any) => {
            let title = to.meta?.title || "后台管理中心";
            window.document.title = title;
            await this.toPage(context, to, from, next);
        });

        // 设置路由程序
        context.router = router;
    }

    private async toPage(context: any, to: any, from: any, next: any) {
        /***
         * 不需要登录的路由控制逻辑
         */
        // 1.如果是登录页面，先清除之前登录的标记 ，再进入登录页面跳转流程
        if (to.name === "login") {
            window.document.title = "登录页";
            // 清除之前登录的标记
            LoginUtil.clearLoginFlag();
            // 进入登录页面跳转流程
            next();
            return;
        }

        PermissionUtil.handePermissionBeforeEach([context.routerOptions.routes?.find((r: any) => r.name === "main")], to, from, next);
    }

    /**
     * 初始化状态管理程序。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeStore(context: ApplicationContext): void {
        // 注册状态管理程序
        Vue.use(Vuex);

        // 初始化状态容器
        let store = new Vuex.Store(context.storeOptions);

        // 设置状态容器
        context.store = store;
    }

    /**
     * 初始化自定义指令。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeDirective(context: ApplicationContext): void {
        // for (const [key, value] of Object.entries(directiveObj)) {
        //     Vue.directive(key.replace(/([A-Z])/g, "-$1").toLowerCase(), value);
        // }
    }
}
