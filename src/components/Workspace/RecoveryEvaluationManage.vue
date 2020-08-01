
<template>
  <div id="failureManage">
    <van-nav-bar title="回收评测管理" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>
    <!-- 标题 -->
    <van-cell-group>
      <span class="subtitle">指定搜索范围</span>
      <div class="btnFilterGroup">
        <van-button
          round
          type="default"
          :class="recyclingState == index+1?'btnFilterActive':'btnFilterdefault'"
          v-for="(item,index) in subtitles"
          :key="index"
          @click="listfilter(index+1)"
        >{{ item }}</van-button>
      </div>
    </van-cell-group>
    <van-divider></van-divider>

    <!-- 回收信息列表 -->
    <van-list v-model="loading" :finished="finished" @load="onLoad"  v-if="recyclingList.length">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-row v-for="(item,i) in recyclingList" :key=" i " @click="itemClick(item)">
          <van-col span="18">{{item.batteryPackcode}}</van-col>
          <van-col span="6" style="height:0.55rem;display:flex;align-items: center;">
            <span
              :class="recyclingState == 1?'unreport r-botton':'appointed r-botton'"
              v-text="recyclingState == 1?'未评测':'已评测'"
            ></span>
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
  name: "FailureReportingManage",
  data() {
    return {
      recyclingState: 1,
      recyclingList: [],
      message: "",
      image: require("../../assets/ic_back_white.png"),
      scanImg: require("../../assets/mine_scan.png"),
      subtitles: ["未评测", "已评测"], //子标题
      classFlag: 0, //active的判断标志
      nodataImage: require("../../assets/nodata.png"),
      finished: false,
      loading: false,
      isLoading: false,
      pageNum: 1,
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
      this.finished = false;

      this.getData(this.recyclingState, this.pageNum);
      this.isLoading = false;
    },

    //根据recyclingState来获取
    getData(recyclingState, pageNum) {
      if (!this.flag) {
        this.recyclingState = recyclingState;
        var parmas = {
          recyclingState: recyclingState,
          pageNum: pageNum,
          pageSize: 10
        };

        let list = [];
        this.flag = true;
        this.$post("recoveryevaluation_list", parmas).then(res => {
          console.log(res);
          if (res.code == 200) {
            if (this.pageNum == 1) {
              list = res.body.list;
            } else {
              list = res.body.list.concat(this.recyclingList);
            }

            this.loading = false;
            this.flag = false;
          } else {
            this.$toast("没有更多数据");
          }

          if (res.body.list.length < 10) {
            this.finished = true;
          }
          this.recyclingList = list;
        });
      }
    },

    // 点击切换评测状态
    listfilter(index) {
      this.recyclingState = index;
      this.recyclingList = [];
      this.pageNum = 1;
      this.finished = false;
      this.loading = false;

      this.getData(this.recyclingState, this.pageNum);
    },

    // 上拉加载
    onLoad() {
      setTimeout(() => {
        this.getData(this.recyclingState, ++this.pageNum);
      }, 2000);
    },

    //打开评测详情  已评测--》打开评测页面，查看   未评测--》打开评测新增页面
    itemClick(item) {
      if (item.recyclingState == 1) {
        //未评测  可以修改
        this.$router.push({
          path: "/RecoveryEvaluation",
          query: { id: item.id, recyclingState: item.recyclingState }
        });
      }
      if (item.recyclingState == 2) {
        //已评测  只查看，不能修改
        this.$router.push({
          path: "/RecoveryEvaluationDetail",
          query: { id: item.id }
        });
      }
    }
  },
  mounted() {
    this.getData(this.recyclingState, this.pageNum);
  }
};
</script>

<style lang="less" scoped>
#failureManage {
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
    margin: 0;
    height: 0.1rem;
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

    .van-col--18 {
      text-indent: 0.19rem;
      text-align: left;
    }
  }
}
</style>

 