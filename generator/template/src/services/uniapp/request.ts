const uniCloud = (<any>window).uniCloud;
import Cookies from "js-cookie";
import { commonSetting } from "@/settings";
import { LoginUtil } from "@/common";
const request = (action: string, data: any = {}) => {
    let param = {
        need: true,
        operate_id: Cookies.get("user_id") || "",
        ...data
    };
    if (!uniCloud) {
        window.location.reload();
        return Promise.resolve({
            hasError: true,
            message: "系统初始化中，稍后再试"
        });
    }
    return uniCloud
        .callFunction({
            name: commonSetting.baseUrl,
            data: {
                action,
                data: param
            }
        })
        .then((response: any) => {
            const { result } = response;
            if (!result) {
                return Promise.resolve(result);
            }
            if (result.code) {
                if (typeof result.code === "string" && result.code.indexOf("TOKEN_INVALID") === 0) {
                    // token 失效
                    window.location.href = "/login.html";
                }
                return Promise.resolve({
                    hasError: true,
                    message: result.message || "连接服务器失败"
                });
            }
            LoginUtil.expiresCookie();
            return Promise.resolve(result);
        })
        .catch((err: any) => {
            // debugger;
            return Promise.resolve({
                hasError: true,
                message: "连接服务器失败"
            });
            // return Promise.reject(err);
        });
};
export { request };
