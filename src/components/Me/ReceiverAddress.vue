<template>
  <div class="ReceiverAddress">
    <div class="ra_title">Receiver Addresses</div>
    <div class="ra_box" :class="addressList.length > 0 ? 'changeFlex' : null">
      <div class="ra_box_left">
        <div class="ra_box_div1">
          <span class="left_text" style="width: 100%; text-align: center"
            >Warm Tip: add up to two shipping addresses per account</span
          >
          <!-- <span class="left_text">Currently delivered to</span>
          <span class="left_text2">China Mainland</span> -->
        </div>
        <div class="ra_box_div2">
          <span class="div2_left_text">Country/Region</span>
          <div class="select_box">
            <foreign-area
              style="width: 100%"
              :popularCity="popularCity"
              selectBg="selectGray"
              groupBg="groupGray"
              @selectCountry="selectCountry"
            ></foreign-area>
          </div>
        </div>
        <div class="ra_box_div2" v-if="ischina">
          <span class="div2_left_text">State</span>
          <div class="select_box">
            <v-distpicker @selected="onSelected"></v-distpicker>
          </div>
        </div>
        <div class="ra_box_div2">
          <span class="div2_left_text">Full name</span>
          <div class="select_box">
            <input class="input_box" placeholder="Full name" v-model="name" />
          </div>
        </div>
        <div class="ra_box_div2">
          <span class="div2_left_text">Phone number</span>
          <div class="select_box">
            <input
              class="input_box"
              placeholder="+86 15921752419"
              v-model="phone"
            />
          </div>
        </div>
        <div class="ra_box_div2">
          <span class="div2_left_text">Address</span>
          <div class="address2">
            <textarea
              class="address_detail"
              v-model="address"
              placeholder="Please enter a detailed address"
            ></textarea>
          </div>
        </div>
        <div class="ra_box_div2">
          <span class="div2_left_text">Zipcode</span>
          <div class="select_box">
            <input class="input_box" placeholder="Zipcode" v-model="postId" />
          </div>
        </div>
        <div class="agree_rules" @click="isdef = !isdef">
          <img :src="isdef ? chuck : unchuck" />
          <span class="set_default_address">Make this my default address</span>
        </div>
        <div class="addAddress" @click="addAddress()">{{ btntext }}</div>
      </div>
      <div class="ra_box_right" v-if="addressList.length > 0">
        <div
          class="address_box"
          v-for="(address, index) in addressList"
          :key="index"
        >
          <div class="username">{{ address.name }}</div>
          <span v-if="address.country == 'China'"
            >{{ address.province }},{{ address.city }}
          </span>
          <span>{{ address.address }} </span>
          <span v-if="address.postId">{{ address.postId }} </span>
          <span>{{ address.country }} </span>
          <span>Phone number:{{ address.phone }}</span>
          <div class="edit_box">
            <div @click="editAddress(address)">Edit</div>
            <div @click="removeAddress(address.id)">Remove</div>
          </div>
          <div class="set_default" v-if="address.isdef == 1">Default</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import foreignArea from "@/components/Me/foreignArea.vue";
