import { component, View, watch } from "@/core";
import { commonSetting } from "@/settings";
import "./index.scss";
import { PermissionUtil } from "@/common/utils/permission-util";
import MenuComponent from "@/components/menu";
@component({
    template: require("./index.html"),
    components: {
        "u-menu": MenuComponent
    }
})
export default class MainWrapperView extends View {
    public menuList: Array<any> = [];
    public get hideSideMenu() {
        return commonSetting.__HIDE_SIDE_MENU;
    }

    /**
     * 过滤菜单, 根据hideInMenu隐藏菜单
     * @param target
     * @param raw
     */
    public filterMenuList(target: Array<any>, raw: Array<any>) {
        raw.forEach((item) => {
            if (!item.meta?.hideInMenu) {
                let tmp = item.$clone();
                if (item.hasOwnProperty("children")) {
                    tmp.children = [];
                    this.filterMenuList(tmp.children, item.children);
                }
                target.push(tmp);
            }
        });
        return target;
    }

    public get breadCrumbList() {
        let { matched } = this.$route;
        let res: Array<any> = [];
        for (let i of matched) {
            if (i.meta?.title) {
                res.push(i.meta.title);
            }
        }
        return res;
    }

    public created() {
        const appRouter = ((<any>this.$router)?.options?.routes || []).find((v: any) => v.path === "/");
        const name = this.$route.matched[1]?.name;
        if (!name) return [];
        let routes = appRouter.children.find((v: any) => {
            return v.name === name;
        });
        let menu = PermissionUtil.handleMenuByPermissions(routes?.children || []);
        this.menuList = this.filterMenuList([], menu);
    }
}
