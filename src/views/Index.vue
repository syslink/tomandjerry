<template>
  <div class="index">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>
<script>
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
export default {
  data() {
    return {};
  },
  components: { Header, Footer },
};
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  /* position: relative; */
}
</style>