import VDistpicker from "v-distpicker";
import qs from "qs";
const unchuck = require("../../assets/img/unchuck.png");
const chuck = require("../../assets/img/chuck.png");
export default {
  name: "ReceiverAddress",
  data() {
    return {
      popularCity: {
        value: "China",
        label: "中国",
      },

      unchuck: unchuck,
      chuck: chuck,
      ischina: false,
      country: null,
      province: "",
      city: "",
      area: null,
      address: null,
      name: null,
      phone: null,
      postId: " ",
      isdef: false,
      customerId: null,
      apptoken: null,
      addressList: [],
      btntext: "Add address",
      isEdit: false,
      id: null,
    };
  },
  components: { foreignArea, VDistpicker },
  mounted() {
    this.getAddressList();
  },
  methods: {
    getAddressList() {
      setTimeout(() => {
        this.apptoken = this.$store.state.apptoken;
        this.customerId = this.$store.state.userInfo.id;

        if (
          this.apptoken == null ||
          this.apptoken == "" ||
          this.customerId == null ||
          this.customerId == ""
        ) {
          setTimeout(() => {
            this.getAddressList();
            //this.postAddressList(this.customerId, this.apptoken);
          }, 1000);
        } else {
          this.postAddressList(this.customerId, this.apptoken);
        }
      }, 1000);
    },
    postAddressList(customerId, apptoken) {
      this.$axios({
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        url: this.$api.getAddressList,
        data: qs.stringify({
          customerId: customerId,
          apptoken: apptoken,
        }),
      })
        .then((addressList) => {
          console.log(addressList);
          if (addressList.data.success) {
            this.addressList = addressList.data.data;
          } else {
            this.toast("error", addressList.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectCountry(name) {
      console.log(name);
      if (name == "China") {
        this.ischina = true;
      } else {
        this.ischina = false;
      }
      this.country = name;
    },
    onSelected(data) {
      // alert(data.province + ' | ' + data.city + ' | ' + data.area)
      console.log(data);
      this.province = data.province.value;
      this.city = data.city.value;
      this.area = data.area.value;
    },
    addAddress() {
      if (this.addressList.length == 2 && !this.isEdit) {
        this.toast("error", "Add up to two addresses");
        return;
      }
      if (this.country == null || this.country == "") {
        this.toast("error", "Please choose a country");
        return;
      }
      if (
        this.country == "China" &&
        (this.province == null ||
          this.province == "" ||
          this.city == null ||
          this.city == "")
      ) {
        this.toast("error", "Please select provinces, cities and regions");
        return;
      }
      if (this.name == null || this.name == "") {
        this.toast("error", "Please enter a name");
        return;
      }
      if (this.country == "China" && (this.phone == null || this.phone == "")) {
        this.toast("error", "Please enter the  phone number");
        return;
      }

      if (
        this.country == "China" &&
        !/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(
          this.phone
        )
      ) {
        this.toast("error", "The cell phone number is incorrect");
        return;
      }

      if (this.address == null || this.address == "") {
        this.toast("error", "Please enter a detailed address");
        return;
      }
      const data = qs.stringify({
        country: this.country,
        province: this.province,
        city: this.city,
        name: this.name,
        phone: this.phone,
        address: this.address,
        postId: this.postId,
        isdef: this.isdef ? 1 : 0,
        customerId: this.customerId,
        apptoken: this.apptoken,
        id: this.id,
      });
      this.$axios({
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        url: this.$api.addressEdit,
        data: data,
      })
        .then((resp) => {
          console.log(resp);
          if (resp.data.success) {
            if (this.isEdit) {
              this.toast("success", "Edited successfully");
            } else {
              this.toast("success", "Added successfully");
            }

            this.country = "";
            this.city = "";
            this.name = "";
            this.phone = "";
            this.address = "";
            this.postId = "";
            this.btntext = "Add address";
            this.isEdit = false;
            this.id = null;
            this.getAddressList();
          } else {
            this.toast("error", resp.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeAddress(id) {
      const data = qs.stringify({
        id: id,
        apptoken: this.apptoken,
      });
      this.$axios({
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        url: this.$api.addressDelete,
        data: data,
      })
        .then((resp) => {
          console.log(resp);
          if (resp.data.success) {
            this.toast("success", "Delete successfully");
            this.getAddressList();
          } else {
            this.toast("error", resp.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editAddress(address) {
      console.log(address);
      this.id = address.id;
      this.isEdit = true;
      this.country = address.country;
      this.province = address.province;
      this.city = address.city;
      this.name = address.name;
      this.phone = address.phone;
      this.address = address.address;
      this.postId = address.postId;
      address.isdef == 1 ? (this.isdef = true) : (this.isdef = false);
      this.btntext = "Edit Address";
      // const data = qs.stringify({
      //   id: address.id,
      //   country: this.country,
      //   province: this.province,
      //   city: this.city,
      //   name: this.name,
      //   phone: this.phone,
      //   address: this.address,
      //   postId: this.postId,
      //   isdef: this.isdef ? 1 : 0,
      //   customerId: this.customerId,
      //   apptoken: this.apptoken,
      // });

      // this.$axios({
      //   method: "post",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      //   url: this.$api.addressEdit,
      //   data: data,
      // })
      //   .then((resp) => {
      //     console.log(resp);
      //     if (resp.data.success) {
      //       this.toast("success", "Edit successfully");
      //       this.country = "";
      //       this.city = "";
      //       this.name = "";
      //       this.phone = "";
      //       this.address = "";
      //       this.postId = "";
      //       this.getAddressList();
      //     } else {
      //       this.toast("error", resp.data.msg);
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
  },
};
</script>
<style  scoped>
@import "../../assets/style/Me/ReceiverAddress.css";
</style>