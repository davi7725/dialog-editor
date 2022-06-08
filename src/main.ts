import { createApp } from "vue";
import "./assets/index.css";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas)
library.add(far)

createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
.mount("#app");
