<template>
  <div class="Me">
    <div class="Me_top">
      <div class="top-left">
        <div class="avator">
          <img class="avator_img" src="../assets/img/logo.png" />
        </div>
        <div class="left_right">
          <span class="userName">JACK VALENTINE</span>
          <div class="wallet">
            <img src="../assets/img/wallet.png" />
            <span>0xd50fa0eb5544f41490962a958b3d4b9169afec81</span>
          </div>
          <div class="address">
            <img src="../assets/img/address.png" />
            <span>Add your delivery address</span>
          </div>
        </div>
      </div>
      <img src="../assets/img/edit.png" class="edit" />
    </div>
    <div class="Me_center">
      <div class="nav">
        <span
          class="nav_item"
          :class="{ nav_item_avtive: navIndex == 1 }"
          @click="navIndex = 1"
          >My Purchase</span
        >
        <span class="lines"></span>
        <span
          class="nav_item"
          :class="{ nav_item_avtive: navIndex == 2 }"
          @click="navIndex = 2"
          >My Sales</span
        >
        <span class="lines"></span>
        <span
          class="nav_item"
          :class="{ nav_item_avtive: navIndex == 3 }"
          @click="navIndex = 3"
          >My Creation</span
        >
        <span class="lines"></span>
        <span
          class="nav_item"
          :class="{ nav_item_avtive: navIndex == 4 }"
          @click="navIndex = 4"
          >Receiver Address</span
        >
      </div>
      <div class="nav_box">
        <MyPurchase v-if="navIndex == 1" />
        <MySales v-if="navIndex == 2" />
        <MyCreation v-if="navIndex == 3" />
        <ReceiverAddress v-if="navIndex == 4" />
      </div>
    </div>
    <div class="div4">
      <div class="div_left">
        <img src="../assets/img/left_img.png" style="margin-left: 20px" />
        <div class="text">
          <span>TOM.TT</span><span>Contact us by NFT@TOM.TT</span>
        </div>
      </div>
      <div class="div_left right">
        <span>Audit Report</span>
        <span>Shopping Process</span>
        <span>About Us</span>
      </div>
    </div>
  </div>
</template>
<script>
import MyPurchase from "../components/Me/MyPurchase";
import MySales from "../components/Me/MySales";
import MyCreation from "../components/Me/MyCreation";
import ReceiverAddress from "../components/Me/ReceiverAddress";
export default {
  name: "Me",
  data() {
    return {
      navIndex: 4,
    };
  },
  components: { MyPurchase, MySales, MyCreation, ReceiverAddress },
  methods: {},
};
</script>
<style  scoped>
@import "../assets/style/Me/Me.css";
</style>