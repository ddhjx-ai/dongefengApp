<template>
  <div>
    <div
      style="width:100%;height:0.4rem;margin-top:0.8rem;text-align:center;font-family: PingFangSC-Semibold;font-size: 30px;color: #24BB9B;"
    >东风电池溯源</div>
    <div style="margin-top:0.4rem ;margin-left:0.26rem ;margin-right:0.26rem">
      <van-field
        v-model="username"
        label-width="20px"
        clearable
        :left-icon="image"
        placeholder="请输入登录邮箱"
      />

      <van-field
        v-model="password"
        label-width="20px"
        type="password"
        :left-icon="image1"
        placeholder="请输入登录密码"
      />
    </div>
    <van-divider style="margin-top:0.0rem ;margin-left:0.35rem ;margin-right:0.26rem" />
    <div style="width:3.15rem ;margin-left:0.3rem;height:0.4rem;margin-top:0.3rem">
      <van-button
        type="danger"
        class="login_btn"
        color=" #24BB9B"
        size="large"
        @click="loginBtnClick"
      >登录</van-button>
    </div>

    <div style="width:3.15rem ;margin-left:0.3rem;height:0.4rem;margin-top:0.3rem">
      <van-row color="#f97f7e">
        <van-col span="8" style="color:#5E5E5E" @click="resClick">没有账号？</van-col>

        <van-col span="8" style="color:#5E5E5E ;text-align:right;" @click="forgetPwd">忘记密码？</van-col>

        <van-col span="8" style="color:#5E5E5E ;text-align:right;" @click="question">遇到问题？</van-col>
      </van-row>
    </div>

      <div

         style="width:100%;height:100vh;z-index:6666;position: absolute;top:0px;background: white;"
         v-show="flag"
          
      >
        <div class="q_detil">
          <van-image :src="Qimg" style="width:3.07rem;height:3.07rem;margin-top:1rem;" />
          <span style="font-size:30px;color: #24BB9B;margin-top:0.28rem">东风电池溯源</span>
          <span style="font-size:14px;color:  #4C4C4C;margin-top:0.1rem">汽车电池管理平台</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      username: "",
      password: "",
      flag:true,
      Qimg: require("../../assets/start_logo.png") ,
      image: require("../../assets/login_user.png"),
      image1: require("../../assets/login_word.png")
    };
  },
   mounted() {

          // var token =  sessionStorage.getItem('Authorization')
          //  if(token == 123){
          //     var storage = window.sessionStorage;
          //      storage.setItem("Authorization", '')
          //  }
          
         var email =  localStorage.getItem("email")
         var pwd =   localStorage.getItem("pwd")
         if(email){
           this.flag=true
           this.username = email
           this.password = pwd
            this.loginBtnClick()
         }else{
            this.flag=false
         }
        
     },
  
  methods: {
    forgetPwd() {
      // alert(triggerNative)
      // triggerNative('saoyisao', '', (val)=>{
      // console.log(val)
      //  this.onRadioChange(val, 'saoyisao')
      // var obj=this.radios.find(item=>{return item.deviceId==val})
      // if(obj) {
      //   this.$store.commit('saveDeviceInfo',obj)
      //   this.init()
      // } else {
      //   this.$toast('暂无权限')
      // }
      // })

      this.$router.push({
        path: "/ForgetPwd",
        query: { id: "1234" }
      });
    },
    resClick() {
      this.$router.push({
        path: "/Res"
      });
    },
    loginBtnClick() {
      if (!this.username.length) {
        this.$toast("账号不能为空");
        return;
      }
      if (!this.password.length) {
        this.$toast("密码不能为空");
        return;
      }

      var parmas = {
        email: this.username,
        password: this.password
      };

      this.$post("login", parmas).then(res => {
        console.log(res);
        if (res.code == 200) {
           var storage1 = window.localStorage;
            storage1.setItem("email", this.username);
            storage1.setItem("pwd", this.password);

          var storage = window.sessionStorage;
          storage.setItem("Authorization", res.data.tokenid);
          var dic = res.data;
          // this.$name =  dic.userName
          // console.log(this.$name)
         
          storage.setItem("userName", dic.userName);
          storage.setItem("userPhone", dic.phoneNumber);
          storage.setItem("userId", dic.userId);
          storage.setItem("roleId", dic.roleId);//角色id
            this.flag=false
          this.$router.replace({
            path: "/Tabbar"
          });

        } else {
            this.flag=false
          this.$toast(res.error);
        }
      });
    },
    question() {
      this.$router.push({
        path: "/Questions"
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
.q_detil{
  display: flex ;
  flex-direction: column ;
  align-items: center ;
  justify-content: center ; 
}
</style>
