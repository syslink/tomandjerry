<template>
  <div class="home">
    <div class="div1"><img src="../assets/img/img1.png" /></div>
    <div class="div2">
      <div class="top">
        <div class="top_item">
          <div class="one mar">
            <span>Total </span><span>{{ tomCatNFTInfo.totalSupply }}</span>
            <!-- <span>Total </span><span>0</span> -->
          </div>
          <div class="one">
            <span>breeding cats</span>
            <span>{{ tomCatNFTInfo.breedingCatNum }}</span>
            <!-- <span>0</span> -->
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>fees for breeding cats</span>
            <span>{{ tradeMarketInfo.breedingOwnerFee }}</span>
            <!-- <span>0</span> -->
          </div>
          <div class="one">
            <span>Total transaction</span>
            <span
              >{{
                getReadableNumber1(tradeMarketInfo.totalAmount, 18, 2)
              }}
              TOM</span
            >
            <!-- <span>0 TOM</span> -->
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>Total number of transactions</span>
            <span>{{ tradeMarketInfo.dealCount }}</span>
            <!-- <span>0</span> -->
          </div>
          <div class="one">
            <span>In transaction cats</span>
            <span>{{ tomCatNFTInfo.sellingCatNum }}</span>
            <!-- <span>0</span> -->
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>Quantity</span>
            <span>{{ myInfo.totalAmount }}</span>
            <!-- <span>0</span> -->
          </div>
          <div class="one">
            <span>For sale</span>
            <span>{{ myInfo.sellingCatNum }}</span>
            <!-- <span>0</span> -->
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>Service charge for breeding cats</span>
            <span>{{ myInfo.breedingFeeAmount }}</span>
            <!-- <span>0</span> -->
          </div>
          <!-- <div class="one">
            <span></span>
          </div> -->
        </div>
      </div>
      <div class="center">Hottest Artworks in 2 Weeks</div>
      <div
        class="catsbox"
        v-loading.fullscreen.lock="fullscreenLoading"
        element-loading-background="rgba(255, 255, 255, 0.2)"
      >
        <div
          class="cats_item1"
          v-for="(cat, index) in sellingCatInfos"
          :key="index"
        >
          <!-- @click="$router.push({ path: '/NFTMarketplace' })" -->
          <!-- <img src="../assets/img/item1.png" class="item_imgs" /> -->
          <img src="../assets/img/cat.jpeg" class="item_imgs" />
          <div class="item_center">
            <div class="center_top">
              <span class="center_top_text">{{ cat.name }}</span>
              <span class="name">ID: {{ cat.Id }}</span>
            </div>
            <span class="name"
              >isBreeding: {{ cat.isBreeding ? "YES" : "NO" }}</span
            >
            <span class="name"
              >Price: {{ getReadableNumber2(cat.price, 18, 2) }} TOM</span
            >
          </div>
          <div class="item_bottom" @click="buyCat(cat.Id, cat.price)">
            Buy Now
          </div>
        </div>
      </div>
      <div class="see"><router-link to="/cats">See More</router-link></div>
    </div>
    <div class="div3">
      <div class="title">How To Buy NFT Artworks</div>
      <div class="small_title">A new blockchain NFT e-commerce platform</div>
      <div class="cat_bg">
        <div class="bg1">
          <span class="span1">Connect to Wallet</span>
          <span class="span2"
            >After downloading and installing your Metamask (Chrome) or
            TokenPocket (app) wallet, set the wallet owner to BSC, and click
            “Connect to a Wallet” on the upper right to log in to TOM, to start
            your collection.</span
          >
        </div>
        <div class="bg2">
          <span class="span1">Purchase</span>
          <span class="span2"
            >Learn about the artworks, select your favorite item, click
            “Purchase Now”, and complete the payment according to the
            instructions. During the purchase process, you need to make sure
            that the wallet has a sufficient balance in the corresponding
            token.</span
          >
        </div>
        <div class="bg3">
          <span class="span1">Collection and Display</span>
          <span class="span2"
            >You can view the purchased items in TOM, move the NFT works to your
            “wallet” for collection, or benefit from the “ Eco-TOM” for
            additional income.</span
          >
        </div>
        <div class="bg4">
          <span class="span1">Global Express</span>
          <span class="span2"
            >TOM physical goods support globally express delivering. No matter
            which country you are in, you can receive the goods after
            purchase.</span
          >
        </div>
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
    <!-- 购买Dialog -->
    <el-dialog
      title="Buy Cats"
      :visible.sync="centerDialogVisible"
      width="40%"
      center
    >
      <!-- <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      > -->
      <!-- <el-form-item
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
          </el-form-item> -->
      <el-form-item v-if="!approvedTomERC20">
        <el-button
          type="warning"
          style="margin-left: 40%; transform: translateX(-50%)"
          @click="approveTomERC20()"
          >{{ approveCatNFTTip }}</el-button
        >
      </el-form-item>
      <el-form-item v-else>
        <el-button
          type="warning"
          style="margin-left: 40%; transform: translateX(-50%)"
          @click="buyCatConfirm()"
          >{{ submit }}</el-button
        >
      </el-form-item>
      <!-- </el-form> -->
    </el-dialog>
  </div>
