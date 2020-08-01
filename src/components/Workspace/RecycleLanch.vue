// #mark  添加 扫码scan() 函数；searchBtnClick() 函数

<template>
  <div>
    <van-nav-bar title="回收发起" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <div
      style="width:100%;height:0.61rem;background:#24BB9B;display:flex;flex-direction:row;align-items:center;"
    >
      <div class="inputView">
        <input class="input" placeholder="请输入或扫描电池编码" v-model="message" />
      </div>
      <img
        :src="scanImg"
        style="width: 0.23rem; margin-left: -0.4rem; z-index: 9999;"
        @click="scan"
      />
      <div class="cancleBtn" @click="searchBtnClick">搜索</div>
    </div>

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

      <van-field
        v-model="BatteryInfo.maker"
        label="生产厂商"
        label-align="left"
        input-align="right"
        readonly
      />

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
      v-model="BatteryInfo.recycle_remark"
      rows="5"
      type="textarea"
      maxlength="500"
      placeholder="请输入投诉或建议内容"
      show-word-limit
      class="miltextarea"
    />

    <h3 class="h3divider two">
      图片详情
      <span>(支持jpg,gif,png,请勿上传超过2MB的图片)</span>
    </h3>
    <div class="uploadcontainer">
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="4"
        :before-read="beforeRead"
        :after-read="onRead"
        :accept="'image/*'"
      />
    </div>

    <div class="btns">
      <van-button
        type="primary"
        size="large"
        style="width:1.5rem;vertical-align: middle; height:0.44rem;margin-right:5%;background:#24BB9B;border:none"
        @click="SubmitRecyclingLaunchRecord"
        class="button_1"
      >回收</van-button>
      <van-button
        type="primary"
        size="large"
        @click="onClickLeft"
        style="width:1.5rem;vertical-align: middle;height:0.44rem;background:#ccc;border:none;"
        class="button_2"
      >取消</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecycleLanch",
  data() {
    return {
      id: 0,
      fileList: [],
      radio: 1,
      message: "",
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
      },

      historyData: ""
    };
  },
  mounted() {
    // this.id = this.$route.query.id;
    // console.log(this.id);
    // var parmas = {
    //   id: this.id
    // };
    // this.$post("recyclingInfo", parmas).then(res => {
    //   console.log(res);
    //   // this.$toast(res.message);
    //   //密码设置成功
    //   this.info = res.data[0];
    // });
    // // ---------------------------------------电池包码
    // var data = localStorage.getItem("batteryCode");
    // var dataObj = JSON.parse(data);
    // if (dataObj) this.historyData = dataObj.reverse();
  },
  methods: {
    //图片上传相关
    beforeRead(file) {
      if (this.fileList.findIndex(it => it.localName == file.name) > -1) {
        this.$toast("图片[" + file.name + "]已经上传过，不用重复上传");
        return false;
      }
      return true;
    },

    onRead(file) {
      let formData = new FormData();
      formData.append("file", file.file);

      file.localName = new Date().getTime() + file.file.name;

      this.$ImgUpoad(formData).then(res => {
        console.log(res);
        if (res.data.code === "200") {
          file.remote_url = res.data.body.filePath;
        } else {
          this.$toast(res.error);
        }
      });
    },
    // 返回上一级
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    // 提交回收发起记录
    SubmitRecyclingLaunchRecord() {
      if (!this.BatteryInfo.code) {
        this.$toast("电池编码不能为空");
        return;
      }

      if (this.fileList.length == 0) {
        this.$toast("请上传电池包图片");
        return;
      }

      if (!this.BatteryInfo.recycle_remark) {
        this.$toast("请填写描述信息");
        return;
      }

      let para_fileName = "";
      let para_url = "";
      this.fileList.forEach(element => {
        para_url += element.remote_url + "#";
        para_fileName += element.localName + "#";
      });

      para_url = para_url.substring(0, para_url.length - 1);
      para_fileName = para_fileName.substring(0, para_fileName.length - 1);

      var params = {
        batteryPackcode: this.BatteryInfo.code,
        recyclingDes: this.BatteryInfo.recycle_remark,
        fileName: para_fileName,
        url: para_url
      };

      this.$post("recyclingLaunch", params).then(res => {
        console.log(123, res);
        if (res.code == 200) {
          this.$toast("回收上报成功");
          this.$router.push({
            path: "/Recyclelist"
          });
        }
      });
    },

    // 扫码*************************************
    scan() {
      triggerNative("saoyisao", "", val => {
        this.message =  val.cardNumber
        this.searchBtnClick()
        console.log(val.cardNumber);
      });
    },
    // 搜索*************************************
    searchBtnClick() {
      if (!this.message) {
        this.$toast.fail("请输入电池编码");
        return;
      }
        // // 车辆vin码（17位的） / 电池包码（24位
        //  if(this.message.length != 24){
        //   this.$toast.fail('电池包码必须为24位编码');
        //   return ;
        // }

          
      let batterySearch = false;

     
      if (this.message.length == 24) {
        batterySearch = true;
      }

      if (this.message.length > 24) {
        if (this.message.indexOf("/") != -1) {
          var arr = this.message.split("/");
          var str = arr[arr.length - 1];
          
          if (str.length == 24) {
             batterySearch = true;
          }
        }
      }
      if (!batterySearch) {
        this.$toast.fail("请输入格式正确的电池编码");
        return;
      }


      this.vinCode = this.message;
      console.log(this.vinCode);
      var parmas = {
        vin: this.vinCode
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

        this.BatteryInfo.code = this.message;
        this.BatteryInfo.product_time = this.info.make_time;
        this.BatteryInfo.maker = this.info.cell_firm;
        this.BatteryInfo.product_type = this.info.cell_product_type;
        this.BatteryInfo.battery_type = this.info.cell_type;
        this.BatteryInfo.battery_model = this.info.code_specification;
      });
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
.van-cell-group .van-cell {
  height: 0.5rem;
  line-height: 0.5rem;
  padding: 0 0.19rem;
  border-bottom: 1px solid #e8e8e8;
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
.van-cell:not(:last-child)::after {
  border: 0;
}
.h3divider {
  font-family: PingFangSC-Medium;
  font-size: 0.14rem;
  color: #333333;
  letter-spacing: 0;
  background: #f8f8f8;
  height: 0.49rem;
  line-height: 0.49rem;
  padding-left: 0.19rem;
  margin: 0;
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
  font-size: 0.14rem;
  color: #d5fff6;
}
.uploadcontainer {
  padding: 0.16rem 0.19rem;
}
.cancleBtn {
  font-family: PingFangSC-Regular;
  color: #ffffff;
  line-height: 0.3rem;
  width: 0.8rem;
  height: 0.3rem;
  position: absolute;
  right: 0.19rem;
  font-size: 0.14rem;
  text-align: right;
}

.btns{
  padding: 0 0.19rem;
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.3rem;
  .button_1{
    line-height: 0.44rem;
  }
  .button_2{
    border: 1px solid #ccc;
    line-height: 0.44rem;
  }
}
</style>