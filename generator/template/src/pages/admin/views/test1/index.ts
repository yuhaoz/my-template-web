import { component, View, autowired } from "@/core";
import "./index.scss";
import Service from "./service";
import { Paging } from "@/models";
@component({
    template: require("./index.html")
})
export default class Test1 extends View {
    // 此为使用示例
    @autowired(Service)
    public service!: Service; // 接口服务

    public loading: boolean = false;
    // 查询条件
    public condition: any = Object.create(null);
    // 表内容
    public dataList: Array<any> = [];
    // 分页
    public paging = {
        current: 1,
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        pageSizeOptions: ["10", "20", "30", "40", "100"],
        showTotal: (total: any) => `${total}`,
        showQuickJumper: true,
        showSizeChanger: true
    };

    // 表头
    public columns: Array<any> = [
        {
            title: "登录账号",
            key: "username",
            dataIndex: "username"
        },
        {
            title: "登录IP",
            key: "ip",
            dataIndex: "ip"
        },
        {
            title: "登录类型",
            key: "loginTypeName",
            dataIndex: "loginTypeName"
        },
        {
            title: "设备类型",
            key: "terminalTypeName",
            dataIndex: "terminalTypeName"
        },
        {
            title: "访问时间",
            key: "operateTime",
            dataIndex: "operateTime"
        },
        {
            title: "信息",
            key: "message",
            dataIndex: "message"
        }
    ];

    // 表格显示选择框
    public rowSelection = {
        columnWidth: "60px",
        type: "checkbox",
        onChange: this.rowSelectionChagne
    };
    // 表格勾选的数据
    public selectedList: Array<any> = [];

    public mounted() {
        this.doQuery();
    }
    public rowSelectionChagne(selectedRowKeys: Array<string>, selectedRows: Array<any>) {
        this.selectedList = selectedRows;
    }

    public onTableChange(pagination: any, filters: any, sorter: any, { currentDataSource }: any) {
        if (this.paging.current !== pagination.current || this.paging.pageSize !== pagination.pageSize) {
            // 翻页组件发生变化
            this.paging.current = pagination.current;
            this.paging.pageIndex = pagination.current;
            this.paging.pageSize = pagination.pageSize;
            this.doQuery();
        }
    }

    public onReset() {
        this.condition = {};
        this.onRefresh();
    }
    public onRefresh() {
        this.paging.current = 1;
        this.paging.total = 0;
        this.doQuery();
    }

    public doQuery(){
        
    }
}
