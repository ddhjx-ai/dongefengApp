<template>

<div>
   
 <van-nav-bar
  title="标识详情"
  @click-left="onClickLeft"  
  :border='false'
>
<div slot="left" style="width:0.3rem;height:0.44rem;">
<van-image :src='image'   style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
</div>
</van-nav-bar>
  
 <van-cell-group>
    <van-cell title="标识前缀"  value="88.100.1.0" />
   <van-cell title="注册日期"   value="2019-10-12"/>
   <van-cell title="注册人"  value="张三" />
  <van-cell title="电池厂商"  value="东风时代" />
   <van-cell title="产品类型"   value="新能源电池"/>
   <van-cell title="生产日期"  value="2019.09.01" />
   <van-cell title="电池类型"  value="锂电池" />
   <van-cell title="电池规格"   value="12-98V"/>
    
</van-cell-group>
  

 


</div>
   
 
</template>

<script>
export default {
  name: 'BatteryDetail',
  
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
   
    color: white;
   
}
</style>
