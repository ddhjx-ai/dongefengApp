<template>
  <div id="container">
    <van-nav-bar  :title="vins.length ? ' ' :'电池运行状态监控'" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="backImg" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <!-- 中间的背景色 -->
    <div style="background:#24BB9B;height:2rem;text-align:center;" v-if="vins.length">
      <van-image width="1rem" height="1rem" :src="image" />
      <span class="time">电池运行状态监控</span>
      <span class="time describ"> </span>
    </div>
    <div
      style="width: 100%; height: 0.2rem; background: white;border-top-left-radius: 0.2rem;border-top-right-radius: 0.2rem;z-index:999;top:-0.2rem;position: relative;"
      v-if="vins.length"
    ></div>
    <!-- test -->
    <van-field
      v-if="vins.length"
      v-model="vin"
      label="车辆vin码"
      label-align="left"
      input-align="right"
      right-icon="arrow-down"
      placeholder
      readonly
      @click="showPicker = true"
      class="send_type"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="vins" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
    <div>
      <!-- <div
        style="font-family: PingFangSC-Medium;font-size:0.15rem;color: #333333;heigh:0.3rem; margin:0.1rem 0.1rem; "
        v-if="vins.length"
      >电池状态</div>-->
      <van-cell-group :border="false">
        <van-grid :gutter="37" square :column-num="2">
          <van-grid-item v-for="(item,index) in list_BatteryStauts_values" :key="index">
            <!-- :text="item.value" -->

            <van-image
              :src="list_BatteryStauts_img[index]"
              height="0.55rem"
              width="0.55rem"
              v-if="index!=0"
            />
            <div  id='box'  ref="box"
              style=" background: #F5936A;  width:0.27rem ;margin-bottom: 0.1rem;height:0.38rem ;position: absolute;
    top:0.24rem;"
              v-if="index==0"
            ></div>
            <van-image
              :src="list_BatteryStauts_img[index]"
              v-if="index==0"
              style="width: 0.28rem;height: 0.42rem;position: absolute; top: 0.2rem;z-index: 99999;"
            />
            <!-- <van-image width="0.35rem" height="1rem" :src="img" v-if='index==0' style="margin-top:-0.3rem"/> -->
            <span
              style="font-size: 13px;color: #999999;margin-top:0.65rem"
              v-if="index==0"
            >{{list_text_arr[index]}}</span>
            <span
              style="font-size: 13px;color: #999999;margin-top:0.05rem"
              v-if="index!=0"
            >{{list_text_arr[index]}}</span>
            <span
              style="font-family: PingFangSC-Medium;font-size: 17px;color: #333333;"
            >{{list_BatteryStauts_values[index].value}}</span>
          </van-grid-item>
        </van-grid>
      </van-cell-group>

      <!-- <div
        style="font-family: PingFangSC-Medium;font-size:0.15rem;color: #333333;heigh:0.3rem; margin:0.1rem 0.1rem; "
        v-if="vins.length"
      >电池参数状态</div>-->
      <!-- <van-cell-group :border="false" v-if="vins.length">
        <van-grid :gutter="8" square>
          <van-grid-item
            v-for="(item,index) in list_BatteryParameterStauts"
            :key="index"
            :text="item.value"
          >
            <van-image slot="icon" :src="list_BatteryParameterStauts_img[index]" height="0.65rem" />
          </van-grid-item>
        </van-grid>
      </van-cell-group>-->
    </div>

    <div
      style="display:flex;  display: flex ;flex-direction: column ;align-items: center ;justify-content: center ;margin-top:30vh"
      v-if="!vins.length"
    >
     <van-image width="2.2rem" height="1.1rem" :src="nodataImage" />
      <span style="color:#888 ; font-size:13px;margin-top:0.2rem">暂无数据,请先绑定车辆信息</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BatteryOperationStatus",
  data() {
    return {
      vins: [],
      vin: "",
      divHeight:100 ,
     
      nodataImage: require("../../assets/nodata.png"),
      showPicker: false,
      backImg: require("../../assets/ic_back_white.png"),
      image: require("../../assets/workspace/BatteryOperationStatus/电池图标@2x.png"),
      list_BatteryStauts_img: [
        require("../../assets/workspace/BatteryOperationStatus/1.png"),
        require("../../assets/workspace/BatteryOperationStatus/2.png"),
        require("../../assets/workspace/BatteryOperationStatus/3.png"),
        require("../../assets/workspace/BatteryOperationStatus/4.png")
      ],
      list_text_arr: ["电池可用", "温度", "电流", "电压"],
      list_BatteryStauts_values: [],
      time: "",
      list_BatteryParameterStauts: []
    };
  },
  methods: {
    onConfirm(value) {
      this.vin = value;
      this.showPicker = false;
      this.searchInfo();
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },

    searchInfo() {
      // this.vinCode = this.$route.query.id;
      // console.log(this.vinCode);
      var parmas = {
        vin: this.vin
      };
      this.$post1("batteryStatus", parmas).then(res => {
        console.log(res);
        // this.$toast(res.message);
        //密码设置成功

        if (res.code == 1) {
          this.$toast(res.message);
          return;
        }
       
        this.time = res.data.available_time;

       
         // 0.4rem
        if(this.divHeight != 100){
         var box = document.getElementById('box');
         box.style.height= this.divHeight *0.0038 + 'rem';
         box.style.top= (0.62 -  this.divHeight *0.0038 ) + 'rem';
       }

       this.divHeight = res.data.battery_available  
    
        this.list_BatteryStauts_values = [
          {
            value: res.data.battery_available + "%"
          },
          {
            value: res.data.cell_temperature  +'~' + res.data.cell_temperature2 + "℃"
          },
          {
            value: res.data.cell_current + "A"
          },
          {
            value: res.data.cell_voltage + "V"
          }
        ];
      });
    },

    getCarBindList() {
      let parmas = {
        bindingName: sessionStorage.getItem("userName")
      };
      this.loading = false;
      this.$post("carBindingList", parmas).then(res => {
        console.log(res);
        if (res.code == "200") {
          if (res.body) {
            console.log(9999);

            for (var i = 0; i < res.body.length; i++) {
              this.vins.push(res.body[i].vin);
            }
            this.vin = res.body[0].vin;
            this.searchInfo();
          }
        }
      });
    }
  },
  beforeUpdate(){
    this.$nextTick(function(){
         var box = document.getElementById('box');
         box.style.height= this.divHeight *0.0038 + 'rem';
         box.style.top= (0.62 -  this.divHeight *0.0038 ) + 'rem';
    })
  },
  mounted() {
    this.getCarBindList();
    // this.vinCode = this.$route.query.id;
    // console.log(this.vinCode);
    //   var parmas = {
    //     vin: "LDPZYB3D8JF151462"
    //   };
    //   this.$post1("batteryStatus", parmas).then(res => {
    //     console.log(res);
    //     // this.$toast(res.message);
    //     //密码设置成功

    //     if (res.code == 1) {
    //       this.$toast(res.message);
    //       return;
    //     }

    //     this.time = res.data.available_time;
    //     this.list_BatteryStauts_values = [
    //       {
    //         value: res.data.charging_state
    //       },
    //       {
    //         value: res.data.operating_status
    //       },
    //       {
    //         value: res.data.estimated_available_time + "小时"
    //       },
    //       {
    //         value: res.data.battery_available + "%"
    //       }
    //     ];

    //     this.list_BatteryParameterStauts = [
    //       { img: "../../assets/", item: "温度", value: "" + "℃" },
    //       { img: "", item: "电压", value: res.data.cell_voltage + "v" },
    //       { img: "", item: "电流", value: "5A" },
    //       { img: "", item: "湿度", value: res.data.cell_temperature2 }
    //     ];
    //   });
  }
};
</script>

<style lang="less" scoped>
#container {
  .van-nav-bar {
    background: #24bb9b;
  }
  .van-nav-bar .van-icon {
    color: white;
  }
  .van-nav-bar__title {
    color: white;
  }

  .van-image {
    margin-top: 0.67rem;
    /deep/.van-image__img {
      height: auto;
    }
  }
  /deep/.van-grid-item__text {
    margin-bottom: 0.1rem;
  }

  .time {
    display: block;
    text-align: center;
    font-family: PingFangSC-Semibold;
    font-size: 0.24rem;
    color: #ffffff;
    letter-spacing: 0.005rem;
    line-height: 0.28rem;
    margin: 0.1rem 0rem;
  }

  .describ {
    font-size: 0.14rem;
    line-height: 0.14rem;
  }

  .van-field__control:disabled,
  .field__control {
    font-family: PingFangSC-Medium;
    font-size: 0.15rem;
    color: #333333;
  }

  .van-image {
    margin-top: 0;
  }
  .send_type {
    padding-left: 0.1rem;
    width: 3.6rem;
    margin-bottom: 0.2rem;
  }
}
</style>