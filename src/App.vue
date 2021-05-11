<template>
  <HeaderComponent/>

  <router-view/>

  <FooterComponent/>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
export default {
  name: "App",
  components: {
    HeaderComponent: HeaderComponent,
    FooterComponent: FooterComponent
  },
  beforeCreate() {
    this.$store.commit('initializeStore');
  }
};
</script>