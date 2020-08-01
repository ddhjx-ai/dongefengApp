<template>
  <div>
    <van-nav-bar title="遇到问题" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <van-cell-group>
      <van-cell is-link @click="showPopup(0)">忘记密码，如何找回密码?</van-cell>
      <van-cell is-link @click="showPopup(1)">如何委派维修任务?</van-cell>
      <van-cell is-link @click="showPopup(2)">如何进行电池故障上报?</van-cell>
      <van-cell is-link @click="showPopup(3)">如何进行电池回收评测?</van-cell>
      <van-cell is-link @click="showPopup(4)">如何进行电池回收发起?</van-cell>
      <van-cell is-link @click="showPopup(5)">如何查询车辆维修保养记录?</van-cell>
      <van-cell is-link @click="showPopup(6)">如何进行车辆绑定（VIN码绑定）?</van-cell>

      <van-popup
        v-model="flag"
        closeable
        close-icon-position="top-left"
        :close-icon="image"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <div class="q_detil">
          <van-image :src="Qimg" style="width=100%" />
        </div>
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "Questions",
  data() {
    return {
      msg: 666,
      username: "",
      password: "",
      image: require("../../assets/ic_back_black.png"),
      img1: require("../../assets/login_word.png"),
      
      imgList:[
        {Qimg: require("../../assets/questionsImg/01.png")},//忘记密码，如何找回密码
        {Qimg: require("../../assets/questionsImg/02.png")},//如何委派维修任务
        {Qimg: require("../../assets/questionsImg/03.png")},//如何进行电池故障上报
        {Qimg: require("../../assets/questionsImg/04.png")},//如何进行电池回收评测
        {Qimg: require("../../assets/questionsImg/05.png")},//如何进行电池回收发起
        {Qimg: require("../../assets/questionsImg/06.png")},//如何查询车辆维修保养记录
        {Qimg: require("../../assets/questionsImg/07.png")},//如何进行车辆绑定（VIN码绑定）
      ],

      flag:false,
      Qimg:''
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    showPopup(i) {
      this.flag = true;
      this.Qimg=this.imgList[i].Qimg;
    }

  }
};
</script>

<style scope>
.q_detil {
  padding: 0.1rem 0;
}

.q_detil img {
  margin-top: 0.1rem;
}
.van-nav-bar__title {
  max-width: 60%;
  margin: 0 auto;
  font-weight: 500;
  font-size: 0.19rem;
  color: #2e2e2e;
}

.van-cell {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 28px;
  background-color: #fff;
}

.van-cell:last-child::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.van-popup__close-icon {
    width: 0.4rem;
    height: 0.4rem;
    position: fixed;
    z-index: 1;
    color: #969799;
    font-size: 18px;
    top: 50%;
    margin-top: -0.2rem;
    background: #eee;
    border-radius: 50%;
    text-align: center;
}
.van-popup__close-icon img{
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -0.15rem;
    margin-top: -0.05rem;
}
.q_detil .van-image__error, .van-image__img, .van-image__loading {
    display: block;
    width: 100%;
    height: auto;
}
</style>