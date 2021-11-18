import Cookies from "js-cookie";

/**
 * 登录工具类
 *
 * @export
 * @class TagUtil
 */
export class LoginUtil {
    /**
     * 是否登录
     */
    public static isLogin(): boolean {
        return (
            Cookies.get("user_id") !== undefined &&
            Cookies.get("user_id") !== "" &&
            Cookies.get("user_id") !== "undefined"
        );
    }

    // 获取用户id
    public static userId() {
        return Cookies.get("user_id") || "";
    }

    public static saveLoginInfo(userInfo: any) {
        // 设置有效期为120分钟
        let millisecond = new Date().getTime();
        let expiresTime = new Date(millisecond + 60 * 1000 * 120);
        Cookies.set("user_id", userInfo._id, { expires: expiresTime });
        Cookies.set("username", userInfo.username, { expires: expiresTime });
        Cookies.set("nickName", userInfo.nickName, { expires: expiresTime });
    }

    // 将cookie有效期进行重置，每次与后台有接口请求时，调用一下自动将cookie延长。
    public static expiresCookie() {
        if (this.isLogin()) {
            let millisecond = new Date().getTime();
            let expiresTime = new Date(millisecond + 60 * 1000 * 120);
            Cookies.set("user_id", Cookies.get("user_id") || "", { expires: expiresTime });
            Cookies.set("username", Cookies.get("username") || "", { expires: expiresTime });
            Cookies.set("nickName", Cookies.get("nickName") || "", { expires: expiresTime });
        }
    }

    /**
     * 清空登录信息
     */
    public static clear() {
        Cookies.remove("username");
        Cookies.remove("nickName");
        Cookies.remove("user_id");
        sessionStorage.clear();
    }

    /**
     * 清除登录标记
     */
    public static clearLoginFlag(): void {
        Cookies.remove("username");
        Cookies.remove("access_token");
    }

    // 重定向到login页面
    public static redirectLogin() {
        let pathName = String(window.location.pathname || "");
        let res = pathName.match("\\w*\\.html");
        let pageName = "";
        res && (pageName = res[0]);
        pathName = pathName.split(pageName)[0];
        if (!pathName.endsWith("/")) {
            pathName += "/";
        }
        window.location.href = pathName + "login.html#/login";
    }
}
