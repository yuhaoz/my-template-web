import flagwind from "@egova/flagwind-core";
import Type = flagwind.Type;

export default class UserState {
    // 用户id
    public _id: string = "";
    // 用户名
    public username: string = "";
    // 用户昵称
    public nickName: string = "";
    // 权限列表
    public permissions: {
        menus: Array<string>;
        items: Array<string>;
    } = {
        menus: [],
        items: []
    };
    // 用户详情信息
    public detail: any = {};
    // // 用户关联person信息
    // public person: any = {};
    public user: any = {};
}
