<template>
  <div class="relative bg-white py-16 sm:py-24 lg:py-32">
    <div
      class="
        mx-auto
        max-w-md
        px-4
        text-center
        sm:max-w-3xl sm:px-6
        lg:px-8 lg:max-w-7xl
      "
    >
      <h2 class="text-4xl tracking-wider text-yellow-600 uppercase">
        Deploy faster
      </h2>
      <p
        class="
          mt-2
          text-3xl
          font-extrabold
          text-gray-900
          tracking-tight
          sm:text-4xl
        "
      >
        Everything you need to deploy your app
      </p>
      <p class="mt-5 max-w-prose mx-auto text-xl text-gray-500">
        Phasellus lorem quam molestie id quisque diam aenean nulla in. Accumsan
        in quis quis nunc, ullamcorper malesuada. Eleifend condimentum id
        viverra nulla.
      </p>
      <div class="mt-12">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="feature in features" :key="feature.name" class="pt-6">
            <div class="flow-root bg-gray-50 rounded-lg px-6 pb-8">
              <div class="-mt-6">
                <div>
                  <span
                    class="
                      inline-flex
                      items-center
                      justify-center
                      p-3
                      bg-indigo-500
                      rounded-md
                      shadow-lg
                    "
                  >
                    <CloudUploadIcon />
                  </span>
                </div>
                <h3
                  class="mt-8 text-lg font-medium text-gray-900 tracking-tight"
                >
                  {{ feature.name }}
                </h3>
                <p class="mt-5 text-base text-gray-500">
                  Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                  Et magna sit morbi lobortis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  components: {},
})
export default class SellFeatures extends Vue {
  get features() {
    return []
  }
}
</script>
