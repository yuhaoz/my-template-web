import { component, View } from "@/core";
import { cachePageList } from "@/settings";

import "./index.scss";

@component({
    template: require("./index.html")
})
export default class BlankView extends View {
    public cachePageList: Array<any> = cachePageList;
}
