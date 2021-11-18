module.exports = (api, opts) => {
  api.extendPackage({
    dependencies: {
      "@egova/flagwind-core": "^1.1.4",
      axios: "^0.21.1",
      "core-js": "^3.6.5",
      debounce: "^1.2.0",
      equals: "^1.0.5",
      "halo-math": "^1.0.6",
      "js-cookie": "^2.2.1",
      lodash: "^4.17.21",
      "lodash.debounce": "^4.0.8",
      "lodash.throttle": "^4.1.1",
      moment: "^2.29.1",
      overlayscrollbars: "^1.13.1",
      "overlayscrollbars-vue": "^0.2.2",
      "v-viewer": "^1.5.1",
      "view-design": "^4.7.0-beta.11",
      viewerjs: "^1.9.0",
      vue: "^2.6.14",
      "vue-class-component": "^7.2.3",
      "vue-property-decorator": "^8.4.0",
      "vue-router": "^3.5.1",
      vuex: "^3.1.2",
      "vuex-class": "^0.3.2",
    },
    devDependencies: {
      "@egova/vue-cli-plugin-dll": "^1.1.7",
      "@types/js-cookie": "^2.2.4",
      "@types/lodash.throttle": "^4.1.6",
      "@types/node": "^13.7.4",
      "@typescript-eslint/eslint-plugin": "^4.18.0",
      "@typescript-eslint/parser": "^4.18.0",
      "@vue/cli-plugin-babel": "~4.5.0",
      "@vue/cli-plugin-eslint": "~4.5.0",
      "@vue/cli-plugin-router": "~4.5.0",
      "@vue/cli-plugin-typescript": "~4.5.0",
      "@vue/cli-plugin-vuex": "~4.5.0",
      "@vue/cli-service": "~4.5.0",
      "@vue/eslint-config-prettier": "^6.0.0",
      "@vue/eslint-config-typescript": "^7.0.0",
      eslint: "^6.7.2",
      "eslint-plugin-prettier": "^3.3.1",
      "eslint-plugin-vue": "^6.2.2",
      "node-sass": "^4.14.1",
      prettier: "^2.4.1",
      "raw-loader": "^1.0.0",
      "sass-loader": "^8.0.2",
      "style-resources-loader": "^1.4.1",
      stylelint: "^13.9.0",
      "stylelint-config-sass-guidelines": "^7.1.0",
      "stylelint-order": "^4.1.0",
      "stylelint-webpack-plugin": "^2.1.1",
      typescript: "~4.1.5",
      "vue-template-compiler": "^2.6.11",
      "webpack-cli": "^3.3.11",
    },
    scripts: {
      serve: "vue-cli-service serve",
      build: "vue-cli-service build",
      lint: "vue-cli-service lint",
      "lint:css": "stylelint **/*.{html,vue,css,sass,scss}",
      "lint:css-fix": "npm run lint:css --fix",
      "build:serve": "http-server ./dist -a 127.0.0.1 -p 5050",
      "template:deploy":
        "cd .template && git init && git add -A && git commit -m 'deploy' && git push -f git@github.com:yuhaoz/my-template-web.git master:master",
      dll: "vue-cli-service dll",
    },
  })

  // 删除 vue-cli3 默认目录
  api.render((files) => {
    Object.keys(files)
      .filter((path) => path.startsWith("src/") || path.startsWith("public/"))
      .forEach((path) => delete files[path])
  })

  api.render("./template")

  // 屏蔽 generator 之后的文件写入操作
  // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true
  })
}
