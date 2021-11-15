import flagwind from "@egova/flagwind-core";
import iView from "view-design";
import Type = flagwind.Type;
const iview: any = iView;
const components: any = {};
Object.keys(iview).forEach((key) => {
    const component = iview[key];

    if (Type.isObject(component)) {
        components[key] = component;
    }
});
export function install(Vue: any, opts: any = {}) {
    iview.locale(opts.locale);
    iview.i18n(opts.i18n);

    Object.keys(components).forEach((key) => {
        const component = components[key];

        // iview 组件统一加小写 "i" 标识
        // 最终在模板中使用组件时以类似 "i-button", "i-icon", "i-table" 方式引用
        if (key[0] !== "i") {
            Vue.component("i" + key, component);
        }
    });
}
export { install as iviewInstall };
