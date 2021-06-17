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
        <router-link to="/me/MyPurchase" exact class="nav_item"
          >MY PURCHASE</router-link
        >
        <router-link to="/me/MySales" exact class="nav_item"
          >MY SALES</router-link
        >
        <!-- <router-link to="/me/MyCreation" exact class="nav_item"
          >MY CREATION</router-link
        > -->
        <router-link to="/me/ReceiverAddress" exact class="nav_item"
          >MY ADDRESS</router-link
        >
        <router-link to="/me/PublishNFT" exact class="nav_item"
          >PUBLISH NFT</router-link
        >
      </div>
      <div class="nav_box">
        <router-view></router-view>
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
        <span class="cancel1" @click="centerDialogVisible = false">Cancel</span>
        <span class="confirm1" @click="centerDialogVisible = false"
          >Confirm</span
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Me",
  data() {
    return {
      centerDialogVisible: false,
      show_close: false,
    };
  },
  methods: {},
};
</script>
<style  scoped>
@import "../assets/style/Me/Me.css";
</style>