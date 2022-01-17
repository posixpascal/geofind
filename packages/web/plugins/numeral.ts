import Vue from 'vue'
import numeral from 'numeral'

Vue.filter('numeral', (value, format) => {
  return numeral(value).format('0,000')
})
