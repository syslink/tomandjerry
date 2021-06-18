<template>
  <div
    class="MyPurchase"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0)"
    element-loading-customClass="loading"
  >
    <div class="centerboxs" v-if="myInfo.myCatInfos.length > 0">
      <div
        class="cats_item"
        v-for="(cat, index) in myInfo.myCatInfos"
        :key="index"
      >
        <!-- @click="$router.push({ path: '/NFTMarketplace' })" -->
        <img :src="cat.ipfsHash" alt="cat" class="item_imgsaa" />
        <!-- <img :src="cat.ipfsHash" class="item_imgsaa" /> -->
        <div class="item_centeraa">
          <div class="center_top">
            <span class="center_top_text">{{ cat.name }}</span>
            <span class="name">ID:{{ cat.id }}</span>
          </div>

          <span class="name"
            >isBreeding: {{ cat.isBreeding ? "YES" : "NO" }}</span
          >
          <span class="name">GenealogyID: {{ cat.motherId }}</span>
          <span class="sellbtn" @click="sellCat(cat)">Sell</span>
        </div>
      </div>

      <!-- 出售Dialog -->
      <el-dialog
        title="Put it on the market and sell it"
        :visible.sync="centerDialogVisible"
        width="40%"
        center
      >
        <el-form
          :model="numberValidateForm"
          ref="numberValidateForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="Description">
            <span>Description of sale.</span>
            <div v-if="!isauthon">
              <span>1. Authorized NFT market.</span>
              <span
                >2.After the authorization is successful, submit the
                confirmation transaction</span
              >
            </div>
            <div v-else>
              <span>1.Place submit the confirmation transaction</span>
            </div>
          </div>
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
            >
              <template slot="append">TOM</template>
            </el-input>
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
              >{{ submit }}</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div class="nodata" v-else>
      <span>No Sales yet…</span>
    </div>
  </div>
</template>
<script>
import BigNumber from "bignumber.js";
export default {
  name: "MyPurchase",
  data() {
    return {
      loading: false,
      centerDialogVisible: false,
      numberValidateForm: {
        price: "",
      },
      curCatNFTId: 0,
      curCatInfo: null,
      ipfs: null,
      defaultIPFSHash: "QmacK2mcZtkm4v3JapqsKE9jinYdf1uVzV6ZSzRdEu7vyP",
      curCatInfo: {
        ipfsHash: "QmacK2mcZtkm4v3JapqsKE9jinYdf1uVzV6ZSzRdEu7vyP",
      },
      ipfsUrl: "https://ipfs.io/ipfs/",
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
      allcats: [],
      approvedTomCatNFT: false, //授权NFT 市场
      approveCatNFTTip: "Authorized cat NFT",
      approvingTip: "Authorizing...",
      wait: "Waiting....",
      submit: "Submit",
      isauthon: false,
    };
  },
  created() {
    this.getMyCatInfos();
  },

  methods: {
    getMyCatInfos() {
      this.myInfo.myCatInfos = [];
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

        const TomCatNFT = this.$store.state.drizzle.contracts.TomCatNFT;
        this.loading = true;
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
                          // console.log(ipfsHash);
                          if (this.myInfo.myCatInfos[catId] == null) {
                            this.myInfo.myCatInfos[catId] = {};
                          }
                          this.myInfo.myCatInfos[catId].ipfsHash =
                            ipfsHash.length < 20
                              ? this.ipfsUrl + this.defaultIPFSHash
                              : this.ipfsUrl + ipfsHash;
                        });
                    });
                });
            }
            setTimeout(() => {
              this.myInfo.myCatInfos = this.myInfo.myCatInfos.filter((item) => {
                return item !== null;
              });
              this.loading = false;
              //console.log(this.myInfo.myCatInfos);
            }, 1000);
            // console.log(JSON.parse(JSON.stringify(this.myInfo.myCatInfos)));
          })
          .catch((value) => {
            this.loading = false;
          });
      }, 1000);
    },
    approveCatNFT() {
      const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket,
        tomCatNFT = this.$store.state.drizzle.contracts.TomCatNFT,
        accountAddr = this.$store.state.accountAddr,
        curCatNFTId = this.curCatNFTId;

      if (this.approveCatNFTTip == this.approvingTip) return;
      //console.log(tradeMarket.address, curCatNFTId, accountAddr);
      const curStakeId = tomCatNFT.methods["approve"].cacheSend(
        tradeMarket.address,
        curCatNFTId,
        { from: accountAddr }
      );
      // console.log("curStakeId =", curStakeId);
      this.curStakeId = curStakeId;
      this.approveCatNFTTip = this.approvingTip;
      this.syncTxStatus(
        () => {
          this.approvedTomCatNFT = true;
          this.approveCatNFTTip = "Authorized cat NFT";
          //this.approveCatNFTTip = this.approveCatNFTTip;
        },
        () => {
          //this.approveCatNFTTip = this.approveCatNFTTip;
          this.approveCatNFTTip = "Authorized cat NFT";
        }
      );
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket;
          const accountAddr = this.$store.state.accountAddr;
          const curCatNFTId = this.curCatNFTId;
          const sellPrice =
            "0x" +
            new BigNumber(this.numberValidateForm.price)
              .shiftedBy(18)
              .toString(16);
          if (this.submit == this.wait) return;

          const curStakeId = tradeMarket.methods["addOrder"].cacheSend(
            curCatNFTId,
            sellPrice,
            { from: accountAddr }
          );
          this.curStakeId = curStakeId;
          this.submit = this.wait;
          this.syncTxStatus(
            () => {
              this.approvedTomCatNFT = false;
              this.submit = "Submit";
              this.numberValidateForm.price = "";
              this.centerDialogVisible = false;
              this.getMyCatInfos();
            },
            () => {
              this.approvedTomCatNFT = false;
              this.submit = "Submit";
              this.numberValidateForm.price = "";
              this.centerDialogVisible = false;
            }
          );
        } else {
          return false;
        }
      });
    },
    sellCat(catInfo) {
      const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket;
      const tomCatNFT = this.$store.state.drizzle.contracts.TomCatNFT;
      const accountAddr = this.$store.state.accountAddr;
      // const tomERC20 = this.$store.state.drizzle.contracts.TomERC20;
      this.curCatNFTId = catInfo.id;
      this.curCatInfo = catInfo;
      tomCatNFT.methods
        .isApprovedForAll(accountAddr, tradeMarket.address)
        .call()
        .then((v) => {});
      // console.log(this.curCatNFTId);
      tomCatNFT.methods
        .getApproved(this.curCatNFTId)
        .call()
        .then((v) => {
          //console.log(v);
          if (v == "0x9555396929c805C859f01945b023dDeF9d65e6E0") {
            this.approvedTomCatNFT = true;
            this.isauthon = true;
          }
          this.centerDialogVisible = true;
        });
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
<style  scoped>
@import "../../assets/style/Me/MyPurchase.css";
</style>