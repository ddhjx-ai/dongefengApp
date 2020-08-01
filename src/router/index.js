import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Login/HelloWorld'
import Res from '@/components/Login/Res'
import ForgetPwd from '@/components/Login/ForgetPwd'
import ForgetPwdStepOne from '@/components/Login/ForgetPwdStepOne'
import ForgetPwdStepTwo from '@/components/Login/ForgetPwdStepTwo'
import Tabbar from '@/components/Tabbar/Tabbar'
import Ajust from '@/components/Mine/Ajust'
import CarDetail from '@/components/Mine/CarDetail'
import BindCarInfo from '@/components/Mine/BindCarInfo'
import Questions from '@/components/Login/Questions'
import CarRepairInfo from '@/components/Mine/CarRepairInfo'
import CarRepairDetail from '@/components/Mine/CarRepairDetail'
import newsDetail from '@/components/Home/newsDetail'


// 工作台一些页面
//故障管理
import FailureReportingManage from '@/components/Workspace/FailureReportingManage'
//故障上报
import FailureReporting from '@/components/Workspace/FailureReporting'
//电池状态详情
import BatteryOperationStatus from '@/components/Workspace/BatteryOperationStatus'
//回收评测
import RecoveryEvaluation from '@/components/Workspace/RecoveryEvaluation'
//回收评测管理
import RecoveryEvaluationManage from '@/components/Workspace/RecoveryEvaluationManage'
import RecoveryEvaluationDetail from '@/components/Workspace/RecoveryEvaluationDetail'
//评测新增
//回收发起(新增)
import RecycleLanch from  '@/components/Workspace/RecycleLanch'
//回收管理(列表)
import RecycleList from '@/components/Workspace/RecycleList'
//回收详情(详情)
import RecycleDetail from '@/components/Workspace/RecycleDetail'


//故障委派
import FailureAssign from '@/components/Workspace/FailureAssign'
//消息推送
import MessageList from '@/components/Workspace/messageList'
//VIN码查询
import VINCodeSearch  from '@/components/Workspace/VINCodeSearch'
import BatteryCodeSearch  from '@/components/Workspace/BatteryCodeSearch'
import RepairManager  from '@/components/Workspace/RepairManager'
import BackSearch  from '@/components/Workspace/BackSearch'
import CodeRes from '@/components/Workspace/CodeRes'
import BatteryDetail from '@/components/Workspace/BatteryDetail'
import BatteryError from '@/components/Workspace/BatteryError'
import BatteryCodeSearchDetail from '@/components/Workspace/BatteryCodeSearchDetail'
import CarBindingList from '@/components/Workspace/CarBindingList'//车辆绑定管理
import NewsInfoDetail from '@/components/Home/news_info_detail'
import repairResult from '@/components/Workspace/repairResult'
import FailureDetail from "@/components/Workspace/FailureDetail"      // 维修详情路由----------------
import AlreadyReporting from "@/components/Workspace/AlreadyReporting"      // 已委派详情路由--

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/newsInfoDetail',
      name:'newsInfoDetail',
      component:NewsInfoDetail
    } ,
    {   // ----------------------------------维修详情路由
      path: '/FailureDetail',
      name: 'FailureDetail',
      component: FailureDetail
    },
    {   // ----------------------------------已委派路由
      path: '/AlreadyReporting',
      name: 'AlreadyReporting',
      component: AlreadyReporting
    },
     {
      path: '/Res',
      name: 'Res',
      component: Res
      
    },{
      path: '/RecoveryEvaluationDetail',
      name: 'RecoveryEvaluationDetail',
      component: RecoveryEvaluationDetail
    }, {
      path:'/carBindingList',
      name:'CarBindingList',
      component:CarBindingList
    },{
      path: '/ForgetPwd',
      name: 'ForgetPwd',
      component: ForgetPwd
      
    }, {
      path:'/MessageList',
      name:'MessageList',
      component:MessageList
    } ,{
      path: '/ForgetPwdStepOne',
      name: 'ForgetPwdStepOne',
      component: ForgetPwdStepOne
      
    }, {
      path: '/ForgetPwdStepTwo',
      name: 'ForgetPwdStepTwo',
      component: ForgetPwdStepTwo
      
    }, 
    { path: '/repairResult',
    name: 'repairResult',
    component: repairResult
  },
    {
      path: '/Questions',
      name: 'Questions',
      component: Questions
    },{
      path: '/Tabbar',
      name: 'Tabbar',
      component: Tabbar  ,
      meta:{
        keepAlive: true ,
        active:0
      }
      
    },{
     
      path: '/newsDetail',
      name: 'newsDetail',
      component:newsDetail
    },{
      path: '/Ajust',
      name: 'Ajust',
      component: Ajust
    },{
      path: '/CarDetail',
      name: 'CarDetail',
      component: CarDetail
    },{
      path: '/BindCarInfo',
      name: 'BindCarInfo',
      component: BindCarInfo
    } ,{
      path: '/FailureReportingManage',
      name: 'FailureReportingManage',
      component: FailureReportingManage
    }, {
      path: '/FailureReporting',
      name: 'FailureReporting',
      component: FailureReporting
    },
    , {
      path: '/BatteryOperationStatus',
      name: 'BatteryOperationStatus',
      component: BatteryOperationStatus
    },
    , {
      path: '/RecoveryEvaluation',
      name: 'RecoveryEvaluation',
      component: RecoveryEvaluation
    },
    , {
      path: '/RecoveryEvaluationManage',
      name: 'RecoveryEvaluationManage',
      component: RecoveryEvaluationManage
    }
    , {
      path: '/FailureAssign',
      name: 'FailureAssign',
      component: FailureAssign
    },
    {
      path: '/VINCodeSearch',
      name: 'VINCodeSearch',
      component: VINCodeSearch
    },
    {
      path: '/BatteryCodeSearchDetail',
      name: ' BatteryCodeSearchDetail',
      component:  BatteryCodeSearchDetail
    },
   
    {
      path: '/BatteryCodeSearch',
      name: 'BatteryCodeSearch',
      component: BatteryCodeSearch
    },
    {
      path: '/RepairManager',
      name: 'RepairManager',
      component: RepairManager
    },
    {
      path: '/BackSearch',
      name: 'BackSearch',
      component: BackSearch
    },
    {
      path: '/CodeRes',
      name: 'CodeRes',
      component: CodeRes
    },
    {
      path: '/BatteryDetail',
      name: 'BatteryDetail',
      component: BatteryDetail
    },
    {
      path: '/BatteryError',
      name: 'BatteryError',
      component: BatteryError
    },
    {
      path: '/CarRepairInfo',
      name: 'CarRepairInfo',
      component: CarRepairInfo
    },
    {
      path: '/CarRepairDetail',
      name: 'CarRepairDetail',
      component: CarRepairDetail
    },
    {
      path: '/RecycleLanch',
      name: 'RecycleLanch',
      component: RecycleLanch
    },
    {
      path: '/RecycleDetail',
      name: 'RecycleDetail',
      component: RecycleDetail
    },
    {
      path: '/RecycleList',
      name: 'RecycleList',
      component: RecycleList
    },
    
  ]
})
