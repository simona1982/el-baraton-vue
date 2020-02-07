<template>
  <v-app id="inspire">
    <!-- NAVIGATION -->
    <v-navigation-drawer
      v-model="drawer"
      :color="color"
      clipped
      app
      dark
      :src="bg"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title white--text">
            Categorias
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- APP BAR -->
    <v-app-bar
      app
      dark
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      :color="color"
      :src="bg"
    >
      <div class="d-flex align-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
              v-on="on"
            ></v-app-bar-nav-icon>
          </template>
          <span>Click</span>
        </v-tooltip>
        <v-toolbar-title>El Baratón</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on">
            <v-avatar size="32px" item>
              <v-img
                :src="require('@/assets/profile.jpg')"
                alt="profile"
              ></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <span>Andrés Velásquez Delgado</span>
      </v-tooltip>
    </v-app-bar>

    <!-- CONTENT -->
    <v-content>
      <!--HelloWorld /-->
      <!--v-container class="fill-height" fluid-->
      <v-row align="start" justify="start" color="red">
        <v-col xs="12" sm="12" md="3" lg="3" xl="3" class="ml-3">
          <CategoryList />
        </v-col>

        <v-col xs="12" sm="12" md="3" lg="3" xl="3" class="ml-3">
          <ProductList />
        </v-col>

        <v-col xs="12" sm="12" md="5" lg="5" xl="5" class="pl-0">
          <CartList />
        </v-col>
      </v-row>
      <!--/v-container-->
    </v-content>
  </v-app>
</template>

<script>
import CategoryList from "./components/category/CategoryList";
import ProductList from "./components/product/ProductList";
import CartList from "./components/cart/CartList";

export default {
  name: "App",
  components: {
    ProductList,
    CartList,
    CategoryList
  },
  data: () => ({
    background: true,
    color: "primary",
    colors: ["primary", "blue", "success", "red", "teal"],
    dialog: false,
    drawer: null,
    items: [
      { icon: "mdi-contacts", text: "Contacts" },
      { icon: "mdi-history", text: "Frequently contacted" },
      { icon: "mdi-content-copy", text: "Duplicates" },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "Labels",
        model: true,
        children: [{ icon: "mdi-plus", text: "Create label" }]
      },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "More",
        model: false,
        children: [
          { text: "Import" },
          { text: "Export" },
          { text: "Print" },
          { text: "Undo changes" },
          { text: "Other contacts" }
        ]
      },
      { icon: "mdi-settings", text: "Settings" },
      { icon: "mdi-message", text: "Send feedback" },
      { icon: "mdi-help-circle", text: "Help" },
      { icon: "mdi-cellphone-link", text: "App downloads" },
      { icon: "mdi-keyboard", text: "Go to the old version" }
    ]
  }),
  computed: {
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    }
  },
  created() {
    console.log("created");
  }
};
</script>
