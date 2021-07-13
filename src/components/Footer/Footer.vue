<template>
  <div class="footer">
    <div class="flow">
      <span style="font-size: 16px; color: #e2c993">{{
        $t("footer.flow")
      }}</span>
      <a href="https://twitter.com/tomtokenfans" target="_blank"
        ><img class="img" src="../../assets/img/bg6.png"
      /></a>
      <a
        :href="
          lang == 'zh' ? 'https://t.me/tomtoken1' : 'https://t.me/tomtoken_en'
        "
        target="_blank"
        ><img class="img" src="../../assets/img/bg7.png"
      /></a>
      <a href="https://weibo.com/tomtoken" target="_blank"
        ><img class="img" src="../../assets/img/bg12.png"
      /></a>
      <a href="https://instagram.com/tomtokennft/" target="_blank"
        ><img class="img" src="../../assets/img/bg13.png"
      /></a>
    </div>
    <div style="color: #e2c993">
      {{ $t("footer.foottxt") }}
    </div>
    <!-- <div class="connect">
      <span
        style="margin-right: 20px"
        @mouseover="shangwu = true"
        @mouseleave="shangwu = false"
        ><img src="../../assets/img/weixin.png" />{{ $t("footer.shangwu")
        }}<img src="../../assets/img/bg4.png" class="shangwu" v-show="shangwu"
      /></span>
      <span @mouseover="shequ = true" @mouseleave="shequ = false"
        ><img src="../../assets/img/weixin.png" />{{ $t("footer.shequ")
        }}<img src="../../assets/img/bg5.png" class="shequ" v-show="shequ"
      /></span>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {
      shangwu: false,
      shequ: false,
    };
  },
  methods: {},
  computed: {
    lang() {
      return this.$i18n.locale;
    },
  },
};
</script>
<style >
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: calc(100% - 40px);
  height: 70px;
  background: #532e34;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  z-index: 99;
  padding: 0 20px;
  background: #3f2429;
}
.flow {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-right: 100px;
}
.flow img {
  margin: 0 10px;
}
.connect {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.connect span {
  padding: 8px 17px;
  background: #e2c993;
  opacity: 1;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: "Futura Md BT Medium";
  font-weight: 500;
  line-height: 27px;
  color: #69563c;
  position: relative;
}
.connect span:hover {
  cursor: pointer;
}
.connect span img {
  margin-right: 20px;
}
.img {
  width: 40px;
  height: 40px;
}
.shangwu {
  position: absolute;
  top: -75px;
  left: 0;
  width: 100px;
  height: 100px;
  top: -109px;
  left: 50%;
  transform: translateX(-50%);
}
.shequ {
  position: absolute;
  top: -109px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
}
</style>