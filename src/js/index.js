// import mobileNav from "./modules/mobile-nav.js";
// mobileNav();

import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const swiper = new Swiper(".swiper", {
  parallax: true,
  loop: true,
  speed: 1000,

  keyboard: {
    enabled: true,
  },

  pagination: {
    el: ".slider-controls__count",
    type: "fraction",
  },

  navigation: {
    nextEl: "#sliderNext",
    prevEl: "#sliderPrev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
