import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore
import path from "path";
// 兼容部分版本ie，引入polyfill
import legacy from "@vitejs/plugin-legacy";
import qiankun from "vite-plugin-qiankun";
import importCDN from "vite-plugin-cdn-import";
import createExternal from "vite-plugin-external";

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig(({ mode }) => {
  // @ts-ignore
  const env = loadEnv(mode, process.cwd(), "");
  console.log(mode);
  return {
    plugins: [
      react({ jsxRuntime: mode === "prod" ? "classic" : "automatic" }),
      legacy({
        targets: ["ie >= 11"],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      }),
      qiankun(env.VITE_APP_APP_NAME, { useDevMode: true }),
      importCDN({
        modules: [
          {
            name: "react",
            var: "React",
            path: "https://unpkg.com/react@18.3.1/umd/react.production.min.js",
          },
          {
            name: "react-dom",
            var: "ReactDOM",
            path: "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js",
          },
          {
            name: "dayjs",
            var: "dayjs",
            path: "https://unpkg.com/dayjs@1.11.11/dayjs.min.js",
          },
          {
            name: "antd",
            var: "antd",
            path: "https://unpkg.com/antd@5.19.1/dist/antd.min.js",
          },
        ],
      }),
      // 打包屏蔽公共资源包
      mode === "prod" &&
        createExternal({
          interop: "auto",
          externals: {
            react: "React",
            "react-dom": "ReactDOM",
            antd: "antd",
            dayjs: "dayjs",
          },
        }),
    ],
    resolve: {
      // @ts-ignore
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    server: {
      port: 5173,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: {
        "/api": {
          // 当遇到 /api 路径时，将其转换成 target 的值
          target: env.VITE_APP_API_HOST_PROXY,
          changeOrigin: true,
          rewrite: (pre) => pre.replace(/^\/api/, ""), // 将 /api 重写为空
          secure: false,
          // ssl: true,
        },
      },
    },
  };
});
