import { component, autowired, View } from "@/core";
import "./index.scss";
import { CommonService } from "@/services";
import { commonSetting, uniCloud } from "@/settings";
import { LoginUtil } from "@/common";
@component({
    template: require("./index.html")
})
export default class Login extends View {
    @autowired(CommonService)
    private commonService!: CommonService;
    private title: string = commonSetting.appTitle;
    public timer: any = null;

    public loginType: string = "0";

    public username: string = "";
    public password: string = "";
    public logging: boolean = false;

    public mounted() {
        if (!uniCloud) {
            setTimeout(() => {
                if (!uniCloud) {
                    window.location.reload();
                }
            }, 800);
        }
    }

    public async doLogin() {
        this.logging = true;
        let res = await this.commonService.login(this.username, this.password);
        this.logging = false;
        if (res && !res.hasError) {
            let result = res.result;
            if (result.affectedDocs === 1) {
                LoginUtil.saveLoginInfo(result.data[0]);
                this.$router.push({ path: "/" });
            } else {
                this.$message.error("用户名或密码错误");
            }
        } else {
            this.$message.error(res.message || "请求失败");
        }
    }

    public validate() {
        if (!this.username) {
            this.$message.warning("请输入账号!");
            return false;
        }
        if (!this.password) {
            this.$message.warning("请输入密码!");
            return false;
        }
        return true;
    }

    public onLogin() {
        // 账号登录
        if (!this.validate()) {
            return;
        }
        this.doLogin();
    }
}
