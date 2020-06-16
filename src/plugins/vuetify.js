import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      light: {
        primary: "#6200EE",
        secondary: "#018786",
        accent: "#E5D352",
        error: "#AC3931",
        warning: "#D5573B",
        info: "#71B340",
        success: "#92B4F4"
      }
    }
  }
};

export default new Vuetify(opts);
