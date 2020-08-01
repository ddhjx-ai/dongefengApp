<template>
  <div>
    <van-nav-bar title="车辆详情" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>
    <div
      style="background:rgba(229, 229, 229, 1) ;width:3.6rem;height:0.4rem;line-height:0.4rem;padding-left:0.15rem;color:black"
    >车辆详情</div>

    <van-cell-group>
      <van-cell title="商标：" :value="info.manufacturer" />
      <van-cell title="车辆识别号" :value="info.vin" />
      <van-cell title="制造日期：" :value="info.production_date" />
        <van-cell title="电池编码：" :value="info.original_battery_code" />
      <!-- <van-cell title="乘坐人员：" :value="info.people_num + '人'" />
      <van-cell title="发动机型号：" :value="info.engine_type" />
      <van-cell title="允许最大功率：" :value="info.max_power" /> -->
    </van-cell-group>

    <!-- <van-divider />  -->

    <!-- <div
      style="background:rgba(229, 229, 229, 1) ;width:3.6rem;height:0.4rem;line-height:0.4rem;padding-left:0.15rem;color:black"
    >电池详情</div>

    <van-cell-group>
      <van-cell title="电池厂商：" :value="info.cell_firm" />
      <van-cell title="产品类型：" :value="info.cell_product_type" />
      <van-cell title="生产日期：" :value="info.cell_make_time" />
      <van-cell title="电池类型：" :value="info.cell_type" />
      <van-cell title="电池规格：" :value="info.cell_specs" />
    </van-cell-group> -->
   <div style="width:3.15rem ;margin-left:0.3rem;height:0.4rem;margin-top:1.6rem" v-if="this.from =='carBindingList'">
      <van-button type="danger" color="#24BB9B" size="large" @click="nextStep" >解绑</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarDetail",

  data() {
    return {
      message: "",
      image: require("../../assets/ic_back_white.png"),
      info: "",
      from:'123',
    };
  },
  mounted() {
    this.vinCode = this.$route.query.id;
     
    this.from =  this.$route.query.from ;
    var parmas = {
      vin :this.vinCode
    };
    //   /otherWeb/
    this.$post1("vinSearchInfo", parmas).then(res => {
      console.log(res);
      if(res.code == 1){
         this.$toast(res.message);
         return ;
      }
       
       
      this.info = res.data ;
       this.info.vin = this.vinCode
    });
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    nextStep(){
       this.vinCode = this.$route.query.id;
     
   
    var parmas = {
      vin :this.vinCode
    };
    //   /otherWeb/
    this.$post("carDelete", parmas).then(res => {
      
      if(res.code == 200){
         this.$toast(res.error);
         this.onClickLeft()
         return ;
      }
       
       
      
    });
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
