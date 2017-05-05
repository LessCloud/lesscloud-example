<template>
    <el-form ref="form" :model="loginForm" label-width="80px">
      <center><h3>登录账户</h3></center>
      <el-form-item label="账户ID">
        <el-input v-model="loginForm.id" placeholder="支持：手机号码 / 邮箱地址"></el-input>
      </el-form-item>
      <el-form-item label="账户密码">
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin">立即登录</el-button>
        &nbsp;&nbsp;<router-link to='/account/register'>创建新账号</router-link> | <router-link to='/account/forget'>忘记密码？</router-link>
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
            loginForm:{id: null,password: null},
            id: null,
            password:null,
            forgetForm: false,
            loggedin: false
        }
  },
  methods: {
    close: function(){
        this.loginForm.id = null;
        this.loginForm.password = null;
    },
    setLoggedStatusWithCookie: function(){
        var cookieName = 'logged';
        var cookieValue = 'yes';
        var myDate = new Date();
        myDate.setMonth(myDate.getMonth() + 12);
        document.cookie = cookieName +"=" + cookieValue + ";expires=" + myDate + ";domain=.lesscloud.com;path=/";
    },
    onLogin:function() {
        if(this.loginForm.id!==undefined && this.loginForm.password!==undefined) {
            const loginAPI = lcAPI.restful.custom('https://api.lesscloud.com/user/login', false);
            loginAPI.post(this.loginForm).then( (response) => {
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
    }
  }
}
</script>