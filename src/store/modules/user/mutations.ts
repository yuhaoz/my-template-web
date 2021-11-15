import { MutationTree } from "vuex";
import UserState from "./state";
import { UserInfo } from "@/models";
import { LoginUtil } from "@/common";
export function save(state: UserState, userInfo: UserInfo): void {
    state._id = userInfo._id;
    state.username = userInfo.username;
    state.nickName = userInfo.nickName;

    sessionStorage.setItem("user", JSON.stringify(userInfo)); // TODO： 后续删除，
}

export function clear(state: UserState): void {
    state._id = "";
    state.username = "";
    state.nickName = "";
    LoginUtil.clear();
}
export function logout(state: UserState): void {
    clear(state);
}
export default <MutationTree<UserState>>{
    save,
    clear,
    logout
};
