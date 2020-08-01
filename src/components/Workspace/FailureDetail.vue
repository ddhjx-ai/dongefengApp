//      ----------------------------
<template>
  <div id="assign">
    <van-nav-bar title="维修详情" @click-left="onClickLeft" :border="false">
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
        readonly
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
        class="send_type"
      />

         <van-field
        v-model="data.vin"
        readonly
        label="原电池编码:"
        label-align="left"
        placeholder="请输入电池编码"
        
        class="vin_type"
      />
 
        <van-field
        v-model="data.type"
        label="维修类型:"
        label-align="left"
       readonly
        class="send_type"
      />

      <van-field
        v-model="data.originalPackCode"
        label="现电池编码:"
        label-align="left"
        placeholder="未填写电池编码"
        readonly
        class="vin_type"
      />


 
      <span class="subtitle" >维修内容描述:</span>
      <van-field
        v-model="result"
        rows="5"
        type="textarea"
        maxlength="500"
        placeholder="请输入上报内容"
        show-word-limit
        class="miltextarea"
        readonly
      />

    </van-cell-group>
    <div style="height:0.7rem;"></div>
  </div>
</template>


<script>
// import func from '../../../../../vue项目/vue-temp/vue-editor-bridge';
export default {
  name: "FailureDetail",
  data() {
    return {
      msg: '',
      result:'',
      TypeValue:'',
      appointer:'',
      data: this.$route.params.data,
      image: require("../../assets/ic_back_white.png"),
      fileList: [],
      columns:["电池损坏", "更换电池", "汽车4S店" ],
      items: [],
    };
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },

    renderData() {
      this.timeValue = this.data.reportTime;
      this.msg = this.data.reportDescribe;
      this.result = this.data.repairDes
      this.columns.forEach((item, i) => {
        if ((this.data.reportType -1) == i) {
          this.TypeValue = item;
        }
      });
      this.appointer = this.data.repairName; //委派人
      this.result = this.data.repairDes ? this.data.repairDes : '暂无描述信息'
      
      if (this.data.filePath.length) {
        var arr = this.data.filePath.split("#");
        for ( var i = 0; i < arr.length; i++) {
          var dic = {
            url: "/static/uploads/" + arr[i]
          };
          this.fileList.push(dic);
        }
      }
    }
   
  },
  created() {
    console.log(this.$route.params)
    this.renderData();
  },
  mounted() {
    // this.timeFormat(new Date());
    // this.reportState = this.$route.params.data.reportState
    // console.log(this.reportState)
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
  color: #666;
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