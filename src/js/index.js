import mobileNav from "./modules/mobile-nav.js";
import loader from "./modules/loader.js";

mobileNav();
loader();

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
