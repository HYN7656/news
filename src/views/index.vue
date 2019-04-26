<template>
  <div class="home-page">
    <div class="banner">
      <img src="./../assets/images/banner.png" alt class="img">
    </div>
    <div class="middle-table">
      <div class="messages inner-c">
        <div class="news-bg"></div>
        <div class="left">
          <div class="tab">
            <div class="item newst" :class="{active:isActive == 1}" @click="newsTab(1)">
              <span>
                新闻
                <i class="newsts" v-show="newS"></i>
              </span>
            </div>
            <!--<div class="item newst" :class="{active:isActive == 2}" @click="newsTab(2)">
              动态
              <i class="newsts" v-show="dynamicS"></i>
            </div>-->
            <div class="item newst" :class="{active:isActive == 3}" @click="newsTab(3)">
              最新动态
              <i class="newsts" v-show="noticeS" style="left: 95px"></i>
            </div>
          </div>
          <div class="more" @click="newsList()">查看更多</div>
          <div class="tab-content">
            <div class="item" :class="{active:isActive == 1}">
              <div class="list" v-for="i in newsShow" :key="i.id" @click="newsGo(i.id)">
                <img :src="i.url" alt class="img">
                <div class="title" :class="i.fTop == 1 ? Red : Black">{{i.fTitle}}</div>
                <div class="article">{{i.fContents}}</div>
                <div class="time">发布时间：{{i.fReleaseTime}}</div>
              </div>
            </div>
            <div class="item common" :class="{active:isActive == 2}">
              <div class="list" v-for="i in trendsShow" :key="i.id" @click="dynamicGo(i.id)">
                <div class="title" :class="i.bs == 1 ? Red : Black">{{i.fTitle}}</div>
                <div class="article">{{i.fContents}}}</div>
                <div class="time">发布时间：{{i.fReleaseTime}}</div>
              </div>
            </div>
            <div class="item common" :class="{active:isActive == 3}">
              <div class="list" v-for="i in noticeShow" :key="i.id" @click="noticeGo(i.id)">
                <div class="title" :class="i.nTop == 1 ? Red : Black">{{i.nTitle}}</div>
                <div class="article">{{i.nContents}}</div>
                <div class="time">发布时间：{{i.nReleaseTime}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="nav-table">
            <div
              class="cell"
              v-for="(item, key) in menuSubsystem"
              :key="key"
              :class="{Boxactive:boxShadow==key}"
              @click="subsystem(key)"
            >
              <i :class="item.class" ></i>
              <p class="name">{{key}}</p>
            </div>
          </div>
          <div class="input-table loginTab">
            <div class="cell">
              <span class="mask">
                <i class="icon iconfont icon-wode"></i>
              </span>
              <input type="text" class="input" placeholder="请输入您的用户名" v-model="userName">
            </div>
            <div class="cell">
              <span class="mask">
                <i class="icon iconfont icon-mima"></i>
              </span>
              <input type="password" class="input" placeholder="请输入您的密码" v-model="passWord">
            </div>
            <div class="cell button" @click="login">登录</div>
            <el-row :gutter="20">
              <el-col :span="12"><div class="cell button" @click="PhoneLogin">手机验证方式登录</div></el-col>
              <el-col :span="12"><div class="cell button" @click="Register" label="left">注册</div></el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="trends inner-c">
        <div class="left">
          <div class="title">空域运行态势分析系统</div>
          <div class="scheme">
            <img src="./../assets/images/scheme.png" alt class="img">
          </div>
        </div>
        <div class="right right-1">
          <div class="title">班机航线走向建议</div>
          <div class="input-table">
            <div class="cell">
              <span class="mask">
                <i class="icon iconfont icon-yuanhuan"></i>
              </span>
              <input type="text" class="input" placeholder="请输入起点名称" v-model="bj.qd">
            </div>
            <div class="cell">
              <span class="mask">
                <i class="icon iconfont icon-round-copy"></i>
              </span>
              <input type="text" class="input" placeholder="请输入途径城市名称" v-model="bj.tj">
            </div>
            <div class="cell">
              <span class="mask">
                <i class="icon iconfont icon-qizhongdian"></i>
              </span>
              <input type="text" class="input" placeholder="请输入终点名称" v-model="bj.zd">
            </div>
            <div class="cell button" @click="Lookzxjy">查看走向建议</div>
          </div>
        </div>
      </div>
      <div class="inner-c module">
        <div class="cell">
          <img src="./../assets/images/module-01.png" alt class="img">
          <p class="words">规范文件</p>
        </div>
        <div class="cell">
          <img src="./../assets/images/module-02.png" alt class="img">
          <p class="words">新技术应用</p>
        </div>
        <router-link :to="{name:'sign.list'}" class="cell">
          <img src="./../assets/images/module-01.png" alt class="img">
          <p class="words">会议报名系统</p>
        </router-link>
      </div>
    </div>
    <!--对话框-->
    <el-dialog :visible.sync="dialogFormVisible" class="sign-dialog" :close-on-click-modal="false">
      <p style="font-size: 24px;font-weight: bolder">注册</p>
      <br>
      <el-form label-width="20%" ref="form"
               :model="form"
               :rules="rules"
               status-icon>
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="form.username" autocomplete="off" placeholder="请填写您的用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            v-model="form.password"
            autocomplete="off"
            type="password"
            placeholder="请填写您的密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="respassword">
          <el-input
            v-model="form.respassword"
            autocomplete="off"
            type="password"
            placeholder="请再次填写您的密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属单位：" prop="unit" class="sel-Org">
          <el-select filterable v-model="form.unit" placeholder="请选择所属单位">
            <el-option
              v-for="item in OrgOpt"
              :key="item.id"
              :label="item.mName"
              :value="item.id"
            ></el-option>
          </el-select>
          <!--<el-input v-model="form.unit" autocomplete="off" placeholder="请填写您的所属单位"></el-input>-->
        </el-form-item>
        <el-form-item label="部  门：">
          <el-input v-model="form.department" autocomplete="off" placeholder="请填写您的部门"></el-input>
        </el-form-item>
        <el-form-item label="姓  名：" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="请填写您的真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="id_number">
          <el-input v-model="form.id_number" autocomplete="off" placeholder="请填写您的身份证号"></el-input>
        </el-form-item>
        <el-form-item label="手机号： " prop="phone">
          <el-input
            v-model="form.phone"
            autocomplete="off"
            placeholder="请填写您的手机号"
          ></el-input>
          <!--<el-button class="code-btn" @click="Countdown3" v-bind:disabled="codePhon2">获取验证码{{auth_timezc}}</el-button>-->
        </el-form-item>
        <!--<el-form-item label="验证码： " prop="reg_code">
          <el-input v-model="form.reg_code" autocomplete="off" placeholder="短信验证" style="width: 30%"></el-input>
        </el-form-item>-->
        <el-form-item label="证件附件：" prop="fImgUrl">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrlImg()"
            :show-file-list="false"
            :on-success="succImgAdd">
            <img v-if="form.fImgUrl" :src="form.fImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="register('form')" class="confirm">注 册</el-button>
        <el-button @click="cancel" class="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!--手机校验-->
    <el-dialog
      :visible.sync="PhoneDia"
      width="25%"
      title="提示"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" :model="form" label-width="70px" class="PhoneForm">
        <p>登录需要手机验证</p>
        <p>您的手机是{{phoneNum}}，请输入验证码</p>
        <div class="PhoneForm-box">
          <el-col :span="16">
            <span>验证码：</span>
            <input type="text" v-model="FirstCode">
          </el-col>
          <el-col :span="8">
            <el-button
              size="medium"
              v-bind:disabled="codePhon"
              @click="Countdown"
            >获取验证码{{auth_time}}</el-button>
          </el-col>
        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="PhoneDia = false">取 消</el-button>
        <el-button type="primary" @click="verCode">确 定</el-button>
      </span>
    </el-dialog>
    <!--手机验证登录-->
    <el-dialog
      :visible.sync="PhoneDiaLogin"
      width="25%"
      title="手机验证登录"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="pf2"
    >
      <el-form ref="phoLog" :model="phoLog" label-width="70px" class="PhoneForm">
        <div class="PhoneForm-box pb2">
          <el-col :span="16" style="margin-bottom: 15px;">
            <span>手机号：</span>
            <input type="text" v-model="phoLog.phone">
          </el-col>
          <el-col :span="8">
            <el-button
              size="medium"
              v-bind:disabled="codePhon1"
              @click="Countdown2"
            >获取验证码{{auth_time1}}</el-button>
          </el-col>
          <el-col :span="24">
            <span>验证码：</span>
            <input type="text" v-model="phoLog.code">
          </el-col>

        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="PhoneDiaLogin = false">取 消</el-button>
        <el-button type="primary" @click="phoneCodeLogin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import config from "@/config/config.js";
import md5 from 'js-md5';

export default {
  //    name: 'HelloWorld',
  data() {
    var validatePass = (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z]*$/g;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if(reg.test(value)){
        callback();
      } else {
        return callback(new Error('密码只能为字母和数字'));
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      ////console.log(reg.test(value));
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的手机号'));
      }
    };
    var idCord = (rule, value, callback) => {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      ////console.log(reg.test(value));
      if (value === ''){
        callback();
      } else if(reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的身份证号'));
      }
    };
    return {

      // myHeaders :{Authorization:storage.get('token')},
      indexMenus: [],
      menuSubsystem: {
        换季申请: {
          url: "/season/#/quarterly",
          class: "icon iconfont icon-ji"
        },
        月度申请: {
          url: "/monthly/#/",
          class: "icon iconfont icon-tongji1"
        },
        区内管理: { url: "", class: "icon iconfont icon-tongji" },
        飞行程序: { url: "", class: "icon iconfont icon-flightSchedule" },
        临时航线: { url: "", class: "icon iconfont icon-hangxian" },
        ARINC424: { url: "", class: "icon iconfont icon-feihangxiaoshi" }
      },
      openURL: "",
      PhoneDia: false,
      PhoneDiaLogin: false,
      codePhon: false,
      codePhon1: false,
      codePhon2:false,
      auth_time: "",
      auth_time1: "",
      auth_timezc:"",
      // loginShow: true,
      newS: false,
      dynamicS: false,
      noticeS: false,
      isActive: 1,
      newsShow: [],
      trendsShow: [],
      noticeShow: [],
      Boxactive: false,
      boxShadow: "",
      bj: {
        qd: "",
        tj: "",
        zd: ""
      },
      userName: "",
      passWord: "",
      code: "",
      // Color : '#026ab3',
      Red: "Red",
      Black: "Black",
      dialogFormVisible: false,
      form: {
        respassword:"",
        username: "",
        password: "",
        unit: "",
        department: "",
        name: "",
        id_number: "",
        // accessory: "",
        phone: "",
        fImgUrl:"",
        furl : "",
        reg_code:""
      },
      fileList2: [],
      // reg_code: "",
      subSys: "",
      // 验证码
      FirstCode: "",
      // 首次登录用户手机号
      phoneNum: "",
      // 首次登录用户id
      IdNum: "",
      phoLog : {
        phone : '',
        code : ''
      },
      // 校验
      rules: {
        username: [
          { required: true, message: '用户名必填', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符之间', trigger: 'blur' }
        ],
        password: [
          {validator: validatePass, trigger: 'blur'},
          { min: 6,max:30, message: '长度在 6 到 30 个字符之间', trigger: 'blur' },
          {required: true, message: '请再次输入密码', trigger: 'blur'},
        ],
        respassword: [
          {validator: validatePass2, trigger: 'blur'},
          { min: 6,max:30, message: '长度在 6 到 30 个字符之间', trigger: 'blur' },
          {required: true, message: '请再次输入密码', trigger: 'blur'},
        ],
        unit:[
          { required: true, message: '所属单位必填', trigger: 'change' },
        ],
        name:[
          { required: true, message: '姓名必填', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符之间', trigger: 'blur' }
        ],
        phone:[
          { required: true, message: '手机号必填', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' },
        ],
        /*reg_code:[
          { required: true, message: '验证码必填', trigger: 'blur' }
        ],*/
        id_number:[
          { validator: idCord, trigger: 'blur' },
        ],
        fImgUrl:[
          { required: true, message: '证件照必传', trigger: 'blur' },
        ]
      },
      OrgOpt:[]
    };
  },
  methods: {

    // 上传图片地址
    uploadUrlImg(){
      return config.loginURL + '/mult/png';
    },
    // 新增图片上传
    succImgAdd(response, file, fileList) {
      console.log(response);
      let fileName = file.name;
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
      if (regex.test(fileName.toLowerCase())) {
        this.form.furl = response.data.revealImage;
        this.form.fImgUrl = URL.createObjectURL(file.raw);
      } else {
        this.$message.error('请选择图片文件');
      }
    },
    // 归属机构
    getAffiliate() {
      let params = {};
      API.get(config.loginURL + '/user/findMechanismAndRole', params).then((res) => {
        console.log(res.data)
        if (res.data.code == 200) {
          var arr = res.data.data.mechanismAll;
          this.OrgOpt = arr;
        }
      })
    },
    // 点击注册按钮
    Register(){
      // this.codePhon2 = false;
      // this.auth_timezc="";
      this.dialogFormVisible = true;
      this.getAffiliate();
      this.form = {
        respassword:"",
        username: "",
        password: "",
        unit: "",
        department: "",
        name: "",
        id_number: "",
        phone: "",
        fImgUrl:"",
        furl : "",
        reg_code:""
      }
      if (this.$refs.form) {
        this.$refs.form.clearValidate();
      } else {
        return;
      }
    },
    //注册
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form.furl)
          if(!this.form.furl){
            this.$message({
              type: 'error',
              message: '证件附件必须上传'
            });
          }else{
            let params = {};
            params["uName"] = this.form.username;
            params["uPasswd"] = md5(this.form.username+this.form.password);
            params["uMechanism"] = this.form.unit;
            params["uDepartmentName"] = this.form.department;
            params["uUsername"] = this.form.name;
            params["uIdNumber"] = this.form.id_number;
            params["uMobilephone"] = this.form.phone;
            // params["code"] = this.form.reg_code;
            params["uIdPhoto"] = this.form.furl;
            console.log(params)
            API.post(config.loginURL + '/user/create', params).then((res) => {
              console.log(res.data)
              if (res.data.code == 200) {
                this.$message({
                  type: 'success',
                  message: "注册成功"
                });
                this.dialogFormVisible = false;
              }else{
                this.$message({
                  type: 'error',
                  message: res.data.message
                });
              }
            })
          }
        }
      })
    },
