import User from "./modules/user";
import Task from "./modules/task";
const modules = {
    task: new Task(),
    user: new User()
};

export default modules;
