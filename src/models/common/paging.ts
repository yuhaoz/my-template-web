export default class Paging {
    public totalCount: number;
    public pageIndex: number;
    public pageSize: number;
    public skip: number;
    public pageSizeOpts?: Array<any>;
    public enableTotalCount?: boolean;
    public constructor() {
        this.pageIndex = 1;
        this.pageSize = 10;
        this.totalCount = 0;
        this.skip = 0;
    }
}
