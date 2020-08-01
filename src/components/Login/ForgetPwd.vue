<template>
  <div>
    <van-nav-bar title="忘记密码" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <div style="margin-top:0.2rem ;margin-left:0.24rem ;margin-right:0.24rem">
      <van-field disabled placeholder="填写邮件号，并通过验证码验证" />

      <van-field
        v-model="email"
        :left-icon="img1"
        label-width="10"
        label=" "
        clearable
        placeholder="请输入邮箱号"
        @click-right-icon="$toast('question')"
      />

      <van-field v-model="code" :left-icon="img2" label-width="10" label=" " placeholder="请输入验证码">
        <van-button
          slot="button"
          size="small"
          type="danger"
          color="#24BB9B"
          plain
          @click="sendCode"
          :disabled="send_flag"
        >{{sendCodeText}}</van-button>
      </van-field>
    </div>
    <van-divider style="width: 2.25rem; margin-top: -0.1rem; margin-left: 0.3rem;" />
    <div style="width:3.15rem ;margin-left:0.3rem;height:0.4rem;margin-top:0.6rem">
      <van-button type="danger" color="#24BB9B" size="large" @click="nextStep">下一步</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgetPwd",

  data() {
    return {
      email: "",
      code: "",
      sendCodeText: "发送验证码",
      send_flag: false,

      img1: require("../../assets/ic_login_phone.png"),
      img2: require("../../assets/login_email.png"),
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

    //发送验证码
    sendCode() {
      if (!this.checkEmail(this.email)) {
        this.$toast("请输入正确的邮箱号码");
        return;
      }

      // 关闭点击按钮，同时开启定时器
      this.send_flag = true;
      this.timeOutFun()

      var parmas = {
        emailAddress: this.email
      };
      this.$post("sendEmail", parmas).then(res => {
        console.log(res);
        this.$toast(res.error);
      });
    },

    // 定时器函数
    timeOutFun() {
      let send_time = 60;
      // 倒计时获取验证码
      let timeId = setInterval(() => {
        send_time = send_time - 1;
        if (send_time <= 0) {
          this.send_flag = false;
          this.sendCodeText = "发送验证码";
          clearInterval(timeId);
        } else {
          this.sendCodeText = send_time + "s后再发送";
        }
      }, 1000);
    },

    checkEmail(email) {
      // 对电子邮件的验证

      var myreg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

      if (!myreg.test(email)) {
        return false;
      } else {
        return true;
      }
    },

    nextStep() {
      if (!this.checkEmail(this.email)) {
        this.$toast("请输入正确的邮箱号码");
        return;
      }
      if (!this.code.length) {
        this.$toast("验证码不能为空");
        return;
      }
      var parmas = {
        emailAddress: this.email,
        emailVerificationcode: this.code
      };
      this.$post("resetPwdCheck", parmas).then(res => {
        console.log(res);

        if (res.code == 200) {
          this.$router.push({
            path: "/ForgetPwdStepTwo",
            query: { id: this.email }
          });
        } else {
          this.$toast(res.error);
        }
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

.van-cell{
  display: flex;
  align-items: center;
}
</style>
