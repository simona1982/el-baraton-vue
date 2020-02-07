import axios from "axios";

const state = {
  cartItems: []
};

const mutations = {
  UPDATE_CART_ITEMS(state, payload) {
    state.cartItems = payload;
  }
};

const actions = {
  getCartItems({ commit }) {
    axios.get("/api/cart").then(response => {
      commit("UPDATE_CART_ITEMS", response.data.products);
    });
  },
  addCartItem({ commit }, cartItem) {
    console.log(cartItem);
    axios.post("/api/cart", cartItem).then(response => {
      commit("UPDATE_CART_ITEMS", response.data.products);
    });
  },
  removeCartItem({ commit }, cartItem) {
    axios.post("/api/cart/delete", cartItem).then(response => {
      commit("UPDATE_CART_ITEMS", response.data);
    });
  },
  removeAllCartItems({ commit }) {
    axios.post("/api/cart/delete/all").then(response => {
      commit("UPDATE_CART_ITEMS", response.data);
    });
  }
};

const getters = {
  cartItems: state => state.cartItems,
  cartTotal: state => {
    return state.cartItems
      .reduce((acc, cartItem) => {
        var res = cartItem.price.substr(1);
        var numero = parseFloat(res);
        return cartItem.quantity * parseFloat(numero) + acc;
      }, 0)
      .toFixed(2);
  },
  cartQuantity: state => {
    return state.cartItems.reduce((acc, cartItem) => {
      return cartItem.quantity + acc;
    }, 0);
  }
};

const cartModule = {
  state,
  mutations,
  actions,
  getters
};

export default cartModule;
