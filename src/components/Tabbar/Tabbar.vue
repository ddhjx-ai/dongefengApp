<template>

<div>

  
 <HomePage  v-if="active==0" />
 
 <Workspace  v-show="active==1" />
 <Mine  v-show="active==2" />

<van-tabbar v-model="active"   @change='change' :safe-area-inset-bottom='true' inactive-color="#9A9A9A"  active-color="#07c160">
  <van-tabbar-item  >
           <img
      slot="icon"
      :src="(active==0)?imageList[0].sel:imageList[0].nor"
      mode="aspectFit"
    />
    
首页</van-tabbar-item>
  <van-tabbar-item  >
         <img
      slot="icon"
      :src="(active==1)?imageList[1].sel:imageList[1].nor"
      mode="aspectFit"
    />
工作台</van-tabbar-item>
  <van-tabbar-item  >
       <img
      slot="icon"
      :src="(active==2)?imageList[2].sel:imageList[2].nor"
      mode="aspectFit"
    />
个人中心
</van-tabbar-item>
</van-tabbar>
</div>

</template>



<script>


import HomePage from '@/components/Home/HomePage'
import Workspace from '@/components/Workspace/Workspace'
import Mine from '@/components/Mine/Mine'
 
export default {
   components:{
     HomePage,
     Workspace ,  
     Mine
    } ,
  name: 'Tabbar',
  
  data () {
    return {
     
      active: 0 ,
      imageList:[{nor:require('../../assets/tab_icon4.png'),
     sel:require('../../assets/tab_icon1.png')},{nor:require('../../assets/tab_icon5.png'),
     sel:require('../../assets/tab_icon2.png')},{nor:require('../../assets/tab_icon6.png'),
     sel:require('../../assets/tab_icon3.png')},],
     
    }
  },
   activated(){
    console.log('activated1')
  },
  mounted: function () {
       this.active =  this.$router.history.current.meta.active 
       if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.fun, false);    //false阻止默认事件    this.fun是指返回按建实际要执行的方法
          }
    },
    
   
  methods:{
       change(){
         this.$router.history.current.meta.active = this.active
         console.log(this.active)
       }
  }
}

</script>

<style scoped>
 
 
</style>
