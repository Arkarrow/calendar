import Vue from "vue";
import Router from "vue-router";
import Calendar from "@/components/Calendar";
import Login from "@/components/Login";
import Parameters from "@/components/Parameters";
import Lists from "@/components/ListVue";
import Help from "@/components/Help";
import Toasted from "vue-toasted";

import { Datetime } from "vue-datetime";

Vue.component("datetime", Datetime);

Vue.use(Toasted);
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
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/lists",
      name: "Lists",
      component: Lists,
    },
  ],
});
