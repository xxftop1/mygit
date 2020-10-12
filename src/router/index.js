
import Vue from "vue";
import Router from "vue-router";
import rewardList from '@/components/rewardList/rewardList'
import rewardDetails from '@/components/rewardList/rewardDetails'
import rewardPeopleDetails from '@/components/rewardList/rewardPeopleDetails'
import newReward from '@/components/rewardList/newReward'

import home from "@/components/home";
import dayRecord from "@/components/dayRecord/dayRecord";
import addDayRecord from "@/components/dayRecord/addDayRecord";
import rejectDayRecord from "@/components/dayRecord/rejectDayRecord";
import dayRecordSum from "@/components/dayRecord/dayRecordSum";
import dayRecordWork from "@/components/dayRecord/dayRecordWork";
import dayRecordDetail from "@/components/dayRecord/dayRecordDetail";

import addPointList from "@/components/addPointList/addPointList";
import newPointList from "@/components/addPointList/newPointList";
import educationScale from "@/components/educationScale/educationScale";
import addHistoryData from '@/components/addHistoryData/addHistoryData';

import record from '@/components/record/record'
import addRecord from '@/components/record/addRecord'
import addRecordList from '@/components/record/addRecordList'
import addRecordDetail from '@/components/record/addRecordDetail'

import reviewCheckList from '@/components/reviewCheck/reviewCheckList'
import reviewCheckDetail from '@/components/reviewCheck/reviewCheckDetail'
import reviewCreate from '@/components/reviewCheck/reviewCreate'
import checkCreate from '@/components/reviewCheck/checkCreate'
import checkApproval from '@/components/reviewCheck/checkApproval'
import reviewApproval from '@/components/reviewCheck/reviewApproval'

import clause from '@/components/clause/clause'

import criminalInfo from '@/components/criminalInfo/criminalInfo';
import editCriminalInfo from '@/components/criminalInfo/editCriminalInfo';

//引入工作评价
import WorkEvaluation from '@/components/workEvaluation/workEvaluation';
import weekDiscussion from '@/components/weekDiscussion/discussion'

// 月评议
import evaluateList from '@/components/monthPublicity/evaluateList'
import educationScore from '@/components/monthPublicity/educationScore'
import laborScore from '@/components/monthPublicity/laborScore'
import monthFirstInstance from '@/components/monthPublicity/monthFirstInstance'
import monthCollection from '@/components/monthPublicity/monthCollection'
import conference from '@/components/monthPublicity/conference'
import over from '@/components/monthPublicity/over'

import summary from '@/components/summary/summary';
Vue.use(Router);

export default new Router({
  routes: [
    // 日记载列表
    {
      path: "/",
      name: "home",
      component: home
    },
    {
      path: "/dayRecord/dayRecordSum",
      name: "dayRecordSum",
      component: dayRecordSum
    },
    {
      path: "/dayRecord/addDayRecord",
      name: "addDayRecord",
      component: addDayRecord
    },
    {
      path: "/dayRecord/rejectDayRecord",
      name: "rejectDayRecord",
      component: rejectDayRecord
    },
    {
      path: "/dayRecord/dayRecordWork",
      name: "dayRecordWork",
      component: dayRecordWork
    },
    {
      path: "/dayRecord/dayRecordDetail",
      name: "dayRecordDetail",
      component: dayRecordDetail
    },
    {
      path: "/dayRecord",
      name: "dayRecord",
      component: dayRecord
    },
    {
      path: "/weekDiscussion",
      name: "weekDiscussion",
      component: weekDiscussion
    },
    {
        path: '/record',
        name: 'record',
        component: record,
        children:[
            // 补记
            {
              path: '/record/addRecord',
              name: 'addRecord',
              component: addRecord
            },
            //补记列表
            {
              path: '/record/addRecordList',
              name: 'addRecordList',
              component: addRecordList
            },
            //补记详情
            {
              path: '/record/addRecordDetail',
              name: 'addRecordDetail',
              component: addRecordDetail
            }
        ]
    },
    // 复查复核
    {
      path: "/reviewCheckList",
      name: "reviewCheckList",
      component: reviewCheckList
    },
    {
      path: "/reviewCheck/reviewCheckDetail",
      name: "reviewCheckDetail",
      component: reviewCheckDetail
    },
    {
      path: "/reviewCheck/reviewCreate",
      name: "reviewCreate",
      component: reviewCreate
    },
    {
      path: "/reviewCheck/checkCreate",
      name: "checkCreate",
      component: checkCreate
    },
    {
      path: "/reviewCheck/checkApproval",
      name: "checkApproval",
      component: checkApproval
    },
    {
      path: "/reviewCheck/reviewApproval",
      name: "reviewApproval",
      component: reviewApproval
    },
    // 加扣分通知单
    {
      path: "/addPointList",
      name: "addPointList",
      component: addPointList
    },
    {
      path: "/clause",
      name: "clause",
      component: clause
    },
    // 新建加扣分通知单
    {
      path: "/newPointList",
      name: "newPointList",
      component: newPointList
    },
    // 教育分项比例设定
    {
      path: "/educationScale",
      name: "educationScale",
      component: educationScale
    },
     // 计分考核概况汇总表
     {
      path: "/summary",
      name: "summary",
      component: summary
    },
    // 奖励列表
    {
      path: "/rewardList",
      name: "rewardList",
      component: rewardList
    },
    // 奖励监区详情
    {
      path: "/rewardDetails",
      name: "rewardDetails",
      component: rewardDetails
    },
    // 奖励个人详情
    {
      path: "/rewardPeopleDetails",
      name: "rewardPeopleDetails",
      component: rewardPeopleDetails
    },
    // 新增奖励
    {
      path: '/newReward',
      name: 'newReward',
      component: newReward
    },
    // 历史数据导入
    {
      path: '/addHistoryData',
      name: 'addHistoryData',
      component: addHistoryData
    },
    // 罪犯信息列表
    {
      path: "/criminalInfo",
      name: "criminalInfo",
      component: criminalInfo
    },
    //工作评价
    {
      path:"/workEvaluation",
      name:"workEvaluation",
      component:WorkEvaluation
    },
    // 编辑罪犯信息
    {
      path: "/editCriminalInfo",
      name: "editCriminalInfo",
      component: editCriminalInfo
    },
    // 月公示
    {
      path: "/monthPublicity/evaluateList",
      name: "evaluateList",
      component: evaluateList
    },
    {
      path: "/monthPublicity/educationScore",
      name: "educationScore",
      component: educationScore
    },
    {
      path: "/monthPublicity/laborScore",
      name: "laborScore",
      component: laborScore
    },
    {
      path: "/monthPublicity/monthFirstInstance",
      name: "monthFirstInstance",
      component: monthFirstInstance
    },
    {
      path: "/monthPublicity/monthCollection",
      name: "monthCollection",
      component: monthCollection
    },
    {
      path: "/monthPublicity/conference",
      name: "conference",
      component: conference
    },
    {
      path: "/monthPublicity/over",
      name: "over",
      component: over
    }
  ]
});
