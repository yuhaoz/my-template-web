import { component, watch, config, Component, autowired } from "@egova/flagwind-web";
import "./index.scss";
import { uni, uniCloud } from "@/settings";
import CommonService from "@/services/common-service";
@component({
    template: require("./index.html"),
    components: {}
})
export default class UploadFile extends Component {
    @autowired(CommonService)
    public commonService!: CommonService;

    @config({ type: Object, default: () => Object.create(null) })
    public data!: any;

    // 文件类型，all-所有
    @config({ type: String, default: () => "all" })
    public fileType!: string;

    @config({ type: Boolean, default: () => false })
    public readonly!: Boolean;

    public file: any = {};

    public uploadStatus: any = {
        success: false, // 是否上传成功
        status: 0 // 0:初始 1-上传中，2-上传完成，
    };

    public percentCompleted: Number = 0;

    public get showHuo() {
        if (this.fileType !== "all") {
            return false;
        }
        if (!this.file.type) {
            return true;
        }
        return false;
    }
    public get showImage() {
        if (this.file.type && this.file.type.startsWith("image/")) {
            return true;
        }
        if (this.fileType !== "all" && this.fileType !== "image") {
            return false;
        }
        if (!this.file.type) {
            return true;
        }
        return false;
    }

    public get showVideo() {
        if (this.file.type && this.file.type.startsWith("video/")) {
            return true;
        }
        if (this.fileType !== "all" && this.fileType !== "video") {
            return false;
        }
        if (!this.file.type) {
            return true;
        }
        return false;
    }

    @watch("data", { immediate: true })
    public watchData() {
        if (this.data && this.data.fileID) {
            this.file = { ...this.data };
            this.uploadStatus.status = 2;
            this.percentCompleted = 100;
            this.uploadStatus.success = true;
        } else {
            this.file = {};
        }
    }

    public onChooseImage() {
        if (this.readonly) {
            return;
        }
        uni.chooseImage({
            count: 1,
            success: (res: any) => {
                if (res.tempFiles.length) {
                    let choose = res.tempFiles[0];
                    this.file = {
                        name: choose.name,
                        size: choose.size,
                        type: choose.type,
                        from: "new"
                    };
                    this.doUpload(choose);
                }
            }
        });
    }

    public onChooseVideo() {
        if (this.readonly) {
            return;
        }
        uni.chooseVideo({
            count: 1,
            success: (res: any) => {
                console.log(res);
                if (res.tempFile) {
                    this.file = {
                        duration: res.duration,
                        width: res.width,
                        height: res.height,
                        size: res.size,
                        name: res.name,
                        path: res.tempFilePath,
                        type: res.tempFile.type,
                        from: "new"
                    };
                    this.doUpload(this.file);
                }
            }
        });
    }

    // 上传文件
    public async doUpload(choose: any) {
        this.uploadStatus.status = 1;
        this.file.fileID = choose.path;
        const result = await uniCloud.uploadFile({
            filePath: choose.path,
            cloudPath: choose.name,
            onUploadProgress: (progressEvent: any) => {
                this.percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            }
        });
        this.uploadStatus.status = 2;
        this.uploadStatus.success = result.success;
        if (result.success) {
            this.file.fileID = result.fileID;
        } else {
            this.file.fileID = "";
        }
        this.$emit("on-success", this.file);
    }

    // 删除文件
    public onDeleteFile() {
        const { fileID } = this.file;
        if (this.file.from === "new") {
            // 删除文件
            let fileList = {
                fileList: [fileID]
            };
            // 进行服务端删除文件
            this.commonService.fileDelete(fileList);
        }
        this.file = {};
        this.uploadStatus = {
            success: false, // 是否上传成功
            status: 0 // 0:初始 1-上传中，2-上传完成，
        };
        this.percentCompleted = 0;
        this.$emit("on-delete");
    }
}
