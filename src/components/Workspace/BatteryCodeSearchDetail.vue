<template>
  <div>
    <van-nav-bar title="电池详情" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>
    <!-- <div
      style="background:rgba(229, 229, 229, 1) ;width:3.6rem;height:0.4rem;line-height:0.4rem;padding-left:0.15rem;color:black"
    >车辆详情</div>

    <van-cell-group>
      <van-cell title="商标：" :value="info.brand" />
      <van-cell title="车辆识别号" :value="info.vehicle_identification_number" />
      <van-cell title="制造日期：" :value="info.make_time" />
      <van-cell title="乘坐人员：" :value="info.people_num + '人'" />
      <van-cell title="发动机型号：" :value="info.engine_type" />
      <van-cell title="允许最大功率：" :value="info.max_power" />
    </van-cell-group>
 

    <div
      style="background:rgba(229, 229, 229, 1) ;width:3.6rem;height:0.4rem;line-height:0.4rem;padding-left:0.15rem;color:black"
    >电池详情</div> -->

    <van-cell-group>
     <van-cell title="包码：" :value="info.code" />
      <van-cell title="生产日期：" :value="info.make_time" />
      <van-cell title="生产厂商：" :value="info.cell_firm" />
      <van-cell title="产品类型：" :value="info.cell_product_type" />
      <van-cell title="电池类型：" :value="info.cell_type" />
      <van-cell title="电池规格：" :value="info.code_specification" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "BatteryCodeSearchDetail",

  data() {
    return {
      message: "",
      image: require("../../assets/ic_back_white.png"),
      info: ""
    };
  },
  mounted() {
    this.vinCode = this.$route.query.id;
    console.log(this.vinCode);
    var parmas = {
      vin:  this.vinCode
    };
    this.$post1("packageSearch", parmas).then(res => {
      console.log(res);
        if (res.code == 1) {
          this.$toast(res.message);
          return;
        }
      // this.$toast(res.message);
      //密码设置成功
    
      this.info = res.data;
       this.info.code  = this.vinCode
    });
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    }
  }
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
   font-size: 0.19rem;
  color: white;
}
</style>
