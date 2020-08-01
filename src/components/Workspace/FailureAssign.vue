<template>
  <div id="assign">
    <van-nav-bar title="故障上报" @click-left="onClickLeft" :border="false">
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
        @click="showPopFn"
        class="send_date"
      />
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          @change="changeFn()"
          @confirm="confirmFn()"
          @cancel="cancelFn()"
        />
      </van-popup>

      <van-field
        v-model="TypeValue"
        label="上报类型:"
        label-align="left"
        right-icon="arrow-down"
        placeholder="选择上报类型"
        readonly
        @click="showPicker = true"
        class="send_type"
      />

      <van-field
        v-model="VinValue"
        label="电池编码:"
        label-align="left"
        placeholder="请输入电池编码"
        class="vin_type"
      />

      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>

      <span class="subtitle">上报内容描述:</span>
      <van-field
        v-model="msg"
        rows="5"
        type="textarea"
        maxlength="500"
        placeholder="请输入上报内容"
        show-word-limit
        class="miltextarea"
      />

      <h3 class="h3divider two">
        图片上传
        <span>(支持jpg,gif,png,请勿上传超过2MB的图片)</span>
      </h3>
      <div class="uploadcontainer">
        <van-uploader
          v-model="fileList"
          multiple
          :before-read="beforeRead"
          :after-read="onRead"
         
          :max-count="3"
        />
      </div>

      <div style="margin-top:0.2rem;" class="btns">
        <!-- <van-button
          type="primary"
          size="large"
          class="button_1"
          style="width:1.5rem;vertical-align: middle; height:0.44rem;margin-right:5%;background:#F07546;border:none"
        >保存</van-button> -->
        <van-button
          type="primary"
          size="large"
          class="button_2"
          style="width:3.0rem;vertical-align: middle;height:0.44rem;background:#24BB9B; margin-left: 0.325rem; "
          @click="sendFault"
        >上报</van-button>
      </div>
    </van-cell-group>
     <div style="height:0.8rem;"></div>
  </div>
</template>


<script>
export default {
  name: "FailureAssign",
  data() {
    return {
      msg: "",
      currentDate: new Date(),
      changeDate: new Date(),
      show: false,
      //上报时间
      timeValue: "",
      //上报类型
      TypeValue: "",
      // Vin 码
      VinValue:'',
      showPicker: false,
      columns:["电池损坏", "更换电池", "汽车4S店" ],
      image: require("../../assets/ic_back_white.png"),
      fileList: []
    };
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    showPopFn() {
      this.show = true;
    },
    showPopup() {
      this.show = true;
    },
    changeFn() {
      // 值变化是触发
      this.changeDate = this.currentDate; // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn() {
      // 确定按钮
      this.timeValue = this.timeFormat(this.currentDate);
      this.show = false;
    },
    cancelFn() {
      this.show = true;
    },
    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      // return year + "年" + month + "月" + day + "日";
      return year + "-" + month + "-" + day;
    },
    onConfirm(value) {
      this.TypeValue = value;
      this.showPicker = false;
    },

    //图片上传相关
    beforeRead(file) {
       console.log(this.fileList)
      if (this.fileList.findIndex(it => it.localName == file.name) > -1) {
        this.$toast("图片[" + file.name + "]已经上传过，不用重复上传");
        return false;
      }
      return true;
    },

    onRead(file) {
      console.log(file)
      let formData = new FormData();
     
        formData.append("importFile", file.file);
        formData.append('name','前院大门1号楼大门口')
        formData.append('deviceId',11)
        formData.append('startTime','2019-12-31 11:23:32')
        formData.append('stopTime','2019-12-31 12:23:32')
        formData.append('groupId',1)

        // file.localName = new Date().getTime() + file.file.name;
        
        console.log(formData)
      
      // console.log('file.content'+file.content)
      
      
      this.$ImgUpoad(formData).then(res => {
       console.log(1111)
        
         console.log(res.data.code);
        if (res.data.code == 200) {
          file.remote_url = res.data.body.filePath;
          console.log(this.fileList[0].remote_url)
        } else {
          this.$toast(res.error);
        }
      });
    },
    // 上报故障
    sendFault() {

      /* if (!this.timeValue) return this.$toast("请选择上报日期！");
      if (!this.TypeValue) return this.$toast("请选择上报类型！");
      if (!this.fileList.length) return this.$toast("请选择上传图片！");
      if (this.msg.length == 0) return this.$toast("请填写上报内容！");
      if (this.fileList.length == 0) return this.$toast("请上传电池包图片");
       if(!this.VinValue.length  ) return this.$toast("请填写电池编码"); */

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

     console.log(this.fileList[0].remote_url)

      // 获取图片
      let para_fileName = "";
      let para_url = "";
      this.fileList.forEach(element => {
        para_url += element.remote_url + "#";
        para_fileName += element.localName + "#";
      });
      para_url = para_url.substring(0, para_url.length - 1);
      para_fileName = para_fileName.substring(0, para_fileName.length - 1);

      var storage = window.sessionStorage;
      let user = sessionStorage.getItem("userName");
      // sessionStorage.getItem("userId");
      
       

      let reportType = this.columns.findIndex((item, index) => {
        return item === this.TypeValue;
      });

      let params = {
        reportTime: this.timeValue,
        reportDescribe: this.msg,
        reportState: 1,
        reportType: reportType + 1 ,
        filePath: para_url,
        reportUserid :sessionStorage.getItem("userId") ,
        fileName: para_fileName,
        vin: this.VinValue
      };

      this.$post("failureAssign", params).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$toast({
            message: "上报成功",
            duration: "1500"
          });
          setTimeout(() => {
            this.$router.go(-1); //返回上一层
            // this.$router.push("/FailureReportingManage");
          }, 1500);
        } else {
          return this.$toast("系统忙，请稍后再试！");
        }
      });
    }
  },
  mounted() {
    this.timeFormat(new Date());
  }
};
</script>  

<style lang="less" scoped>
.van-nav-bar {
  background: #24bb9b;
}
.vin_type{
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
    line-height: 0.37rem;
    padding: 0 0.1rem 0 0.12rem;
  }
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
    line-height: 0.37rem;
    padding: 0 0.1rem 0 0.12rem;
    /deep/.van-field__body {
      width: 100%;
      /deep/input.van-field__control {
        width: 100%;
      }
    }
  }
}
/deep/.van-field__label--left {
  width: 0.7rem;
  margin-right: 0.06rem;
}
.van-nav-bar .van-icon {
  color: white;
}
.van-nav-bar__title {
  color: white;
  font-size: 0.19rem;
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
    // right: 0.19rem;
    line-height: 0.44rem;
    
  }
}
</style>