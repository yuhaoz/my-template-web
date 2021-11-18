import { component, watch, config, Component } from "@/core";
import "./index.scss";

export interface CommonListItem {
    name: string;
    selected?: boolean;
    [key: string]: string | boolean | undefined;
}

@component({
    template: require("./index.html"),
    components: {}
})
export default class CommonList extends Component {
    private keyword: string = "";

    // private current: number = -1;
    private currentIndex: number = -1;

    @config({ type: Array, default: () => [] })
    public data!: Array<CommonListItem>;

    @config({ type: Array,default: () => [] })
    public menus!: Array<any>;

    public list: Array<any> = [];

    public filter(keyword: string = this.keyword) {
        this.list = this.data.filter(v => v.name.indexOf(keyword) > -1);
        if (!this.list.length) {
            this.currentIndex = -1;
            return;
        }
        this.currentIndex = this.data.findIndex(v => v._selected) || 0;
        this.currentIndex < 0 && (this.currentIndex = 0);
        this.$emit("on-select", this.list[this.currentIndex]);
    }

    @watch("data", { deep: true, immediate: true })
    private onDataChange() {
        if (
            Object.prototype.toString.call(this.data) !== "[object Array]" ||
            !this.data.length
        ) {
            return;
        }
        this.filter();
    }

    private onClick(menu: any, item: any) {
        this.$emit("on-click", menu, item);
    }

    private onSelect(item: any, index: number) {
        if (this.currentIndex === index) return;
        if (this.currentIndex > -1 && this.currentIndex < this.list.length) {
            this.$set(this.list[this.currentIndex], "_selected", false);
        }
        this.currentIndex = index;
        this.$set(item, "_selected", true);
        // this.$emit("on-select", item);
    }
}
