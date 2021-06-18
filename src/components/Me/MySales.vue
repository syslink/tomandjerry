<template>
  <div
    class="MySales"
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
          <span class="sellbtn" @click="CancelsellCat(cat)">Cancel Sale</span>
        </div>
      </div>
    </div>
    <div class="nodata" v-else>
      <span>No Sales yet…</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "MySales",
  data() {
    return {
      loading: false,
      ipfs: null,
      defaultIPFSHash: "QmacK2mcZtkm4v3JapqsKE9jinYdf1uVzV6ZSzRdEu7vyP",
      curCatInfo: {
        ipfsHash: "QmacK2mcZtkm4v3JapqsKE9jinYdf1uVzV6ZSzRdEu7vyP",
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
      curStakeId: null,
    };
  },
  created() {
    this.getMySellCatsInfo();
  },
  methods: {
    CancelsellCat(catInfo) {
      const loading = this.$loading({
        fullscreen: true,
        text: "Please wait a moment while you are in operation...",
        background: "rgba(0,0,0,0.7)",
      });
      const accountAddr = this.$store.state.accountAddr;
      if (accountAddr == null) {
        return;
      }
      const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket;
      const curStakeId = tradeMarket.methods["cancelOrder"].cacheSend(
        catInfo.id,
        { from: accountAddr }
      );
      this.curStakeId = curStakeId;
      this.syncTxStatus(
        () => {
          this.getMySellCatsInfo();
          loading.close();
        },
        () => {}
      );
    },
    getMySellCatsInfo() {
      this.loading = true;
      this.myInfo.myCatInfos = [];
      const { create, urlSource } = require("ipfs-http-client");
      this.ipfs = create({
        host: "ipfs.infura.io",
        port: "5001",
        protocol: "https",
      });
      setTimeout(() => {
        let accountAddr = this.$store.state.accountAddr;
        // console.log(accountAddr);
        if (accountAddr == null || accountAddr == "") {
          this.loading = false;
          return;
        }
        const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket;
        const tomCatNFT = this.$store.state.drizzle.contracts.TomCatNFT;

        tradeMarket.methods
          .sellingCatsNumber(accountAddr)
          .call()
          .then((v) => {
            tradeMarket.methods
              .getSellingCats(accountAddr, 0, parseInt(v))
              .call()
              .then((ids) => {
                ids.map((catId) => {
                  tomCatNFT.methods
                    .id2CatInfoMap(catId)
                    .call()
                    .then((catInfo) => {
                      if (this.myInfo.myCatInfos[catId] == null) {
                        this.myInfo.myCatInfos[catId] = {};
                      }
                      this.myInfo.myCatInfos[catId].name = catInfo.name;
                      this.myInfo.myCatInfos[catId].desc = catInfo.desc;
                      this.myInfo.myCatInfos[catId].isBreeding =
                        catInfo.isBreeding;
                      this.myInfo.myCatInfos[catId].id = catId;
                      this.myInfo.myCatInfos[catId].motherId = catInfo.motherId;
                    });

                  tomCatNFT.methods
                    .tokenURI(catId)
                    .call()
                    .then((ipfsHash) => {
                      ipfsHash.length < 20
                        ? (this.myInfo.myCatInfos[catId].ipfsHash =
                            this.ipfsUrl + this.defaultIPFSHash)
                        : (this.myInfo.myCatInfos[catId].ipfsHash =
                            this.ipfsUrl + ipfsHash);
                    });
                });
                setTimeout(() => {
                  this.myInfo.myCatInfos = this.myInfo.myCatInfos.filter(
                    (item) => {
                      return item !== null;
                    }
                  );
                  this.loading = false;
                }, 1000);
              })
              .catch((value) => {
                this.loading = false;
              });
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
<style  scoped>
@import "../../assets/style/Me/MySales.css";
</style>