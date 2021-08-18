<template>
  <footer class="home-footer home__footer">
    <div class="home__container">
      <div class="home-footer__content">
        <div class="home-footer__item home-footer__first">
          <ul>
            <li>
              <div class="home-header__item home-header__logo">
                <img src="@/assets/logofone.png" />
                <h3>MyOcean<span>English</span></h3>
              </div>
            </li>
            <li>
              Distinctively exploit optimal alignments for intuitive bandwidth. Quickly coordinate business through revolutionary.
            </li>
            <li class="home-footer__socials">
              <router-link to="/">
                <img class="home-footer__socials-fc" src="@/assets/facebook.png" alt="facebook" />
              </router-link>
              <router-link to="/">
                <img src="@/assets/twitter.png" alt="twitter" />
              </router-link>
              <router-link to="/">
                <img src="@/assets/google.png" alt="google" />
              </router-link>
            </li>
          </ul>
        </div>
        <div class="home-footer__item">
          <h2>Our Company</h2>
          <ul>
            <li>About Us</li>
            <li>Our Services</li>
            <li>Our Plan</li>
            <li>Our Team</li>
            <li>Latest News</li>
          </ul>
        </div>
        <div class="home-footer__item">
          <h2>Our Services</h2>
          <ul>
            <li>About Us</li>
            <li>Our Services</li>
            <li>Our Plan</li>
            <li>Our Team</li>
            <li>Latest News</li>
          </ul>
        </div>
        <div class="home-footer__item">
          <h2>Contact Us</h2>
          <ul>
            <li>About Us</li>
            <li>Our Services</li>
            <li>Our Plan</li>
            <li>Our Team</li>
            <li>Latest News</li>
          </ul>
        </div>
      </div>
      <p class="home-footer__copyright">Copyright © GrowBe 2021. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script>
  import "@/components/app/scss/home/Home.scss"

  export default {
    name: "Footer",
  }
</script>
