<template>
  <div class="ReceiverAddress">
    <div class="ra_title">Receiver Addresses</div>
    <div class="ra_box">
      <div class="ra_box_left">
        <div class="ra_box_div1">
          <span class="left_text">Currently delivered to</span>
          <span class="left_text2">China Mainland</span>
        </div>
        <div class="ra_box_div2">
          <span class="div2_left_text">Country/Region</span>
          <div class="select_box">
            <select class="select_menu">
              <option>United States</option>
              <option>China</option>
            </select>
          </div>
        </div>
        <div class="ra_box_div2">
          <span class="div2_left_text">State</span>
          <div class="select_box">
            <select class="select_menu">
              <option>United States</option>
              <option>China</option>
            </select>
          </div>
        </div>
        <div class="ra_box_div2">
          <span class="div2_left_text">City</span>
          <div class="select_box">
            <select class="select_menu">
              <option>United States</option>
              <option>China</option>
            </select>
          </div>
        </div>
        <div class="ra_box_div2">
          <span class="div2_left_text">Full name</span>
          <div class="select_box">
            <input class="input_box" placeholder="Full name" />
          </div>
        </div>
        <div class="ra_box_div2">
          <span class="div2_left_text">Phone number</span>
          <div class="select_box">
            <input class="input_box" placeholder="+86 15921752419" />
          </div>
        </div>
        <div class="ra_box_div2">
          <span class="div2_left_text">Address</span>
          <div class="address2">
            <div class="address_div1">
              <input
                placeholder="Street address or P.O Box"
                class="div1_input"
              />
            </div>
            <div class="address_div2">
              <input
                placeholder="Apt, Suite, Unit, Building (optional)"
                class="div1_input"
              />
            </div>
          </div>
        </div>
        <div class="ra_box_div2">
          <span class="div2_left_text">Zipcode</span>
          <div class="select_box">
            <input class="input_box" placeholder="Zipcode" />
          </div>
        </div>
        <div class="agree_rules">
          <img src="../../assets/img/checkbox.png" />
          <span class="set_default_address">Make this my default address</span>
        </div>
        <div class="addAddress">Add address</div>
      </div>
      <div class="ra_box_right">
        <div class="address_box">
          <div class="username">Jack Van Hewlsing</div>
          <span>Beijing,Beijing </span>
          <span
            >1701, Building 3, Soho East, Jianguomenwai St, Chaoyang District
          </span>
          <span>100000 </span>
          <span>China </span>
          <span>Phone number:+86 159****2419</span>
          <div class="edit_box">
            <div>Edit</div>
            <div>Remove</div>
          </div>
          <div class="set_default">Default</div>
        </div>
        <div class="address_box">
          <div class="username">Jack Van Hewlsing</div>
          <span>Beijing,Beijing </span>
          <span
            >1701, Building 3, Soho East, Jianguomenwai St, Chaoyang District
          </span>
          <span>100000 </span>
          <span>China </span>
          <span>Phone number:+86 159****2419</span>
          <div class="edit_box">
            <div>Edit</div>
            <div>Remove</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ReceiverAddress",
  data() {
    return {};
  },
  methods: {},
};
</script>
<style  scoped>
@import "../../assets/style/Me/ReceiverAddress.css";
</style>