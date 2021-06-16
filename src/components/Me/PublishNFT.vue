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
        <div class="select_box2">
          <input
            class="input_box"
            type="file"
            placeholder="Please enter a title"
            @change="
              (e) => {
                this.upload(e);
              }
            "
          />
        </div>
        <!-- <div class="hahah">
          <el-upload
            action="#"
            class="uploadimg_input"
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            ref="upload"
            :file-list="fileList"
            :on-exceed="handleExceed"
            :on-change="beforeAvatarUpload"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
          <div class="upload_rules">
            <span>图片上传文件要求说明</span>
            <span>* 图片格式jpg、jpeg、gif</span>
            <span>* 图片大小不超过500kb</span>
            <span>* 作品必须为上传人100%完全独立拥有版权的原创作品</span>
          </div>
        </div> -->
      </div>
      <div class="ra_box_div2">
        <span class="div2_left_text">Choose a female cat</span>
        <div class="select_box2">
          <select
            class="select_menu"
            @change="handleMotherIdChanged.bind(this)"
          >
            <option>0</option>
          </select>
        </div>
      </div>
      <div class="ra_box_div2">
        <span class="div2_left_text">Is Breed cat</span>
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
      </div>
      <!-- <div class="ra_box_div2">
        <span class="div2_left_text">Category</span>
        <div class="redio_box">
          <div class="redio_item redio_item_one" @click="Category = 1">
            <div class="item_left">
              <img :src="Category == 1 ? RadioChecked : RadioDefault" />
              <span>Financial card</span>
            </div>
            <img src="../../assets/img/lock@34.png" />
          </div>
          <div class="redio_item" @click="Category = 2">
            <div class="item_left">
              <img :src="Category == 2 ? RadioChecked : RadioDefault" />
              <span>Physical card</span>
            </div>
            <img src="../../assets/img/sell@34.png" />
          </div>
        </div>
      </div>
      <div class="ra_box_div2">
        <span class="div2_left_text">Price</span>
        <div class="select_box2">
          <input class="input_box" placeholder="Please enter the price" />
          <span class="tag">TOM</span>
        </div>
      </div>
      <div class="ra_box_div2">
        <span class="div2_left_text">Amount</span>
        <div class="select_box2">
          <input
            class="input_box"
            placeholder="Please enter the number of pieces"
          />
          <span class="tag">Pieces</span>
        </div>
      </div>
      <div class="ra_box_div2">
        <span class="div2_left_text">Auction type</span>
        <div class="redio_box">
          <div class="redio_item redio_item_one" @click="AuctionType = 1">
            <div class="item_left">
              <img :src="AuctionType == 1 ? RadioChecked : RadioDefault" />
              <span>Buyout Price</span>
            </div>
          </div>
          <div class="redio_item" @click="AuctionType = 2">
            <div class="item_left">
              <img :src="AuctionType == 2 ? RadioChecked : RadioDefault" />
              <span>Dutch Auction</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ra_box_div2">
        <span class="div2_left_text"></span>
        <div class="redio_box">
          <div class="redio_item redio_item_one" @click="AuctionType = 3">
            <div class="item_left">
              <img :src="AuctionType == 3 ? RadioChecked : RadioDefault" />
              <span>English Auction</span>
            </div>
          </div>
          <div class="redio_item" @click="AuctionType = 4">
            <div class="item_left">
              <img :src="AuctionType == 4 ? RadioChecked : RadioDefault" />
              <span>Dividend</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ra_box_div2">
        <span class="div2_left_text">Auction time</span>
        <div class="Auction_time timer lala">
          <el-time-picker
            v-model="value1"
            class="picker"
            :picker-options="{
              selectableRange: '18:30:30 - 20:30:40',
            }"
            placeholder="00:00"
          >
           
          </el-time-picker>
        </div>
      </div>
      <div class="ra_box_div2" v-if="AuctionType == 2 || AuctionType == 3">
        <span class="div2_left_text">Aution rule</span>
        <div class="Auction_time" v-if="AuctionType == 2">
          <span class="ttext">Every</span>
          <input class="input_time" placeholder="00" />
          <span class="tt">:</span>
          <input class="input_time" placeholder="00" />
          <span class="tt">reduce</span>
          <input class="input_time" placeholder="00" />
          <span class="tt">% price off</span>
        </div>
        <div class="Auction_time" v-if="AuctionType == 3">
          <span class="ttext">Every</span>
          <input class="input_time" placeholder="00" />
          <span class="tt">:</span>
          <input class="input_time" placeholder="00" />
          <span class="tt">Increase by</span>
          <input class="input_time" placeholder="00" />
          <span class="tt">TOM</span>
        </div>
      </div>
      <div class="ra_box_div2">
        <span class="div2_left_text"> Date on shelf </span>
        <div class="Auction_time timer dada">
          <el-date-picker
            v-model="value3"
            type="datetime"
            placeholder="Select date and time"
            default-time="12:00:00"
          >
          </el-date-picker>
        </div>
      </div> -->
      <div class="addAddress" @click="createCatNFT">Publish NFT</div>
    </div>
  </div>
