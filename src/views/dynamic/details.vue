<template>
  <div v-bind:style="{ minHeight: offHeight + 'px' }">
    <br>
    <div class="contain">
      <ul class="current_position">
        <li>当前位置：</li>
        <li><a href="/">首页</a>&nbsp;&nbsp;</li>
        <li><i class="icon iconfont icon-youjiantou"></i>&nbsp;&nbsp;</li>
        <li><a href="/dynamic/list">动态</a></li>
        <li>&nbsp;&nbsp;<i class="icon iconfont icon-youjiantou"></i>&nbsp;&nbsp;&nbsp;</li>
        <li><a href="/dynamic/details">详情</a></li>
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
        <span>发布时间：{{datail.time}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>来源：{{datail.origin}}</span>
      </div>
      <br/><br/>
      <div class="detail_content ql-snow" >
        <div class="ql-editor" v-html="datail.content"></div>
      </div>
      <br/><br/>
      <div class="down_res">
        <a href="datail.download_url" style="color: #df6657;text-align: left;">{{datail.download_name}}</a>
      </div>
      <br/><br/><br/>
    </div>
  </div>
</template>

<script>
    export default {
        //name: "details.vue"
      data(){
        return{
          datail:{}
        }
      },
      mounted: function () {
      },
      methods:{
        getPage(){
          this.heightCen();
          // console.log(this.$route.query.id);
          let params = {};
          params['id'] = this.$route.query.id;
          API.get('static/newsDetails.json', params).then((res) => {
            // console.log(res.data);
            if (res.status == 200) {
              this.datail = res.data[0];
              // console.log(this.datail);
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
        }
      },
      created(){
        this.getPage();
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
