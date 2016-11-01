import Vue from 'vue'

import hypeForm from './HypeStepForm.vue'
import registration from './registration.vue'

Vue.component('hype-form-container',hypeForm)
Vue.component('reg-form',registration)

new Vue({
    el: '#app',
})
