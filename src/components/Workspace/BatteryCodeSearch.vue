<template>
  <div>
    <van-nav-bar title="标识码查询" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <div
      style="width:100%;height:0.61rem;background:#24BB9B;display:flex;flex-direction:row;align-items:center;"
    >
      <div class="inputView">
        <input v-model="message" class="input" placeholder="请输入或扫描电池包码、车辆vin码" />
      </div>
      <img :src="scanImg" style="width: 0.23rem;margin-left: -30px ;z-index: 9999;" @click="scan" />
      <div class="cancleBtn" @click="searchBtnClick">搜索</div>
    </div>

    <div
      style="background:white;margin-left:0.05rem;padding:0.1rem;font-family: PingFangSC-Medium;font-size: 14px;color: #333333;"
    >搜索历史</div>

    <!-- 居中 -->
    <div
      style="  display: flex;flex-direction: row;  justify-content: flex-start;flex-wrap: wrap;"
      v-if="historyData.length"
    >
      <van-col
        span="20"
        style="margin-left: 0.2rem; margin-top: 0.2rem;text-align:left ;padding-left:0.2rem"
        @click="itemClick(item)"
        v-for="(item ) in historyData"
        :key="item"
      >{{item}}</van-col>
      <!-- <van-col span="10" @click="itemClick(item)"   v-if='index%2 == 1'>{{item}}</van-col> -->
    </div>

    <div
      style="display:flex;  display: flex ;flex-direction: column ;align-items: center ;justify-content: center ;margin-top:10vh"
      v-else
    >
      <van-image width="2.2rem" height="1.1rem" :src="nodataImage" />
      <span style="color:#888 ; font-size:13px;margin-top:0.2rem">暂无历史数据</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BatteryCodeSearch",

  data() {
    return {
      message: "",
      image: require("../../assets/ic_back_white.png"),
      scanImg: require("../../assets/mine_scan.png"),
      nodataImage: require("../../assets/nodata.png"),
      historyData: ""
    };
  },
  mounted() {
    var data = localStorage.getItem("BatteryCodeKey");
    var dataObj = JSON.parse(data);
    if (dataObj) this.historyData = dataObj.reverse();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    scan() {
      triggerNative("saoyisao", "", val => {
        this.message = val.cardNumber;
        this.searchBtnClick();
      });
    },
    searchBtnClick() {
      if (!this.message) {
        this.$toast.fail("请输入标识码");
        return;
      }
      // 车辆vin码（17位的） / 电池包码（24位
      //  if(!this.message.length  ){
      //   this.$toast.fail('电池包码必须为24位编码');
      //   return ;
      // }
      let vinSearch = false;
      let batterySearch = false;

      if (this.message.length == 17) {
        vinSearch = true;
      }
      if (this.message.length == 24) {
        batterySearch = true;
      }

      if (this.message.length > 17) {
        if (this.message.indexOf("/") != -1) {
          var arr = this.message.split("/");
          var str = arr[arr.length - 1];
          if (str.length == 17) {
            vinSearch = true;
          }
          if (str.length == 24) {
             batterySearch = true;
          }
        }
      }
      if (!(vinSearch || batterySearch)) {
        this.$toast.fail("请输入格式正确的标识码");
        return;
      }

      var data = localStorage.getItem("BatteryCodeKey");
      var dataObj = JSON.parse(data);
      if (dataObj) {
        if(dataObj.includes(this.message)){
          dataObj = dataObj.filter(item => item != this.message)
          
        }
        if (dataObj.length > 7) {
          var item = dataObj.splice(1, 8);
          item.push(this.message);
          localStorage.setItem("BatteryCodeKey", JSON.stringify(item));
        } else {
          dataObj.push(this.message);
          localStorage.setItem("BatteryCodeKey", JSON.stringify(dataObj));
        }
      } else {
        dataObj = [];
        dataObj.push(this.message);
        localStorage.setItem("BatteryCodeKey", JSON.stringify(dataObj));
      }

      if (batterySearch) {
        this.$router.push({
          path: "/BatteryCodeSearchDetail",
          query: { id: this.message }
        });
      }
      if (vinSearch) {
        this.$router.push({
          path: "/CarDetail",
          query: { id: this.message }
        });
      }
    },
    itemClick(item) {
    console.log(item)
       let vinSearch = false;
      let batterySearch = false;

      if (item.length == 17) {
        vinSearch = true;
      }
      if (item.length == 24) {
        batterySearch = true;
      }

      if (item.length > 17) {
        if (item.indexOf("/") != -1) {
          var arr = item.split("/");
          var str = arr[arr.length - 1];
          if (str.length == 17) {
            vinSearch = true;
          }
          if (str.length == 24) {
             batterySearch = true;
          }
        }
      }
      
      if (!(vinSearch || batterySearch)) {
        this.$toast.fail("请输入格式正确的标识码");
        return;
      }
        if (batterySearch) {
        this.$router.push({
          path: "/BatteryCodeSearchDetail",
          query: { id: item }
        });
      }
      if (vinSearch) {
        this.$router.push({
          path: "/CarDetail",
          query: { id: item }
        });
      }
      // this.$router.push({
      //   path: "/BatteryCodeSearchDetail",
      //   query: { id: item }
      // });
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
<style scoped>
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
  background: #27c6a5;
  color: #d5fff6;
  border: 0;
  height: 80%;
  width: 80%;
  margin-top: 0;
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
/* :-moz-placeholder {
 
color: red;
}
::-moz-placeholder {
 
color: red;
}
:-ms-input-placeholder {
 
color: red;
} */

.van-col {
  float: left;
  box-sizing: border-box;
  min-height: 1px;
  background: #f5f8f8;
  text-align: center;
  height: 0.3rem;
  line-height: 0.3rem;
  overflow: hidden;
}
</style>




 

