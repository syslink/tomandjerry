<template>
  <div class="MyPurchase">
    <img src="../../assets/img/MyPurchase-img.png" />
    <img src="../../assets/img/MyPurchase-img.png" />
    <img src="../../assets/img/MyPurchase-img.png" />
    <img src="../../assets/img/MyPurchase-img.png" />
    <img src="../../assets/img/MyPurchase-img.png" />
  </div>
</template>
<script>
export default {
  name: "MyPurchase",
  data() {
    return {
      accountAddr:
        this.$store.state.accountAddr != null
          ? this.$store.state.accountAddr
          : "0x0000000000000000000000000000000000000000",
      myCatInfoList: [],
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
    };
  },
  computed: {
    tomCatNFT() {
      return this.$store.state.drizzle.contracts.TomCatNFT;
    },
  },
  created() {
    this.updateMyInfo();
    const { create, urlSource } = require("ipfs-http-client");
    this.ipfs = create({
      host: "ipfs.infura.io",
      port: "5001",
      protocol: "https",
    });
    // const { myCatInfos, mySellingCatInfos } = this.myInfo;

    // const myCatInfoList = [];
    for (var id in this.myInfo.myCatInfos) {
      const catInfo = this.myInfo.myCatInfos[id];
      catInfo.id = id;
      catInfo.bSelling = false;
      this.myCatInfoList.push(catInfo);
    }
    //console.log(this.myCatInfoList);
  },

  methods: {
    updateMyInfo() {
      setTimeout(() => {
        //const { tomCatNFT, tradeMarket, myInfo, accountAddr } = this.state;
        //var { motherInfos } = this.state;
        //  console.log(this.tomCatNFT);
        if (
          this.$store.state.accountAddr ==
          "0x0000000000000000000000000000000000000000"
        )
          return;

        //  this.motherInfos = [0];

        this.tomCatNFT.methods
          .balanceOf(this.$store.state.accountAddr)
          .call()
          .then((amount) => {
            console.log("amount=" + amount);
            this.myInfo.totalAmount =
              parseInt(amount) + parseInt(this.myInfo.sellingCatNum);
            //this.setState({myInfo});
            for (var i = 0; i < parseInt(amount); i++) {
              console.log(i);
              this.tomCatNFT.methods
                .tokenOfOwnerByIndex(this.$store.state.accountAddr, i)
                .call()
                .then((catId) => {
                  console.log(catId);
                  this.tomCatNFT.methods
                    .id2CatInfoMap(catId)
                    .call()
                    .then((catInfo) => {
                      console.log(catInfo);
                      if (this.myInfo.myCatInfos[catId] == null) {
                        this.myInfo.myCatInfos[catId] = {};
                      }
                      this.myInfo.myCatInfos[catId].name = catInfo.name;
                      this.myInfo.myCatInfos[catId].desc = catInfo.desc;
                      this.myInfo.myCatInfos[catId].isBreeding =
                        catInfo.isBreeding;
                      this.myInfo.myCatInfos[catId].motherId = catInfo.motherId;
                      // this.setState({myInfo});
                      this.myInfo.myCatInfos.push(catInfo);
                    });
                  this.tomCatNFT.methods
                    .tokenURI(catId)
                    .call()
                    .then((ipfsHash) => {
                      if (this.myInfo.myCatInfos[catId] == null) {
                        this.myInfo.myCatInfos[catId] = {};
                      }
                      this.myInfo.myCatInfos[catId].ipfsHash =
                        ipfsHash.length < 20 ? this.defaultIPFSHash : ipfsHash;
                      // this.setState({myInfo});
                    });
                  this.myInfo.motherInfos.push(catId);
                  //this.setState({myInfo, motherInfos});
                });
            }
          });
        console.log(this.myInfo.motherInfos);
      }, 1000);
    },
  },
};
</script>
<style  scoped>
@import "../../assets/style/Me/MyPurchase.css";
</style>