/*    // 注册验证码
    Countdown3() {
      if(this.form.phone == ''){
        this.$message({
          type: "error",
          message: "请输入手机号!"
        });
      }else {
        this.codePhon2 = true;
        this.auth_timezc = 60;
        var auth_timetimer = setInterval(() => {
          this.auth_timezc--;
          if (this.auth_timezc <= 0) {
            this.auth_timezc = "";
            this.codePhon2 = false;
            clearInterval(auth_timetimer);
          }
        }, 1000);

        let params = {};
        // 验证码
        params["phone"] = this.form.phone;
        params["type"] = 2;
        // console.log(params)
        API.get(config.loginURL + "/code/verificationCode", params).then(res => {
          // console.log(res.data)
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "验证码发送成功!"
            });
          }else {
            this.$message({
              type: "error",
              message: res.data.message
            });
            clearInterval(auth_timetimer);
            this.auth_timezc = "";
            this.codePhon2 = false;
          }
        });
      }
    },*/


    // 新闻 动态 公告切换
    newsTab(id) {
      this.isActive = id;
    },
    newsList() {
      if (this.isActive === 1) {
        this.$router.push({ path: "/news/list" });
      } else if (this.isActive === 2) {
        this.$router.push({ path: "/dynamic/list" });
      } else if (this.isActive === 3) {
        this.$router.push({ path: "/notice/list" });
      }
    },
    getNewList() {
      // 新闻
      let params = {};
      var arr = [];
      var num = 0;
      API.get("/newsInfo/FindAllByrelease", params).then(res => {
        // console.log(res.data);
        if (res.data.code == 200) {
          for(var i=0;i<res.data.data.length;i++){
            res.data.data[i].url = config.baseURL + res.data.data[i].fImgUrl;
          }
          if (res.data.data.length <= 3) {
            this.newsShow = res.data.data;
          } else {
            for (var i = 0; i < 3; i++) {
              arr.push(res.data.data[i]);
            }
            this.newsShow = arr;
          }
          for (var i = 0; i < this.newsShow.length; i++) {
            if (this.newsShow[i].fTop == 1) {
              num++;
            }
          }
          if (num > 0) {
            this.newS = true;
          }
        } else {
          console.log(res.data);
        }
      });
    },
    getTrendsList() {
      // 动态
      let params = {};
      var arr = [];
      var num = 0;
      API.get("/newsInfo/FindAllByrelease1", params).then(res => {
        //console.log(res.data)
        if (res.data.code == 200) {
          if (res.data.data.length <= 4) {
            this.trendsShow = res.data.data;
          } else {
            for (var i = 0; i < 4; i++) {
              arr.push(res.data.data[i]);
            }
            this.trendsShow = arr;
            //console.log(this.trendsShow);
            for (var i = 0; i < this.trendsShow.length; i++) {
              if (this.trendsShow[i].fTop == 1) {
                num++;
              }
            }
            if (num > 0) {
              this.dynamicS = true;
            }
          }
        } else {
          //console.log(res.data)
        }
      });
    },
    getNoticeList() {
      //动态
      let params = {};
      var arr = [];
      var num = 0;
      API.get("/notice/FindAllByrelease", params).then(res => {
        //console.log(res.data)
        if (res.data.code == 200) {
          if (res.data.data.length <= 4) {
            this.noticeShow = res.data.data;
          } else {
            for (var i = 0; i < 4; i++) {
              arr.push(res.data.data[i]);
            }
            this.noticeShow = arr;
          }
          //console.log(this.noticeShow);
          for (var i = 0; i < this.noticeShow.length; i++) {
            if (this.noticeShow[i].nTop == 1) {
              num++;
            }
          }
          if (num > 0) {
            this.noticeS = true;
          }
        } else {
          //console.log(res.data)
        }
      });
    },
    newsGo(id) {
      this.$router.push({ name: "newDetails", query: { id: id } });
    },
    noticeGo(id) {
      this.$router.push({ name: "noticeDetails", query: { id: id } });
    },
    dynamicGo(id) {
      this.$router.push({ name: "deynamicDetails", query: { id: id } });
    },
    // 走向建议
    Lookzxjy() {
      //console.log(this.bj)
    },
    // 进入子系统
    subsystem(flag) {
      //alert(flag)
      this.boxShadow = flag;
      let menus = this.indexMenus;
      //遍历从后台拿到的子系统ID 赋值
      for (let i = 0; i < menus.length; i++) {
        if (flag === menus[i].name) {
          this.openURL = this.menuSubsystem[flag].url;
          this.subSys = menus[i].id;
          return;
        } else {
          this.subSys = -1;
        }
      }
    },
    // 登录
    login() {
      if (this.subSys == "") {
        this.$message({
          type: "error",
          message: "请先选择子系统!"
        });
      } else {
        if (!this.userName) {
          this.$message({
            type: "error",
            message: "请输入用户名!"
          });
        } else if (!this.passWord) {
          this.$message({
            type: "error",
            message: "请输入密码!"
          });
        } else {
          // this.boxShadow = '';
          let params = {};
          // 子系统
          params["MenuId"] = this.subSys;
          params["uName"] = this.userName;
          params["uPasswd"] = md5(this.userName + this.passWord);
          // console.log(params);
          // this.loginSubsystem("res.data.dat");
          API.post(config.loginURL + "/user/ReceptionLogin", params).then(
            res => {
              // console.log(res.data)
              if (res.data.code == 200) {
                //登录成功后 执行跳转，把数据传过去
                this.loginSubsystem(res.data.data);
                this.phoLog.code = "";
                this.passWord = "";
                this.FirstCode = "";
                this.phoneNum = "";
                this.IdNum = "";
                this.$message({
                  type: "success",
                  message: "登录成功！"
                });
              } else if (res.data.code == 10004) {
                this.$message({
                  type: "error",
                  message: res.data.message
                });
              } else if (res.data.code == 10005) {
                this.$message({
                  type: "error",
                  message: res.data.message
                });
              } else if (res.data.code == 10014) {
                this.PhoneDia = true;
                this.phoneNum = res.data.data.uMobilephone;
                this.IdNum = res.data.data.id;
              } else if(res.data.code == 10021){
                this.$message({
                  type: "error",
                  message: res.data.message
                });
              }else {
                this.$message({
                  type: "error",
                  message: res.data.message
                });
              }
            });
        }
      }
    },

    // 获取验证码、倒计时
    Countdown() {
      this.codePhon = true;
      this.auth_time = 60;
      var auth_timetimer = setInterval(() => {
        this.auth_time--;
        if (this.auth_time <= 0) {
          this.auth_time = "";
          this.codePhon = false;
          clearInterval(auth_timetimer);
        }
      }, 1000);

      let params = {};
      // 验证码
      params["userId"] = this.IdNum;
      params["type"] = 2;
      params["MenuId"] = this.subSys;
      console.log(params)
      API.get(config.loginURL + "/code/userVerificationCode", params).then(res => {
        // console.log(res.data)
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "验证码发送成功!"
          });
        }else {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
      });
    },
    // 校验验证码
    verCode() {
      //console.log(this.FirstCode)
      this.PhoneDia = false;
      let params = {};
      params["code"] = this.FirstCode;
      params["MenuId"] = this.subSys;
      params["uName"] = this.userName;
      params["uPasswd"] = md5(this.userName + this.passWord);
      // console.log(params)
      API.post(config.loginURL + "/user/ReceptionLogin", params).then(res => {
        // console.log(res.data)
        if (res.data.code == 200) {
          //登录成功后 执行跳转，把数据传过去
          this.loginSubsystem(res.data.data);
          this.$message({
            type: "success",
            message: "登录成功！"
          });
          this.passWord = "";
          this.FirstCode = "";
          this.phoneNum = "";
          this.IdNum = "";
        }else {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
      });
    },
    //执行跳转和存数据
    loginSubsystem(data) {
      storage.setJson("BUser", {
        id: data.id,
        name: data.uName,
        company: "中国国际航空公司",
        url: data.url,
        token: data.jwt
      });
      window.open(this.openURL);
    },
    // 手机验证码登录
    PhoneLogin(){
      if (this.subSys == "") {
        this.$message({
          type: "error",
          message: "请先选择子系统!"
        });
      }else {
        this.PhoneDiaLogin = true;
      }
    },
    // 手机验证码登录获取验证码、倒计时
    Countdown2() {
      if(this.phoLog.phone == ''){
        this.$message({
          type: "error",
          message: "请输入手机号!"
        });
      }else {
        this.codePhon1 = true;
        this.auth_time1 = 60;
        var auth_timetimer = setInterval(() => {
          this.auth_time1--;
          if (this.auth_time1 <= 0) {
            this.auth_time1 = "";
            this.codePhon1 = false;
            clearInterval(auth_timetimer);
          }
        }, 1000);

        let params = {};
        // 验证码
        params["phone"] = this.phoLog.phone;
        params["type"] = 2;
        // console.log(params)
        API.get(config.loginURL + "/code/verificationCode", params).then(res => {
          // console.log(res.data)
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "验证码发送成功!"
            });
          }else {
            this.$message({
              type: "error",
              message: res.data.message
            });
            clearInterval(auth_timetimer);
            this.codePhon1 = false;
            this.auth_time1 = '';
          }
        });
      }
    },
    // 手机验证码点击确定登录
    phoneCodeLogin(){
      if(this.phoLog.phone == ''){
        this.$message({
          type: "error",
          message: "请输入手机号!"
        });
      }else if(this.phoLog.code == ''){
        this.$message({
          type: "error",
          message: "请先输入验证码!"
        });
      }else {
        let params = {};
        // 子系统
        params["MenuId"] = this.subSys;
        params["code"] = this.phoLog.code;
        params["phone"] = this.phoLog.phone;
        // console.log(params)
        API.post(config.loginURL + "/user/ReceptionLogin", params).then(
          res => {
            // console.log(res.data)
            if (res.data.code == 200) {
              //登录成功后 执行跳转，把数据传过去
              this.loginSubsystem(res.data.data);
              this.phoLog.code = "";
              this.passWord = "";
              this.FirstCode = "";
              this.phoneNum = "";
              this.IdNum = "";
              this.$message({
                type: "success",
                message: "登录成功！"
              });
              this.PhoneDiaLogin = false;
            } else if (res.data.code == 10004) {
              this.$message({
                type: "error",
                message: res.data.message
              });
            } else if (res.data.code == 10005) {
              this.$message({
                type: "error",
                message: res.data.message
              });
            } else if (res.data.code == 10014) {
              this.PhoneDia = true;
              this.phoneNum = res.data.data.uMobilephone;
              this.IdNum = res.data.data.id;
            }else if(res.data.code == 10021){
              this.$message({
                type: "error",
                message: res.data.message
              });
            }
          });
      }
    },
    // 验证码
    validate() {
      //console.log(this.userName)
      let val = /^1[34578]\d{9}$/;
      if (!val.test(this.userName)) {
        this.$message({
          type: "error",
          message: "请输入正确的手机号!"
        });
      } else {
        let params = {};
        params["userName"] = this.userName;
        API.get("static/news.json", params).then(res => {
          if (res.status == 200) {
          } else {
            //console.log(res.data)
          }
        });
      }
    },
    // 注册验证码

    cancel() {
      this.dialogFormVisible = false;
      this.form.name = "";
      this.form.unit = "";
      this.form.password = "";
      this.form.phone = "";
      this.form.department = "";
      this.form.id_number = "";
      this.form.accessory = "";
      this.form.username = "";
      this.reg_code = "";
    },


    //查询子系统菜单ID
    getIndexMenu() {
      API.get(config.loginURL + "/menu/showListByid", { id: 3 })
        .then(response => {
          if (response.data.code == 200) {
            this.indexMenus = response.data.data;
            // console.log(this.indexMenus)
          } else {
            // console.log(response);
            this.$message({
              type: "error",
              message: "子系统菜单查询错误：" + response.data.message
            });
          }
        })
        .catch(error => {
          // console.log(error.response);
          this.$message({
            type: "error",
            message: "服务器异常"
          });
        });
    }
  },
  created() {
    this.getNewList();
    this.getTrendsList();
    this.getNoticeList();
    this.getIndexMenu();


  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .sel-Org .el-form-item__error {
    left: 120px;
  }
  .sel-Org .el-form-item__content {
    margin-left: 4% !important;
    width: 80%;
  }
  .sel-Org .el-form-item__content .el-select {
    width: 80%;
  }
  .avatar-uploader {
    float: left;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.el-dialog__footer {
  padding: 30px 20px 20px;
}
  .rrr {
    color: #026ab3 !important;
  }
.pf2 .el-dialog__body {
  padding: 10px 20px 0px;
}
  .pf2 .el-dialog__footer {
    padding: 20px 20px 20px;
  }
</style>
<style scoped lang="less">
  .pf2 {
    el-dialog__body {

    }
  }
.PhoneForm {
  text-align: left;
  p {
    line-height: 30px;
  }
  .PhoneForm-box {
    margin: 5px 0;
  }
  .pb2 {
    overflow: hidden;
  }

  input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 35px;
    line-height: 35px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}

.el-form-item__label {
  font-size: 20px;
}

.el-input {
  width: 80%;
  float: left;
}

.sign-dialog {
  width: 100%;
  .el-dialog__header {
    .el-dialog__title {
      font-size: 18px;
      font-weight: bold;
    }
  }
  .code-btn {
    display: block;
    height: 40px;
    background: #409eff;
    /*width: 80px;*/
    float: left;
    color: #fff;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    margin-left: 10px;
  }
}

.Boxactive {
  background: #fff!important;
  color: #026ab3!important;
  i {
    color: #026ab3!important;
  }
}

.Red {
  color: #cf2727 !important;
}

.Black {
  color: #0b0306 !important;
}

.home-page {
  width: 100%;
  .banner {
    margin-bottom: 30px;
    width: 100%;
    .img {
      width: 100%;
      display: block;
    }
  }
  .newst {
    position: relative;
    .newsts {
      width: 8px;
      height: 8px;
      background: red;
      position: absolute;
      left: 45px;
      top: 20px;
      border-radius: 4px;
    }
  }
  .middle-table {
    .module {
      overflow: hidden;
      margin: 42px auto 30px;
      .cell {
        width: 380px;
        height: 165px;
        cursor: pointer;
        display: block;
        position: relative;
        float: left;
        img {
          width: 100%;
          height: 165px;
        }
        .words {
          position: absolute;
          color: #ffffff;
          font-size: 30px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          -webkit-transform: translate(-50%, -50%);
        }
        &:nth-child(2) {
          margin: 0 30px;
        }
        &:last-child {
          float: right;
        }
      }
    }
    .trends {
      margin-top: 60px;
      height: 352px;
      .title {
        font-size: 24px;
        font-weight: 600;
        height: 72px;
        line-height: 72px;
        color: #026ab3;
        text-align: left;
      }
      .left {
        width: 790px;
        height: 352px;
        float: left;
        .scheme{
          width: 100%;
          height: 275px;
          img {
            width: 100%;
            height: 275px;
          }
        }
      }
      .right-1 {
        width: 380px !important;
      }
      .right {
        width: 400px;
        height: 352px;
        float: right;
        .input-table {
          .cell {
            width: 100%;
            margin-bottom: 20px;
            position: relative;
            line-height: 50px;
            height: 50px;
            .input {
              padding-left: 80px;
              width: 100%;
              height: 50px;
              font-size: 16px;
              box-sizing: border-box;
            }
            .mask {
              position: absolute;
              display: block;
              width: 50px;
              height: 50px;
              background: #026ab3;
              .icon {
                color: #fff;
                font-size: 28px;
              }
            }
            &.button {
              color: #fff;
              text-align: center;
              font-size: 18px;
              cursor: pointer;
              background: #026ab3;
            }
            &:nth-child(3) {
              margin-bottom: 35px;
            }
          }
        }
      }
    }
    .messages {
      position: relative;
      height: 560px;
      .news-bg {
        position: absolute;
        width: 1150px;
        height: 560px;
        background: url(./../assets/images/news-bg.png) no-repeat 0 0;
        -webkit-background-size: 1150px 560px;
        background-size: 1150px 560px;
        top: 0;
        left: -360px;
      }
      .left {
        width: 790px;
        height: 560px;
        position: relative;
        float: left;
        .tab {
          width: 300px;
          height: 80px;
          .item {
            float: left;
            width: 100px;
            cursor: pointer;
            text-align: left;
            line-height: 80px;
            font-size: 18px;
            &.active {
              font-size: 24px;
              line-height: 77px;
              font-weight: 600;
              color: #026ab3;
            }
          }
        }
        .more {
          position: absolute;
          width: 110px;
          height: 36px;
          line-height: 36px;
          font-size: 16px;
          color: #fff;
          background: #c5cbd1;
          right: 30px;
          top: 22px;
          cursor: pointer;
        }
        .tab-content {
          width: 100%;
          .item {
            display: none;
            .list {
              float: left;
              display: block;
              cursor: pointer;
              height: auto;
              margin-right: 18px;
              width: 240px;
              .img {
                width: 240px;
                display: block;
              }
              div {
                text-align: left;
                line-height: 30px;
                font-size: 18px;
                &.title {
                  margin: 19px 0 8px;
                  height: 60px;
                  overflow: hidden;
                  color: #0b0306;
                  font-weight: 600;
                }
                &.article {
                  color: #666666;
                  height: 150px;
                  overflow: hidden;
                }
                &.time {
                  color: #666666;
                  margin-top: 30px;
                  font-weight: 600;
                }
              }
              &:last-child {
                margin: 0;
              }
            }
            &.active {
              display: block;
            }
            &.common {
              height: 480px;
              width: 790px;
              .list {
                clear: both;
                width: 790px;
                height: auto;
                padding-right: 30px;
                box-sizing: border-box;
                text-align: left;
                line-height: 30px;
                font-size: 18px;
                .title {
                  height: 28px;
                  margin: 0;
                  line-height: 28px;
                  overflow: hidden;
                  color: #0b0306;
                  font-weight: 600;
                }
                .article {
                  color: #666666;
                  height: 60px;
                  overflow: hidden;
                }
                .time {
                  color: #666666;
                  margin-top: 2px;
                  height: 30px;
                  text-align: right;
                  font-weight: 600;
                }
              }
            }
          }
        }
      }
      .right {
        width: 400px;
        /*padding: 0 10px;*/
        box-sizing: border-box;
        height: 352px;
        float: right;
        .nav-table {
          overflow: hidden;
          margin-bottom: 15px;
          padding-left: 20px;
          .cell {
            display: block;
            cursor: pointer;
            width: 120px;
            padding-top: 15px;
            height: 120px;
            float: left;
            box-sizing: border-box;
            background: #026ab3;
            color: #fff;
            margin-bottom: 10px;
            .mask {
              width: 48px;
              height: 48px;
              background: #fff;
              margin: 0 auto;
              border-radius: 50%;
              .icon {
                font-size: 40px;
                color: #026ab3;
                line-height: 51px;
              }
            }
            .name {
              font-size: 18px;
              line-height: 45px;
            }
            .icon {
              color: #fff;
              font-size: 48px;
              &.icon-ji {
                font-size: 56px;
              }
            }
            &:nth-child(2) {
              margin: 0 10px 10px;
            }
            &:nth-child(5) {
              margin: 0 10px 10px;
            }
            &:first-child {
              padding-top: 6px;
            }
          }
        }
        .input-table {
          .cell {
            width: 100%;
            margin-bottom: 20px;
            position: relative;
            line-height: 50px;
            overflow: hidden;
            height: 50px;
            .input {
              padding-left: 80px;
              width: 100%;
              height: 50px;
              font-size: 16px;
              box-sizing: border-box;
            }
            .mask {
              position: absolute;
              display: block;
              width: 50px;
              height: 50px;
              background: #026ab3;
              .icon {
                color: #fff;
                font-size: 30px;
              }
            }
            .code {
              padding-left: 15px;
              width: 230px;
              float: left;
            }
            .code-btn {
              display: block;
              height: 50px;
              background: #026ab3;
              width: 128px;
              float: right;
              color: #fff;
              text-align: center;
              font-size: 18px;
              cursor: pointer;
            }
            &.button {
              color: #fff;
              text-align: center;
              font-size: 18px;
              cursor: pointer;
              background: #026ab3;
            }
            &:nth-child(3) {
              margin-bottom: 35px;
            }
          }
        }
      }
    }
  }
  .loginTab {
    width: 380px;
    /*height: 275px;*/
    height: 355px;
    padding-left: 20px;
    p:nth-of-type(1) {
      text-align: center;
      font-size: 16px;
      line-height: 40px;
      margin-top: 100px;
      font-weight: bold;
    }
    p:nth-of-type(2) {
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      color: #026ab3;
      cursor: pointer;
    }
  }
}
</style>
