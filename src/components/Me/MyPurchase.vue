<template>
  <div class="MyPurchase" v-if="myInfo.myCatInfos.length > 0">
    <!-- <img src="../../assets/img/MyPurchase-img.png" />
    <img src="../../assets/img/MyPurchase-img.png" />
    <img src="../../assets/img/MyPurchase-img.png" />
    <img src="../../assets/img/MyPurchase-img.png" />
    <img src="../../assets/img/MyPurchase-img.png" /> -->
    <div
      class="cats_item"
      v-for="(cat, index) in myInfo.myCatInfos"
      :key="index"
      @click="sellCat(cat)"
    >
      <!-- @click="$router.push({ path: '/NFTMarketplace' })" -->
      <img src="../../assets/img/cat.jpeg" class="item_imgsaa" />
      <!-- <img :src="cat.ipfsHash" class="item_imgsaa" /> -->
      <div class="item_centeraa">
        <div class="center_top">
          <span class="center_top_text">{{ cat.name }}</span>
          <span class="name">ID:{{ cat.id }}</span>
        </div>

        <span class="name">是否种猫: {{ cat.isBreeding ? "是" : "否" }}</span>
        <span class="name">族谱ID: {{ cat.motherId }}</span>
        <span class="sellbtn">出售</span>
      </div>
    </div>
    <!-- 出售Dialog -->
    <el-dialog
      title="Put it on the market and sell it"
      :visible.sync="centerDialogVisible"
      width="40%"
      center
    >
      <!-- <el-button
        type="warning"
        @click="approveCatNFT()"
        v-if="!approvedTomCatNFT"
        style="margin-left: 50%; transform: translateX(-50%)"
        >Authorization NFT Market</el-button
      > -->
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="Sell Price"
          prop="price"
          :rules="[
            { required: true, message: 'The price cannot be empty.' },
            { type: 'number', message: 'Price must be numeric' },
          ]"
        >
          <el-input
            type="price"
            v-model.number="numberValidateForm.price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!approvedTomCatNFT">
          <el-button
            type="warning"
            style="margin-left: 40%; transform: translateX(-50%)"
            @click="approveCatNFT()"
            >{{ approveCatNFTTip }}</el-button
          >
        </el-form-item>
        <el-form-item v-else>
          <el-button
            type="warning"
            style="margin-left: 40%; transform: translateX(-50%)"
            @click="submitForm('numberValidateForm')"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="submitForm('numberValidateForm')">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "../../assets/js/Common/drizzleOptions";
