<template>
    <div  class="col-md-6 col-md-offset-3">
    <div id="forget-form">
            <center><h3>找回密码</h3></center>
            <div class="form-horizontal">
                <div class="form-group">
                    <label for="id" class="form-label">账户</label>
                    <input id="id" class="form-control" v-model="id" placeholder="请输入手机号码或电子邮箱地址">
                </div>
                <div class="form-group" v-if="showSMSForm()">
                    <label for="code" class="form-label">短信验证码</label>
                    <input type="text" class="form-control" v-model="code" placeholder="请输入接收到的短信验证码" x-autocompletetype="code" autocomplete="off" style="border-right:0;float:left;">
                    <button class="send-code-btn" @click="sendSMSCode()"><i class="add sign box icon"></i>发送验证码</button>
                </div>
                <div class="form-group" v-if="showSMSForm()">
                    <label for="password" class="form-label">新密码</label>
                    <input id="password" type="password" class="form-control" v-model="password" placeholder="请输入新密码">
                </div>

                <div class="form-group pull-right">
                    <a v-link='{name: "user.login"}'>登录</a> | 
                    <a v-link='{name: "user.register"}'>创建新账户</a>
                    <button class="hollow-btn" @click="saveModel('user')">找回密码</button>
                </div>

                <div class="clearfix"></div>

            </div>
        </div>
    </div>
</template>

<script>

export default {
  data(){
    return {
            id: null,
            password:null,
            code: null
    }
  },
  ready:function(){
  },

  methods: {
    sendSMSCode: function() {
        var registerUrl = HTTPSchema+APIDomain+'/message/code?scene=reset';
        var data = '{"id": '+this.id+'}';
        this.$http.post(registerUrl, data).then(
            function (response) {
                ralert('短信验证码已发送，请查收');
                countdown();
            },
            function (response) {
                ralert(response,'failure');
            }
        );

        var countdown = function(){
            var step = 59;
            $('.send-code-btn').html('60秒后重新发送');
            var _res = setInterval(function() {
                $(".send-code-btn").attr('disabled',"disabled");
                $('.send-code-btn').html(step+'秒后重新发送');
                step-=1;
                if(step <= 0){
                    $(".send-code-btn").prop("disabled", false);
                    $('.send-code-btn').html('获取验证码');
                    clearInterval(_res);
                }
            },1000);
        }
    },
    showSMSForm: function() {
        if(this.id!=null && this.id.length==11 && !isNaN(this.id) && this.id.charAt(0)=='1'){
            return true;
        }
        return false;
    },
    close: function(){
        this._modal_show = false;
        this.id = null;
        this.password = null;
        this.code = null;
    },
    saveModel:function(model){
        this.$data._id = undefined;
        var data = this.$data;

        var url = HTTPSchema+APIDomain+'/user/reset';
        if(this.id.indexOf('@')!=-1) {
            var url = HTTPSchema+APIDomain+'/user/send';
        }

        this.$http.post(url, data).then(
            function (response) {
                if(this.id.indexOf('@')!=-1) {
                    ralert('找回密码邮件已发送到你的信箱请查收');
                }else{
                    ralert('重置账号成功');
                    setInterval(function(){window.location='/';},3000);
                }
            },
            function (response) {ralert(response,'failure');}
        );
    }

  }
};
</script>