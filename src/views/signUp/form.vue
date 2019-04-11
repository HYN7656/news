<template>
  <div class="formBox">
    <p class="titleH">
      <span>请填写报名表单</span>
    </p>
      <el-form ref="form"
               :model="form"
               status-icon
               :rules="rules">
        <el-form-item label="参会名称：" :label-width="formLabelWidth" prop="sName">
          <el-input v-model="sName" autocomplete="off" placeholder="请填写参会名称" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="参会人名称：" :label-width="formLabelWidth" prop="sPeopleName">
          <el-input v-model="form.sPeopleName" autocomplete="off" placeholder="请填写参会人名称"></el-input>
        </el-form-item>
        <el-form-item label="所属单位：" :label-width="formLabelWidth" prop="sUnit">
          <el-input v-model="form.sUnit" autocomplete="off" placeholder="请填写所属单位"></el-input>
        </el-form-item>
        <el-form-item label="职位：" :label-width="formLabelWidth" class="inpSel" prop="pDuty">
          <el-autocomplete
            class="inline-input"
            v-model="form.pDuty"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="联系方式：" :label-width="formLabelWidth" prop="sMobile">
          <el-input v-model="form.sMobile" autocomplete="off" placeholder="请填写联系方式"></el-input>
        </el-form-item>
        <el-form-item label="到会日期：" :label-width="formLabelWidth" prop="sTime">
          <el-input v-model="form.sTime" autocomplete="off" placeholder="请填写到会日期" @focus="openPick1"></el-input>
          <mt-datetime-picker
            ref="picker1"
            type="date"
            :startDate="startDate"
            @confirm="handleConfirm1">
          </mt-datetime-picker>
          <!--v-model="form.date"-->
        </el-form-item>
        <el-form-item label="到会时间：" :label-width="formLabelWidth" prop="sHalf">
          <el-select v-model="form.sHalf" placeholder="请选择到会时间">
            <el-option label="上午" value="上午"></el-option>
            <el-option label="下午" value="下午"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="乘坐交通工具：" prop="resource" :label-width="formLabelWidth" class="jtgj">
          <el-radio-group v-model="form.sVehicle" >
            <el-radio label="0">火车</el-radio>
            <el-radio label="1">飞机</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="车次/航班号：" :label-width="formLabelWidth" prop="sTrain">
          <el-input v-model="form.sTrain" autocomplete="off" placeholder="请填写车次/航班号"></el-input>
        </el-form-item>
        <el-form-item label="时间：" :label-width="formLabelWidth">
          <el-input v-model="form.sTrainTime" autocomplete="off" placeholder="请填写时间" @focus="openPick2"></el-input>
          <mt-datetime-picker
            ref="picker2"
            type="datetime"
            :startDate="startDate"
            @confirm="handleConfirm2">
          </mt-datetime-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save('form')" class="confirm" :loading='loadingBtn'>提 交</el-button>
      </div>

  </div>

</template>

