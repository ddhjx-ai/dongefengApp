<template>
  <div style=" height: 100vh;">
    <van-nav-bar title="工作台" />

    <van-grid :column-num="3" :border="false" :clickable="true" square>
      <van-grid-item
        v-for="(item ,index ) in dataList"
        :key="index"
        :text="item.text"
        @click="clickItem(item.type)"
      >
        <van-image slot="icon" width="0.32rem" height="0.32rem" :src="item.img" />
      </van-grid-item>
    </van-grid>
 
    
  </div>
  
</template>

<script>
export default {
  name: "Workspace",

  data() {
    return {
      message: "",
      
      dataList: []
    };
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

    
  },
  methods: {
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

   
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image {
  width: 100%;
  display: block;
  height: 1.8rem;
}

 
 

</style>

