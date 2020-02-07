<template>
  <v-card class="mx-auto" color="#26c6da" dark>
    <v-card-title>
      <v-icon large left>
        mdi-store
      </v-icon>
      <span class="title font-weight-black white--text">Lista Productos</span>
    </v-card-title>

    <v-card-text
      class="headline font-weight-bold"
      style="background-color:white;color: black;"
    >
      <v-row class="mt-4 ">
        <p
          v-if="!productItemsSelected.length"
          class="cart-empty-text has-text-centered"
          style="color: #26c6da;"
        >
          Selecciona algunas categorias!
        </p>

        <ul v-if="productItemsSelected.length > 0">
          <li
            v-for="productItemSelected in productItemsSelected"
            :key="productItemSelected.id"
            class="cart-item"
          >
            <ProductItem :productItemSelected="productItemSelected" />
          </li>
        </ul>
      </v-row>
      <!-- AQUI-TOY_-->
    </v-card-text>
    <!--v-list-item>
      <v-list-item-avatar color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline"
          >Lista de Productos</v-list-item-title
        >
        <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item-->
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import ProductItem from "./ProductItem";

export default {
  name: "ProductList",
  components: {
    ProductItem
  },
  computed: {
    //...mapGetters(["cartItems", "cartTotal", "cartQuantity"])
    ...mapGetters(["productItemsSelected"])
  },
  created() {
    this.$store.dispatch("getCategoryItems");
  },
  data: () => ({
    selection: [],
    selectable: true,
    selectedColor: "success",
    items: [
      {
        id: 1,
        name: "Applications :",
        children: [
          { id: 2, name: "Calendar : app" },
          { id: 3, name: "Chrome : app" },
          { id: 4, name: "Webstorm : app" }
        ]
      },
      {
        id: 5,
        name: "Documents :",
        children: [
          {
            id: 6,
            name: "vuetify :",
            children: [
              {
                id: 7,
                name: "src :",
                children: [
                  { id: 8, name: "index : ts" },
                  { id: 9, name: "bootstrap : ts" }
                ]
              }
            ]
          },
          {
            id: 10,
            name: "material2 :",
            children: [
              {
                id: 11,
                name: "src :",
                children: [
                  { id: 12, name: "v-btn : ts" },
                  { id: 13, name: "v-card : ts" },
                  { id: 14, name: "v-window : ts" }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 15,
        name: "Downloads :",
        children: [
          { id: 16, name: "October : pdf" },
          { id: 17, name: "November : pdf" },
          { id: 18, name: "Tutorial : html" }
        ]
      },
      {
        id: 19,
        name: "Videos :",
        children: [
          {
            id: 20,
            name: "Tutorials :",
            children: [
              { id: 21, name: "Basic layouts : mp4" },
              { id: 22, name: "Advanced techniques : mp4" },
              { id: 23, name: "All about app : dir" }
            ]
          },
          { id: 24, name: "Intro : mov" },
          { id: 25, name: "Conference introduction : avi" }
        ]
      }
    ]
  })
};
</script>

<style lang="scss" scoped></style>
