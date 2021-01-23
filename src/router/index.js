import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Account from "@/views/Account.vue";
import Words from "@/views/Words.vue";
import NotFound from "@/views/404.vue";
import { firebase } from "@firebase/app"
import store from "@/store/index"
require('firebase/auth');

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/account",
    name: "Account",
    component: Account
  },
  {
    path: "/words/:userid/:wordsid",
    name: "Words",
    component: Words
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  firebase.default.auth().onAuthStateChanged(user => {
    console.log(user);
    if (user == null) {
      store.commit("SET_AUTH", false)
      if (to.name !== "Home") next({ name: "Home" })
      else next()
    }
    if (user != null) {
      store.commit("SET_PROFILE", { email: user.email, login: user.displayName, id: user.uid })
      store.commit("SET_AUTH", true)
      if (to.name === "Home") next({ name: "Account" })
      else next();
    }
  })
})

export default router;
