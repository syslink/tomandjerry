<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import Web3 from "web3";
import { myMixins } from "./assets/js/Wallet/ConnectWallet";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./assets/js/Common/drizzleOptions";

export default {
  mixins: [myMixins],
  data() {
    return {
      web3: null,
    };
  },
  async created() {
    this.connectWallet(); //链接钱包
    let drizzle = await new Drizzle(drizzleOptions);
    this.$store.state.drizzle = drizzle;
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
</style>