import BigNumber from "bignumber.js";
import * as utils from "../../assets/js/Common/utils";
export default {
  name: "MyPurchase",
  data() {
    return {
      centerDialogVisible: false,
      numberValidateForm: {
        price: "",
      },
      curCatNFTId: 0,
      curCatInfo: null,
      // accountAddr:
      //   this.$store.state.accountAddr != null
      //     ? this.$store.state.accountAddr
      //     : "0x0000000000000000000000000000000000000000",
      // myCatInfoList: [],
      ipfs: null,
      defaultIPFSHash: "QmNtWjcfKTkJNfErtFMPwMV9F5C5DRKGUTHi4yjigtXP4N",
      curCatInfo: {
        ipfsHash: "QmNtWjcfKTkJNfErtFMPwMV9F5C5DRKGUTHi4yjigtXP4N",
      },
      ipfsUrl: "https://ipfs.io/ipfs/",
      myInfo: {
        totalAmount: 0,
        sellingCatNum: 0,
        breedingFeeAmount: 0,
        myCatInfos: [],
        motherInfos: [],
        mySellingCatInfos: [],
      }, // 账户拥有的猫总数，出售中猫咪数量，以及种猫手续费收入
      allcats: [],
      approvedTomCatNFT: false, //授权NFT 市场
      drizzleState: null,
      approveCatNFTTip: "Authorized cat NFT",
      approvingTip: "Authorizing...",
    };
  },
  computed: {},
  created() {
    this.getMyCatInfos();
  },

  methods: {
    getMyCatInfos() {
      let drizzle = new Drizzle(drizzleOptions);
      // console.log(drizzle);
      // console.log(drizzle.store);
      this.drizzleState = drizzle.store.getState();
      //  console.log(this.drizzleState);
      const { create, urlSource } = require("ipfs-http-client");
      this.ipfs = create({
        host: "ipfs.infura.io",
        port: "5001",
        protocol: "https",
      });
      setTimeout(() => {
        const accountAddr = this.$store.state.accountAddr;
        const TomCatNFT = drizzle.contracts.TomCatNFT;
        console.log(accountAddr);
        console.log(TomCatNFT);
        //  return;
        TomCatNFT.methods
          .balanceOf(accountAddr)
          .call()
          .then((amount) => {
            //console.log(amount)
            this.myInfo.totalAmount =
              parseInt(amount) + parseInt(this.myInfo.sellingCatNum);

            for (var i = 0; i < parseInt(amount); i++) {
              TomCatNFT.methods
                .tokenOfOwnerByIndex(accountAddr, i)
                .call()
                .then((catId) => {
                  //	console.log(catId)
                  TomCatNFT.methods
                    .id2CatInfoMap(catId)
                    .call()
                    .then((catInfo) => {
                      //console.log(catInfo)
                      if (this.myInfo.myCatInfos[catId] == null) {
                        this.myInfo.myCatInfos[catId] = {};
                      }
                      this.myInfo.myCatInfos[catId].name = catInfo.name;
                      this.myInfo.myCatInfos[catId].desc = catInfo.desc;
                      this.myInfo.myCatInfos[catId].isBreeding =
                        catInfo.isBreeding;
                      this.myInfo.myCatInfos[catId].id = catId;
                      this.myInfo.myCatInfos[catId].motherId = catInfo.motherId;

                      TomCatNFT.methods
                        .tokenURI(catId)
                        .call()
                        .then((ipfsHash) => {
                          ipfsHash.length < 20
                            ? (ipfsHash = this.defaultIPFSHash)
                            : ipfsHash;
                          this.myInfo.myCatInfos[catId].ipfsHash =
                            this.ipfsUrl + ipfsHash;
                        });
                    });
                });
            }

            // this.myInfo.myCatInfos = JSON.parse(
            //   JSON.stringify(this.myInfo.myCatInfos)
            // );
            console.log(this.myInfo.myCatInfos);
            console.log(this.myInfo.myCatInfos.length);
            setTimeout(() => {
              // this.allcats = JSON.parse(JSON.stringify(this.myInfo.myCatInfos));
              this.myInfo.myCatInfos = this.myInfo.myCatInfos.filter((item) => {
                return item !== null;
              });
              // console.log(this.allcats);
              // console.log(this.allcats.length);
            }, 1000);
            // console.log(JSON.parse(JSON.stringify(this.myInfo.myCatInfos)));
          });
      }, 1000);
    },
    approveCatNFT() {
      // const {tradeMarket, tomCatNFT, accountAddr, approveCatNFTTip, approvingTip, curCatNFTId} = this.state;

      // const loading = this.$loading({
      //   fullscreen: true,
      //   text: "Authorizing, please wait...",
      //   background: "rgba(0,0,0,0.7)",
      // });

      const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket,
        tomCatNFT = this.$store.state.drizzle.contracts.TomCatNFT,
        accountAddr = this.$store.state.accountAddr,
        curCatNFTId = this.curCatNFTId;

      if (this.approveCatNFTTip == this.approvingTip) return;
      console.log(tradeMarket.address, curCatNFTId, accountAddr);
      const curStakeId = tomCatNFT.methods["approve"].cacheSend(
        tradeMarket.address,
        curCatNFTId,
        { from: accountAddr }
      );
      console.log("curStakeId =", curStakeId);
      // this.setState({approveCatNFTTip: approvingTip, curStakeId});
      this.curStakeId = curStakeId;
      this.approveCatNFTTip = this.approvingTip;
      this.syncTxStatus(
        () => {
          this.approvedTomCatNFT = true;
          this.approveCatNFTTip = this.approveCatNFTTip;
          // this.$nextTick(() => {
          //   // 以服务的方式调用的 Loading 需要异步关闭
          //   loading.close();
          // });
          //this.setState({approvedTomCatNFT: true, approveCatNFTTip});
        },
        () => {
          //this.setState({approveCatNFTTip});
          this.approveCatNFTTip = this.approveCatNFTTip;
          // alert("授权失败");
          // loading.close();
        }
      );
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket;
          const accountAddr = this.$store.state.accountAddr;
          const curCatNFTId = this.curCatNFTId;
          const sellPrice = this.numberValidateForm.price;
          console.log(tradeMarket);

          console.log(accountAddr, curCatNFTId, sellPrice);

          const curStakeId = tradeMarket.methods["addOrder"].cacheSend(
            curCatNFTId,
            sellPrice,
            { from: accountAddr }
          );
          this.curStakeId = curStakeId;
          // this.syncTxStatus(
          //   () => {
          //     this.updateTomCatData();
          //     this.updateTradeMarketData();
          //     this.updateMyInfo();
          //     this.setState({ sellCatNFTVisible: false });
          //   },
          //   () => {}
          // );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    sellCat(catInfo) {
      console.log(catInfo);
      //  const {tomCatNFT, accountAddr, tradeMarket} = this.state;
      const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket;
      const tomCatNFT = this.$store.state.drizzle.contracts.TomCatNFT;
      const accountAddr = this.$store.state.accountAddr;
      // const tomERC20 = this.$store.state.drizzle.contracts.TomERC20;
      this.curCatNFTId = catInfo.id;
      this.curCatInfo = catInfo;
      tomCatNFT.methods
        .isApprovedForAll(accountAddr, tradeMarket.address)
        .call()
        .then((v) => {
          //this.setState({approvedTomCatNFT: v});
        });
      //this.setState({sellCatNFTVisible: true});
      this.centerDialogVisible = true;
    },
    syncTxStatus(successCallback, failCallback) {
      const intervalId = setInterval(() => {
        // get the transaction states from the drizzle state
        console.log(this.drizzleState);
        const { transactions, transactionStack } = this.drizzleState;
        // console.log(transactions);
        // console.log(transactionStack);
        console.log(this.curStakeId);
        // get the transaction hash using our saved `stackId`
        const txHash = transactionStack[this.curStakeId];
        console.log("txHash", txHash, this.curStakeId, transactionStack);
        // if transaction hash does not exist, don't display anything
        if (!txHash) return;
        console.log("transaction", transactions[txHash]);
        if (transactions[txHash]) {
          const status = transactions[txHash].status;
          if (status == "pending") return;

          if (status == "success") {
            successCallback();
          } else {
            failCallback();
          }
          clearInterval(intervalId);
        }
        return;
      }, 3000);
    },
    // updateMyInfo() {
    //   setTimeout(() => {
    //     if (
    //       this.$store.state.accountAddr ==
    //       "0x0000000000000000000000000000000000000000"
    //     )
    //       return;
    //     //  this.motherInfos = [0];
    //     this.tomCatNFT.methods
    //       .balanceOf(this.$store.state.accountAddr)
    //       .call()
    //       .then((amount) => {
    //         //  console.log("amount=" + amount);
    //         this.myInfo.totalAmount =
    //           parseInt(amount) + parseInt(this.myInfo.sellingCatNum);
    //         //this.setState({myInfo});
    //         //console.log(this.myInfo.totalAmount);
    //         for (var i = 0; i < parseInt(amount); i++) {
    //           // console.log(i);
    //           this.tomCatNFT.methods
    //             .tokenOfOwnerByIndex(this.$store.state.accountAddr, i)
    //             .call()
    //             .then((catId) => {
    //               // console.log(catId);
    //               this.tomCatNFT.methods
    //                 .id2CatInfoMap(catId)
    //                 .call()
    //                 .then((catInfo) => {
    //                   //  console.log(catInfo);
    //                   if (this.myInfo.myCatInfos[catId] == null) {
    //                     this.myInfo.myCatInfos[catId] = {};
    //                   }
    //                   this.myInfo.myCatInfos[catId].name = catInfo.name;
    //                   this.myInfo.myCatInfos[catId].desc = catInfo.desc;
    //                   this.myInfo.myCatInfos[catId].isBreeding =
    //                     catInfo.isBreeding;
    //                   this.myInfo.myCatInfos[catId].id = catId;
    //                   this.myInfo.myCatInfos[catId].motherId = catInfo.motherId;
    //                   this.tomCatNFT.methods
    //                     .tokenURI(catId)
    //                     .call()
    //                     .then((ipfsHash) => {
    //                       ipfsHash.length < 20
    //                         ? (ipfsHash = this.defaultIPFSHash)
    //                         : ipfsHash;
    //                       this.myInfo.myCatInfos[catId].ipfsHash =
    //                         this.ipfsUrl + ipfsHash;
    //                     });
    //                 });
    //             });
    //         }
    //         console.log(this.myInfo.myCatInfos);
    //       });
    //   }, 1500);
    // },
  },
};
</script>
<style  scoped>
@import "../../assets/style/Me/MyPurchase.css";
</style>