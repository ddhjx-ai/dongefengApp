<template>

<div>
   
 <van-nav-bar
  title="标识码注册"
  @click-left="onClickLeft"  
  :border='false'
>
<div slot="left" style="width:0.3rem;height:0.44rem;">
<van-image :src='image'   style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
</div>
</van-nav-bar>


 <div style="width:100%;height:0.61rem;background:#24BB9B;display:flex;flex-direction:row;align-items:center;">
   <div class='inputView'>
   <input   class="input" placeholder='请输入或扫描VIN码'  />
    </div>
  <img :src="scanImg" style="width: 0.23rem;margin-left: -30px" @click="onClickLeft"/>
  <div class="cancleBtn">取消</div>

 </div>
  
 

 
 <div style="background:white;margin-left:0.05rem;padding:0.1rem;font-family: PingFangSC-Medium;font-size: 14px;color: #333333;" >本月<span style="margin-left:2.5rem;color:#888888 ;font-size:12px;">注册量：5</span></div>

<!-- 居中 -->
<!-- <div v-for="item in 6" :key = 'item' style="margin-top:0.2rem">
<van-row type="flex" justify="space-around"  >
  <van-col span="10">LFV219DK32939234</van-col>
  <van-col span="10">LFV219DK32939234</van-col>
</van-row>
</div> -->

 
  <van-cell title='88.1000.1.0'    is-link  :border='false'  v-for="item   in 6" :key="item" @click="cellClick(index)" />

 
 



</div>
   
 
</template>

<script>
export default {
  name: 'CodeRes',
  
  data () {
    return {
      message:'' ,
     image:require('../../assets/ic_back_white.png'),
     scanImg:require('../../assets/mine_scan.png')
    }
  },
  
  methods:{
       onClickLeft(){
           this.$router.go(-1);//返回上一层
      },
cellClick(index){

     this.$router.push({
            path:'/BatteryDetail'    
          })
 
}
      
      
  } ,
    // beforeRouteLeave(to, from, next) {
    //      // 设置下一个路由的 meta
    //      console.log('123455x')
    //     // to.meta.keepAlive = true;  // B 跳转到 A 时，让 A 缓存，即不刷新
    //     // next();
    // }
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
 
.van-cell__value{
  color: #333333 ;
}

.inputView{
  background: #27C6A5;
   border-radius: 0.36rem;
  width: 2.94rem ;
  height:0.36rem ;
  border: 1px solid white ;
  margin-left: 0.19rem ;
}
 .input{
   margin-left: 0.2rem ;
   width: 1.5rem ;
   height:0.15rem ;
   margin-top:0.1rem ;
  background: #27C6A5;
  border: none ;
 }

::-webkit-input-placeholder {
 
color: white;
}
.cancleBtn{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 0.3rem;
    width: 0.8rem;
    height: 0.3rem;
    /* margin-left: 0.5rem; */
    position: absolute;
    right: 0.10rem;
    text-align: right;
}
/* :-moz-placeholder {
 
color: red;
}
::-moz-placeholder {
 
color: red;
}
:-ms-input-placeholder {
 
color: red;
} */


.van-col {
    float: left;
    box-sizing: border-box;
    min-height: 1px;
    background:  #F5F8F8;
    text-align: center;
    height:0.3rem;
    line-height: 0.3rem ;
    }
</style>

