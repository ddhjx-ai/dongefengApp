<template>
  <div >
   <van-nav-bar title="投诉与建议" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <div style="height:0.44rem;margin-top:0.2rem">
      <van-field
        v-model="title"
        rows="1"
        label="标题："
        type="textarea"
        maxlength="30"
        placeholder="请输入标题 (最多30个字) "
      />
    </div>
    <van-field
      v-model="message"
      rows="5"
      type="textarea"
      maxlength="500"
      placeholder="请输入投诉或建议内容"
      show-word-limit
      style="border:0.01rem solid rgba(229,229,229,1) ;width:3.2rem;margin-left:0.18rem;margin-top:0.2rem; border-radius:2px;"
    />

    <h3 class="h3divider two">
      选择图片 
      <span style="font-family: PingFangSC-Light;font-size: 0.12rem;font-weight: 200;">(支持jpg,gif,png,请勿上传超过2MB的图片)</span>
    </h3>
    <div class="uploadcontainer">
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="3"
        :before-read="beforeRead"
        :after-read="onRead"
        :accept="'image/*'"
      />
    </div>

    <van-button type="danger" color="#24BB9B" size="large" @click="submitBtnClick">提交</van-button>
  </div>
</template>

<script>
export default {
  name: "Ajust",

  data() {
    return {
      title: "",
      message: "",
      fileList: [],
      image: require("../../assets/ic_back_white.png")
    };
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
        
        if (res.data.code == 200) {
          file.remote_url = res.data.body.filePath;
        } else {
          this.$toast(res.code);
        }
      });
    },

    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    submitBtnClick() {
      if (!this.title.length) {
        this.$toast("标题不能为空");
        return;
      }
      if (!this.message.length) {
        this.$toast("内容不能为空");
        return;
      }
       if (!this.fileList.length) {
        this.$toast("图片不能为空");
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

      

      var parmas = {
        title: this.title,
        inputUser: sessionStorage.getItem("userName"),
        content: this.message ,
         fileName: para_fileName,
        url: para_url
      };

      this.$post("addComplaintsSuggestion", parmas).then(res => {
        console.log(res);
        this.$toast(res.error);
        if (res.code == 200) {
          this.$router.go(-1); //返回上一层
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.van-nav-bar .van-icon {
  color: white;
}
.van-nav-bar__title {
  color: white;
  font-size: 0.19rem;
}
.van-nav-bar {
  background: #24bb9b;
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
  margin-top:20px ;
  
}

.uploadcontainer {
  padding: 0.16rem 0.19rem;
}
.van-button--large {
  margin-left: 0.15rem;
  margin-top: 0.3rem;
  width: 3.45rem;
  height: 0.4rem;
  line-height: 0.4rem;
  background: #24bb9b;
}
</style>
