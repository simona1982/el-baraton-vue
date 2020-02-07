<template>
  <v-card class="mx-auto" color="#26c6da" dark>
    <v-card-title>
      <v-icon large left>
        mdi-store
      </v-icon>
      <span class="title font-weight-black white--text">Lista Categorias</span>
    </v-card-title>

    <v-card-text
      class="headline font-weight-bold"
      style="background-color:white;color: black;"
    >
      <v-row class="mt-4 ">
        <v-treeview
          v-model="selection"
          selection-type="independent"
          shaped
          :items="categoryItems"
          item-children="sublevels"
          :selectable="selectable"
          class="black--text"
          @input="updateProductList"
          light
        ></v-treeview>
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

export default {
  computed: {
    ...mapGetters(["categoryItems", "productItems"])
  },
  created() {
    this.$store.dispatch("getCategoryItems");
    this.$store.dispatch("getProductItems");
  },
  data: () => ({
    selection: [],
    selectable: true,
    selectedColor: "success"
  }),
  methods: {
    updateProductList() {
      const categoriesSelected = this.selection;

      this.$store.dispatch("getProductItemsByCategories", {
        categoriesSelected
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
