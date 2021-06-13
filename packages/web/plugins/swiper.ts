import 'swiper/css/swiper.min.css';
import Vue from 'vue';

// @ts-ignore
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';
import {Swiper} from "vue-awesome-swiper";

export function setupSwiper() {
  Vue.use(getAwesomeSwiper(Swiper));
}
