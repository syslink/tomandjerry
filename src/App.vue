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
  beforeCreate() {
    // let drizzle = new Drizzle(drizzleOptions);
    //this.$store.state.drizzle = drizzleOptions;
    // const obj = {};
    //console.log(drizzle);
    // console.log(typeof drizzle);
    // console.log([...drizzle]);
    // console.log(drizzle.toString());
    // console.log(JSON.stringify(drizzle));
    // console.log(JSON.parse(JSON.stringify(drizzle)));
    // console.log(drizzle.contracts.TradeMarket);
  },
  async created() {
    this.connectWallet(); //链接钱包
    // let drizzle = await new Drizzle(drizzleOptions);
    // this.$store.state.drizzle = drizzle;
    // this.$store.state.contracts = drizzle.contracts;
    // this.$store.state.TradeMarket = drizzle.contracts.TradeMarket;
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
