<template>
  <div>
    <van-nav-bar title="电池异常报警" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <div style="display: block;height: 0.38rem;line-height: 0.38rem;padding-left: 0.15rem;">指定搜索范围</div>
    <van-divider></van-divider>
    <div class="btnFilterGroup">
      <van-button
        round
        type="default"
        :class="classFlag == 1 ?'btnFilterActive':'btnFilterdefault'"
        @click="btnClick(1)"
        v-el:btnfilterdefault
      >已处理</van-button>
      <van-button
        round
        type="default"
        :class="classFlag == 2 ?'btnFilterActive':'btnFilterdefault'"
        @click="btnClick(2)"
      >未处理</van-button>
    </div>

    <div style="width:100%;height:0.10rem ;background:#EDEDED ;margin-top:0.15rem"></div>
  <!-- v-if = 'item.status != classFlag' -->
    <van-row
     
      type="flex"
      justify="center"
      v-for="(item ,index ) in dataList.filter(item => item.status != classFlag )"
      :key="index"
      style="height:0.45rem ;align-item:center"
     
    >
      <van-col     span="8" style="padding-left:0.1rem ;line-height:0.45rem">{{item.reason}}</van-col>
      <van-col     span="10" style="font-size:12px ;line-height:0.45rem">{{item.alarm_time}}</van-col>

      <div  
        :class="changeColor(item.status)"
        style="margin-top:0.07rem;font-size:12px ;line-height:0.3rem ;width:0.6rem ;height:0.3rem;text-align:center;border-radius: 4px;"
      >{{item.status == 1 ?'故障' :'已处理'}}</div>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "BatteryError",
  data() {
    return {
      message: "",
      dataList: "",
      classFlag: 1, //active的判断标志
      image: require("../../assets/ic_back_white.png"),
      scanImg: require("../../assets/mine_scan.png")
    };
  },
  mounted() {
    console.log(111);
    //  this.thumbs = res.body.filter(item => item.announcementType==2 )
      // this.newsArr = res.body.filter(item => item.announcementType==1)
    // this.vinCode = this.$route.query.id;
    // console.log(this.vinCode);
    var parmas = {
      vin: this.vinCode
    };
    this.$post1("batteryError", parmas).then(res => {
      console.log(res);
      if (res.code == 1) {

        this.$toast(res.message);
        return;
      }
      this.dataList = res.data;
      // this.$toast(res.message);
      //密码设置成功
      // this.info = res.data[0];
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    btnClick(index) {
      this.classFlag = index;
    },
    changeColor(status) {
      
      return status == 1 ? "dangerColor" : "successColor";
    }
  }
};
</script>

<style   scoped>
.van-nav-bar {
  background: #24bb9b;
}
.van-nav-bar .van-icon {
  color: white;
}
.van-nav-bar__title {
   font-size: 0.19rem;
  color: white;
}

.van-divider {
  margin-top: 0;
  margin-bottom: 0.15rem;
}

.dangerColor {
  background: rgba(244, 15, 15, 0.3);
  color: rgba(244, 15, 15, 1);
}

.successColor {
  background: rgba(36, 187, 155, 0.3);
  color: rgba(36, 187, 155, 1);
}

.active {
  font-family: PingFangSC-Medium;
  color: #24bb9b;
  letter-spacing: 0;
  text-align: center;
  line-height: 0.28rem;
  background: #e8f6f3;
  border-radius: 0.285rem;
}
</style>

 