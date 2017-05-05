<template>
    <el-form ref="form" :model="registerForm" label-width="80px">
      <center><h3>创建新账号</h3></center>
      <el-form-item label="账户ID">
        <el-input v-model="registerForm.id" placeholder="支持：手机号码 / 邮箱地址"></el-input>
      </el-form-item>

      <el-form-item label="验证码" v-if="showSMSForm()">
        <el-input placeholder="请输入接收到的短信验证码" v-model="registerForm.code">
            <el-button slot="append" class="send-code-btn" @click.native="sendSMSCode()">发送验证码</el-button>
        </el-input>
      </el-form-item>

      <el-form-item label="账户密码">
        <el-input v-model="registerForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">立即注册</el-button>
        &nbsp;&nbsp;<router-link to='/account/login'>已有账号</router-link> | <router-link to='/account/forget'>忘记密码？</router-link>
      </el-form-item>
    </el-form>
</template>

<script>
import lcAPI from 'lesscloud-sdk'
import Vue from 'vue'
import { Tooltip,
Button,
Loading,
Popover,
Message,
MessageBox,
Form,
FormItem,
Select,
Input,
Radio,
RadioGroup,
RadioButton,
Checkbox,
CheckboxGroup,
Switch,
Select,
Option,
OptionGroup,
Button,
ButtonGroup
} from 'element-ui'

Vue.use(Tooltip)
Vue.use(Button)
Vue.use(Loading)
Vue.use(Popover)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)

Vue.prototype.$message = Message

export default{
  data(){
        return {
            registerForm:{id: null, code:null, password: null},
            id: null,
            password:null,
            forgetForm: false,
            loggedin: false
        }
  },
  methods: {
    close: function(){
        this.registerForm.id = null;
        this.registerForm.password = null;
    },
    showSMSForm: function() {
        var id = this.registerForm.id;
        if(id!=null && id.length==11 && !isNaN(id) && id.charAt(0)=='1'){
            return true;
        }
        return false;
    },
    setLoggedStatusWithCookie: function(){
        var cookieName = 'logged';
        var cookieValue = 'yes';
        var myDate = new Date();
        myDate.setMonth(myDate.getMonth() + 12);
        document.cookie = cookieName +"=" + cookieValue + ";expires=" + myDate + ";domain=.lesscloud.com;path=/";
    },
    onLogin:function() {
        if(this.registerForm.id!==undefined && this.registerForm.password!==undefined) {
            const loginAPI = lcAPI.restful.custom('https://api.lesscloud.com/user/login', false);
            loginAPI.post(this.registerForm).then( (response) => {
              const data = response.body().data()
                if(data.JWT===false || data.JWT=="") {
                      this.$message.error('登录失败')
                }else{
                      this.afterLogin(data);
                }
            },
            (response) => this.$message.error('登录失败')
          );
        }
    },
    afterLogin: function(data){
        this.setLoggedStatusWithCookie();
        localStorage.setItem('JWT', data.JWT);
        localStorage.setItem('LESSCLOUD_USER_INFO', JSON.stringify(data.LESSCLOUD_USER_INFO));
        // todo to save the user info like user role and score or other something
        // Vue.http.headers.common['Authorization'] = 'Bearer '+response.data.JWT;
        window.location="/";
        this.loggedin = true;
    },
    register:function(model){
        const loginAPI = lcAPI.restful.custom('https://api.lesscloud.com/user/register', false);
        loginAPI.post(this.registerForm).then((response) => {
            if(this.id.indexOf('@')!=-1) {
                this.$message({message: '验证邮件已发送到你的信箱请查收并完成账户验证', type: 'success'});
            }else{
                this.$message({message: '注册新账号成功', type: 'success'});
                this.onLogin();
            }
        }).catch(
             (response) => {this.$message.error('注册失败');}
        )
    },
    sendSMSCode: function() {
        // https://api.lesscloud.com/message/code?phone=17051100691&id=574dcba3fa4634b45330a2b5
        var smsURI = 'https://api.lesscloud.com/message/code?id='+this.registerForm.id+'&scene=register';
        const smsAPI = lcAPI.restful.custom(smsURI, false);
        smsAPI.get().then( (response) => {
            this.$message({message: '短信验证码已发送，请查收', type: 'success'});
            countdown();
        }).catch((response) =>  this.$message.error('短信发送失败，请重试'));
        var countdown = function(){
            var step = 59;
            var codeBtn = document.querySelectorAll('.send-code-btn span')[0];
            codeBtn.innerHTML = '60秒后重新发送';
            var _res = setInterval(() => {
                codeBtn.parentNode.setAttribute('disabled','disabled');
                codeBtn.innerHTML = step+'秒后重新发送';
                step-=1;
                if(step <= 0){
                    codeBtn.parentNode.setAttribute('disabled', false);
                    codeBtn.innerHTML = '获取验证码';
                    clearInterval(_res);
                }
            },1000);
        }
        countdown();
    },
  }
}
</script>