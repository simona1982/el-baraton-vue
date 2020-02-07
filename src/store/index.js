import Vue from "vue";
import Vuex from "vuex";

import Category from "./modules/category";
import Product from "./modules/product";
import Cart from "./modules/cart";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Category,
    Cart,
    Product
  }
});

/*export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
});*/
