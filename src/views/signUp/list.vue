<template>
    <div class="sign-list" v-bind:style="{ minHeight: offHeight + 'px' }">
        <div class="banner">
            <img src="./../../assets/images/banner.png" alt="" class="img">
        </div>
        <div class="list-content inner-c" >
            <router-link :to="{path:'/sign/detail',query:{id:i.id}}" class="cell" v-for="i in meetingList" :key="i.id">
                <!--<div class="img-box"><img src="./../../assets/images/erwm.png" class="img"></div>-->
                <div class="img-box"><img :src="i.url" class="img" style="width:260px;height:260px;"></div>
                <div class="detail">
                    <div class="title">{{i.mname}}</div>
                    <div class="time"><i class="icon iconfont icon-shijian"></i>{{i.startTime}} -- {{i.endTime}}</div>
                    <div class="address"><i class="icon iconfont icon-dingweiweizhi"></i>{{i.maddress}}</div>
                </div>
            </router-link>
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
</template>

<script>
  import config from "@/config/config.js";
  export default {
    data () {
      return {
        meetingList : [],
        currentPage: 1,      //当前页
        total: 0,          //数据总条数
        pageSize: 10,        //每页显示的数据条数
        pag : false
      }
    },
    methods:{
      getPage(){
        this.heightCen();
        let params = {};
        // params1['id'] = 123;
        params['page'] = this.currentPage;
        params['count'] = this.pageSize;
        API.get('/meeTing/FindAllByrelease', params).then((res) => {
          // console.log(res.data);
          if (res.data.code == 200) {
            var arr = res.data.data;
            for(var i=0;i<arr.length;i++){
              arr[i].startTime = arr[i].mstartTime.slice(0,19);
              arr[i].endTime = arr[i].mendTime.slice(0,19);
              arr[i].url = config.baseURL +arr[i].mqrcodeUrl;
            }
            this.meetingList = arr;
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
      heightCen(){
        let hei = document.documentElement.clientHeight-410;
        // console.log(hei);
        this.offHeight = hei;
        // console.log(this.offHeight);
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

    },
    created() {
      this.getPage();
    }
  }
</script>
<style>
  .sign-list .el-pagination {
    margin-bottom: 50px;
  }
</style>

<style scoped lang="less">
    .sign-list {
        width:100%;
        .banner {
            margin-bottom: 30px;
            width:100%;
            .img {
                width: 100%;
                display: block;
            }
        }
        .list-content {
            overflow:hidden;
            .cell {
                width:588px;
                display: block;
                float: left;
                height:558px;
                background: #fff;
                margin-right: 24px;
                margin-bottom:24px;
                &:hover {
                    text-decoration: none;
                }
                &:nth-child(2n+2) {
                     margin-right: 0;
                 }
                 .img-box {
                     width:558px;
                     margin-bottom: 10px;
                     .img {
                       display: block;
                       margin: 50px auto;
                     }
                 }
                .detail {
                    width:100%;
                    text-align: left;
                    padding:0 18px;
                    box-sizing: border-box;
                    .title {
                        height:82px;
                        font-size: 26px;
                        color:#000;
                        font-weight: 600;
                        display: table-cell;
                        vertical-align:middle
                    }
                    .time {
                        font-size: 16px;
                        color:#666666;
                        line-height: 42px;
                    }
                    .icon {
                        color:#026ab3;
                        margin-right: 20px;
                    }
                    .address {
                        font-size: 16px;
                        color:#666666;
                        line-height: 42px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;

                    }
                }
            }
        }
    }
</style>
