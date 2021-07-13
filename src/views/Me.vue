<template>
  <div class="Me">
    <div class="Me_top">
      <div class="top-left">
        <div class="avator">
          <img class="avator_img" src="../assets/img/logo.png" />
        </div>
        <div class="left_right">
          <span class="userName">{{ nickName }}</span>
          <div class="wallet">
            <img src="../assets/img/wallet.png" />
            <span>{{ accountAddr }}</span>
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
        <input
          type="text"
          placeholder="Please enter a personal name"
          v-model="nickName"
        />
      </div>
      <div class="dialog_name">Brief introduction</div>
      <div class="dialog_name_textarea">
        <textarea
          placeholder="Please enter a personal introduction"
          v-model="intro"
        ></textarea>
      </div>
      <div class="btns">
        <span class="cancel1" @click="centerDialogVisible = false">Cancel</span>
        <span class="confirm1" @click="customerEdit()">Confirm</span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "Me",
  data() {
    return {
      centerDialogVisible: false,
      show_close: false,
      accountAddr: "xxx.....xxx",
      nickName: "TOURIST",
      intro: null,
      id: null,
      walletAddress: null,
      apptoken: null,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      setTimeout(() => {
        const accountAddr = this.$store.state.accountAddr;
        this.accountAddr = accountAddr;
        console.log(accountAddr);
        const url = this.$api.getUserInfor + "?walletAddress=" + accountAddr;
        this.$axios
          .get(url)
          .then((userInfo) => {
            //console.log(userInfo);
            this.$store.state.apptoken = userInfo.data.data.apptoken;
            this.$store.state.userInfo.id = userInfo.data.data.id;
            this.$store.state.userInfo.headImg = userInfo.data.data.headImg;
            this.$store.state.userInfo.intro = userInfo.data.data.intro;
            this.$store.state.userInfo.nickName = userInfo.data.data.nickName;
            userInfo.data.data.nickName == null
              ? (this.nickName = "TOURIST")
              : (this.nickName = userInfo.data.data.nickName);
            this.intro = userInfo.data.data.intro;
            this.id = userInfo.data.data.id;
            this.walletAddress = userInfo.data.data.walletAddress;
            this.apptoken = userInfo.data.data.apptoken;
          })
          .catch((error) => {
            console.log(error);
          });
      }, 1000);
    },
    customerEdit() {
      if (this.nickName == null || this.nickName == "") {
        this.toast("error", "Please enter a personal name");
        return;
      }
      if (this.intro == null || this.intro == "") {
        this.toast("error", "Please enter a personal introduction");
        return;
      }
      this.$axios({
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        url: this.$api.customerEdit,
        data: qs.stringify({
          id: this.id,
          nickName: this.nickName,
          intro: this.intro,
          walletAddress: this.walletAddress,
          apptoken: this.apptoken,
        }),
      })

        .then((res) => {
          //console.log(res);
          if (res.data.success) {
            this.toast("success", "Edit success");
            this.centerDialogVisible = false;
          } else {
            this.toast("error", res.data.data.msg);
          }
        })
        .catch((err) => {
          this.toast("error", "Edit failed");
          console.log(err);
        });
    },
  },
};
</script>
<style  scoped>
@import "../assets/style/Me/Me.css";
</style>