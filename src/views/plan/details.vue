<template>
  <div v-bind:style="{ minHeight: offHeight + 'px' }">
    <br>
    <div class="contain">
      <ul class="current_position">
        <li>当前位置：</li>
        <li><router-link :to="{name:'planList'}">空域规划</router-link></li>
        <li>&nbsp;&nbsp;<i class="icon iconfont icon-youjiantou"></i>&nbsp;&nbsp;&nbsp;</li>
        <li><a href="javascript:;">详情</a></li>
      </ul>
    </div>
    <br/>
    <div class="title_hr">
      <div class="banner_hr">
        <div class="bar_hr"></div>
      </div>
    </div>
    <br/>
    <div class="news_tails">
      <div class="news_title">
        {{datail.title}}
      </div>
      <br/><br/>
      <div class="dis">
        <span>作者：{{datail.author}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>发布时间：{{datail.releaseTime}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>来源：{{datail.pFrom}}</span>
      </div>
      <br/><br/>
      <div class="detail_content ql-snow" >
        <div class="ql-editor" v-html="datail.content"></div>
      </div>
      <br/><br/>
      <div class="down_res" v-for="i in file">
        <a :href="i.url" style="color: #df6657;text-align: left;" >{{i.fenclName}}</a>
      </div>
      <br/><br/><br/>
    </div>
  </div>
</template>

<script>
  import config from "@/config/config.js";
  export default {
    data(){
      return{
        datail:{},
        file : [],
        offHeight : 0
      }
    },
    mounted: function () {
      this.getDetail();
    },
    methods: {
      getDetail() {
        this.heightCen();
        let params = {};
        params['id'] = this.$route.query.id;
        API.get('/plan/FindById', params).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.datail = res.data.data.data;
            this.file = res.data.data.file;
            for (var i = 0; i < this.file.length; i++) {
              this.file[i].url = config.baseURL + this.file[i].fenclUrl;
            }
            // console.log(this.file)
          }
        })
        console.log(this.$route.query.id)
      },
      heightCen(){
        let hei = document.documentElement.clientHeight-410;
        console.log(hei)
        this.offHeight = hei;
        console.log(this.offHeight)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/list_details.less';
  .ql-editor {
    width: 85%;
    margin: 0 auto;
  }
</style>
