import type { App } from "vue";
import pinia from "../stores";

export const usePlugins = (app: App<Element>): void => {
    app.use(pinia);
};
