/**
 * 路由信息在此组件根据权限动态加载
 */
import { component, View, watch, autowired } from "@/core";
import "./index.scss";
import { CommonService } from "@/services";
import { PermissionUtil } from "@/common/utils/permission-util";
import { HeaderComponent } from "./header";
import { commonSetting } from "@/settings";
@component({
    template: require("./index.html"),
    components: {
        "u-header": HeaderComponent
    }
})
export default class MainView extends View {
    @autowired(CommonService)
    public service!: CommonService;

    public get hideHeader() {
        return commonSetting.__HIDE_HEADER;
    }

    public beforeDestroy() {
        PermissionUtil.clearPermisstionsMap(); // 清理权限
    }
}
