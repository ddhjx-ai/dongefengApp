<template>
  <div>
    <van-nav-bar title="新闻列表" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>


    <div>
      <van-panel @click="news_info(item.id)" v-for='(item,index) in newsList' :key="index" :title="item.announcementName"   style="font-weight:bold;height:0.75rem">
        <div style="text-indent: 0.15rem;font-weight:100;height:0.2rem;overflow:hidden;">{{item.announcementContent }}</div> 
        <van-divider></van-divider>
      </van-panel>
    </div>
  </div>
</template>

<script>
export default {
  name: "newsDetail",

  data() {
    return {
      image: require("../../assets/ic_back_white.png"),
      id:'',
      type:'',
      newsList:[]
    };
  },
  mounted: function() {
    this.$post("getAnnouncement").then(res => {
      this.newsList = res.body
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },

    // 点击头条跳转对应的新闻内容
    news_info(id){
      this.$router.push({
        path: "/newsInfoDetail",
        query: { id: id }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
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

.van-button--large {
  margin-left: 0.15rem;
  margin-top: 0.3rem;
  width: 3.45rem;
  height: 0.4rem;
  line-height: 0.4rem;
  background: #24bb9b;
}
 
.van-cell:not(:last-child)::after{
  border-bottom: 0;
}
</style>
