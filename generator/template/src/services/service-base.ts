import { request } from "@/services/uniapp/request";
/**
 * 业务服务基类。
 * @abstract
 * @class
 * @version 1.0.0
 */
export default abstract class ServiceBase {
    /**
     * 请求unicloud 云函数服务
     * @param action
     * @param data
     * @returns
     */
    protected _clound(action: string, data: any) {
        return request(action, data);
    }

    /**
     * 把json对象转换成formData数据
     * @param data json对象
     */
    protected toFormData(data: any): FormData {
        let fromData = new FormData();
        if (data) {
            Object.keys(data).forEach((key) => {
                // 忽略以“_”的参数
                if (key.indexOf("_") !== 0) {
                    fromData.append(key, data[key]);
                }
            });
        }
        return fromData;
    }
}
