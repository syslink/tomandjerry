<template>
  <div class="home">
    <div class="div1"><img src="../assets/img/img1.png" /></div>
    <div class="div2">
      <div class="top">
        <!-- <div class="top_item">
          <div class="one mar"><span>Balance</span><span>Locked</span></div>
          <div class="one">
            <span>TOM in circulation</span><span>161,231,222</span>
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>Pending harvest</span><span>0.000</span>
          </div>
          <div class="one">
            <span>Total supply</span><span>161,231,222</span>
          </div>
        </div>
        <div class="top_item">
          <div class="one mar"><span>TOM price</span><span>$7.356</span></div>
          <div class="one"><span>TVL</span><span>161,231,222</span></div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>TOM Market Cap</span><span>$723,356,330</span>
          </div>
          <div class="one">
            <span>Volume（24hr）</span><span>161,231,222</span>
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>NFT Transactions</span><span>356,330</span>
          </div>
          <div class="one">
            <span>NFT Trading Vol</span><span>161,231,222</span>
          </div>
        </div> -->
        <div class="top_item">
          <div class="one mar">
            <!-- <span>Total </span><span>{{ tomCatNFTInfo.totalSupply }}</span> -->
            <span>Total </span><span>0</span>
          </div>
          <div class="one">
            <span>breeding cats</span>
            <!-- <span>{{ tomCatNFTInfo.breedingCatNum }}</span> -->
            <span>0</span>
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>fees for breeding cats</span>
            <!-- <span>{{ tradeMarketInfo.breedingOwnerFee }}</span> -->
            <span>0</span>
          </div>
          <div class="one">
            <span>Total transaction</span>
            <!-- <span
              >{{
                getReadableNumber1(tradeMarketInfo.totalAmount, 18, 2)
              }}
              TOM</span
            > -->
            <span>0 TOM</span>
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>Total number of transactions</span>
            <!-- <span>{{ tradeMarketInfo.dealCount }}</span> -->
            <span>0</span>
          </div>
          <div class="one">
            <span>In transaction cats</span>
            <!-- <span>{{ tomCatNFTInfo.sellingCatNum }}</span> -->
            <span>0</span>
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>Quantity</span>
            <!-- <span>{{ myInfo.totalAmount }}</span> -->
            <span>0</span>
          </div>
          <div class="one">
            <span>For sale</span>
            <!-- <span>{{ myInfo.sellingCatNum }}</span> -->
            <span>0</span>
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>Service charge for breeding cats</span>
            <!-- <span>{{ myInfo.breedingFeeAmount }}</span> -->
            <span>0</span>
          </div>
          <!-- <div class="one">
            <span></span>
          </div> -->
        </div>
      </div>
      <div class="center">Hottest Artworks in 2 Weeks</div>
      <!-- <div class="bottom">
        <img src="../assets/img/cat1.png" alt="cat" class="out" />
        <img src="../assets/img/cat2.png" alt="cat" />
        <img src="../assets/img/cat3.png" alt="cat" />
        <img src="../assets/img/cat4.png" alt="cat" />
        <img src="../assets/img/cat5.png" alt="cat" class="out" />
        <img src="../assets/img/cat6.png" alt="cat" />
        <img src="../assets/img/cat7.png" alt="cat" />
        <img src="../assets/img/cat8.png" alt="cat" />
      </div> -->
      <div class="catsbox">
        <div
          class="cats_item"
          v-for="(cat, index) in sellingCatInfos"
          :key="index"
          @click="buyCat(cat.Id, cat.price)"
        >
          <!-- @click="$router.push({ path: '/NFTMarketplace' })" -->
          <!-- <img src="../assets/img/item1.png" class="item_imgs" /> -->
          <img src="../assets/img/cat.jpeg" class="item_imgs" />
          <div class="item_center">
            <div class="center_top">
              <span class="center_top_text">{{ cat.name }}</span>
              <!-- <img src="../assets/img/lock.png" /> -->
              <span class="name">ID: {{ cat.Id }}</span>
            </div>
            <span class="name"
              >isBreeding: {{ cat.isBreeding ? "YES" : "NO" }}</span
            >
            <span class="name"
              >Price: {{ getReadableNumber2(cat.price, 18, 2) }} TOM</span
            >
          </div>
          <div class="item_bottom">Buy Now</div>
        </div>
        <!-- <div class="cats_item">
          <img src="../assets/img/item2.png" class="item_imgs" />
          <div class="item_center">
            <div class="center_top">
              <span class="center_top_text">Crookshacks Cat</span>
              <img src="../assets/img/sell.png" />
            </div>
            <span class="name">Jack Valentine</span>
          </div>
          <div class="item_bottom">99 TOM</div>
        </div> -->
        <!-- <div class="cats_item">
          <img src="../assets/img/item3.png" class="item_imgs" />
          <div class="item_center">
            <div class="center_top">
              <span class="center_top_text">Crookshacks Cat</span>
              <img src="../assets/img/lock.png" />
            </div>
            <span class="name">Jack Valentine</span>
          </div>
          <div class="item_bottom">99 TOM</div>
        </div> -->
        <!-- <div class="cats_item" style="margin-right: 0">
          <img src="../assets/img/item4.png" class="item_imgs" />
          <div class="item_center">
            <div class="center_top">
              <span class="center_top_text">Crookshacks Cat</span>
              <img src="../assets/img/sell.png" />
            </div>
            <span class="name">Jack Valentine</span>
          </div>
          <div class="item_bottom">99 TOM</div>
        </div> -->
        <!-- <div class="cats_item">
          <img src="../assets/img/item5.png" class="item_imgs" />
          <div class="item_center">
            <div class="center_top">
              <span class="center_top_text">Crookshacks Cat</span>
              <img src="../assets/img/lock.png" />
            </div>
            <span class="name">Jack Valentine</span>
          </div>
          <div class="item_bottom">99 TOM</div>
        </div>
        <div class="cats_item">
          <img src="../assets/img/item6.png" class="item_imgs" />
          <div class="item_center">
            <div class="center_top">
              <span class="center_top_text">Crookshacks Cat</span>
              <img src="../assets/img/sell.png" />
            </div>
            <span class="name">Jack Valentine</span>
          </div>
          <div class="item_bottom">99 TOM</div>
        </div>
        <div class="cats_item">
          <img src="../assets/img/item7.png" class="item_imgs" />
          <div class="item_center">
            <div class="center_top">
              <span class="center_top_text">Crookshacks Cat</span>
              <img src="../assets/img/lock.png" />
            </div>
            <span class="name">Jack Valentine</span>
          </div>
          <div class="item_bottom nocat">Connect to a Wallet</div>
        </div>
        <div class="cats_item" style="margin-right: 0">
          <img src="../assets/img/item8.png" class="item_imgs" />
          <div class="item_center">
            <div class="center_top">
              <span class="center_top_text">Crookshacks Cat</span>
              <img src="../assets/img/sell.png" />
            </div>
            <span class="name">Jack Valentine</span>
          </div>
          <div class="item_bottom">99 TOM</div>
        </div> -->
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
  </div>
