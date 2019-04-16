<template>
  <div class="list" v-bind:style="{ minHeight: offHeight + 'px' ,overflow:'hidden'}">
    <br/><br/>
    <div class="contain">
      <div style="float: left;width: 230px;">
        <span class="plan">空域管理</span>
      </div>
      <div style="overflow: hidden;text-align: left;">
        <span class="current_plan">{{currentPlanName}}</span>
      </div>
      <br/><br/>
      <ul class="current_banner">
        <li v-for="i in typeList" :key="i.id" class="liStyle" :title="i.iName"><a @click="getSwit(i.id,i.iName)" class="banner_color" :class="{active:isActive == i.id}">{{i.name}}</a></li>
      </ul>
      <div class="contentList" :class="{active:isActive == this.isActive}">
        <div v-for="(item,index) in list">
          <div class="content-hr"></div>
          <br/><br/><br/>
          <ul class="content" @click="EdtailsGo(item.id)">
            <li class="title"><a :class="item.top == 1 ? Red : Black">{{item.title}}</a></li>
            <li class="limitC contents">{{item.contents}}</li>
            <li class="time">{{item.releaseTime }}</li>
            <li><br/></li>
          </ul>
        </div>
        <div class="content-hr"></div>
        <br/><br/>
        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total=parseInt(total)
          v-show="pag">
        </el-pagination>
        <br/><br/>
      </div>
    </div>
    <div class="contain">

    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Table,TableColumn,Pagination} from 'element-ui';
  import VueResource from 'vue-resource';
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Pagination);
  Vue.use(VueResource);
  export default {
    data(){
      return{
        currentPage: 1,      //当前页
        total: 0,          //数据总条数
        pageSize: 10,        //每页显示的数据条数
        offHeight : 0,
        pag:true,
        typeList:[],
        currentPlanName:'',
        list:[],
        month:'',
        day:'',
        week:'',
        // changeNoticeList:[],
        temporaryRoutesList:[],
        meetingNoticeList:[],
        isActive:1,

        contentHidden: true,
        Red : 'Red',
        Black : 'Black',
        pageFLID : '',
        pageFLName : '',
        pagId:'',
        pagName:''
      }
    },
    methods: {
      getPage(){
        let params = {};
        params['type'] = 3;
        params['page'] = this.currentPage;
        params['count'] = this.pageSize;
        API.get('/ification/findByType', params).then((res) => {
          // console.log(res.data)
          if(res.data.code == 200){
            var arr = [];
            this.typeList = arr.concat(res.data.data);
            for(var i=0;i<this.typeList.length;i++){
              this.typeList[i].name = this.typeList[i].iName.slice(0,10);
            }
            this.currentPlanName = this.typeList[0].iName;
            this.switcher(this.typeList[0].id,this.typeList[0].iName);
          }
        })
        // console.log(this.typeList);
      },
      handleSizeChange(val) {
        this.pageSize = val;
        if(this.pageFLID != this.pagId){
          this.switcher(this.pageFLID,this.pageFLName)
        }else {
          this.getPage();
        }
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        if(this.pageFLID != this.pagId){
          this.switcher(this.pageFLID,this.pageFLName)
        }else {
          this.getPage();
        }
      },
      getSwit(id,name){
        this.currentPage = 1;
        this.pageSize = 10;
        this.switcher(id,name)
      },
      switcher(id,name){
        this.pageFLID = id;
        this.pageFLName = name;
        this.heightCen();
        this.isActive = id;
        this.currentPlanName = name;
        // this.list=this.meetingNoticeList;
        let params = {};
        params['iId'] = id;
        params['page'] = this.currentPage;
        params['count'] = this.pageSize;
        // console.log(params);
        API.get('/management/findAllByrelease', params).then((res) => {
          // console.log(res.data)
          if (res.data.code == 200) {
            this.list = res.data.data;
            this.total = res.data.count;

            if(this.total>0){
              this.pag = true;
            }else {
              this.pag = false;
            }
          } else {
            console.log(res.data);
          }
        })
      },
      EdtailsGo(id){
        this.$router.push({name:'manageDetails',query:{id:id}});
      },
      heightCen(){
        let hei = document.documentElement.clientHeight-410;
        // console.log(hei);
        this.offHeight = hei;
        // console.log(this.offHeight);
      }
    },
    created() {
      // this.classify();
      this.getPage();
    },
    mounted: function () {
      // this.list=this.changeNoticeList;


    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/list';
  .Red {
    color: #CF2727!important; ;
  }
  .Black {
    color: #0b0306!important; ;
  }
  .plan{
    font-size: 30px;
    font-weight: bolder;
    color: #da422a;
    float: left;
  }
  .current_plan{
    font-size: 26px;
    font-weight: bolder;
    color: #026ab3;
    /*margin-left: -60%;*/
  }
  .current_banner{
    font-size: 18px;
    /*font-weight: bold;*/
    display: table-cell;
    float: left;
  }
  .current_banner li{
    text-decoration: none;  /*去掉前面的圆点*/
    list-style: none;
    /*float: left;*///横向排列
  }
  .current_banner li a {
    text-decoration: none;
    margin: 0px;
  }
  .banner_color{
    color: #999999;
  }
  .content-hr{
    background-color: #cccccc;
    padding: 1px 0 0;
    margin-left: 10%;
    width: 80%;
  }
  .contentList{
    display: none;
    /*margin-top: -10%;*/
    margin-left: 9%;

  }
  .active{
    color: #da422a;
    display: block;
  }
  .content {
    margin-left: 10%;
    width: 80%;
    text-align: left;
    margin-top: -4%;
    cursor: pointer;
  }
  .circle {
    border-radius: 50%;
    height: 10px;
    width: 10px;
    background-color: #da422a;
    margin-left: 220%;
  }
  .shux{
    margin-left: 49px;
    width: 1px;
    height: 190px;
    background: #999999;
  }
  .contents a{
    color: #999999;
    cursor: default;
  }
  .limitC{
    color: #999999;
    line-height: 28px;
    margin-top: 12px;
    margin-bottom: 12px;
  }
  content ul li a,a:hover{
    text-decoration:none;//去掉下划线
    color:#999;
    /*cursor: pointer;//光标变小手*/
  }
  .liStyle {
    display: block;
    margin-bottom: 20px;
    text-align: left;
  }
</style>
