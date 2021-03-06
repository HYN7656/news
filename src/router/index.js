import Vue from 'vue';
import Router from 'vue-router';
// 网页
import Home from '@/views/index';
// import Design from '@/views/design'
// import Manage from '@/views/manage'
// import Planning from '@/views/planning'
// import Reduce from '@/views/reduce'
import Contact from '@/views/contact';
import NewList from '@/views/news/list';
import NewDetails from '@/views/news/details';
import DynamicList from '@/views/dynamic/list';
import DynamicDetails from '@/views/dynamic/details';
import NoticeList from '@/views/notice/list';
import NoticeDetails from '@/views/notice/details';
import signUpList from '@/views/signUp/list';
import signUpForm from '@/views/signUp/form';
import signUpDetail from '@/views/signUp/detail';
import PlanList from '@/views/plan/list';
import PlanDetails from '@/views/plan/details';
import ManageList from '@/views/manage/list';
import ManageDetails from '@/views/manage/details';
import DesignList from '@/views/design/list';
import DesignDetails from '@/views/design/details';
import EnergyList from '@/views/energy/list';
import EnergyDetails from '@/views/energy/details';

Vue.use(Router);

export default new Router({
  // base: '/',
  mode: 'hash',
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    /*{
      path: '/design',
      name: 'design',
      component: Design
    },*/
    {
      path: '/sign/list',
      name: 'sign.list',
      component: signUpList
    },
    {
      path: '/sign/detail',
      name: 'sign.detail',
      component: signUpDetail
    },
    {
      path: '/form',
      name: 'form',
      component: signUpForm
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/news/list',
      name: 'newList',
      component: NewList
    },
    {
      path: "/news/details",
      name: "newDetails",
      component: NewDetails
    },
    {
      path: "/dynamic/list",
      name: "dynamicList",
      component: DynamicList
    },
    {
      path: "/dynamic/details",
      name: "deynamicDetails",
      component: DynamicDetails
    },
    {
      path: "/notice/list",
      name: "noticeList",
      component: NoticeList
    },
    {
      path: "/notice/details",
      name: "noticeDetails",
      component: NoticeDetails
    },
    {
      path: '/plan/list',
      name: 'planList',
      component: PlanList
    },
    {
      path: "/plan/details",
      name: "planDetails",
      component: PlanDetails
    },
    {
      path: '/manage/list',
      name: 'manageList',
      component: ManageList
    },
    {
      path: "/manage/details",
      name: "manageDetails",
      component: ManageDetails
    },
    {
      path: '/design/list',
      name: 'designList',
      component: DesignList
    },
    {
      path: "/design/details",
      name: "designDetails",
      component: DesignDetails
    },
    {
      path: '/energy/list',
      name: 'energyList',
      component: EnergyList
    },
    {
      path: "/energy/details",
      name: "energyDetails",
      component: EnergyDetails
    },
  ]
});
