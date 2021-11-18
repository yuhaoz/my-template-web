import { Module } from "vuex";
import State from "./state";
import Mutations from "./mutations";

export default class Task implements Module<State, any> {
    public namespaced: boolean;
    public state: State;
    public mutations = Mutations;

    public constructor() {
        this.namespaced = true;

        this.state = new State();
    }
}
