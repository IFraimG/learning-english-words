<template>
  <div class="home-slider__wrapper">
    <h1>Our Clients Say</h1>
    <p>Our in - house search engine experts deliver profitable Google, Bing, Yahoo Ranking.</p>
    <swiper
      effect="fade"
      class="home-slider home__slider"
      :slides-per-view="4"
      :space-between="30"
      navigation
      :pagination="{ clickable: true }"
    >
      <swiper-slide class="home-slider__item" v-for="(item, index) of sliderInfo" :key="index">
        <p>{{ item.text }}</p>
        <div class="home-slider__content">
          <img :src="item.logo" alt="logo">
          <h3>{{ item.author }}</h3>
          <p>{{ item.role }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue"
import SwiperCore, { Pagination } from 'swiper/core';
import People1 from "@/assets/people1.png"
import People2 from "@/assets/people2.png"
import "@/components/app/Home.scss"

import "swiper/components/pagination/pagination.min.css"
import 'swiper/swiper.scss';

SwiperCore.use([Pagination]);
export default {
  name: "SliderHome",
  components: { Swiper, SwiperSlide },
  data() {
    return {
      sliderInfo: [
        { logo: People1, role: "Web design", author: "Rabith Halson",  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque atque, id non iusto amet officiis saepe voluptatibus laborum obcaecati eveniet ex nam voluptates libero minima cupiditate magni exercitationem dolor." },
        { logo: People1, role: "Web design", author: "Rabith Halson", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque atque, id non iusto amet officiis saepe voluptatibus laborum obcaecati eveniet ex nam voluptates libero minima cupiditate magni exercitationem dolor." },
        { logo: People1, role: "Web design", author: "Rabith Halson", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque atque, id non iusto amet officiis saepe voluptatibus laborum obcaecati eveniet ex nam voluptates libero minima cupiditate magni exercitationem dolor." },
        { logo: People2, role: "UI Designer", author: "Selena Roy", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque atque, id non iusto amet officiis saepe voluptatibus laborum obcaecati eveniet ex nam voluptates libero minima cupiditate magni exercitationem dolor." },
        { logo: People2, role: "UI Designer", author: "Selena Roy", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque atque, id non iusto amet officiis saepe voluptatibus laborum obcaecati eveniet ex nam voluptates libero minima cupiditate magni exercitationem dolor." },
        { logo: People2, role: "UI Designer", author: "Selena Roy", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque atque, id non iusto amet officiis saepe voluptatibus laborum obcaecati eveniet ex nam voluptates libero minima cupiditate magni exercitationem dolor." },
        { logo: People1, role: "Web design", author: "Rabith Halson",  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque atque, id non iusto amet officiis saepe voluptatibus laborum obcaecati eveniet ex nam voluptates libero minima cupiditate magni exercitationem dolor." },
      ]
    }
  }
}
</script>
