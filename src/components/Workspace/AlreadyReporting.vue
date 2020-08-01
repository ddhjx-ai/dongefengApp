//      ----------------------------
<template>
  <div id="assign">
    <van-nav-bar title="故障处理" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <van-cell-group style="margin-top:0rem">
      <van-field
        v-model="timeValue"
        label="上报日期:"
        label-align="left"
        right-icon="calender-o"
        placeholder="选择上报日期"
        readonly
        class="send_date"
        disabled
      />

      <!-- 选择上报类型 -->
      <van-field
        v-model="TypeValue"
        label="上报类型:"
        label-align="left"
        right-icon="arrow-down"
        placeholder="选择上报类型"
        readonly
        class="send_type"
        disabled
      />

      <span class="subtitle">上报内容描述:</span>
      <van-field
        v-model="msg"
        rows="5"
        type="textarea"
        maxlength="500"
        placeholder="请输入上报内容"
        show-word-limit
        class="miltextarea"
        disabled
      />

      <h2 class="h3divider two">
        故障图片
        <!-- <span>(支持jpg,gif,png,请勿上传超过2MB的图片)</span> -->
      </h2>
      <div class="uploadcontainer">
        <van-uploader v-model="fileList" multiple />
      </div>
      <!-- 选择委派方的 -->
      <van-field
        v-model="appointer"
        label="维修人员:"
        label-align="left"
        placeholder="选择维修人员"
        readonly
        @click="showPickerApp = (data.reportState == 1)"
        class="send_type"
      />

          <van-field
        v-model="vin"
        label="原电池编码:"
        label-align="left"
        placeholder="请输入电池编码"
        readonly
        class="vin_type"
      />
 
        <van-field
        v-model="repairType"
        label="维修类型:"
        label-align="left"
        placeholder="选择电池维修类型"
        readonly="(data.reportState == 3)"
        @click="showPickerApp = (data.reportState == 2)"
        class="send_type"
      />

      <van-field
        v-model="VinValue"
        label="现电池包码:"
        label-align="left"
        placeholder="请输入电池包码"
        class="vin_type"
      />


      <van-popup v-model="showPickerApp" position="bottom"    >
        <van-picker
          show-toolbar
          :columns="repairTypes"
          @cancel="showPickerApp = false"
          @confirm="onConfirmApp"
        />
      </van-popup>

      <span class="subtitle" >维修内容描述:</span>
      <van-field
        v-model="result"
        rows="5"
        type="textarea"
        maxlength="500"
        placeholder="请输入上报内容"
        show-word-limit
        class="miltextarea"
      />

    
    <div style="margin-top:0.45rem" class="btns">
      <van-button
        type="primary"
        size="large"
        class="button_1"
        style="width:1.5rem;vertical-align: middle; height:0.44rem;margin-right:5%;background:#24BB9B;border:none"
        @click="repairHandle"
      >处理</van-button>
      <van-button
        type="primary"
        size="large"
        class="button_2"
        style="width:1.5rem;vertical-align: middle;height:0.44rem;background:#CCCCCC;"
        @click="onClickLeft"
      >取消</van-button>
    </div>

    </van-cell-group>
    <div style="height:0.7rem;"></div>
  </div>
</template>


