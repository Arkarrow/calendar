import Vue from "vue";
import Router from "vue-router";
import Calendar from "@/components/Calendar";
import Parameters from "@/components/Parameters";
import Help from "@/components/Help";

import { Datetime } from "vue-datetime";

Vue.component("datetime", Datetime);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Calendar",
      component: Calendar,
    },
    {
      path: "/parameters",
      name: "Parameters",
      component: Parameters,
    },
    {
      path: "/help",
      name: "Help",
      component: Help,
    },
  ],
});
