import ServiceBase from "./service-base";

export default class CommonService extends ServiceBase {
    /**
     *
     * @param username 登录接口
     * @param password
     * @returns
     */
    public login(username: string, password: string) {
        return this._clound("admin/user/login", {
            need: false,
            username,
            password
        });
    }
}
