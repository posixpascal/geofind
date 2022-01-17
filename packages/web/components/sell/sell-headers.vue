<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <div class="relative bg-gray-50 overflow-hidden">
      <div class="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full" aria-hidden="true">
        <div class="relative h-full max-w-7xl mx-auto">
          <svg class="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2" width="404"
               height="784" fill="none" viewBox="0 0 404 784">
            <defs>
              <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x="0" y="0" width="20" height="20"
                       patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="404" height="784" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"/>
          </svg>
          <svg
            class="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
            width="404" height="784" fill="none" viewBox="0 0 404 784">
            <defs>
              <pattern id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b" x="0" y="0" width="20" height="20"
                       patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="404" height="784" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"/>
          </svg>
        </div>
      </div>
      <div class="relative pt-6 pb-16 sm:pb-24">
        <main class="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
          <div class="text-center">
            <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span class="block">Die moderne und sichere </span>
              {{ ' ' }}
              <span class="block text-yellow-600 xl:inline tracking-wider ">Geographie Lernsoftware</span>
            </h1>
            <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Mit <strong>Geofind</strong> vermitteln Sie Ihren Schülerinnen und Schülern spielerisch die Grundlagen der
              Geographie.
              Und das alles in einem sicheren, kostengünstigen und einfachen Gesamtpaket.
            </p>
            <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div class="rounded-md shadow">
                <a href="#"
                   class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 md:py-4 md:text-lg md:px-10">
                  Mehr erfahren
                </a>
              </div>
              <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a href="#"
                   class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-yellow-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                  Live Demo
                </a>
              </div>
            </div>
            <h4 class="mt-4">
              <Flag
                :hasBorderRadius="true"
                size="l"
                class="flag"
                gradient="real-linear"
                code="DE"/>
              Made in Germany
            </h4>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>

import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component
export default class SellHeaders extends Vue {
  get navigation() {
    return [
      {name: 'Product', href: '#'},
      {name: 'Features', href: '#'},
      {name: 'Marketplace', href: '#'},
      {name: 'Company', href: '#'},
    ]
  }
}
</script>
<style scoped>

.flag {
  position: relative;
  top: 6px;
  border: none;
}
</style>