</template>

<script>
import EthCrypto from "eth-crypto";
import BigNumber from "bignumber.js";
import * as utils from "../assets/js/Common/utils";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "../assets/js/Common/drizzleOptions";
export default {
  name: "Home",
  components: {},
  // computed: {
  //   tomCatNFT() {
  //     return this.$store.state.drizzle.contracts.TomCatNFT;
  //   },
  //   tradeMarket() {
  //     return this.$store.state.drizzle.contracts.TradeMarket;
  //   },
  //   tomERC20() {
  //     return this.$store.state.drizzle.contracts.tomERC20;
  //   },
  // },
  data() {
    return {
      sellingCatInfos: [],
      curStakeId: null,
      ipfs: null,
      defaultIPFSHash: "QmNtWjcfKTkJNfErtFMPwMV9F5C5DRKGUTHi4yjigtXP4N",
      curCatInfo: {
        ipfsHash: "QmNtWjcfKTkJNfErtFMPwMV9F5C5DRKGUTHi4yjigtXP4N",
      },
      ipfsUrl: "https://ipfs.io/ipfs/",
      // approveTip: "授权TOM",
      // drizzleState: drizzle.store.getState(),
      // accountAddr:
      //   account != null
      //     ? account
      //     : "0x0000000000000000000000000000000000000000",
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
      catInfo: {},
      approveTomERC20Tip: "授权Tom代币",
      approveCatNFTTip: "授权猫咪NFT",
      approvingTip: "授权中",
      curCatNFTId: 0,
      priceDescending: true,
      pageSize: 10,
      curPage: 0,
      approvedTom: 0,
      isBreeding: false,
      motherInfos: [],
    };
  },
  created() {
    this.getMarket();
    // let drizzle = new Drizzle(drizzleOptions);
    // this.drizzleState = drizzle.store.getState();

    // const { create, urlSource } = require("ipfs-http-client");
    // this.ipfs = create({
    //   host: "ipfs.infura.io",
    //   port: "5001",
    //   protocol: "https",
    // });
    // setTimeout(()=>{
    //   this.updateTomCatData();
    //   this.updateTradeMarketData();
    //   this.updateMyInfo();
    // },1000)

    // setInterval(() => {
    //   this.updateMyInfo();
    //   this.updateTomCatData();
    //   this.updateTradeMarketData();
    // }, 60000);
    // console.log(this.$store.state.tradeMarketInfo.sellingCatInfos);
    // setTimeout(() => {
    //   console.log(this.$store.state.tradeMarketInfo.sellingCatInfos);
    //   this.sellingCatInfos = JSON.parse(
    //     JSON.stringify(this.$store.state.tradeMarketInfo.sellingCatInfos)
    //   );
    // }, 1500);
  },
  methods: {
    getMarket() {
      //交易市场
      let drizzle = new Drizzle(drizzleOptions);
      this.drizzleState = drizzle.store.getState();
      const { create, urlSource } = require("ipfs-http-client");
      this.ipfs = create({
        host: "ipfs.infura.io",
        port: "5001",
        protocol: "https",
      });
      setTimeout(() => {
        const accountAddr = this.$store.state.accountAddr;
        const TomCatNFT = drizzle.contracts.TomCatNFT;
        const TradeMarket = drizzle.contracts.TradeMarket;

        TomCatNFT.methods
          .balanceOf(TradeMarket.address)
          .call()
          .then(async (v) => {
            this.tomCatNFTInfo.sellingCatNum = parseInt(v);
            // this.setState({tomCatNFTInfo});
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
                      //this.setState({tradeMarketInfo});
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
                      // this.setState({tradeMarketInfo});
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
                      // this.setState({tradeMarketInfo});
                    });
                });
              });
            console.log(this.tradeMarketInfo.sellingCatInfos);
            setTimeout(() => {
              this.sellingCatInfos = this.tradeMarketInfo.sellingCatInfos;
            }, 1000);
          });
      }, 1000);
      return;
      //const accountAddr = state.accountAddr;
      //	console.log(state.drizzle.contracts.TomCatNFT)

      console.log(state.tradeMarketInfo.sellingCatInfos);
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
    buyCat(catId, price) {
      const tradeMarket = this.$store.state.drizzle.contracts.TradeMarket;
      const accountAddr = this.$store.state.accountAddr;
      const tomERC20 = this.$store.state.drizzle.contracts.TomERC20;
      // this.state.curCatNFTId = catId;
      tomERC20.methods
        .allowance(accountAddr, tradeMarket.address)
        .call()
        .then((amount) => {
          if (new BigNumber(amount).gt(new BigNumber(price))) {
            this.curStakeId = tradeMarket.methods["buyCat"].cacheSend(catId, {
              from: accountAddr,
            });
            // this.syncTxStatus(
            //   () => {
            //     this.updateTomCatData();
            //     this.updateTradeMarketData();
            //     this.updateMyInfo();
            //   },
            //   () => {}
            // );
          } else {
            //  this.setState({ buyCatNFTVisible: true });
          }
        });
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
            // this.setState({tomCatNFTInfo});
          });
        //种猫数量
        this.tomCatNFT.methods
          .breedingCatAmount()
          .call()
          .then((v) => {
            this.tomCatNFTInfo.breedingCatNum = v;
            //this.setState({tomCatNFTInfo});
          });
        this.tomCatNFT.methods
          .balanceOf(this.tradeMarket.address)
          .call()
          .then(async (v) => {
            this.tomCatNFTInfo.sellingCatNum = parseInt(v);
            // this.setState({tomCatNFTInfo});
            this.tradeMarketInfo.sellingCatIds = [];
            this.tradeMarket.methods
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
                  this.tomCatNFT.methods
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
                      // this.setState({tradeMarketInfo});
                    });
                  this.tradeMarket.methods
                    .tokenOrderMap(catId)
                    .call()
                    .then((catInfo) => {
                      if (this.tradeMarketInfo.sellingCatInfos[catId] == null) {
                        this.tradeMarketInfo.sellingCatInfos[catId] = {};
                      }
                      this.tradeMarketInfo.sellingCatInfos[catId].price =
                        catInfo.price;
                      //this.setState({tradeMarketInfo});
                    });
                });
              });
          });
      }, 1000);
    },
    updateTradeMarketData() {
      const _this = this;
      setTimeout(() => {
        //const { tradeMarket, tradeMarketInfo } = this.state;
        this.tradeMarket.methods
          .totalAmount()
          .call()
          .then((v) => {
            this.tradeMarketInfo.totalAmount = v;
            // this.setState({ tradeMarketInfo });
          });
        this.tradeMarket.methods
          .breedingOwnerFee()
          .call()
          .then((v) => {
            this.tradeMarketInfo.breedingOwnerFee = v;
            // this.setState({ tradeMarketInfo });
          });
        this.tradeMarket.methods
          .getDealedOrderNumber()
          .call()
          .then((v) => {
            this.tradeMarketInfo.dealCount = v;
            // this.setState({ tradeMarketInfo });
          });
      }, 1000);
    },
    updateTradeMarketData() {
      // const { tradeMarket, tradeMarketInfo } = this.state;
      this.tradeMarket.methods
        .totalAmount()
        .call()
        .then((v) => {
          this.tradeMarketInfo.totalAmount = v;
          //this.setState({ tradeMarketInfo });
        });
      this.tradeMarket.methods
        .breedingOwnerFee()
        .call()
        .then((v) => {
          this.tradeMarketInfo.breedingOwnerFee = v;
          //this.setState({ tradeMarketInfo });
        });
      this.tradeMarket.methods
        .getDealedOrderNumber()
        .call()
        .then((v) => {
          this.tradeMarketInfo.dealCount = v;
          // this.setState({ tradeMarketInfo });
        });
    },
    updateMyInfo() {
      //const { tomCatNFT, tradeMarket, myInfo, accountAddr } = this.state;
      //var { motherInfos } = this.state;
      if (this.accountAddr == "0x0000000000000000000000000000000000000000")
        return;
      this.motherInfos = [0];
      this.tradeMarket.methods
        .sellingCatsNumber(this.accountAddr)
        .call()
        .then((v) => {
          this.myInfo.sellingCatNum = v;
          this.tradeMarket.methods
            .getSellingCats(this.accountAddr, 0, parseInt(v))
            .call()
            .then((ids) => {
              ids.map((catId) => {
                this.tomCatNFT.methods
                  .id2CatInfoMap(catId)
                  .call()
                  .then((catInfo) => {
                    if (this.myInfo.mySellingCatInfos[catId] == null) {
                      this.myInfo.mySellingCatInfos[catId] = {};
                    }
                    this.myInfo.mySellingCatInfos[catId].name = catInfo.name;
                    this.myInfo.mySellingCatInfos[catId].desc = catInfo.desc;
                    this.myInfo.mySellingCatInfos[catId].isBreeding =
                      catInfo.isBreeding;
                    this.myInfo.mySellingCatInfos[catId].motherId =
                      catInfo.motherId;
                    this.setState({ myInfo });
                  });
              });
              this.motherInfos.push(...ids);
              //this.setState({myInfo, motherInfos});
            });
          this.tomCatNFT.methods
            .balanceOf(this.accountAddr)
            .call()
            .then((amount) => {
              this.myInfo.totalAmount =
                parseInt(amount) + parseInt(this.myInfo.sellingCatNum);
              //this.setState({myInfo});
              for (var i = 0; i < parseInt(amount); i++) {
                this.tomCatNFT.methods
                  .tokenOfOwnerByIndex(this.accountAddr, i)
                  .call()
                  .then((catId) => {
                    this.tomCatNFT.methods
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
                        this.myInfo.myCatInfos[catId].motherId =
                          catInfo.motherId;
                        //this.setState({myInfo});
                      });
                    this.motherInfos.push(catId);
                    // this.setState({myInfo, motherInfos});
                  });
              }
            });
        });
      this.tradeMarket.methods
        .breedingCatOwnerFeeMap(this.accountAddr)
        .call()
        .then((v) => {
          this.myInfo.breedingFeeAmount = v;
          // this.setState({myInfo});
        });
    },
  },
};
</script>
<style scoped>
@import "../assets/style/Home/Home.css";
</style>
