// #mark 吴超
<template>
  <div>
    <van-nav-bar title="车辆信息绑定" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <div
      style="width:100%;height:0.61rem;background:#24BB9B;display:flex;flex-direction:row;align-items:center;"
    >
      <div class="inputView">
        <input v-model="message" class="input" placeholder="请输入或扫描车辆vin码" />
      </div>
      <img :src="scanImg" style="width: 0.23rem;margin-left:-0.4rem;z-index: 10;" @click="scan" />
      <div class="cancleBtn" @click="searchBtnClick">搜索</div>
    </div>

    <div
      style="background:white;padding-left:0.19rem;height:0.5rem;line-height:0.5rem;font-family: PingFangSC-Medium;font-size: 0.14rem;color: #333333;"
    >车辆详情</div>

    <van-cell-group>
      <van-field
        v-model="userInfo.trademark"
        label="商标"
        readonly
        label-align="left"
        input-align="right"
      />
      <van-field
        v-model="userInfo.vin"
        label="车辆识别号"
        readonly
        label-align="left"
        input-align="right"
      />
      <van-field
        v-model="userInfo.manufacturingDate"
        label="制造日期"
        readonly
        label-align="left"
        input-align="right"
      />

      <van-field
        v-model="userInfo.salesDate"
        label="购买日期"
        placeholder="请选择购买日期"
        label-align="left"
        input-align="right"
        right-icon="calender-o"
        readonly
        @click="showPopFn"
      />
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          @confirm="confirmFn()"
          @cancel="cancelFn()"
        />
      </van-popup>

      <van-field
        v-model="userInfo.buyer"
        label="购买人"
        label-align="left"
        input-align="right"
        placeholder="请输入购买人姓名"
        @focus="whenFocus"
      />

      <van-field
        v-model="userInfo.identityCard"
        label="购买人身份证"
        placeholder="请输入购买人身份证 "
        label-align="left"
        input-align="right"
      />

      <van-field
        v-model="userInfo.phone"
        label="购买人手机"
        placeholder="请输入购买人手机"
        label-align="left"
        input-align="right"
        type="tel"
      />
    </van-cell-group>

    <!-- 按钮 -->
    <div style="margin-top:0.45rem" class="btns">
      <van-button
        type="primary"
        size="large"
        class="button_1"
        style="width:1.5rem;vertical-align: middle; height:0.44rem;margin-right:5%;background:#24BB9B;border:none"
        @click="bindCar"
      >绑定</van-button>
      <van-button
        type="primary"
        size="large"
        class="button_2"
        style="width:1.5rem;vertical-align: middle;height:0.44rem;background:#CCCCCC;"
        @click="onClickLeft"
      >取消</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BindCarInfo",

  data() {
    return {
      message: "",
      show: false,
      image: require("../../assets/ic_back_white.png"),
      scanImg: require("../../assets/mine_scan.png"),
      historyData: "",
      // userInfo: {
      //   trademark: "东风牌",
      //   vin: "LFV219DK32939234",
      //   manufacturingDate: "2019-10-12",
      //   salesDate: "2019-10-12",
      //   buyer: "张三",
      //   identityCard: "420111199011113322",
      //   phone: "13333333333"
      // }
      userInfo: {
        vin: "",
        buyer: "",
        identityCard: "",
        phone: "",
        trademark: "",
        bindingName: "",
        manufacturingDate: "",
        salesDate: ""
      },

      currentDate: new Date()
    };

    params: {
      id: id;
    }
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    whenFocus() {
      // document.body.scrollTop = document.documentElement.scrollTop =86;
    },
    // 日期处理函数
    showPopFn() {
      this.show = true;
    },
    confirmFn() {
      this.userInfo.salesDate = this.timeFormat(this.currentDate);
      this.show = false;
    },
    cancelFn() {
      this.show = false;
    },
    // 时间格式化 2019-09-08
    timeFormat(time) {
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "-" + month + "-" + day; 
    },

    // 扫码
    scan() {
      console.log(111);
      triggerNative("saoyisao", "", val =>  {
        this.message = val.cardNumber;
        this.searchBtnClick();
      });
    },
    // 搜索
    searchBtnClick() {
      if (!this.message) {
        this.$toast.fail("请输入车辆vin码");
        return;
      }

      let batterySearch = false;

      if (this.message.length == 17) {
        batterySearch = true;
      }

      if (this.message.length > 17) {
        if (this.message.indexOf("/") != -1) {
          var arr = this.message.split("/");
          var str = arr[arr.length - 1];

          if (str.length == 17) {
            batterySearch = true;
          }
        }
      }
      if (!batterySearch) {
        this.$toast.fail("请输入格式正确的vin码");
        return;
      }

      var parmas = {
        vin: this.message
      };
      //   /otherWeb/
      this.$post1("vinSearchInfo", parmas).then(res => {
        // console.log(res);
        // this.$toast(res.message);
        //密码设置成功
        if (res.code == 1) {
          this.$toast(res.message);
          return;
        }
        this.info = res.data;
        this.userInfo.trademark = this.info.manufacturer;
        this.userInfo.vin = this.message;

        this.userInfo.manufacturingDate = this.info.production_date;
      });
    },

    checkUserAndVin() {
      let params = this.userInfo;
      this.$post("carBind", params).then(res => {
        // console.log(res);
        this.$toast(res.error);

        if (res.code == 200) {
          this.$router.go(-1);
        }
      });
    },

    // 绑定车辆信息
    bindCar() {
      if (!this.userInfo.trademark) return this.$toast("请绑定车辆信息");
      if (!this.userInfo.buyer) return this.$toast("请绑定购买人姓名");
      if (!this.userInfo.identityCard)
        return this.$toast("请绑定购买人身份证号");
      if (!this.userInfo.phone) return this.$toast("请绑定购买人手机号");
      if (!this.userInfo.salesDate) return this.$toast("请绑定购买日期");

      let reg = /^1[3456789][0-9]{9}$/; // 校验手机号
      if (!reg.test(this.userInfo.phone))
        return this.$toast("手机号错误,请重新输入");
      this.userInfo.bindingName = sessionStorage.getItem("userName");

      var parmas = {
        userName:  this.userInfo.buyer,
        vin: this.userInfo.vin
      };
      //   /otherWeb/
      this.$post1("checkUserAndVin", parmas).then(res => {
        // console.log(res);
        // this.$toast(res.message);
        //密码设置成功
        if (res.code == 0) {
          this.checkUserAndVin();
        } else {
          this.$toast(res.message);
          return;
        }
      });
    }
  }
  // beforeRouteLeave(to, from, next) {
  //      // 设置下一个路由的 meta
  //      console.log('123455x')
  //     // to.meta.keepAlive = true;  // B 跳转到 A 时，让 A 缓存，即不刷新
  //     // next();
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less"  scoped >
.van-nav-bar {
  background: #24bb9b;
}
.van-nav-bar .van-icon {
  color: white;
}
.van-nav-bar__title {
  color: white;
  font-size: 0.19rem;
}

