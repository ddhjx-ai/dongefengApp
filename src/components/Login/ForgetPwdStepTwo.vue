<template>
  <div>
    <van-nav-bar title="忘记密码" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <div style="margin-top:0.2rem ;margin-left:0.24rem ;margin-right:0.24rem">
      <van-field
        v-model="one_pwd"
        label-align="left"
        :left-icon="img1"
        label-width="10"
        label=" "
        clearable
        placeholder="请输入新密码"
        @click-right-icon="$toast('question')"
      />

      <van-field
        v-model="two_pwd"
        :left-icon="img1"
        label-width="10"
        label=" "
        type="password"
        placeholder="请确认密码"
      ></van-field>

      <div
        class="van-multi-ellipsis--l3"
        style="font-size:12px;margin:0.1rem ;text-align:left;color:#808080 ;line-height:18px"
      >
        为保证您的账户和资金安全，请不要设置与其他软件（如社交软件）、网
        站（如社交平台、论坛）相同或相似的用户名和密码组合。
      </div>
    </div>
    <div style="width:3.15rem ;margin-left:0.3rem;height:0.4rem;margin-top:0.3rem">
      <van-button type="danger" color="#24BB9B" size="large" @click="nextStep">确认</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgetPwdStepTwo",

  data() {
    return {
      msg: 666,
      one_pwd: "",
      two_pwd: "",
      image: require("../../assets/ic_back_black.png"),
      img1: require("../../assets/login_word.png")
    };
  },
  mounted: function() {
    this.email = this.$route.query.id;
    console.log(this.msg);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-2);
      //  this.$router.go(-1);//返回上一层
    },
    nextStep() {
      if (this.one_pwd.length < 8) {
        this.$toast("请输入8-30位，包含字母和数字的密码");
        return;
      }
      if (this.one_pwd != this.two_pwd) {
        this.$toast("2次密码不同，请检查");
        return;
      }

      var parmas = {
        email: this.email,
        password: this.one_pwd
       
      };
      this.$post("resetPwd", parmas).then(res => {
        console.log(res);
        this.$toast(res.error);
        //密码设置成功
        if (res.code == 200) {
          this.$router.go(-2);
        }
      });

      //      this.$dialog.alert({
      //        title:'提示',
      //   message: '密码中包含多个连续的数字，为保证您的密码安全，您是否要重新设置？'
      // });
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
