<template id='recoveryE'>
  <div>
    <van-nav-bar class="title" title="评测详情" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>
    <h3 class="h3divider">电池详情</h3>
    <van-field v-model="BatteryInfo.code" label="包码" label-align="left" input-align="right" disabled/>

    <van-field
      v-model="BatteryInfo.product_time"
      label="生产日期"
      label-align="left"
      input-align="right"
      disabled
    />

    <van-field v-model="BatteryInfo.maker" label="生产厂商" label-align="left" input-align="right" disabled/>

    <van-field
      v-model="BatteryInfo.product_type"
      label="产品类型"
      label-align="left"
      input-align="right"
      disabled
    />

    <van-field
      v-model="BatteryInfo.battery_type"
      label="电池类型"
      label-align="left"
      input-align="right"
      disabled
    />

    <van-field
      v-model="BatteryInfo.battery_model"
      label="电池规格"
      label-align="left"
      input-align="right"
      disabled
    />

    <h3 class="h3divider">回收描述</h3>
    <span class="subtitle">内容描述：</span>
    <van-field
      v-model="BatteryInfo.recycle_remark"
      rows="5"
      type="textarea"
       
      placeholder="请输入投诉或建议内容"
      show-word-limit
      class="miltextarea"
      disabled
    />

    <h3 class="h3divider two">
      图片详情
      <!-- <span>(支持jpg,gif,png,请勿上传超过2MB的图片)</span> -->
    </h3>
    <div class="uploadcontainer">
      <van-uploader
        disabled
        v-model="fileList"
        multiple
        :before-read="beforeRead"
        :before-delete="delImg"
        :accept="'image/*'"
        :deletable="false"
        
      />
    </div>

    <h3 class="h3divider">评测详情</h3>
    <van-radio-group v-model="radio" disabled>
      <van-radio name="1" clickable @click="radio='1'">回收再利用</van-radio>
      <van-radio name="2" clickable @click="radion='2'">回收销毁</van-radio>
    </van-radio-group>
    <span class="subtitle">评测描述:</span>
    <van-field
      v-model="BatteryInfo.evaluation_remark"
      rows="5"
      type="textarea"
      maxlength="500"
      placeholder="请输入投诉或建议内容"
      show-word-limit
      class="miltextarea"
      disabled
    />

    <!-- <div style="text-align:center;margin:0.3rem">
      <van-button
        type="primary"
        size="large"
        style="width:35%;margin-right:5%;background:#24BB9B;border:none"
        @click="SubmitRecyclingLaunchRecord"
      >保存</van-button>
      <van-button
        type="primary"
        size="large"
        @click="onClickLeft"
        style="width:35%;background:#CCCCCC;border:none"
      >取消</van-button>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "RecoveryEvaluationDetail",
  data() {
    return {
      id: 0,
      radio: 1,
      fileList: [],
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
        evaluation_remark: ""
      }
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    var parmas = {
      id: this.id
    };
    this.$post("evaluationInfo", parmas).then(res => {
      let info = res.body[0];
      console.log(info);

      this.BatteryInfo.code = info.batteryPackcode;
      this.BatteryInfo.recycle_remark = info.recyclingDes;
      this.radio = info.evaluationResult;
      this.BatteryInfo.evaluation_remark = info.evaluationDes;
      this.searchBtnClick()
      if (info.url && info.url != null) {
        info.url.split("#").forEach(element => {
            let imageItem = { url: "/static/uploads/" + element };
        
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
    delImg(file) {
      return false;
    },
    //禁止新增图片
    beforeRead(file) {
      return false;
    },
     searchBtnClick() {
     console.log(111111)
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
        
        this.info = res.data;

        this.BatteryInfo.code = this.BatteryInfo.code;
        this.BatteryInfo.product_time = this.info.make_time;
        this.BatteryInfo.maker = this.info.cell_firm;
        this.BatteryInfo.product_type = this.info.cell_product_type;
        this.BatteryInfo.battery_type = this.info.cell_type;
        this.BatteryInfo.battery_model = this.info.code_specification;
      });
    } ,
    SubmitRecyclingLaunchRecord(){
      this.$toast('已评测，不能修改了哦')
    }

  }
};
</script>


<style lang="less" scoped>
#recoveryE {
  .van-nav-bar__title {
    font-size: 0.35rem;
    color: red;
  }
}

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

.h3divider {
  font-family: PingFangSC-Medium;
  font-size: 0.14rem;
  color: #333333;
  letter-spacing: 0;
  line-height: 0.14rem;
  background: #f9f9f9;
  border-radius: 2px;
  height: 0.49rem;
  line-height: 0.49rem;
  padding-left: 0.15rem;
  margin: 0;
}

.subtitle {
  display: block;
  height: 0.49rem;
  line-height: 0.49rem;
  padding-left: 0.15rem;
  font-size: 0.14rem;
}

.miltextarea {
  border: 0.01rem solid rgba(229, 229, 229, 1);
  width: 3.2rem;
  margin-left: 0.18rem;
  border-radius: 2px;
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
  font-size: .19rem;
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