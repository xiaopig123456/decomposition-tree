import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import DecompositionTree from "../package/index";

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(DecompositionTree)

app.mount('#app')
