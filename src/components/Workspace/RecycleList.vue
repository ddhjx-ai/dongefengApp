
<template>
  <div>
    <van-nav-bar title="回收管理" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <div class="subtitle">
      指定搜索范围
      <van-divider></van-divider>
    </div>
    <van-cell-group :border="false">
      <div class="btnFilterGroup">
        <van-button
          round
          type="default"
          :class="recyclingState==1?'btnFilterActive':'btnFilterdefault'"
          @click="listfilter(1)"
        >已发起</van-button>
        <van-button
          round
          type="default"
          :class="recyclingState==2?'btnFilterActive':'btnFilterdefault'"
          @click="listfilter(2)"
        >已评测</van-button>
      </div>
    </van-cell-group>

    <van-divider class="divider_10" style="margin:0;"></van-divider>

  <van-list v-model="loading" :finished="finished"  @load="onLoad">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-row
      :class="item.recyclingState==1?'van-row_default':'van-row_active'"
      v-for="(item,index) in recyclingList"
      :key="index"
      @click="itemClick(item)"
    >
      <van-col span="18">{{item.batteryPackcode}}</van-col>
      <van-col span="6" style="height:0.55rem;display:flex;align-items: center;">
        <span
          :class="item.recyclingState==1?'span_not':'span_ok'"
        >{{getItemStatusString(item.recyclingState)}}</span>
      </van-col>
    </van-row>
  </van-pull-refresh>
    </van-list>
     <div
      style="display:flex;  display: flex ;flex-direction: column ;align-items: center ;justify-content: center ;margin-top:10vh"
      v-if="!recyclingList.length"
    >
      <van-image width="2.2rem" height="1.1rem" :src="nodataImage" />
      <span style="color:#888 ; font-size:13px;margin-top:0.2rem">暂无数据</span>
    </div>

  </div>
</template>

<script>
export default {
  name: "RecycleList",
  data() {
    return {
      recyclingState: 1,
      recyclingList: [],
       nodataImage: require("../../assets/nodata.png"),
      message: "",
      image: require("../../assets/ic_back_white.png"),
      scanImg: require("../../assets/mine_scan.png") ,

      isLoading: false,
      pageNum: 1,
      loading: false,
      finished: false,
      hasGet: false
    };
  },
  mounted() {
   this.getData(this.recyclingState, this.pageNum);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
     //获取列表数据
    getData(recyclingState, pageNum) {
      if (!this.hasGet) {
        this.pageNum = pageNum
        this.hasGet = true;
        var parmas = {
          recyclingState: recyclingState,
          pageNum: pageNum,
          pageSize: 10
        };
        let list = [];
        this.$post("recyclingList", parmas).then(res => {
          if (res.code == 200) {
            if (this.pageNum == 1) {
              list = res.body.list;
            }else{
              list = this.recyclingList.concat(res.body.list)
            }
            this.loading = false
            this.hasGet = false;
          }else{
            this.$toast('服务器忙，请稍后再试！')
          }

          if (res.body.list.length < 10) {
            this.finished = true;
          }
          this.recyclingList = list
        });
      } else {
        return;
      }
    },
     listfilter(index) {
      this.recyclingState = index;
      this.pageNum = 1;
      this.finished = false;
      this.loading = false;
      this.getData(this.recyclingState, this.pageNum);
    },
    //获取状态显示自符串
    getItemStatusString(recyclingState) {
      return recyclingState == 1 ? "已发起" : "已评测";
    },
    // 下拉刷新-------------------------
    onRefresh(){
      this.pageNum = 1;
      this.finished = false;
      this.getData(this.recyclingState, this.pageNum);
      this.loading = false;
    },
    // 上拉加载-----------------------------
    onLoad(){
      this.getData(this.recyclingState, this.pageNum + 1)
    },
    //打开回收详情
    itemClick(item) {
      this.$router.push({
        path: "/RecycleDetail",
        query: { id: item.id }
      });
    }
  }
};
</script>

<style lang="less" scoped>
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
.van-row {
  font-size: 0.14rem;
}
.van-divider {
   margin: 0;
    height: 0.1rem;
    background: #ebedf0;
}

.subtitle {
  padding: 0 0.19rem;
  color: #666666;
  font-size: 0.13rem;
}
.van-row_default {
  height: 0.55rem;
  padding-left: 0.19rem;
  line-height: 0.55rem;
  font-family: PingFangSC-Regular;
  color: #4a4a4a;
  .span_not {
    display: inline-block;
    line-height: 0.22rem;
    text-align: center;
    background: rgba(240, 117, 70, 0.1);
    border-radius: 0.02rem;
    font-size: 0.13rem;
    width: 0.56rem;
    height: 0.22rem;
    color: #f07546;
  }
}
.van-cell-group {
  margin-bottom: 0.1rem;
  .btnFilterGroup {
    padding: 0.1rem 0 0 0.19rem;
    .btnFilterActive {
      width: 0.81rem;
      height: 0.29rem;
      line-height: 0.29rem;
      text-align: center;
      padding: 0;
    }
    .van-button--normal {
      margin-right: 0.12rem;
    }
    .btnFilterdefault {
      height: 0.29rem;
      width: 0.7rem;
      padding: 0;
    }
  }
}
.btnFilterGroup .btnFilterActive .van-button__text,
.btnFilterGroup .btnFilterdefault .van-button__text {
  justify-content: center;
}

.van-row_active {
  background: #f9f9f9;
  height: 0.55rem;
  padding-left: 0.19rem;
  line-height: 0.55rem;
  font-family: PingFangSC-Regular;
  color: #4a4a4a;
  .span_ok {
    font-size: 0.13rem;
    width: 0.56rem;
    height: 0.22rem;
    line-height: 0.22rem;
    display: inline-block;
    background: #e3f2ef;
    border-radius: 0.02rem;
    background-color: rgba(36, 187, 155, 0.1);
    color: #24bb9b;
    font-size: 0.13rem;
    text-align: center;
  }
}
</style>