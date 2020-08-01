<template>
  <div>
    <van-nav-bar title="回收详情" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <h3 class="h3divider">电池详情</h3>

    <van-cell-group>
    <van-field 
      v-model="BatteryInfo.code" 
      label="包码" 
      label-align="left" 
      input-align="right" 
      readonly
    />

    <van-field
      v-model="BatteryInfo.product_time"
      label="生产日期"
      label-align="left"
      input-align="right"
      readonly
    />

    <van-field readonly v-model="BatteryInfo.maker" label="生产厂商" label-align="left" input-align="right" />

    <van-field
      v-model="BatteryInfo.product_type"
      label="产品类型"
      label-align="left"
      input-align="right"
      readonly
    />

    <van-field
      v-model="BatteryInfo.battery_type"
      label="电池类型"
      label-align="left"
      input-align="right"
      readonly
    />

    <van-field
      v-model="BatteryInfo.battery_model"
      label="电池规格"
      label-align="left"
      input-align="right"
      readonly
    />
    </van-cell-group>
    <h3 class="h3divider">回收描述</h3>
    <span class="subtitle">内容描述：</span>
    <van-field
       readonly 
      v-model="BatteryInfo.recycle_remark"
      rows="5"
      type="textarea" 
      placeholder="请输入投诉或建议内容"
      show-word-limit
      class="miltextarea"
    />

    <h3 class="h3divider two">
      图片详情
      <!-- <span>(支持jpg,gif,png,请勿上传超过2MB的图片)</span> -->
    </h3>
    <div class="uploadcontainer">
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="4"
        :before-read="beforeRead"
        :after-read="onRead"
        :before-delete="delImg"
        :disabled=true
        :accept="'image/*'"
        :deletable=false
      />
    </div>

    <!-- <div style="text-align:center;margin:0.3rem">
      <van-button
        type="primary"
        size="large"
        style="width:35%;margin-right:5%;background:#24BB9B;border:none"
        @click="onClickLeft"
      >取消</van-button>
      <van-button
        type="primary"
        size="large"
        @click="SubmitRecyclingLaunchRecord"
        style="width:35%;background:#CCCCCC;border:none"
      >上报</van-button>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "RecycleDetail",
  data() {
    return {
      fileList: [],
      fileList_sucess: [],
      radio: 1,
      image: require("../../assets/ic_back_white.png"),
      scanImg: require("../../assets/mine_scan.png"),
      BatteryInfo: {
        code: "",
        product_time: "",
        maker: "",
        product_type: "",
        battery_type: "",
        battery_model: "",
        recycle_remark: "",
         
      }
    };
  },
  mounted() {
      // debugger;
    this.id = this.$route.query.id;
    console.log(this.id);
    var parmas = {
      id: this.id
    };
    this.$post("recyclingInfo", parmas).then(res => {
      console.log(res);
      // res = this.$getMockData("recyclingInfo")
      let info = res.body[0];
      this.BatteryInfo.code=info.batteryPackcode;
      if(info.evaluationDes){
        this.BatteryInfo.recycle_remark=info.evaluationDes;
      }else{
         this.BatteryInfo.recycle_remark=info.recyclingDes;
      }
      
      this.searchBtnClick()
      if (info.url && info.url != null) {
        info.url.split("#").forEach(element => {
          let imageItem = { url: '/static/uploads/' + element };
          this.fileList.push(imageItem);
        });
      }
    });
  },
  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    //禁用删除
    delImg(file)
    {
        return false;
    },
    //禁用上传
    beforeRead(file)
    {
        return false;
    },
     searchBtnClick() {
     
      if (! this.BatteryInfo.code ) {
        this.$toast.fail("请输入电池编码");
        return;
      }

      //  vin: "02KPBF7414116A89L0007719"
      var parmas = {
        vin: this.BatteryInfo.code
      };
      this.$post1("packageSearch", parmas).then(res => {
        console.log(res);
        // this.$toast(res.message);
        //密码设置成功

         if (res.code == 1) {
          this.$toast(res.message);
          return;
        }
        
        this.info = res.data ;

        this.BatteryInfo.code = this.BatteryInfo.code;
        this.BatteryInfo.product_time = this.info.make_time;
        this.BatteryInfo.maker = this.info.cell_firm;
        this.BatteryInfo.product_type = this.info.cell_product_type;
        this.BatteryInfo.battery_type = this.info.cell_type;
        this.BatteryInfo.battery_model = this.info.code_specification;
      });
    } ,
    onRead(file){

    }
     
  }
};
</script>

<style scoped lang="less">
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
.van-cell-group .van-cell{
  padding: 0 0.19rem;
  height: 0.49rem;
  line-height: 0.49rem;
  border-bottom: 1px solid #ebedf0;
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

/deep/.van-uploader__preview-delete{
  display: none;
}
.van-cell:not(:last-child)::after{
  border: 0;
}
.h3divider {
  font-family: PingFangSC-Medium;
  font-size: 0.14rem;
  color: #333333;
  background: #f9f9f9;
  height: 0.49rem;
  line-height: 0.49rem;
  padding-left: 0.19rem;
}

.two {
  color: #333333 !important;
  font-size: 0.14rem;
  font-family: PingFangSC-Light;
  background: #eeeeee;
  font-weight: 400;
  padding-left: 0.19rem;
  height: 0.4rem;
  line-height: 0.4rem;
  letter-spacing: 0.44px;
  border-radius: 0;
  span {
    font-family: PingFangSC-Light;
    font-size: 0.12rem;
    font-weight: 200;
  }
}

.subtitle {
  display: block;
  height: 0.49rem;
  line-height: 0.49rem;
  padding-left: 0.19rem;
  font-size: 0.14rem;
}

.miltextarea {
  background-color: #f7f7f7;
  border: none;
  margin: 0 0.19rem 0.16rem;
  width: auto;
  border-radius: 0.04rem;
  ::placeholder {
    font-size: 0.13rem;
    color: #9a9a9a;
    font-family: PingFangSC-Regular;
  }
}
.uploadcontainer{
  padding: 0.16rem 0.19rem;
}
.van-radio-group {
  height: 0.49rem;
  line-height: 0.49rem;
  padding-top: 0.15rem;
}
.van-radio {
  display: inline-flex;
  text-align: center;
  margin-left: 0.15rem;
}

.van-nav-bar .van-icon,
.van-nav-bar__title {
  color: #ffffff;
}
.van-hairline--top-bottom::after {
  border: none;
}

.van-hairline--bottom::after {
  border-bottom-width: 0;
}

.inputView {
  background: #27c6a5;
  border-radius: 0.36rem;
  width: 2.94rem;
  height: 0.36rem;
  border: 1px solid white;
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

/deep/.van-uploader__upload{
  display: none;
}

/deep/.van-uploader__preview-delete{
  display: none;
}
</style>