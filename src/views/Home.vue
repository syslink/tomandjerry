<template>
  <div class="home">
    <div class="div1"><img src="../assets/img/img1.png" /></div>
    <div class="div2">
      <div class="top">
        <div class="top_item">
          <div class="one mar">
            <span>Total </span><span>{{ tomCatNFTInfo.totalSupply }}</span>
          </div>
          <div class="one">
            <span>breeding cats</span>
            <span>{{ tomCatNFTInfo.breedingCatNum }}</span>
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>fees for breeding cats</span>
            <span>{{ tradeMarketInfo.breedingOwnerFee }}</span>
          </div>
          <div class="one">
            <span>Total transaction</span>
            <span
              >{{
                getReadableNumber1(tradeMarketInfo.totalAmount, 18, 2)
              }}
              TOM</span
            >
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>Total number of transactions</span>
            <span>{{ tradeMarketInfo.dealCount }}</span>
          </div>
          <div class="one">
            <span>In transaction cats</span>
            <span>{{ tomCatNFTInfo.sellingCatNum }}</span>
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>Quantity</span>
            <span>{{ myInfo.totalAmount }}</span>
          </div>
          <div class="one">
            <span>For sale</span>
            <span>{{ myInfo.sellingCatNum }}</span>
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>Service charge for breeding cats</span>
            <span>{{ myInfo.breedingFeeAmount }}</span>
          </div>
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
          <!-- <img src="../assets/img/cat.jpeg" class="item_imgs" /> -->
          <img :src="cat.ipfsHash" alt="cat" class="item_imgs" />
          <div class="item_center">
            <div class="center_top">
              <span class="center_top_text">{{ cat.name }}</span>
              <img :src="cat.isBreeding ? lock : sell" />
            </div>
            <span class="name">ID: {{ cat.Id }}</span>
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
      <div class="see" v-if="allcats.length > 8">
        <router-link to="/cats">See More</router-link>
      </div>
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
      <el-form label-width="100px" class="demo-ruleForm">
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
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import EthCrypto from "eth-crypto";
import BigNumber from "bignumber.js";
import * as utils from "../assets/js/Common/utils";
import drizzle from "../assets/js/Common/drizzleOptions";
import qs from "qs";
let lock = require("../assets/img/lock.png");
let sell = require("../assets/img/sell.png");
export default {
  name: "Home",
  data() {
    return {
      lock: lock,
      sell: sell,
      centerDialogVisible: false,
      fullscreenLoading: false,
      sellingCatInfos: [],
      allcats: [],
      curStakeId: null,
      ipfs: null,
      defaultIPFSHash: "QmacK2mcZtkm4v3JapqsKE9jinYdf1uVzV6ZSzRdEu7vyP",
      curCatInfo: {
        ipfsHash: "QmacK2mcZtkm4v3JapqsKE9jinYdf1uVzV6ZSzRdEu7vyP",
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
      curCatNFTId: 0,
      priceDescending: true,
      pageSize: 10,
      curPage: 0,
      approveCatNFTTip: "Authorized cat NFT",
      approvingTip: "Authorizing...",
      wait: "Waiting....",
      submit: "Submit",
      isAddress: false,
    };
  },
  mounted() {
    this.updateTomCatData();
    this.updateTradeMarketData();
    this.updateMyInfo();
    this.getMarket();
    this.getUserAddress();
  },
  methods: {
    getUserAddress() {
      setTimeout(() => {
        const accountAddr = this.$store.state.accountAddr;
        // console.log(accountAddr);
        const url = this.$api.getUserInfor + "?walletAddress=" + accountAddr;
        this.$axios
          .get(url)
          .then((userInfo) => {
            // console.log(userInfo);
            this.$axios({
              method: "post",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              url: this.$api.getAddressList,
              data: qs.stringify({
                customerId: userInfo.data.data.id,
                apptoken: userInfo.data.data.apptoken,
              }),
            })
              .then((addressList) => {
                // console.log(addressList);
                if (addressList.data.success) {
                  if (addressList.data.data.length > 0) {
                    this.isAddress = true;
                  }
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }, 1000);
    },
    buyCat(catId, price) {
      setTimeout(() => {
        // const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket;
        // const tomERC20 = this.$store.state.drizzle.contracts.TomERC20;
        if (!this.isAddress) {
          this.$confirm(
            "You don't have a shipping address yet. Please add the shipping address in the personal center first!",
            "Reminder",
            {
              confirmButtonText: "Confirm",
              cancelButtonText: "Cancel",
              type: "warning",
            }
          )
            .then(() => {
              this.$router.push("/me/ReceiverAddress");
            })
            .catch(() => {});
          return;
        }
        const tradeMarket = this.$drizzle.contracts.TradeMarket;
        const tomERC20 = this.$drizzle.contracts.TomERC20;
        const accountAddr = this.$store.state.accountAddr;
        if (accountAddr == null || accountAddr == "") {
          this.$message.error("Please link the Metamask wallet first!");
          return;
        }

        this.curCatNFTId = catId;
        // console.log(this.curCatNFTId);
        tomERC20.methods
          .allowance(accountAddr, tradeMarket.address)
          .call()
          .then((amount) => {
            //console.log(amount);
            if (new BigNumber(amount).gt(new BigNumber(price))) {
              this.curStakeId = tradeMarket.methods["buyCat"].cacheSend(catId, {
                from: accountAddr,
              });
              this.syncTxStatus(
                () => {
                  this.updateTomCatData();
                  this.updateTradeMarketData();
                  this.updateMyInfo();
                  this.getMarket();
                },
                () => {
                  this.centerDialogVisible = false;
                }
              );
            } else {
              this.centerDialogVisible = true;
            }
          });
      }, 1000);
    },
    approveTomERC20() {
      //购买前授权
      setTimeout(() => {
        let str = this.approveCatNFTTip;
        // const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket,
        //  tomERC20 = this.$store.state.drizzle.contracts.TomERC20,
        const tradeMarket = this.$drizzle.contracts.TradeMarket,
          tomERC20 = this.$drizzle.contracts.TomERC20,
          accountAddr = this.$store.state.accountAddr;
        if (this.approveCatNFTTip == this.approvingTip) return;
        const curStakeId = tomERC20.methods["approve"].cacheSend(
          tradeMarket.address,
          "0x" + new BigNumber(1).shiftedBy(26).toString(16),
          { from: accountAddr }
        );
        this.curStakeId = curStakeId;
        this.approveCatNFTTip = this.approvingTip;
        this.syncTxStatus(
          () => {
            this.approvedTomERC20 = true;
            this.approveCatNFTTip = str;
          },
          () => {
            this.approveCatNFTTip = str;
            this.approvedTomERC20 = false;
            this.centerDialogVisible = false;
          }
        );
      }, 1000);
    },

    buyCatConfirm() {
      //授权后确认购买
      setTimeout(() => {
        let str = this.submit;
        const tradeMarket = this.$drizzle.contracts.TradeMarket;
        // const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket;
        const accountAddr = this.$store.state.accountAddr;
        if (accountAddr == null) return;
        this.curStakeId = tradeMarket.methods["buyCat"].cacheSend(
          this.curCatNFTId,
          { from: accountAddr }
        );
        this.submit = this.wait;
        this.syncTxStatus(
          () => {
            this.updateTomCatData();
            this.updateTradeMarketData();
            this.updateMyInfo();
            this.getMarket();
            this.approvedTomERC20 = false;
            this.submit = str;
            this.centerDialogVisible = false;
          },
          () => {
            this.approvedTomERC20 = false;
            this.submit = str;
            this.centerDialogVisible = false;
          }
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
      setTimeout(() => {
        //  console.log(this.$drizzle.contracts.TradeMarket);
        // let a = new Object(this.$drizzle.contracts);
        //console.log(a);
        // console.log(drizzle.contracts);
        //总数量
        // const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket;
        // const tomCatNFT = this.$store.state.drizzle.contracts.TomCatNFT;
        // console.log(tradeMarket);
        // console.log(this.tomCatNFT);
        // console.log(this.$store.getters.drizzle.contracts);
        // var a = JSON.parse(JSON.stringify(this.$store.state.drizzle));
        // console.log(a);
        // return;
        const tradeMarket = this.$drizzle.contracts.TradeMarket;
        // console.log(this.$drizzle.contracts);
        const tomCatNFT = this.$drizzle.contracts.TomCatNFT;
        //console.log(tradeMarket);
        //onsole.log(tomCatNFT);
        if (tomCatNFT == undefined) {
          // console.log("走了这里？");
          this.toast("error", "数据加载失败,请刷新当前网页");
          return;
        }
        tomCatNFT.methods
          .totalSupply()
          .call()
          .then((v) => {
            this.tomCatNFTInfo.totalSupply = v;
          });
        //种猫数量
        tomCatNFT.methods
          .breedingCatAmount()
          .call()
          .then((v) => {
            this.tomCatNFTInfo.breedingCatNum = v;
          });

        tomCatNFT.methods
          .balanceOf(tradeMarket.address)
          .call()
          .then(async (v) => {
            this.tomCatNFTInfo.sellingCatNum = parseInt(v);
            this.tradeMarketInfo.sellingCatIds = [];
          });
      }, 1000);
    },
    updateTradeMarketData() {
      setTimeout(() => {
        // const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket;
        const tradeMarket = this.$drizzle.contracts.TradeMarket;
        if (tradeMarket == undefined) {
          return;
        }
        tradeMarket.methods
          .totalAmount()
          .call()
          .then((v) => {
            this.tradeMarketInfo.totalAmount = v;
          });
        tradeMarket.methods
          .breedingOwnerFee()
          .call()
          .then((v) => {
            this.tradeMarketInfo.breedingOwnerFee = v;
          });
        tradeMarket.methods
          .getDealedOrderNumber()
          .call()
          .then((v) => {
            this.tradeMarketInfo.dealCount = v;
          });
      }, 1000);
    },

    updateMyInfo() {
      setTimeout(() => {
        //const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket;
        // const tomCatNFT = this.$store.state.drizzle.contracts.TomCatNFT;
        const tradeMarket = this.$drizzle.contracts.TradeMarket;
        const tomCatNFT = this.$drizzle.contracts.TomCatNFT;
        let accountAddr = this.$store.state.accountAddr;
        if (
          accountAddr == null ||
          accountAddr == "" ||
          accountAddr == undefined
        ) {
          return;
        }

        this.motherInfos = [0];
        if (tradeMarket == undefined) {
          return;
        }
        tradeMarket.methods
          .sellingCatsNumber(accountAddr)
          .call()
          .then((v) => {
            this.myInfo.sellingCatNum = v;

            tomCatNFT.methods
              .balanceOf(accountAddr)
              .call()
              .then((amount) => {
                this.myInfo.totalAmount =
                  parseInt(amount) + parseInt(this.myInfo.sellingCatNum);
              });
          });
        tradeMarket.methods
          .breedingCatOwnerFeeMap(accountAddr)
          .call()
          .then((v) => {
            this.myInfo.breedingFeeAmount = v;
          });
      }, 1000);
    },
    async getMarket() {
      //交易市场

      setTimeout(() => {
        //console.log("执行了这个方法");
        const { create, urlSource } = require("ipfs-http-client");
        this.ipfs = create({
          host: "ipfs.infura.io",
          port: "5001",
          protocol: "https",
        });
        let accountAddr = this.$store.state.accountAddr;
        // console.log(accountAddr);
        if (
          accountAddr == null ||
          accountAddr == "" ||
          accountAddr == undefined
        ) {
          return;
        }
        // const TomCatNFT = this.$store.state.drizzle.contracts.TomCatNFT;
        // const TradeMarket = this.$store.state.drizzle.contracts.TradeMarket;
        const TradeMarket = this.$drizzle.contracts.TradeMarket;
        const TomCatNFT = this.$drizzle.contracts.TomCatNFT;

        if (TomCatNFT == null || TomCatNFT == "" || TomCatNFT == undefined) {
          return;
        }
        this.fullscreenLoading = true;
        ////console.log(1111);
        //console.log(TomCatNFT);
        TomCatNFT.methods
          .balanceOf(TradeMarket.address)
          .call()
          .then(async (v) => {
            let len = v.length;
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
                  if (Number(catId) == 0) {
                    return;
                  }
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
                      //console.log(ipfsHash);
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
                  setTimeout(() => {
                    this.sellingCatInfos = JSON.parse(
                      JSON.stringify(this.allcats)
                    );
                    if (len.length > 8) {
                      this.sellingCatInfos = this.allcats.slice(0, 8);
                    } else {
                      //this.sellingCatInfos = this.allcats;
                      this.sellingCatInfos = this.allcats.slice(0, 8);
                    }
                    // console.log(this.allcats);
                    // console.log(this.allcats.length);
                    // this.sellingCatInfos = this.allcats.slice(0, 8);
                    this.fullscreenLoading = false;
                  }, 1000);
                });
              });
          })
          .catch((value) => {
            console.log("error");
          });
      }, 1000);

      // }, 1000);
    },
    syncTxStatus(successCallback, failCallback) {
      const intervalId = setInterval(() => {
        // get the transaction states from the drizzle state
        // const drizzleState = this.$store.state.drizzle.store.getState();
        const drizzleState = this.$drizzle.store.getState();
        const { transactions, transactionStack } = drizzleState;

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
