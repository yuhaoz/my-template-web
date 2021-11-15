export const getType = (obj: any) => Object.prototype.toString.call(obj).slice(8, -1);
export const getQueryString = (name: string) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};
export const removeQueryString = (name: string) => {
    // 从当前URL的?号开始的字符串
    // 如:http://www.baidu.com/s?wd=baidu&cl=3 它的search就是?wd=baidu&cl=3
    let queryString = window.location.search.substr(1);
    // 如果没有参数则返回空
    if (queryString !== undefined) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        return queryString.replace(reg, "");
    }
    return "";
};

export const getObjectTypeToString = (obj: any) => Object.prototype.toString.call(obj).slice(8, -1);