</template>
<script>
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "../../assets/js/Common/drizzleOptions";
const RadioDefault = require("../../assets/img/RadioDefault.png");
const RadioChecked = require("../../assets/img/RadioChecked.png");
import * as utils from "../../assets/js/Common/utils";
export default {
  name: "PublishNFT",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: [],
      imageUrl: "",
      Category: 1,
      RadioChecked: RadioChecked,
      RadioDefault: RadioDefault,
      AuctionType: 2,
      value1: new Date(2016, 9, 10, 18, 40),
      value3: "",
      breedCat: 1,
      ipfs: null,
      defaultIPFSHash: "QmNtWjcfKTkJNfErtFMPwMV9F5C5DRKGUTHi4yjigtXP4N",
      curCatInfo: {
        ipfsHash: "QmNtWjcfKTkJNfErtFMPwMV9F5C5DRKGUTHi4yjigtXP4N",
      },
      ipfsUrl: "https://ipfs.io/ipfs/",
      createdCatName: "",
      isUploadStatus: false,
      catPic: null,
      accountAddr:
        this.$store.state.accountAddr != null
          ? this.$store.state.accountAddr
          : "0x0000000000000000000000000000000000000000",
      selectedMotherId: 0,
      curStakeId: null,
      isBreeding: false,
      file: null,
      drizzleState: null,
    };
  },
  created() {
    const { create, urlSource } = require("ipfs-http-client");
    this.ipfs = create({
      host: "ipfs.infura.io",
      port: "5001",
      protocol: "https",
    });
  },
  computed: {
    tomCatNFT() {
      return this.$store.state.drizzle.contracts.TomCatNFT;
    },
  },
  methods: {
    handleMotherIdChanged(v) {
      this.selectedMotherId = v;
    },
    handleRemove(file) {
      console.log(file);
      this.$refs.upload.clearFiles();
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制只能上传 1 张图片`);
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG =
        file.raw.type === "image/jpeg" ||
        file.raw.type === "image/jpg" ||
        file.raw.type === "image/gif";
      const isLt2M = file.raw.size / 1024 / 1024 < 0.48828125;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/JPEG/GIF 格式!");
        this.$refs.upload.clearFiles();
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 500KB!");
        this.$refs.upload.clearFiles();
      }
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);

      this.upload(this.imageUrl);
      return isJPG && isLt2M;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    async upload(e) {
      const file = e.target.files[0];
      if (file == null) return;
      this.file = file;
    },

    async createCatNFT() {
      let drizzle = new Drizzle(drizzleOptions);
      this.drizzleState = drizzle.store.getState();

      if (utils.isEmptyObj(this.createdCatName)) {
        this.toast("error", "请输入猫咪名称");
        return;
      }
      if (utils.isEmptyObj(this.file)) {
        this.toast("error", "请上传猫咪照片");
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
      console.log("upload", added);
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
          // this.updateTomCatData();
          // this.updateMyInfo();
          window.reload();
        },
        () => {}
      );
      console.log(
        this.createdCatName,
        this.catPic,
        motherId,
        this.isBreeding,
        this.accountAddr
      );
      // if (this.curStakeId == 0) {
      //   loading.close();
      // }
    },
    syncTxStatus(successCallback, failCallback) {
      const intervalId = setInterval(() => {
        // get the transaction states from the drizzle state
        const { transactions, transactionStack } = this.drizzleState;
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