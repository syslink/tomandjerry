<template>
  <div class="Cats">
    <img src="../assets/img/imgcatbg.png" class="catsbg" />
    <div class="CrookshacksCat">
      <di class="CatLeft">
        <div class="CatLeft_tag">On Auction</div>
        <img src="../assets/img/cat.png" />
      </di>
      <div class="CatRight">
        <div class="CatRight_title">Crookshacks Cat</div>
        <div class="CatRight_tool">
          <div class="tool_left">
            <img src="../assets/img/toolIcon.png" />
            <span class="tool_text">Financial card</span>
          </div>
          <div class="tool_left">
            <span class="art">Artist：</span>
            <span class="tool_text">JACK VALENTINE</span>
          </div>
        </div>
        <div class="content">
          Artworks brief introduction Artworks brief introduction Artworks brief
          introduction Artworks brief introduction Artworks brief introduction
          Artworks brief introduction Artworks brief introduc tion Artworks
          brief introduction
        </div>
        <div class="CatAmount">
          <img src="../assets/img/amountIcon.png" />
          <span class="amount">99 TOM</span>
        </div>
        <div class="buy" @click="centerDialogVisible = true">Buy Now</div>
        <div class="info">
          <div class="info_box">
            <div class="box_div">
              <span>NFT Contract ID：</span>
              <span>-</span>
            </div>
            <div class="box_div" style="margin-top: 10px">
              <span>Token ID：</span>
              <span>54458290</span>
            </div>
          </div>
          <div class="info_box">
            <div class="box_div">
              <span>Creator’s Address：</span>
              <span>0xE6058...1ew6869S</span>
            </div>
            <div class="box_div" style="margin-top: 10px">
              <span>Owner’s Address：</span>
              <span>0xE6058...1ew6869S</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- bidding -->
    <div class="bidding">
      <div class="bidding_left">
        <span class="bidding_title">Bidding</span>
        <div class="bidding_box">
          <span class="bidding_box_title">
            <span>Address</span><span>Price</span>
          </span>
          <div class="tr">
            <span>0xE6058...1ew6869S</span>
            <span>$ 0.111</span>
          </div>
        </div>
      </div>
      <div class="bidding_right">
        <span class="bidding_title">Trading History</span>
        <div class="bidding_box">
          <span class="bidding_box_title">
            <span>Event</span><span>Price</span> <span>From</span
            ><span>To</span>
            <span>Date</span>
          </span>
          <div class="tr">
            <span>Auction</span><span>-</span><span>0xE6058...1ew6869S</span
            ><span>0xE6058...1ew6869S</span><span>2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
    <!-- buy -->
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="812px"
      height="500px"
      custom-class="dialog"
      center
    >
      <div class="dialog_title">Order details</div>
      <div class="dialog_info">
        <img src="../assets/img/avator.png" class="order_img" />
        <div class="order_detail">
          <span class="order_title">标题标题标题标题标题</span>
          <div><span class="a"> #3 </span><span class="b">/9</span></div>
          <span class="limity">
            Limited sale of<span style="color: #9f786d">9</span>copies worldwide
          </span>
        </div>
      </div>
      <div class="total">
        <span class="total_text"> Total</span>
        <span class="total_num">678 USDT</span>
      </div>
      <div class="agree">
        <img :src="agree ? chuck : unchuck" @click="agree = !agree" />
        <span>I agree to TOM TOKEN’s terms of service</span>
      </div>
      <div class="btns">
        <span class="confirm" @click="centerDialogVisible = false"
          >Confirm</span
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
const unchuck = require("../assets/img/unchuck.png");
const chuck = require("../assets/img/chuck.png");
export default {
  name: "NFTMarketplace",
  data() {
    return {
      centerDialogVisible: false,
      agree: false,
      unchuck: unchuck,
      chuck: chuck,
    };
  },
  methods: {},
};
</script>
<style  scoped>
@import "../assets/style/NFTMarketplace/NFTMarketplace.css";
</style>