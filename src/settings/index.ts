export const global = <any>window;
export const uniCloud = global.uniCloud;
export const uni = global.uni;
/**
 * 公共配置
 */
export let commonSetting = {
    ...{
        // 后端地址
        baseUrl: ""
    },
    ...global.commonSetting
};
export const cachePageList = [];
