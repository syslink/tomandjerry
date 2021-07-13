<template>
  <div class="Header">
    <div class="header_left">
      <img src="../../assets/img/logo.png" class="logo" />
      <img src="../../assets/img/TOM_NFT.png" />
    </div>
    <div class="header_right">
      <router-link to="/home" exact style="margin: 0 10px">HOME</router-link>
      <span class="line">/</span>
      <router-link to="/cats" exact style="margin: 0 10px"
        >NFT Marketplace</router-link
      >
      <span class="line">/</span>
      <router-link to="/me/MyPurchase" exact style="margin: 0 10px"
        >Me</router-link
      >
      <!-- <a
        href="https://testnft.tom.tt/TOMNFTWhitePaper.pdf"
        target="_blank"
        style="margin-left: 10px"
        >White Paper</a
      > -->
      <span
        class="bns"
        style="margin-left: 30px; margin-right: 10px"
        @click="airdropTom()"
        >Airdrop TOM Test Coin</span
      >
      <!-- <span class="bns" style="margin-right: 10px" v-if="isConnected">{{
        chainId
      }}</span> -->

      <span class="bns" @click="connectedWallet">
        <img :src="chainId" class="webicon" />
        {{ isConnected ? account : "Connect to a Wallet" }}
      </span>
      <span class="language">English</span>
      <img src="../../assets/img/set.png" class="setimg" />
    </div>
  </div>
</template>
<script>
import Web3 from "web3";
import { myMixins } from "../../assets/js/Wallet/ConnectWallet";
let hecoIcon = require("../../assets/img/heco-icon.png");
let bscIcon = require("../../assets/img/bsc-icon.png");
let ethIcon = require("../../assets/img/eth-icon.png");
export default {
  mixins: [myMixins],
  name: "Header",
  data() {
    return {
      web3: null,
      hecoIcon: hecoIcon,
      bscIcon: bscIcon,
      ethIcon: ethIcon,
    };
  },
  computed: {
    chainId() {
      let chainId = this.$store.state.chainId;
      let chainID = "";
      switch (chainId) {
        case "128":
          chainID = hecoIcon;
          break;
        case "56":
          chainID = bscIcon;
          break;
        case "1":
          chainID = ethIcon;
          break;
      }
      return chainID;
    },
    account() {
      return this.$store.state.account;
    },
    isConnected() {
      return this.$store.state.isConnected;
    },
  },
  methods: {
    connectedWallet() {
      //钱包链接
      if (!this.isConnected) {
        // this.$emit("connectedWallet");
        this.connectWallet();
      }
    },
    airdropTom() {
      setTimeout(() => {
        let accountAddr = this.$store.state.accountAddr;
        if (
          accountAddr == null ||
          accountAddr == "" ||
          accountAddr == undefined
        ) {
          return;
        }
        console.log("airdropTom");
        console.log(this.$drizzle);
        const airdropTom = this.$drizzle.contracts.AirdropTom;
        airdropTom.methods["airdrop"].cacheSend({ from: accountAddr });
      }, 1000);
    },
  },
};
</script>
<style  scoped>
@import "../../assets/style/Header/Header.css";
</style>