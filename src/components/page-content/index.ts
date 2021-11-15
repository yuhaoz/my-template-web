import { component, Component, config } from "@/core";
import "./index.scss";
import { PropSync } from "vue-property-decorator";
import { Paging } from "@/models";
@component({
    template: require("./index.html"),
    components: {}
})
export default class PageContent extends Component {
    @config({ type: Boolean, default: true })
    public showHeader!: boolean;
    @config({ type: String, default: () => "" })
    public title!: string;

    @config({ type: Array, default: () => [] })
    public buttons!: Array<any>;

    @PropSync("page", {
        default: () => {
            return {
                pageIndex: 1,
                pageSize: 50,
                totalCount: 0
            };
        }
    })
    public paging!: Paging;

    public current: any = {};

    public pageSizeOpts: Array<number> = [20, 50, 100, 500];

    public mounted() {
        this.onCheckType(this.buttons?.[0] || {});
    }

    public onCheckType(btn: any) {
        this.current = btn;
        this.$emit("on-btn-change", this.current);
    }

    public onPageIndexChange(index: number) {
        this.paging.pageIndex = index;
        this.onQuery();
    }

    public onPageSizeChange(size: number) {
        this.paging.pageIndex = 1;
        this.paging.pageSize = size;
        this.onQuery();
    }

    public onQuery() {
        this.$emit("on-query");
    }
}
