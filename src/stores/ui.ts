import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    theme: (localStorage.getItem("theme") as "dark" | "light") || "dark",
  }),
  actions: {
    setTheme(theme: "dark" | "light") {
      this.theme = theme;
      localStorage.setItem("theme", this.theme);
      document.documentElement.setAttribute("data-theme", this.theme);
    },
    toggleTheme(next?: "dark" | "light") {
      const theme = next || (this.theme === "dark" ? "light" : "dark");
      this.setTheme(theme);
    },
    init() {
      this.setTheme(this.theme);
    },
  },
});
