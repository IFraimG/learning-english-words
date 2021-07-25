import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Account from "@/views/Account.vue";
import ModalDeleteWords from "@/components/account/ModalDeleteWords.vue";
import ModalToFolders from "@/components/account/ModalToFolders.vue";
import ModalWords from "@/components/account/ModalWords.vue";
import ModalDelSections from "@/components/account/ModalDelSections.vue";
import Words from "@/views/Words.vue";
import NotFound from "@/views/404.vue";
import Dictionary from "@/views/Dictionary.vue";
import Folders from "@/views/Folders.vue";
import FolderPage from "@/views/FolderPage.vue";
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
    component: Words
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound
  },
  {
    path: "/dictionary",
    name: "Dictionary",
    component: Dictionary
  },
  {
    path: "/folders",
    name: "Folders",
    component: Folders,
  },
  {
    path: "/folders/:id",
    name: "FolderPage",
    component: FolderPage,
    children: [
      {
        path: "delete",
        component: ModalDelSections
      }
    ]
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
