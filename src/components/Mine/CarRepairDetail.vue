<template>

<div>
   
 <van-nav-bar
  title="维修详情"
  @click-left="onClickLeft"  
  :border='false'
>
<div slot="left" style="width:0.3rem;height:0.44rem;">
<van-image :src='image'   style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
</div>
</van-nav-bar>

 
 
 <van-cell-group :border="false">
  <van-cell title="商标："  value="东风牌"  />
   <van-cell title="车辆识别号"   value="：LFV2A21K363553763" />
   <van-cell title="制造日期"   value="2019.10.01"/>
   <van-cell title="维修日期"   value="2019.10.01" />
   <van-cell title="维修内容："     />
</van-cell-group>
 
   
    <van-field
    v-model="message"
  
    rows="5"
    type="textarea"
   
    placeholder="请输入维修内容"
    show-word-limit
    style="border:0.01rem solid white ;width:3.2rem;margin-left:0.18rem;border-radius:2px;background:rgba(229,229,229,1)"
  />

  <div style="margin-left:0.15rem;margin-top:0.2rem;margin-bottom:0.2rem;">维修建议：</div>

   <van-field
    v-model="message"
  
    rows="5"
    type="textarea"
   
    placeholder="请输入维修建议"
    show-word-limit
    style="border:0.01rem solid white ;width:3.2rem;margin-left:0.18rem;border-radius:2px;background:rgba(229,229,229,1)"
  />


  

 


</div>
   
 
</template>

<script>
export default {
  name: 'CarRepairDetail',
  
  data () {
    return {
      message:'',
      image:require('../../assets/ic_back_white.png')
     
    }
  },
  
  methods:{
       onClickLeft(){
           this.$router.go(-1);//返回上一层
      },
      
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
</style>
