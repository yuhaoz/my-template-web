import { component, Component, autowired } from "@/core";
import "./index.scss";
import Service from "@/services/common-service";
import { LoginUtil } from "@/common";
import ImageViewer from "@/components/image-viewer";
import Cookies from "js-cookie";
@component({
    template: require("./index.html"),
    components: {
        "u-image-viewer": ImageViewer
    }
})
export default class Setting extends Component {
    @autowired(Service)
    public service!: Service;

    public get user() {
        return this.$store.getters["user/userInfo"];
    }

    public get nickName() {
        return Cookies.get("nickName") || Cookies.get("username") || "";
    }

    public onLogout() {
        // let res = this.$store.getters["global/userInfo"];
        this.$modal.confirm({
            title: "确认",
            content: "您确定要退出登录吗？",
            onOk: () => {
                LoginUtil.clear();
                this.$router.push({
                    name: "login"
                });
            }
        });
    }
    public onGoToHome() {
        this.$router.push({
            path: "/"
        });
        // let base = (<any>this.$router)?.options?.base || "saas";
        // window.location.href = base + ".html";
    }
}
