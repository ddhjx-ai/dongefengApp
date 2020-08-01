
<template>
  <div id="failureManage">
    <van-nav-bar title="故障上报管理" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <van-cell-group>
      <span class="subtitle">指定搜索范围</span>
      <div class="btnFilterGroup">
        <van-button
          round
          type="default"
          :class="classFlag == index?'btnFilterActive':'btnFilterdefault'"
          v-for="(item,index) in subtitles"
          :key="index"
          @click="getCateList(index)"
        >{{ item }}</van-button>
      </div>
    </van-cell-group>

    <van-divider></van-divider>

    <van-list
      v-model="loading"
      :finished="finished"
      style="min-height:80vh"
       v-if="cateList.length"
      @load="onLoad"
    >
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-row v-for="item in cateList" :key=" item.id ">
          <van-col span="8">{{columns[item.reportType -1] }}</van-col>
          <van-col span="8">{{ item.reportTime }}</van-col>
          <van-col
            span="8"
            style="height:0.55rem;display:flex;align-items: center;justify-content: center;"
          >
            <span class="reported r-botton" v-if="item.reportState == 1">未委派</span>
            <span class="appointed r-botton" v-else-if="item.reportState == 2">已委派</span>
            <span class="unreport r-botton" v-else>已维修</span>
          </van-col>
        </van-row>
      </van-pull-refresh>
    </van-list>
    <div style="display:flex;  display: flex ;flex-direction: column ;align-items: center ;justify-content: center ;margin-top:10vh" v-if="!cateList.length">
      <van-image width="2.2rem" height="1.1rem" :src="nodataImage" />
      <span style="color:#888 ; font-size:13px;margin-top:0.2rem">暂无数据</span>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "FailureReportingManage",
  data() {
    return {
      message: "",
      image: require("../../assets/ic_back_white.png"),
      scanImg: require("../../assets/mine_scan.png"),
      nodataImage: require("../../assets/nodata.png"),
      failureInfo: [], //总数据
      cateList: [], //分类数据
      columns: ["电池损坏", "更换电池", "汽车4S店"],
      subtitles: ["全部", "未委派", "已委派", "已维修"], //子标题
      classFlag: 0, //active的判断标志
      // -----------下拉刷新相关数据------------
      pageNum: 1,
      reportState: 0,
      isLoading: false,
      finished: false,
      loading: false,
      flag: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    // 下拉刷新
    onRefresh() {
      this.pageNum = 1;
      this.cateList = [];
      this.finished = false;
    
        this.getReportInfo(this.pageNum, this.reportState);
        this.isLoading = false;
     
    },
    getReportInfo(pageNum, reportState) {
      if (!this.flag) {
        //获取故障报销数据
        let params = {
          pageNum: pageNum,
          pageSize: 10,
          reportState: reportState
        };

        let list = [];
        this.flag = true;
        this.$post("reportFailure", params).then(res => {
          if (res.code == 200) {
            if (this.pageNum == 1) {
              list = res.body.list;
            } else {
              list = res.body.list.concat(this.cateList);
            }
            this.loading = false;
            this.flag = false;
          } else {
            this.$toast("数据未获取成功");
          }
          if (res.body.list.length < 10) {
            this.finished = true;
          }
          this.cateList = list;
        });
      } else {
        return;
      }
    },
    getCateList(i) {
      this.classFlag = i;
      this.reportState = i;
      this.cateList = [];
      this.pageNum = 1;
      this.finished = false;
      this.loading = false;
      this.getReportInfo(this.pageNum, this.reportState);

      console.log("abcasdadsada", i);
    },

    // 上拉加载
    onLoad() {
      // if(!this.flag) return
   
        this.getReportInfo(++this.pageNum, this.reportState);
      
      // this.falg = false
    }
  },
  mounted() {
    this.getReportInfo(this.pageNum, this.reportState);
  }
};
</script>

<style lang="less" scoped>
#failureManage {
  // new
  background-color: white;
  .van-button {
    margin: 0.05rem;
  }
  .van-cell-group {
    .subtitle {
      font-size: 0.13rem;
      color: #666;
      border-bottom: 1px solid #eee;
      margin: 0 auto;
      width: 3.35rem;
      height: 0.4rem;
    }
    .btnFilterGroup {
      display: flex;
      align-items: center;
      height: 0.6rem;
    }
  }
  .van-divider {
    height: 0.1rem;
    background: #ebedf0;
    margin: 0;
  }
  .van-row {
    &:nth-child(even) {
      background-color: #f9f9f9;
    }
    // 按钮
    .r-botton {
      display: inline-block;
      font-size: 0.13rem;
      height: 0.25rem;
      line-height: 0.25rem;
      padding: 0 0.05rem;
      text-align: center;
      border-radius: 0.02rem;
      &.reported {
        background-color: rgba(240, 117, 70, 0.15);
        color: #f07546;
      }
      &.appointed {
        background-color: rgba(36, 187, 255, 0.15);
        color: #24bb9b;
      }
      &.unreport {
        background-color: rgba(136, 136, 136, 0.15);
        color: #888;
      }
    }
  }

  // old
  .van-nav-bar {
    background: #24bb9b;
  }
  .van-nav-bar .van-icon {
    color: white;
  }
  .van-nav-bar__title {
    font-size: 0.19rem;
    color: white;
  }

  // .van-button {
  //   font-family: PingFangSC-Medium;
  //   border: 1px solid #dddcdc;
  //   border-radius: 28.5px;
  // }

  .active {
    font-family: PingFangSC-Medium;
    color: #24bb9b;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.28rem;
    background: #e8f6f3;
    border-radius: 0.285rem;
  }

  .van-row {
    align-items: center;
    background: #ffffff;
    box-shadow: inset 0 -0.01rem 0 0 #eaeaea;
    line-height: 0.55rem;

    .van-col {
      font-family: PingFangSC-Regular;
      // font-size: 0.28rem;
      color: #4a4a4a;
      // line-height: 0.28rem;
      text-align: center;
    }
  }
}
</style>

 