</template>

<script>
import EthCrypto from "eth-crypto";
import BigNumber from "bignumber.js";
import * as utils from "../assets/js/Common/utils";
export default {
  name: "Home",
  computed: {
    tomCatNFT() {
      return this.$store.state.drizzle.contracts.TomCatNFT;
    },
    tradeMarket() {
      return this.$store.state.drizzle.contracts.TradeMarket;
    },
    tomERC20() {
      return this.$store.state.drizzle.contracts.tomERC20;
    },
  },
  data() {
    return {
      centerDialogVisible: false,
      fullscreenLoading: true,
      sellingCatInfos: [],
      allcats: [],
      curStakeId: null,
      ipfs: null,
      defaultIPFSHash: "QmNtWjcfKTkJNfErtFMPwMV9F5C5DRKGUTHi4yjigtXP4N",
      curCatInfo: {
        ipfsHash: "QmNtWjcfKTkJNfErtFMPwMV9F5C5DRKGUTHi4yjigtXP4N",
      },
      approvedTomERC20: false,
      ipfsUrl: "https://ipfs.io/ipfs/",
      accountAddr: null,
      tomCatNFTInfo: { totalSupply: 0, breedingCatNum: 0, sellingCatNum: 0 }, // 总量，种猫数量，正在交易中的猫数量
      tradeMarketInfo: {
        totalAmount: 0,
        dealCount: 0,
        breedingOwnerFee: 0,
        sellingCatInfos: {},
      }, // 总交易金额，总交易量，种猫拥有者的手续费收入
      myInfo: {
        totalAmount: 0,
        sellingCatNum: 0,
        breedingFeeAmount: 0,
        myCatInfos: [],
        mySellingCatInfos: [],
      }, // 账户拥有的猫总数，出售中猫咪数量，以及种猫手续费收入
      // catInfo: {},
      // approveTomERC20Tip: "授权Tom代币",
      // approveCatNFTTip: "授权猫咪NFT",
      // approvingTip: "授权中",
      curCatNFTId: 0,
      priceDescending: true,
      pageSize: 10,
      curPage: 0,
      approveCatNFTTip: "Authorized cat NFT",
      approvingTip: "Authorizing...",
      wait: "Waiting....",
      submit: "Submit",
      // approvedTom: 0,
      // isBreeding: false,
      // motherInfos: [],
    };
  },
  created() {
    this.updateTomCatData();
    this.updateTradeMarketData();
    this.updateMyInfo();
    this.getMarket();
  },
  methods: {
    buyCat(catId, price) {
      setTimeout(() => {
        const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket;
        const tomERC20 = this.$store.state.drizzle.contracts.TomERC20;
        const accountAddr = this.$store.state.accountAddr;
        // if (accountAddr == null) {
        //   return;
        // }

        this.curCatNFTId = catId;
        console.log(this.curCatNFTId);
        tomERC20.methods
          .allowance(accountAddr, tradeMarket.address)
          .call()
          .then((amount) => {
            console.log(amount);
            if (new BigNumber(amount).gt(new BigNumber(price))) {
              this.curStakeId = tradeMarket.methods["buyCat"].cacheSend(catId, {
                from: accountAddr,
              });
              //return;
              this.syncTxStatus(
                () => {
                  this.updateTomCatData();
                  this.updateTradeMarketData();
                  this.updateMyInfo();
                  this.getMarket();
                },
                () => {}
              );
            } else {
              //this.setState({ buyCatNFTVisible: true });
              this.centerDialogVisible = true;
            }
          });
      }, 1000);
    },
    approveTomERC20() {
      setTimeout(() => {
        let str = this.approveCatNFTTip;
        const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket,
          tomERC20 = this.$store.state.drizzle.contracts.TomERC20,
          accountAddr = this.$store.state.accountAddr;
        if (this.approveCatNFTTip == this.approvingTip) return;
        const curStakeId = tomERC20.methods["approve"].cacheSend(
          tradeMarket.address,
          "0x" + new BigNumber(1).shiftedBy(26).toString(16),
          { from: accountAddr }
        );
        // this.setState({ approveTomERC20Tip: approvingTip, curStakeId });
        this.curStakeId = curStakeId;
        this.approveCatNFTTip = this.approvingTip;
        this.syncTxStatus(
          () => {
            this.approvedTomERC20 = false;
            this.approveCatNFTTip = str;
            // this.setState({ approvedTomERC20: false, approveTomERC20Tip });
          },
          () => {
            this.approveCatNFTTip = str;
            //this.setState({ approveTomERC20Tip });
          }
        );
      }, 1000);
    },

    buyCatConfirm() {
      setTimeout(() => {
        const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket;
        const accountAddr = this.$store.state.accountAddr;
        if (accountAddr == null) return;
        this.curStakeId = tradeMarket.methods["buyCat"].cacheSend(
          this.curCatNFTId,
          { from: accountAddr }
        );
        this.syncTxStatus(
          () => {
            this.updateTomCatData();
            this.updateMyInfo();
          },
          () => {}
        );
      }, 1000);
    },
    getReadableNumber1(v, assetDecimal, displayDecimal) {
      return utils.getReadableNumber(
        this.tradeMarketInfo.totalAmount,
        assetDecimal,
        displayDecimal
      );
    },
    getReadableNumber2(v, assetDecimal, displayDecimal) {
      return utils.getReadableNumber(v, assetDecimal, displayDecimal);
    },
    updateTomCatData() {
      const _this = this;
      setTimeout(() => {
        //总数量
        this.tomCatNFT.methods
          .totalSupply()
          .call()
          .then((v) => {
            this.tomCatNFTInfo.totalSupply = v;
          });
        //种猫数量
        this.tomCatNFT.methods
          .breedingCatAmount()
          .call()
          .then((v) => {
            this.tomCatNFTInfo.breedingCatNum = v;
          });

        this.tomCatNFT.methods
          .balanceOf(this.tradeMarket.address)
          .call()
          .then(async (v) => {
            this.tomCatNFTInfo.sellingCatNum = parseInt(v);
            this.tradeMarketInfo.sellingCatIds = [];
          });
      }, 1000);
    },
    updateTradeMarketData() {
      const _this = this;
      setTimeout(() => {
        this.tradeMarket.methods
          .totalAmount()
          .call()
          .then((v) => {
            this.tradeMarketInfo.totalAmount = v;
          });
        this.tradeMarket.methods
          .breedingOwnerFee()
          .call()
          .then((v) => {
            this.tradeMarketInfo.breedingOwnerFee = v;
          });
        this.tradeMarket.methods
          .getDealedOrderNumber()
          .call()
          .then((v) => {
            this.tradeMarketInfo.dealCount = v;
          });
      }, 1000);
    },

    updateMyInfo() {
      setTimeout(() => {
        this.$store.state.accountAddr != null
          ? (this.accountAddr = this.$store.state.accountAddr)
          : (this.accountAddr = "0x0000000000000000000000000000000000000000");
        if (this.accountAddr == "0x0000000000000000000000000000000000000000")
          return;
        this.motherInfos = [0];
        this.tradeMarket.methods
          .sellingCatsNumber(this.accountAddr)
          .call()
          .then((v) => {
            this.myInfo.sellingCatNum = v;

            this.tomCatNFT.methods
              .balanceOf(this.accountAddr)
              .call()
              .then((amount) => {
                this.myInfo.totalAmount =
                  parseInt(amount) + parseInt(this.myInfo.sellingCatNum);
              });
          });
        this.tradeMarket.methods
          .breedingCatOwnerFeeMap(this.accountAddr)
          .call()
          .then((v) => {
            this.myInfo.breedingFeeAmount = v;
          });
      }, 1000);
    },
    getMarket() {
      //交易市场

      const { create, urlSource } = require("ipfs-http-client");
      this.ipfs = create({
        host: "ipfs.infura.io",
        port: "5001",
        protocol: "https",
      });
      setTimeout(() => {
        let accountAddr = this.$store.state.accountAddr;
        accountAddr != null
          ? (accountAddr = accountAddr)
          : (accountAddr = "0x0000000000000000000000000000000000000000");

        const TomCatNFT = this.tomCatNFT;
        const TradeMarket = this.tradeMarket;

        TomCatNFT.methods
          .balanceOf(TradeMarket.address)
          .call()
          .then(async (v) => {
            this.tradeMarketInfo.sellingCatIds = [];

            TradeMarket.methods
              .getOrderIds(
                0,
                this.pageSize < this.tomCatNFTInfo.sellingCatNum
                  ? this.pageSize
                  : this.tomCatNFTInfo.sellingCatNum,
                this.priceDescending
              )
              .call()
              .then((catIds) => {
                catIds.map((catId) => {
                  TomCatNFT.methods
                    .id2CatInfoMap(catId)
                    .call()
                    .then((catInfo) => {
                      if (this.tradeMarketInfo.sellingCatInfos[catId] == null) {
                        this.tradeMarketInfo.sellingCatInfos[catId] = {};
                      }
                      this.tradeMarketInfo.sellingCatInfos[catId].name =
                        catInfo.name;
                      this.tradeMarketInfo.sellingCatInfos[catId].desc =
                        catInfo.desc;
                      this.tradeMarketInfo.sellingCatInfos[catId].isBreeding =
                        catInfo.isBreeding;
                      this.tradeMarketInfo.sellingCatInfos[catId].motherId =
                        catInfo.motherId;
                      this.tradeMarketInfo.sellingCatInfos[catId].Id = catId;
                    });
                  TomCatNFT.methods
                    .tokenURI(catId)
                    .call()
                    .then((ipfsHash) => {
                      if (this.tradeMarketInfo.sellingCatInfos[catId] == null) {
                        this.tradeMarketInfo.sellingCatInfos[catId] = {};
                      }
                      this.tradeMarketInfo.sellingCatInfos[catId].ipfsHash =
                        ipfsHash.length < 20
                          ? this.ipfsUrl + this.defaultIPFSHash
                          : this.ipfsUrl + ipfsHash;
                    });
                  TradeMarket.methods
                    .tokenOrderMap(catId)
                    .call()
                    .then((catInfo) => {
                      if (this.tradeMarketInfo.sellingCatInfos[catId] == null) {
                        this.tradeMarketInfo.sellingCatInfos[catId] = {};
                      }
                      this.tradeMarketInfo.sellingCatInfos[catId].price =
                        catInfo.price;
                      this.allcats.push(
                        this.tradeMarketInfo.sellingCatInfos[catId]
                      );
                    });
                });
              });

            setTimeout(() => {
              if (this.allcats.length > 4) {
                this.sellingCatInfos = this.allcats.slice(0, 8);
              } else {
                this.sellingCatInfos = this.allcats;
              }
              this.fullscreenLoading = false;
            }, 1000);
          });
      }, 1000);
    },
    syncTxStatus(successCallback, failCallback) {
      const intervalId = setInterval(() => {
        // get the transaction states from the drizzle state
        const drizzleState = this.$store.state.drizzle.store.getState();
        const { transactions, transactionStack } = drizzleState;
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
  },
};
</script>
<style scoped>
@import "../assets/style/Home/Home.css";
</style>
