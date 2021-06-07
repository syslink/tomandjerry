<template>
  <div class="PublishNFT">
    <span class="PublishNFTbg">PUBLISH NFT</span>
    <div class="publishNFT_box">
      <div class="ra_box_div2">
        <span class="div2_left_text">Title</span>
        <div class="select_box2">
          <input class="input_box" placeholder="Please enter a title" />
        </div>
      </div>
      <div class="ra_box_div2">
        <span class="div2_left_text">Upload image</span>
        <div class="hahah">
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
        </div>
      </div>
      <div class="ra_box_div2">
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
            <!-- <input class="input_time" placeholder="00" />
            <span class="tt">:</span>
            <input class="input_time" placeholder="00" /> -->
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
          <!-- <input class="input_time_moouth" placeholder="January" />
          <span class="tt">/</span>
          <input class="input_time" placeholder="01" />
          <span class="tt">/</span>
          <input class="input_time" placeholder="2020" />
          <input
            class="input_time"
            placeholder="00"
            style="margin-left: 40px"
          />
          <span class="tt">:</span>
          <input class="input_time" placeholder="00" /> -->
          <el-date-picker
            v-model="value3"
            type="datetime"
            placeholder="Select date and time"
            default-time="12:00:00"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="addAddress">Publish NFT</div>
    </div>
  </div>
</template>
<script>
const RadioDefault = require("../../assets/img/RadioDefault.png");
const RadioChecked = require("../../assets/img/RadioChecked.png");
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
    };
  },
  methods: {
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
      return isJPG && isLt2M;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
  },
};
</script>
<style  scoped>
@import "../../assets/style/Me/PublishNFT.css";
</style>