# #{pluginName}

> 这是一个 [vue-cli](https://github.com/vuejs/vue-cli) 项目模板，开发语言为 TypeScript，默认集成 [flagwind-core](https://github.com/flagwind/flagwind-core)、[flagwind-web](https://github.com/flagwind/flagwind-web) 等库，可用于 PC 端项目。

## 如何使用?

首先安装 Vue 官方提供的工具 [vue-cli 3.x](([https://github.com/vuejs/vue-cli](https://cli.vuejs.org/)))

``` bash
npm install -g @vue/cli

笔者的环境为：
npm 版本为7.21.1
node版本为14.18.1
vue/cli版本为4.5.15

```

使用vue cli 3命令创建项目:

``` bash

vue create --preset direct:ssh://git@code.aliyun.com:zyuhao/my-template-web.git --clone my-project
或者
vue create --preset gitlab:https://code.aliyun.com:zyuhao/my-template-web --clone my-project
```

## 包含哪些内容?

- `npm run serve` 进入调试模式，默认地址为 `http://localhost:8030`
- `npm run build` 生产打包


