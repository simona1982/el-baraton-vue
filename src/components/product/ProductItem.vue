<template>
  <div>
    <v-row>
      <v-col cols="6" xl="6">
        <h2 class="has-text-weight-bold">
          {{ productItemSelected.name }}
          <span class="has-text-primary has-text-weight-bold">
            {{ productItemSelected.price }}
          </span>
        </h2>
      </v-col>
      <v-col cols="6" xl="6" class="pl-4 pt-4">
        <span
          @click="addCartItem(productItemSelected)"
          v-if="productItemSelected.available"
          class="tag is-primary is-pulled-right has-text-white"
        >
          Añadir a carrito
        </span>
        <span v-else style="color: #26c6da;" class="pb-4">
          No disponible
        </span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ProductItem",
  props: ["productItemSelected"],
  methods: {
    ...mapActions(["addCartItem"])
  }
};
</script>

<style lang="scss" scoped>
.tag {
  cursor: pointer;
}
</style>
