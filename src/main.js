import { createApp } from "vue";

import App from "./App.vue";
import "@/assets/tailwind.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faSearch } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faSearch);

import router from "@/router";

const app = createApp(App);

app.use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
