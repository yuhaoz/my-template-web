import { MutationTree } from "vuex";
import { commonSetting } from "@/settings";
import TaskState from "./state";
// 添加并开始新任务
export function add(state: TaskState, payload: { name: string; task: Function; time?: number }) {
    let name = payload.name || new Date().getTime();
    if (state.tasks.has(name)) {
        console.warn(`payload.name:  ${name}  重复`);
        return;
    }
    let time = payload.time || commonSetting.dataRefreshTime || 1000;
    state.tasks.set(name, setInterval(payload.task, time));
    console.log(`Task ${name} started, Execute every ${time}ms`);
}
// 删除任务
export function clear(state: TaskState, taskName: any) {
    if (!taskName) {
        for (let [key, task] of state.tasks) {
            clearInterval(task);
        }
        state.tasks.clear();
        console.log("All tasks have been cleared");
        return;
    }
    if (state.tasks.has(taskName)) {
        clearInterval(state.tasks.get(taskName));
        state.tasks.delete(taskName);
        console.log(`Task ${taskName} has been cleared`);
    }
}
export default <MutationTree<TaskState>>{
    add,
    clear
};