<script>
   import moment from 'moment'
    export default {
      data(){
        var checkPhone = (rule, value, callback) => {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
          ////console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        };
        var validate = (rule, value, callback) => {
          const reg = /^[0-9a-zA-Z]*$/g;
          if (value === '') {
            callback();
          } else if(reg.test(value)){
            callback();
          } else {
            return callback(new Error('只能为字母和数字'));
          }
        };
        return{
          loadingBtn:false,
          datail:{},
          formVis : true,
          formLabelWidth : '',
          mId : '',
          sName: '',
          form: {
            // sForm: '',
            sPeopleName:'',
            sUnit:'',
            sMobile:'',
            sTime: '',
            sHalf:'',
            sVehicle:'0',
            sTrain:'',
            sTrainTime:'',
            pDuty:''
          },
          // pickerValue:'',
          startDate:new Date(),
          restaurants: [],
          // pDuty: '',
          rules: {
            sPeopleName: [
              {required: true, message: '参会人姓名必填', trigger: 'change'},
              {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'change'}
            ],
            sUnit: [
              {required: true, message: '所属单位必填', trigger: 'change'},
              {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'change'}
            ],
            sMobile: [
              {required: true, message: '联系方式必填', trigger: 'change'},
              { validator: checkPhone, trigger: 'change' },
            ],
            sTime: [
              {required: true, message: '到会日期必填', trigger: 'change'},
            ],
            sHalf: [
              {required: true, message: '到会时间必填', trigger: 'change'},
            ],
            pDuty: [
              {required: true, message: '职位必填', trigger: 'change'},
              {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'change'}
            ],
            sTrain : [
              {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'change'},
            ],
          },
          num : 0,
        }
      },
      methods:{
        getPage(){
          this.sName = this.$route.query.name;
          this.mId = this.$route.query.id;
          // console.log(this.mId);
        },
        openPick1(){
          this.$refs.picker1.open();
          document.activeElement.blur();
        },
        openPick2(){
          this.$refs.picker2.open();
          document.activeElement.blur();
        },
        handleConfirm1 (data) {
          let date = moment(data).format('YYYY-MM-DD');
          this.form.sTime = date;
        },
        handleConfirm2 (data) {
          let date = moment(data).format('YYYY-MM-DD HH:mm:ss');
          this.form.sTrainTime = date;
        },
        save(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.num ++;
              if(this.num == 1){
                this.loadingBtn = true;
                let params = {};
                // params['sForm'] = this.form.sForm;
                params['pName'] = this.sName;
                params['pPeopleName'] = this.form.sPeopleName;
                params['pUnit'] = this.form.sUnit;
                params['pDuty'] = this.form.pDuty;
                params['pMobile'] = this.form.sMobile;
                params['pTime'] = this.form.sTime;
                params['pHalf'] = this.form.sHalf;
                params['pVehicle'] = this.form.sVehicle;
                params['pTrain'] = this.form.sTrain;
                params['pTrainTime'] = this.form.sTrainTime;
                params['pMeetingId'] = this.mId;
                console.log(params);
                API.post('/meetingPeople/addMetPeople', params).then((res) => {
                  console.log(res.data);
                  if (res.data.code == 200) {
                    this.$message({
                      type: 'success',
                      message: '提交成功!'
                    });
                    this.loadingBtn = false;
                    this.$router.push({name: 'sign.detail', query: {id: this.mId}});
                  } else {
                    this.$message({
                      type: 'error',
                      message: '提交失败!'+res.data.message
                    });
                    this.loadingBtn = false;
                  }
                });
              }else {
                return;
              }

            }
          })
        },
        querySearch(queryString, cb) {
          var restaurants = this.restaurants;
          var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
          // 调用 callback 返回建议列表的数据
          cb(results);
        },
        createFilter(queryString) {
          return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          };
        },
        loadAll() {
          return [
            { "value": "总经理" },
            { "value": "总经理助理" },
            { "value": "总监" },
            { "value": "主任" },
            { "value": "主管" },
            { "value": "经理" },
            { "value": "副总经理" },
            { "value": "副总监" },
            { "value": "副主任" },
            { "value": "副经理" },
            { "value": "工程师" },
            { "value": "情报员" },
            { "value": "签派员" },
            { "value": "运控员" },
          ];
        },
        handleSelect(item) {
          console.log(item);
        }
      },
      created() {
        this.getPage();
      },
      mounted() {
        this.restaurants = this.loadAll();
      }
    }
</script>
<style>
  .inpSel .el-autocomplete {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
  }
  .el-form-item__error {
    right: 0;
    left: initial;
  }
</style>
<style scoped lang="less">
  html {
    font-size: 16px;
  }
  .my-autocomplete {
    li {
      line-height: normal;
      padding: 7px;

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .addr {
        color: #ddd;
      }
    }
  }
  .formBox {
    width: 80%;
    margin: 30px auto;
    .titleH {
      margin-bottom: 20px;
      span {
        color: #026ab3;
        line-height: 30px;
        border-bottom: 2px solid #026ab3;
        padding-bottom: 5px;
        font-size: 1.1rem;
        font-weight: bold
      }
    }
    .el-form-item {
     margin-bottom: 0;
      .el-select {
        width: 100%;
      }
    }
    .dialog-footer {
      margin-top: 30px;
    }
    .jtgj {
      margin-top: 10px;
    }
  }
</style>


