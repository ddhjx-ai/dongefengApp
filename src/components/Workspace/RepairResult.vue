
<template>
  <div id="repairResult">
    <van-nav-bar title="维修处理" @click-left="onClickLeft" :border="false">
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
          @click="getReportInfo(index+2)"
        >{{ item }}</van-button>
      </div>
    </van-cell-group>

    <van-divider></van-divider>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-if="cateList.length" >
      <van-list v-model="loading" :finished="finished"   @load="onLoad">
        <van-row v-for="(item,i) in cateList" :key=" i " @click="goFailureInfo(item)">
          <van-col span="8">{{ columns[item.reportType - 1] }}</van-col>
          <van-col span="8">{{ item.reportTime }}</van-col>
          <van-col
            span="8"
            style="height:0.55rem;display:flex;align-items: center;justify-content: center;"
          >
            <span class="reported r-botton" v-if="item.reportState == 2">已委派</span>
            <span class="appointed r-botton" v-else>已维修</span>
          </van-col>
        </van-row>
      </van-list>
    </van-pull-refresh>

       <div style="display:flex;  display: flex ;flex-direction: column ;align-items: center ;justify-content: center ;margin-top:10vh" v-if="!cateList.length">
      <van-image width="2.2rem" height="1.1rem" :src="nodataImage" />
      <span style="color:#888 ; font-size:13px;margin-top:0.2rem">暂无数据</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "RepairResult",
  data() {
    return {
      image: require("../../assets/ic_back_white.png"),
      scanImg: require("../../assets/mine_scan.png"),
      columns: ["电池损坏", "更换电池", "汽车4S店"],
      nodataImage: require("../../assets/nodata.png"),
      cateList: [], //分类数据
      subtitles: ["已委派", "已维修"], //子标题
      classFlag: 0, //active的判断标志

      reportState: 2,
      isLoading: false,
      pageNum: 1,
      loading: false,
      finished: false,
      hasGet: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    // 请求数据------------------------------------
    getData(reportState, pageNum) {
      if (!this.hasGet) {
        this.pageNum = pageNum;
        this.hasGet = true;
        var parmas = {
          pageNum: pageNum,
          pageSize: 10,
          reportState: reportState ,
          repairId :sessionStorage.getItem("userId") 
        };

        let list = [];
        this.$post("reportFailure", parmas).then(res => {
          if (res.code == 200) {
            if (this.pageNum == 1) {
              list = res.body.list;
            } else {
              list = this.cateList.concat(res.body.list);
            }

            this.loading = false;
          } else {
            this.$toast("服务器忙，请稍后再试");
          }

          if (res.body.list.length < 10) {
            this.finished = true;
          }
          this.cateList = list;
          this.hasGet = false;
        });
      } else {
        return;
      }
    },

    // 点击获取对应的数据列表---------------------------
    getReportInfo(index) {
      this.classFlag = index-2;
      this.reportState = index;
      this.pageNum = 1;
      this.finished = false;
      this.loading = false;
      this.getData(this.reportState, this.pageNum);
    },
    // 下拉刷新----------------------------------------
    onRefresh() {
      this.pageNum = 1;
      this.finished = false;
      this.getData(this.reportState, this.pageNum);
      this.isLoading = false;
    },
    // 上拉加载------------------------------------------
    onLoad() {
      this.getData(this.reportState, this.pageNum + 1);
    },

      goFailureInfo(item) {
        
        if(item.reportState == 3){
          this.$router.push({ name: "FailureDetail", params: { data: item } });
        }else if(item.reportState == 2){

          this.$router.push({ name: "AlreadyReporting", params: { data: item } });
        }
    }
    
  },
  mounted() {
    this.getData(this.reportState, this.pageNum);
  }
};
</script>

<style lang="less" scoped>
#repairResult {
  // new
   
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
    margin: 0;
      background: #ebedf0;
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

 