import { component, Component, config } from "@/core";
import "./index.scss";
import Setting from "../setting";
import { commonSetting } from "@/settings";
import { PermissionUtil } from "@/common/utils/permission-util";
export interface INavItem {
    name: string;
    title: string; //
    url?: string;
}
@component({
    template: require("./index.html"),
    components: {
        "u-setting": Setting
    }
})
export class HeaderComponent extends Component {
    @config({ default: false })
    public showNav!: boolean;

    public title: string = commonSetting.appTitle;

    public extraNavs: Array<any> = [];
    public get navs(): Array<INavItem> {
        let appRouter = ((<any>this.$router)?.options?.routes || []).find((v: any) => v.path === "/");
        let routes = appRouter?.children || [];
        let list = PermissionUtil.handPermissionMenu(routes) || [];
        list = list.concat(this.extraNavs);
        return list;
    }

    public onRoute(item: INavItem) {
        item.url && window.open(item.url);
    }
    public onGoToHome() {
        window.location.href = "index.html";
    }
}
