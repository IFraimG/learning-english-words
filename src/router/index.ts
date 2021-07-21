import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Account from "@/views/Account.vue";
import ModalDeleteWords from "@/components/account/ModalDeleteWords.vue";
import ModalToFolders from "@/components/account/ModalToFolders.vue";
import ModalWords from "@/components/account/ModalWords.vue";

import store from "@/store/index";
import firebase from "firebase/app";
import "firebase/auth"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    children: [
      {
        path: "delete",
        component: ModalDeleteWords
      },
      {
        path: "setupfolder",
        component: ModalToFolders
      },
      {
        path: "words",
        component: ModalWords
      }
    ]
  },
  {
    path: "/words/:userid/:wordsid",
    name: "Words",
    component: import(/* webpackChunkName: "group-user" */ "@/views/Words.vue")
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: import(/* webpackChunkName: "group-user" */ "@/views/404.vue")
  },
  {
    path: "/dictionary",
    name: "Dictionary",
    component: import(/* webpackChunkName: "group-user" */ "@/views/Dictionary.vue")
  },
  {
    path: "/folders",
    name: "Folders",
    component: import(/* webpackChunkName: "group-user" */ "@/views/Folders.vue")
  },
  {
    path: "/folders/:id",
    name: "FolderPage",
    component: import(/* webpackChunkName: "group-user" */ "@/views/FolderPage.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user: any) => {
    if (user == null) {
      store.commit("SET_AUTH", false);
      if (to.name !== "Home") return next({ name: "Home" });
    } else {
      store.commit("SET_PROFILE", { email: user.email, login: user.displayName, id: user.uid });
      store.commit("SET_AUTH", true);
      if (to.name === "Home") return next({ name: "Account" });
    }
    next();
  });
});

export default router;
