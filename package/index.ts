import DecompositionTree from "./DecompositionTree.vue";
import type {App} from "vue";

export default {
    install(Vue:App) {
        Vue.component("DecompositionTree", DecompositionTree);
    }
}