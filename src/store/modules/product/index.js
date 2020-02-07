import axios from "axios";

const state = {
  productItems: [],
  productItemsSelected: []
};

const mutations = {
  UPDATE_PRODUCT_ITEMS(state, payload) {
    state.productItems = payload;
  },
  UPDATE_PRODUCT_ITEMS_SELECTED(state, payload) {
    state.productItemsSelected = payload;
  }
};

const actions = {
  getProductItems({ commit }) {
    axios.get("/api/products").then(response => {
      commit("UPDATE_PRODUCT_ITEMS", response.data.products);
    });
  },
  getProductItemsByCategories({ commit, state }, categories) {
    const productsByCategories = state.productItems.filter(product => {
      //console.log(categories);
      if (categories.categoriesSelected.includes(product.sublevel_id)) {
        return product;
      }
    });

    commit("UPDATE_PRODUCT_ITEMS_SELECTED", productsByCategories);
    //console.log(productsByCategories);
  }
};

const getters = {
  productItems: state => state.productItems,
  productItemsSelected: state => state.productItemsSelected
};

const productModule = {
  state,
  mutations,
  actions,
  getters
};

export default productModule;
