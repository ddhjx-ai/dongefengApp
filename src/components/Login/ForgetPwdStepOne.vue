<template>
  <div>
    <van-nav-bar title="忘记密码" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <van-cell-group>
      <van-field disabled placeholder="进行实名验证的用户请“跳过此步”" />

      <van-field
        v-model="username"
        label="姓名"
        label-align="left"
        clearable
        placeholder="请输入"
        @click-right-icon="$toast('question')"
      />

      <van-field disabled label="证件类型" placeholder="身份证" />

      <van-field v-model="password" label="证件号码" type="password" placeholder="请输入"></van-field>
    </van-cell-group>
    <div style="width:3.45rem ;margin-left:0.15rem;height:0.4rem;margin-top:0.3rem">
      <van-button type="danger" color="#f97f7e" size="large" @click="nextStep">下一步</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgetPwdStepOne",

  data() {
    return {
      msg: 666,
      username: "",
      password: "",
      image: require("../../assets/ic_back_black.png")
    };
  },
  mounted: function() {
    this.msg = this.$route.query.id;
    console.log(this.msg);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    nextStep() {
      console.log(111);
      this.$router.push({
        path: "/ForgetPwdStepTwo",
        query: { id: "1234" }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-button--large {
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
}
</style>
