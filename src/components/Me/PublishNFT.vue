<template>
  <div class="PublishNFT">
    <span class="PublishNFTbg">PUBLISH NFT</span>
    <div class="publishNFT_box">
      <div class="ra_box_div2">
        <span class="div2_left_text">Title</span>
        <div class="select_box2">
          <input
            class="input_box"
            placeholder="Please enter a title"
            v-model="createdCatName"
          />
        </div>
      </div>
      <div class="ra_box_div2">
        <span class="div2_left_text">Upload image</span>
        <div class="select_box2 uploadbox">
          <a href="javascript:;" class="a-upload">
            <input
              type="file"
              name=""
              id=""
              @change="
                (e) => {
                  this.upload(e);
                }
              "
            />Select a picture
          </a>
          <span class="fileurl">{{ fileName }}</span>
        </div>
      </div>
      <div class="ra_box_div2" style="">
        <span class="div2_left_text"></span>
        <div
          class="select_box2 uploadbox"
          style="border: none; background: #f3e7c7; height: auto"
        >
          <div class="upload_rules">
            <span>Description of file requirements for uploading pictures</span>
            <span
              >* The image format is <strong>jpeg</strong>,
              <strong>jpg</strong>, gif and the size of the picture does not
              exceed 500kb.
            </span>

            <span
              >* The work must be an original work with 100% independent
              copyright by the uploader.</span
            >
          </div>
        </div>
      </div>
      <div class="ra_box_div2">
        <span class="div2_left_text">Choose a female cat</span>
        <div class="select_box2">
          <select
            class="select_menu"
            @change="handleMotherIdChanged.bind(this)"
          >
            <option v-for="(ids, index) in motherInfos" :key="index">
              {{ ids }}
            </option>
          </select>
        </div>
      </div>
      <div class="ra_box_div2">
        <span class="div2_left_text">Category</span>
        <div class="redio_box">
          <div class="redio_item redio_item_one" @click="isBreeding = true">
            <div class="item_left">
              <!-- <img :src="Category == 1 ? RadioChecked : RadioDefault" /> -->
              <img :src="isBreeding ? RadioChecked : RadioDefault" />
              <span>Financial card</span>
            </div>
            <img src="../../assets/img/lock@34.png" />
          </div>
          <div class="redio_item" @click="isBreeding = false">
            <div class="item_left">
              <!-- <img :src="Category == 2 ? RadioChecked : RadioDefault" /> -->
              <img :src="!isBreeding ? RadioChecked : RadioDefault" />
              <span>Physical card</span>
            </div>
            <img src="../../assets/img/sell@34.png" />
          </div>
        </div>
      </div>
      <!-- <div class="ra_box_div2">
        <span class="div2_left_text">Category</span>
        <div class="redio_box">
          <div class="redio_item redio_item_one" @click="isBreeding = true">
            <div class="item_left">
              <img :src="isBreeding ? RadioChecked : RadioDefault" />
              <span>YES</span>
            </div>
          </div>
          <div class="redio_item" @click="isBreeding = false">
            <div class="item_left">
              <img :src="!isBreeding ? RadioChecked : RadioDefault" />
              <span>No</span>
            </div>
          </div>
        </div>
      </div> -->

      <div class="addAddress" @click="createCatNFT">Publish NFT</div>
    </div>
  </div>
</template>
<script>
const RadioDefault = require("../../assets/img/RadioDefault.png");
const RadioChecked = require("../../assets/img/RadioChecked.png");
import * as utils from "../../assets/js/Common/utils";
export default {
  name: "PublishNFT",
  data() {
    return {
      RadioChecked: RadioChecked,
      RadioDefault: RadioDefault,
      ipfs: null,
      defaultIPFSHash: "QmacK2mcZtkm4v3JapqsKE9jinYdf1uVzV6ZSzRdEu7vyP",
      curCatInfo: {
        ipfsHash: "QmacK2mcZtkm4v3JapqsKE9jinYdf1uVzV6ZSzRdEu7vyP",
      },
      ipfsUrl: "https://ipfs.io/ipfs/",
      createdCatName: "",
      isUploadStatus: false,
      catPic: null,
      accountAddr: "",
      selectedMotherId: 0,
      curStakeId: null,
      isBreeding: false,
      file: null,
      fileName: null,
      drizzleState: null,
      motherInfos: [0],
    };
  },
  mounted() {
    const { create, urlSource } = require("ipfs-http-client");
    this.ipfs = create({
      host: "ipfs.infura.io",
      port: "5001",
      protocol: "https",
    });
    this.getmotherInfos();
  },
  computed: {
    tomCatNFT() {
      return this.$drizzle.contracts.TomCatNFT;
    },
    tradeMarket() {
      return this.$drizzle.contracts.TradeMarket;
    },
  },
  methods: {
    getmotherInfos() {
      setTimeout(() => {
        this.accountAddr = this.$store.state.accountAddr;
        if (this.accountAddr == null) {
          this.accountAddr = "0x0000000000000000000000000000000000000000";
        }
        this.tradeMarket.methods
          .sellingCatsNumber(this.accountAddr)
          .call()
          .then((v) => {
            this.tradeMarket.methods
              .getSellingCats(this.accountAddr, 0, parseInt(v))
              .call()
              .then((ids) => {
                this.motherInfos.push(...ids);
              });
          });
        // console.log(this.motherInfos);
      }, 1000);
    },
    handleMotherIdChanged(v) {
      this.selectedMotherId = v;
    },
    upload(e) {
      const types = e.target.files[0].type;
      const size = e.target.files[0].size;
      if (
        types === "image/jpeg" ||
        types === "image/jpg" ||
        types === "image/gif"
      ) {
      } else {
        this.$message.error(
          "Uploading pictures can only be in JPG/JPEG/GIF format!"
        );
        return;
      }
      if (size > 512000) {
        this.$message.error(
          "The size of the uploaded image cannot exceed 500KB!"
        );
        return;
      }

      const file = e.target.files[0];
      this.fileName = e.target.files[0].name;
      if (file == null) return;
      this.file = file;
    },

    async createCatNFT() {
      this.drizzleState = this.$drizzle.store.getState();
      //console.log(this.drizzleState);
      if (utils.isEmptyObj(this.createdCatName)) {
        this.toast("error", "Please enter a cat name");
        return;
      }
      if (utils.isEmptyObj(this.file)) {
        this.toast("error", "Please upload photos of cats");
        return;
      }
      const loading = this.$loading({
        fullscreen: true,
        text: "Creating, please wait...",
        background: "rgba(0,0,0,0.7)",
      });
      const added = await this.ipfs.add(this.file, {
        progress: (prog) => console.log("upload", `received: ${prog}`),
      });
      // console.log("upload", added);
      this.catPic = added.path;

      const motherId =
        this.selectedMotherId == null ? 0 : parseInt(this.selectedMotherId);
      this.curStakeId = this.tomCatNFT.methods["mint"].cacheSend(
        this.createdCatName,
        this.catPic,
        motherId,
        this.isBreeding,
        { from: this.accountAddr }
      );
      this.syncTxStatus(
        () => {
          loading.close();
          this.$router.push("/me/MyPurchase");
        },
        () => {
          loading.close();
        }
      );
      console.log(
        this.createdCatName,
        this.catPic,
        motherId,
        this.isBreeding,
        this.accountAddr
      );
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
@import "../../assets/style/Me/PublishNFT.css";
</style>