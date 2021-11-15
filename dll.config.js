const path = require("path");

let pluginOptions = {
    dll: {
        inject: true,
        output: path.resolve(__dirname, "./public/static/dll"),
        filename: "[name].dll.js",
        open: false,
        entry: {
            vue: ["vue/dist/vue.esm.js", "vue-router/dist/vue-router.esm.js", "vuex/dist/vuex.esm.js"],
            flagwind: ["@egova/flagwind-core"]
        }
    }
};

const getVendor = () => {
    let personal = [];
    Object.values(pluginOptions.dll.entry).forEach((v) => {
        v.forEach((g) => {
            let b = g.split("/dist")[0];
            personal.push(b);
            let pk = require(`./node_modules/${b}/package.json`);
            if (pk.dependencies) {
                personal = [...personal, ...Object.keys(pk.dependencies)];
            }
            if (pk.peerDependencies) {
                personal = [...personal, ...Object.keys(pk.peerDependencies)];
            }
        });
    });
    let pkg = require("./package.json");
    let vendor = Object.keys(pkg.dependencies).filter((g) => personal.indexOf(g) < 0);
    return vendor;
};

if (pluginOptions.dll.open) {
    pluginOptions.dll.entry["vendor"] = getVendor();
}

module.exports = pluginOptions;
