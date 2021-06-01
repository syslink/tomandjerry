<template>
  <div class="Header">
    <div class="header_left">
      <img src="../../assets/img/logo.png" class="logo" />
      <img src="../../assets/img/TOM_NFT.png" />
    </div>
    <div class="header_right">
      <router-link to="/home" exact style="margin: 0 30px">HOME</router-link>
      <span class="line">/</span>
      <router-link to="/NFTMarketplace" exact style="margin: 0 30px"
        >NFT Marketplace</router-link
      >
      <span class="line">/</span>
      <router-link to="/me" exact style="margin: 0 30px">Me</router-link>
      <span class="line">/</span>

      <span class="bns" style="margin-left: 30px; margin-right: 20px">BNS</span>
      <span class="bns" style="margin-right: 20px">Airdrop TOM Test COIN</span>
      <span class="bns">Connect to a Wallet</span>
      <img src="../../assets/img/set.png" class="setimg" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {},
};
</script>
<style  scoped>
@import "../../assets/style/Header/Header.css";
</style>