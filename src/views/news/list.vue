<template>
  <div class="list" v-bind:style="{ minHeight: offHeight + 'px' }">
    <br>
    <div class="contain">
      <ul class="current_position">
        <li>当前位置：</li>
        <li><a href="/">首页</a>&nbsp;&nbsp;</li>
        <li><i class="icon iconfont icon-youjiantou"></i>&nbsp;&nbsp;</li>
        <li><a href="/news/list">新闻</a></li>
      </ul>
    </div>
    <br/>
    <div class="title_hr"></div>
    <div class="contentList">
      <div v-for="(item,index) in newsList" :key="item.id" @click="newsGo(item.id)">
        <div class="news_img" style="cursor: pointer">
          <img :src="item.url" style="width: 240px;"/>
        </div>
        <ul class="content" style="height: 200px;cursor: pointer">
          <li class="title"><a :class="item.fTop == 1 ? Red : Black">{{item.fTitle}}</a></li>
          <li class="contents"><a>{{item.fContents}}</a></li>
          <li class="time">{{item.fReleaseTime}}</li>
          <li><br/></li>
        </ul>
        <div v-if="index<newsList.length-1" class="content-hr"></div>
      </div>

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
    </div>
  </div>
</template>

<script>
  import config from "@/config/config.js";
  import Vue from 'vue';
  import {Table,TableColumn,Pagination} from 'element-ui';
  import VueResource from 'vue-resource';
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Pagination);
  Vue.use(VueResource);
    export default {
        //name: "list.vue"
      data(){
        return{
          newsList : [],
          currentPage: 1,      //当前页
          total: 0,          //数据总条数
          pageSize: 10,        //每页显示的数据条数
          Red : 'Red',
          Black : 'Black',
          pag : false
        }
      },
      methods: {
        getPage(){
          this.heightCen();
          let params = {};
          params['page'] = this.currentPage;
          params['count'] = this.pageSize;
          API.get('/newsInfo/FindAllByrelease', params).then((res) => {
            // console.log(res.data);
            if (res.data.code  == 200) {
              for(var i=0;i<res.data.data.length;i++){
                res.data.data[i].url = config.baseURL + res.data.data[i].fImgUrl;
              }
              this.newsList = res.data.data;

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
        newsGo(id){
          this.$router.push({name:'newDetails',query:{id:id}});
        },
        // 翻页器：当前页，同时上一页下一页也能获取当前页
        handleCurrentChange(val) {
          this.currentPage = val;
          this.getPage();
          // console.log(val);
        },
        // 翻页器：选择10条还是20条、
        handleSizeChange(val) {
          this.pageSize = val;
          this.getPage();
          // console.log(val);
        },
        heightCen(){
          let hei = document.documentElement.clientHeight-410;
          // console.log(hei);
          this.offHeight = hei;
          // console.log(this.offHeight);
        }
      },
      created() {
        this.getPage();
      }
    }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/list.less';
  .Red {
    color: #CF2727!important; ;
  }
  .Black {
    color: #0b0306!important; ;
  }
</style>
