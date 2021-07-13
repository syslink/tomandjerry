<template>
  <div class="Cats">
    <img src="../assets/img/imgcatbg.png" class="catsbg" />
    <div class="cats_text">Hottest Artworks in 2 Weeks</div>
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
  </div>
</template>
<script>
import EthCrypto from "eth-crypto";
import BigNumber from "bignumber.js";
import * as utils from "../assets/js/Common/utils";
import qs from "qs";
let lock = require("../assets/img/lock.png");
let sell = require("../assets/img/sell.png");
export default {
  name: "Cats",
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
                //console.log(addressList);
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
      //购买
      setTimeout(() => {
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
    getReadableNumber2(v, assetDecimal, displayDecimal) {
      return utils.getReadableNumber(v, assetDecimal, displayDecimal);
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
        if (
          accountAddr == null ||
          accountAddr == "" ||
          accountAddr == undefined
        ) {
          return;
        }

        const TomCatNFT = this.$drizzle.contracts.TomCatNFT;
        const TradeMarket = this.$drizzle.contracts.TradeMarket;
        if (TomCatNFT == null || TomCatNFT == "" || TomCatNFT == undefined) {
          return;
        }
        this.fullscreenLoading = true;
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
              this.sellingCatInfos = this.allcats;
              this.fullscreenLoading = false;
            }, 1000);
          });
      }, 1000);
    },
    updateTomCatData() {
      setTimeout(() => {
        //总数量
        const tomCatNFT = this.$drizzle.contracts.TomCatNFT;
        const tradeMarket = this.$drizzle.contracts.TradeMarket;
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
        const tradeMarket = this.$drizzle.contracts.TradeMarket;
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
    syncTxStatus(successCallback, failCallback) {
      const intervalId = setInterval(() => {
        // get the transaction states from the drizzle state
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
<style  scoped>
@import "../assets/style/Cats/Cats.css";
</style>