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

    // 删除文件
    public fileDelete(data: any) {
        return this._clound("admin/file/delete", data);
    }
}
