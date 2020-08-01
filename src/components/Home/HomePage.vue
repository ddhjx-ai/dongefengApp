<template>
  <div style="min-height:100vh">
    <van-swipe class="goods-swipe" :autoplay="3000" style="height:1.75rem">
      <van-swipe-item v-for="thumb in thumbs" :key="thumb.announcementName">
        <img
          @click="bannerClick(thumb)"
          :src=" '/static/uploads/' + thumb.announcementUrl "
          class="image"
          width="100%"
        />
      </van-swipe-item>
    </van-swipe>

    <div
      style="background:#F8F8F9;margin-top:0.2rem;border-radius:4px;width:3.42rem;height:0.3rem;margin-left:0.16rem ;display:flex;flex-direction:row;align-items:center"
    >
     
      <img :src="image" style="width:0.62rem;height:0.18rem;" />

      <van-notice-bar v-if="newsArr.length">
        <span
          class="news_text"
          v-for="(item,index) in newsArr"
          :key="index"
          @click="news_info(item.id)"
        >{{item.announcementName+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}}</span>
      </van-notice-bar>

      <div
        style="font-family: PingFangSC-Light;font-size:12px;color: #666666;line-height: 12px;width: 0.5rem;"
        @click="moreBtnClick"
      >| 更多</div>
    </div>

    <van-grid :column-num="4" :border="false" :clickable="true" square>
      <van-grid-item
        v-for="(item ,index) in dataList"
        :key="index"
        :text="item.text"
        @click="clickItem(item.type)"
      >
        <van-image slot="icon" width="0.32rem" height="0.32rem" :src="item.img" />
      </van-grid-item>
    </van-grid>

    <h3 style="margin-left:0.12rem;font-size:18px">活动</h3>

    <van-swipe :loop="false" :show-indicators="false" style="margin-top:0.2rem; width:3.75rem">
      <van-swipe-item v-for="thumb in thumbs1" :key="thumb">
        <img
          :src="thumb"
          style="width:3.5rem;height:1.5rem;margin-left:0.165rem"
          @click="actImgClick"
        />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "HomePage",

  data() {
    return {
      message: "",
      dataList: [
       
      ],
      image: require("../../assets/home_df_news.png"),
      thumbs: [],
      newsArr: [],
      thumbs1: [require("../../assets/home_act1.png")]
    };
  },
  activated() {
    console.log("activated");
    
    
  },
  mounted() {

    let roleType =  sessionStorage.getItem("roleId")
    if(roleType == 1){
      this.dataList =  [
        { img: require("../../assets/homepage_item1.png"), text: "标识查询" ,type:0 },
        { img: require("../../assets/homepage_item4.png"), text: "故障上报",type:1 },
       
        { img: require("../../assets/homepage_item5.png"), text: "维修委派" ,type:3},
          { img: require("../../assets/repair_m.png"), text: "维修处理" ,type:8},
           {
          img: require("../../assets/homepage_item3.png"),
          text: "故障上报管理",type:2
        },
        { img: require("../../assets/homepage_item6.png"), text: "回收发起" ,type:4},
        { img: require("../../assets/homepage_item7.png"), text: "回收评测" ,type:5},
        { img: require("../../assets/homepage_item8.png"), text: "回收查询",type:6 },
        { img: require("../../assets/homepage_item10.png"), text: "消息通知" ,type:7}
      ]
    }else if(roleType == 2){

       this.dataList =  [
        { img: require("../../assets/homepage_item1.png"), text: "标识查询" ,type:0 },
        { img: require("../../assets/homepage_item4.png"), text: "故障上报",type:1 },
        {
          img: require("../../assets/homepage_item3.png"),
          text: "故障上报管理",type:2
        }
       
      ]

    }else if(roleType == 3){
       this.dataList =  [
        { img: require("../../assets/homepage_item1.png"), text: "标识查询" ,type:0 },
         { img: require("../../assets/homepage_item5.png"), text: "维修委派" ,type:3} ,
       
        {
          img: require("../../assets/homepage_item3.png"),
          text: "故障上报管理",type:2
        },
       
         { img: require("../../assets/homepage_item10.png"), text: "消息通知" ,type:7}
         
      ]
      
    }else if(roleType == 4){
       this.dataList =  [
        { img: require("../../assets/homepage_item1.png"), text: "标识查询" ,type:0 },
        { img: require("../../assets/repair_m.png"), text: "维修处理" ,type:8},
        
        {
          img: require("../../assets/homepage_item3.png"),
          text: "故障上报管理",type:2
        },
       
          
      
      ]
      
    }else if(roleType == 5){
       this.dataList =  [
        { img: require("../../assets/homepage_item1.png"), text: "标识查询" ,type:0 },
        
        { img: require("../../assets/homepage_item6.png"), text: "回收发起" ,type:4},
        
        { img: require("../../assets/homepage_item8.png"), text: "回收查询",type:6 },
        { img: require("../../assets/homepage_item10.png"), text: "消息通知" ,type:7}
      ]
      
    }else if(roleType == 6){
       this.dataList =  [
        { img: require("../../assets/homepage_item1.png"), text: "标识查询" ,type:0 },
        { img: require("../../assets/homepage_item7.png"), text: "回收评测" ,type:5},
        { img: require("../../assets/homepage_item8.png"), text: "回收查询",type:6 },
        { img: require("../../assets/homepage_item10.png"), text: "消息通知" ,type:7}
      ]
      
    }else if(roleType == 7){
       this.dataList =  [
        { img: require("../../assets/homepage_item1.png"), text: "标识查询" ,type:0 },
        
        { img: require("../../assets/homepage_item10.png"), text: "消息通知" ,type:7}
      ]
      
    }else if(roleType == 8){
       this.dataList =  [
        { img: require("../../assets/homepage_item1.png"), text: "标识查询" ,type:0 },
      
        { img: require("../../assets/homepage_item10.png"), text: "消息通知" ,type:7}
      ]
      
    } 

    let parmas;
    this.$post("getAnnouncement", parmas).then(res => {
      this.thumbs = res.body.filter(item => item.announcementType == 2);
      this.newsArr = res.body.filter(item => item.announcementType == 1);

      console.log(this.newsArr)
    });
  },
  methods: {
    // clickItem() {
    //   console.log(this.$name);
    //   this.$router.push({
    //     path: "/MessageList"
    //   });
    // },
    clickItem(index) {
      console.log(index);
      switch (index) {
        case 0:
         
           this.$router.push({
            path: "/BatteryCodeSearch"
          });
          break;
          
       
        case 1:
          this.$router.push({
            path: "/FailureAssign"
          });
          break;
        case 2:
          this.$router.push({
            path: "/FailureReportingManage"
          });

          break;
        case 3:
          this.$router.push({
            path: "/RepairManager"
          });
          break;
        case 4:
          this.$router.push({
            path: "/RecycleLanch"
          });
          break;
        case 5:
          this.$router.push({
            path: "/RecoveryEvaluationManage"
          });
          break;
        case 6:
          this.$router.push({
            path: "/RecycleList"
          });
          break;
        case 7:
          this.$router.push({
            path: "/MessageList"
          });
          break;
        case 8:
          this.$router.push({
            path: "/repairResult"
          });
          break;
        case 9:
          this.$router.push({
            path: "/RecoveryEvaluationManage"
          });
          break;

        default:
          break;
      }
    },
    bannerClick(item) {
      this.$router.push({
        path: "/newsInfoDetail",
        query: { id: item.id }
      });
    },
    moreBtnClick() {
      this.$router.push({
        path: "/newsDetail"
      });
    },
    actImgClick() {
      this.$toast("活动正在组建，敬请期待！");
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
<style scoped>
.van-notice-bar {
  width: 2.85rem;
  height: 0.18rem;
  background: none;
  color: rgba(80, 80, 80, 1);
  margin-left: -0.1rem;
}

.image {
  width: 100%;
  display: block;
  height: 1.8rem;
}
</style>