.van-cell__value {
  color: #333333;
}

.inputView {
  background: #27c6a5;
  border-radius: 0.36rem;
  width: 2.94rem;
  height: 0.36rem;
  margin-left: 0.19rem;
}
.input {
  margin-left: 0.2rem;
  width: 1.5rem;
  height: 0.15rem;
  margin-top: 0.1rem;
  background: #27c6a5;
  border: none;
}

::-webkit-input-placeholder {
  color: white;
}
.cancleBtn {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #ffffff;
  line-height: 0.3rem;
  width: 0.8rem;
  height: 0.3rem;
  /* margin-left: 0.5rem; */
  position: absolute;
  right: 0.1rem;
  text-align: right;
}

/* --------------------------------------- */
.van-nav-bar__title {
  font-size: 0.19rem;
}
.van-cell-group .van-cell {
  height: 0.5rem;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 0.19rem;
  line-height: 0.5rem;
  font-family: PingFangSC-Regular;
  /* color: #333; */
  font-size: 0.14rem;
  /deep/.van-cell__value {
    /deep/input {
      color: #333;
    }
  }
  /deep/.van-cell__title {
    /deep/span {
      color: #666;
    }
  }
}

.cancleBtn {
  right: 0.19rem;
  font-size: 0.14rem;
}
.inputView {
  background: #27c6a5;
  border-radius: 0.36rem;
  width: 2.94rem;
  height: 0.36rem;
  margin-left: 0.19rem;
  display: flex;
  align-items: center;
}
.input {
  margin-left: 0.12rem;
  color: #d5fff6;
  background: #27c6a5;
  border: 0;
  height: 80%;
  width: 80%;
  margin-top: 0;
}
.input::placeholder {
  font-size: 0.14rem;
  color: #d5fff6;
}
.van-cell:not(:last-child)::after {
  border: 0;
}
.van-nav-bar__left {
  left: 0.14rem;
}
.btns {
  padding: 0 0.19rem;
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.3rem;
  .button_1 {
    line-height: 0.44rem;
  }
  .button_2 {
    border: 1px solid #ccc;
    line-height: 0.44rem;
  }
}
</style>