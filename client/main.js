/* eslint-disable*/

import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(VueResource) // Web requests, Vue plugin
Vue.use(VueRouter)
Vue.use(Vuex)

const isDev = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test'

const store = new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    INCREMENT (state) {
      state.counter++
    }
  },
  actions: {
    INCREMENT ({commit}) {
      commit('INCREMENT')
    }
  },
  strict: isDev
});

const routes = [{
  path: '/',
  component: App
}];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({store, router}).$mount('#app');
