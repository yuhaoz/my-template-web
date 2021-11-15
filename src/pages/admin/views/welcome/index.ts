import { component, View } from "@/core";
import "./index.scss";
@component({
    template: require("./index.html")
})
export default class Welcome extends View {
    public list = [
        {
            title: "项目中用到的资源：",
            links: [
                {
                    text: "iconfont",
                    link: "https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.12&manage_type=myprojects&projectId=2912675&keyword=&project_type=&page="
                },
                {
                    text: "Ant Design of Vue",
                    link: "https://www.antdv.com/docs/vue/introduce-cn/"
                }
            ]
        },
        {
            title: "常用网站：",
            links: [
                {
                    text: "UI规范",
                    link: "https://app.mockplus.cn/app/deUaz7uNVi_/design"
                },
                {
                    text: "在线图片压缩",
                    link: "https://tinypng.com/"
                }
            ]
        }
    ];
}
