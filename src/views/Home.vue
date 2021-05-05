<template>
  <HomeContent />
        <!-- <section class="main__cards-list">
          <div class="main__card">
            <img src="@/assets/free.png" alt="free" />
            <div class="main__card__text">
              <h3>Личный словарь</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
                dolor sapiente, facilis exercitationem blanditiis iste?
              </p>
            </div>
          </div>
          <div class="main__card">
            <img src="@/assets/free.png" alt="free" />
            <div class="main__card__text">
              <h3>Бесплатно</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
                dolor sapiente, facilis exercitationem blanditiis iste?
              </p>
            </div>
          </div>
          <div class="main__card">
            <img src="@/assets/free.png" alt="autochecking" />
            <div class="main__card__text">
              <h3>Автопроверка</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
                dolor sapiente, facilis exercitationem blanditiis iste?
              </p>
            </div>
          </div>
          <div class="main__card">
            <img src="@/assets/free.png" alt="free" />
            <div class="main__card__text">
              <h3>Удобные тесты</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
                dolor sapiente, facilis exercitationem blanditiis iste?
              </p>
            </div>
          </div>
        </section> -->
</template>

<script>
import { mapGetters } from "vuex";
import HomeContent from "@/components/app/Home"
// import "@/components/app/Main.scss";

export default {
  name: "Home",
  components: { HomeContent },
  // methods: {
  //   getOffset(el) {
  //     const rect = el.getBoundingClientRect();
  //     const scrollLeft =
  //       window.pageXOffset || document.documentElement.scrollLeft;
  //     const scrollTop =
  //       window.pageYOffset || document.documentElement.scrollTop;
  //     return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  //   }
  // },
  computed: {
    ...mapGetters(["loginInfo", "errorsList", "isAuth"])
  }
};
</script>