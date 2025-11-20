import { createApp } from "vue";
import { createPinia } from "pinia";
import Antd from "ant-design-vue";
import router from "./router";
import App from "./App.vue";
import "./styles/globals.less";
import "ant-design-vue/dist/reset.css";

createApp(App).use(router).use(createPinia()).use(Antd).mount("#app");
