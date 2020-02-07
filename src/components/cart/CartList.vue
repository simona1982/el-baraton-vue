<template>
  <v-card class="mx-auto" color="#26c6da" dark>
    <v-card-title>
      <v-icon large left>
        mdi-cart
      </v-icon>
      <span class="title font-weight-black white--text">Carrito Compras</span>
    </v-card-title>

    <v-card-text
      class="headline font-weight-bold"
      style="background-color:white;color: black;"
    >
      <p
        v-if="!cartItems.length"
        class="cart-empty-text has-text-centered"
        style="color: #26c6da;"
      >
        Adjunta algunos productos al carrito de compras!
      </p>
      <!-- AQUI TOY -->
      <ul v-if="cartItems.length > 0">
        <li v-for="cartItem in cartItems" :key="cartItem.id" class="cart-item">
          <CartListItem :cartItem="cartItem" />
        </li>
      </ul>

      <v-row align="center" justify="center" class="mt-4">
        <v-btn
          rounded
          x-large
          outlined
          color="indigo"
          @click="removeAllCartItems"
        >
          <v-icon left>fa fa-euro</v-icon> ({{ cartTotal }}) Comprar</v-btn
        >
      </v-row>
      <!-- AQUI-TOY_-->
    </v-card-text>

    <v-card-actions class="pt-4">
      <v-badge :content="cartQuantity" class="ml-2">
        Cantidad Total
      </v-badge>

      <v-row justify="end" @click="removeAllCartItems">
        <p class="cart-remove-all--text mt-4 pb-0 mr-4">
          <i class="fa fa-trash"></i> Limpiar Carrito
        </p>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CartListItem from "./CartItem";

export default {
  name: "CartList",
  components: {
    CartListItem
  },
  computed: {
    //...mapGetters(["cartItems", "cartTotal", "cartQuantity"])
    ...mapGetters(["cartItems", "cartQuantity", "cartTotal"])
  },
  created() {
    this.$store.dispatch("getCartItems");
  },
  methods: {
    ...mapActions(["removeAllCartItems"])
  }
};
</script>

<style lang="scss" scoped>
.cart-item {
  padding: 10px 0;
  list-style: none;
}

.cart-empty-text {
  padding: 10px 0;
}

.cart-details {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

.cart-remove-all--text {
  cursor: pointer;
}
</style>
