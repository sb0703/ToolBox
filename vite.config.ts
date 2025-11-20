import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // 如需自定义主题：
        // modifyVars: { 'primary-color': '#5b8cff' },
      },
    },
  },
  server: {
    host: "0.0.0.0", // 允许局域网访问
    port: 5173, // 可自定义端口
    strictPort: true, // 如果端口被占用就报错，不会换端口
    open: true, // 启动后自动打开浏览器
    hmr: {
      overlay: true, // 出现编译错误时在浏览器弹出错误遮罩
    },
    watch: {
      usePolling: true, // 某些环境下(WSL2、Docker、虚拟机)需要用轮询
    },
  },
});
