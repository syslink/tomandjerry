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
      <img
        src="../assets/img/edit.png"
        class="edit"
        @click="centerDialogVisible = true"
      />
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
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="524px"
      height="471px"
      custom-class="dialog"
      :show-close="show_close"
      center
    >
      <div class="dialog_title">Edit Profile</div>
      <div class="dialog_name">Name</div>
      <div class="dialog_name_input">
        <input type="text" placeholder="Please enter a personal name" />
      </div>
      <div class="dialog_name">Brief introduction</div>
      <div class="dialog_name_textarea">
        <textarea placeholder="Please enter a personal introduction"></textarea>
      </div>
      <div class="btns">
        <span class="cancel" @click="centerDialogVisible = false">Cancel</span>
        <span class="confirm" @click="centerDialogVisible = false"
          >Confirm</span
        >
      </div>
    </el-dialog>
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
      centerDialogVisible: false,
      show_close: false,
    };
  },
  components: { MyPurchase, MySales, MyCreation, ReceiverAddress },
  methods: {},
};
</script>
<style  scoped>
@import "../assets/style/Me/Me.css";
</style>