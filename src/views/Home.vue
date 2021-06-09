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
            <span>Total </span><span>{{ tomCatNFTInfo.totalSupply }}</span>
          </div>
          <div class="one">
            <span>breeding cats</span
            ><span>{{ tomCatNFTInfo.breedingCatNum }}</span>
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>fees for breeding cats</span
            ><span>{{ tradeMarketInfo.breedingOwnerFee }}</span>
          </div>
          <div class="one">
            <span>Total transaction</span
            ><span
              >{{
                getReadableNumber(
                  this.state.tradeMarketInfo.totalAmount,
                  18,
                  2
                )
              }}TOM</span
            >
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>Total number of transactions</span
            ><span>{{ tradeMarketInfo.dealCount }}</span>
          </div>
          <div class="one">
            <span>In transaction cats</span
            ><span>{{ tomCatNFTInfo.sellingCatNum }}</span>
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>Quantity</span><span>{{ myInfo.totalAmount }}</span>
          </div>
          <div class="one">
            <span>For sale</span><span>{{ myInfo.sellingCatNum }}</span>
          </div>
        </div>
        <div class="top_item">
          <div class="one mar">
            <span>Service charge for breeding cats</span
            ><span>{{ myInfo.breedingFeeAmount }}</span>
          </div>
          <div class="one">
            <!-- <span>NFT Trading Vol</span><span>161,231,222</span> -->
          </div>
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
          @click="$router.push({ path: '/NFTMarketplace' })"
        >
          <img src="../assets/img/item1.png" class="item_imgs" />
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
          <img src="../assets/img/item2.png" class="item_imgs" />
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
          <img src="../assets/img/item3.png" class="item_imgs" />
          <div class="item_center">
            <div class="center_top">
              <span class="center_top_text">Crookshacks Cat</span>
              <img src="../assets/img/lock.png" />
            </div>
            <span class="name">Jack Valentine</span>
          </div>
          <div class="item_bottom">99 TOM</div>
        </div>
        <div class="cats_item" style="margin-right: 0">
          <img src="../assets/img/item4.png" class="item_imgs" />
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
  </div>
</template>

<script>
import EthCrypto from "eth-crypto";
import BigNumber from "bignumber.js";
import utils from "../assets/js/Common/utils";
export default {
  name: "Home",
  components: {},
  data() {
    let { drizzle, account } = this.$store.state;
    return {
      approveTip: "授权TOM",
      tomCatNFT: drizzle.contracts.TomCatNFT,
      tradeMarket: drizzle.contracts.TradeMarket,
      tomERC20: drizzle.contracts.TomERC20,

      drizzleState: drizzle.store.getState(),
      accountAddr:
        account != null
          ? account
          : "0x0000000000000000000000000000000000000000",

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
    this.updateTomCatData();
    // this.updateTradeMarketData();
    // this.updateMyInfo();

    setInterval(() => {
      // this.updateMyInfo();
      this.updateTomCatData();
      //  this.updateTradeMarketData();
    }, 60000);
  },
  methods: {
    updateTomCatData() {
      // const {
      //   tomCatNFT,
      //   tradeMarket,
      //   tomCatNFTInfo,
      //   // tradeMarketInfo,
      //   // priceDescending,
      //   // pageSize,
      // } = this.$store.state.drizzle.contracts;

     this.tomCatNFT.methods
        .totalSupply()
        .call()
        .then((v) => {
          tomCatNFTInfo.totalSupply = v;
          // this.setState({tomCatNFTInfo});
        });
      tomCatNFT.methods
        .breedingCatAmount()
        .call()
        .then((v) => {
          tomCatNFTInfo.breedingCatNum = v;
          //this.setState({tomCatNFTInfo});
        });
      tomCatNFT.methods
        .balanceOf(tradeMarket.address)
        .call()
        .then(async (v) => {
          tomCatNFTInfo.sellingCatNum = parseInt(v);
          // this.setState({tomCatNFTInfo});
          tradeMarketInfo.sellingCatIds = [];

          tradeMarket.methods
            .getOrderIds(
              0,
              pageSize < tomCatNFTInfo.sellingCatNum
                ? pageSize
                : tomCatNFTInfo.sellingCatNum,
              priceDescending
            )
            .call()
            .then((catIds) => {
              catIds.map((catId) => {
                tomCatNFT.methods
                  .id2CatInfoMap(catId)
                  .call()
                  .then((catInfo) => {
                    if (tradeMarketInfo.sellingCatInfos[catId] == null) {
                      tradeMarketInfo.sellingCatInfos[catId] = {};
                    }
                    tradeMarketInfo.sellingCatInfos[catId].name = catInfo.name;
                    tradeMarketInfo.sellingCatInfos[catId].desc = catInfo.desc;
                    tradeMarketInfo.sellingCatInfos[catId].isBreeding =
                      catInfo.isBreeding;
                    tradeMarketInfo.sellingCatInfos[catId].motherId =
                      catInfo.motherId;
                    // this.setState({tradeMarketInfo});
                  });
                tradeMarket.methods
                  .tokenOrderMap(catId)
                  .call()
                  .then((catInfo) => {
                    if (tradeMarketInfo.sellingCatInfos[catId] == null) {
                      tradeMarketInfo.sellingCatInfos[catId] = {};
                    }
                    tradeMarketInfo.sellingCatInfos[catId].price =
                      catInfo.price;
                    //this.setState({tradeMarketInfo});
                  });
              });
            });
        });
    },
  },
};
</script>
<style scoped>
@import "../assets/style/Home/Home.css";
</style>
