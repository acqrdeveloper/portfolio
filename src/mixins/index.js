import en from "../locale/en.json.js";
import es from "../locale/es.json.js";
import {store} from "./../store";

export const globalMixin = {
  mounted() {
    if (localStorage.getItem("lang")) {
      switch (localStorage.getItem("lang")) {
        case "es":
          store.state.language.selected = es;
          break;
        case "en":
          store.state.language.selected = en;
          break;
      }
    } else {
      localStorage.setItem("lang", "es");
      store.state.language.selected = es;
    }
  },
  computed: {
    urlFileCV() {
      return `/portfolio/files/${import.meta.env.VITE_APP_FILENAME_CV}`;
    },
    selectedLanguage() {
      return store.getters.selectedLanguage;
    },
    loadingPage() {
      return store.getters.loadingPage;
    }
  },
  methods: {
    trackEvent(action) {
      this.$gtag.event(action, {
        event_category: "not set",
        event_label: "not set",
        value: 1
      });
    }
  }
};
