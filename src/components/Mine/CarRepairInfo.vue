<template>

<div>
   
 <van-nav-bar
  title="车辆维保数据"
  @click-left="onClickLeft"  
  :border='false'
>
<div slot="left" style="width:0.3rem;height:0.44rem;">
<van-image :src='image'   style="margin-top: 0.1rem; width:0.20rem; height:0.20rem ;" />
</div>
</van-nav-bar>
 

 <div class="container_view">
  <div style="width:50%;text-align:center;" >维修内容</div>
  <div style="width:30%;text-align:center">维修时间</div>
 </div>

<!-- :class="setClass(index)" -->
 <div  v-for="index in 6" :key="index" >
 <div   @click="itemClick" :class="setClass(index)">
  <div style="width:50%;text-align:center;">车辆5000公里保养</div>
  <div style="width:30%;text-align:center">2019-10-10</div>
  <img :src='rightImg' style="width:0.32rem;height:0.32rem" />
 </div>
 </div>

  

 


</div>
   
 
</template>

<script>
export default {
  name: 'CarRepairInfo',
  
  data () {
    return {
      message:'',
      image:require('../../assets/ic_back_white.png'),
      rightImg:require('../../assets/car_right_arrow.png')
     
     
    }
  },
  
  methods:{
       onClickLeft(){
           this.$router.go(-1);//返回上一层
      },
      setClass(index){
        return 'container_view_noborder' + index%2 ;
      } ,
      itemClick(){
         this.$router.push({
            path:'/CarRepairDetail'    
          })
      }
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .van-nav-bar{
  background:#24BB9B ; 
}
.van-nav-bar .van-icon {
    color: white;
    
}
.van-nav-bar__title {
    font-size: 0.19rem;
    color: white;
   
}
 
.container_view{
    display: flex;
    flex-direction: row ;
    align-items: center ;
    justify-content: center ;
    width: 100% ;
    height: 0.54rem ;
    border-bottom: 1px solid #E3E3E3 ;
}  
.container_view_noborder0{
  display: flex;
    flex-direction: row ;
    align-items: center ;
    justify-content: center ;
    width: 100% ;
    height: 0.50rem ;
    border-bottom: 1px solid #E3E3E3 ;
  border: none ;
   background: #F9F9F9;
  
}
.container_view_noborder1{
    display: flex;
    flex-direction: row ;
    align-items: center ;
    justify-content: center ;
    width: 100% ;
    height: 0.50rem ;
    border-bottom: 1px solid #E3E3E3 ;
    border: none ;
    background: white ;
}

</style>
