import axios from "axios";

const state = {
  categoryItems: []
};

const mutations = {
  UPDATE_CATEGORY_ITEMS(state, payload) {
    state.categoryItems = payload;
  }
};

const actions = {
  getCategoryItems({ commit }) {
    axios.get("/api/categories").then(response => {
      commit("UPDATE_CATEGORY_ITEMS", response.data.categories);
    });
  }
};

const getters = {
  categoryItems: state => state.categoryItems
};

const categoryModule = {
  state,
  mutations,
  actions,
  getters
};

export default categoryModule;