<script>
// import func from '../../../../../vue项目/vue-temp/vue-editor-bridge';
export default {
  name: "AlreadyReporting",
  data() {
    return {
      msg: "",
      result:'',
      currentDate: new Date(),
      changeDate: new Date(),
      show: false,
      //上报时间
      timeValue: "",
      MyImagePreview: "",
      //上报类型
       TypeValue: "",
      repairType: "",
      showPicker: false,
      showPickerApp: false,
      columns:["电池损坏", "更换电池", "汽车4S店" ],
      repairTypes:['包','模组','单体'],
      // 委托人
      appointers: [],
      appointer: "",
      image: require("../../assets/ic_back_white.png"),
      fileList: [],
      data: this.$route.params.data,
      items: [],
      VinValue:'',
      itemId: 1
    };
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    

    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "-" + month + "-" + day;
    },
    onConfirm(value) {
      this.repairType = value;
      this.showPicker = false;
    },
    onConfirmApp(value) {
      // this.appointer = value;
      this.repairType =  value 
      this.showPickerApp = false;
    },

    // 维修处理-------------------------
    repairHandle() {
       if (!this.result.length) return this.$toast("请输入维修描述信息！");
      // if (!this.TypeValue) return this.$toast("请选择上报类型！");
      // if (!this.fileList.length) return this.$toast("请选择上传图片");
      // let user = sessionStorage.getItem("userName");
      // let reportType = this.columns.findIndex((item, index) => {
      //   return item === this.TypeValue;
      // });
      // this.items.forEach(item => {
      //   if (this.appointer == item.userName) {
      //     this.itemId = item.id;
      //   }
      // });

      // test
      let params = {
        id: this.data.id,
        reportState: "3",
      
        // appointId: sessionStorage.getItem("userId"),
        repairId: sessionStorage.getItem("userId"),
        repairDes:this.result
      };
//       type=1     电池维修类型（1-包2-模组3-单体）
// originalPackCode=P233412312314"    更换电池包码 ~~~~
      // if(!this.VinValue.length  ) 
      // return this.$toast("请填写电池包码");
     if(this.VinValue.length){
        let batterySearch = false;

     
      if (this.VinValue.length == 24) {
        batterySearch = true;
      }

      if (this.VinValue.length > 24) {
        if (this.VinValue.indexOf("/") != -1) {
          var arr = this.VinValue.split("/");
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
    params['originalPackCode'] = this.VinValue ;
      console.log(params);

     }
       if(this.repairType.length) {
         params['type']   = this.repairType 
       } 
      console.log(params);

      this.$post("updateFailure", params).then(res => {
        console.log(res);

        if (res.code == 200) {
          this.$toast(res.error);
          this.$router.go(-1);
        } else {
          this.$toast(res.error);
        }
      });
    },
    // 获取所有委派人
    getAllUser() {
      this.$post("getAllUser", { roleId: 4 }).then(res => {
        if (res.code == 200) {
          res.body.forEach(item => {
            this.items.push(item);
            this.appointers.push(item.userName);
          });
        } else {
          // this.$toast("数据未获取成功");
        }
      });
    },
    // 渲染请求来的数据
    renderData() {
      this.timeValue = this.data.reportTime;
      this.columns.forEach((item, i) => {
        if ((this.data.reportType -1) == i) {
          this.TypeValue = item;
        }
      });

      // this.TypeValue = 'dsdsds'
      this.msg = this.data.reportDescribe;
      this.vin = this.data.vin;
      console.log(this.data.filePath);
      if (this.data.filePath.length) {
        var arr = this.data.filePath.split("#");
        for ( var i = 0; i < arr.length; i++) {
          var dic = {
            url: "/static/uploads/" + arr[i]
          };
          this.fileList.push(dic);
        }
      }
       if(this.data.reportState == 2){
        this.appointer = this.data.repairName; //委派人
       }
       
    }
   
  },
  created() {
    this.getAllUser();
    this.renderData();
  },
  mounted() {
    this.timeFormat(new Date());
    this.reportState = this.$route.params.data.reportState
  }
};
</script>  

<style lang="less" scoped>
.van-nav-bar {
  background: #24bb9b;
}
.send_date,
.send_type {
  height: 0.55rem;
  padding-left: 0.19rem;
  padding-right: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /deep/.van-cell__value {
    width: 2.6rem;
    height: 0.37rem;
    box-sizing: border-box;
    border: 1px solid #e8e8e8;
    border-radius: 0.02rem;
    display: flex;
    align-items: center;
    padding: 0 0.1rem 0 0.12rem;
    /deep/.van-field__body {
      width: 100%;
    }
  }
}
/deep/.van-field__label--left {
  min-width: 0.7rem;
  margin-right: 0.06rem;
}
.van-nav-bar .van-icon {
  color: white;
}
.van-nav-bar__title {
  color: white;
  font-size: 0.19rem;
}
/deep/.van-uploader__upload {
  display: none;
}

/deep/.van-uploader__preview-delete {
  display: none;
}
.van-cell {
  font-size: 0.14rem;
  color: #2e2e2e;
}

.two {
  color: #333333 !important;
  letter-spacing: -0.44px;
  font-size: 0.14rem;
  font-family: PingFangSC-Light;
  background: #eeeeee;
  font-weight: 400;
  padding-left: 0.19rem;
  height: 0.4rem;
  line-height: 0.4rem;
  letter-spacing: -0.0044rem;
  border-radius: 0;
  span {
    font-family: PingFangSC-Light;
    font-size: 0.12rem;
    font-weight: 200;
  }
}
.van-cell:not(:last-child)::after {
  border-bottom: 0;
}

#assign .uploadcontainer {
  padding: 0.16rem 0.19rem;
}

.van-field--label-left ::placeholder {
  font-size: 0.14rem;
  color: #9a9a9a;
}
.subtitle {
  padding-left: 0.19rem;
}
#assign .miltextarea {
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
.btns {
  position: relative;
  .button_1 {
    position: absolute;
    left: 0.19rem;
    line-height: 0.44rem;
  }
  .button_2 {
    position: absolute;
    border: 1px solid #ccc;
    right: 0.19rem;
    line-height: 0.44rem;
  }
}
</style>