<template>
            <div  class="col-md-4 col-md-offset-4">
            <div id="forget-form">
                    <center><h3>验证账户</h3></center>
                    <div class="form-horizontal">
                        <div class="form-group">
                            
                        </div>
                        <div class="form-group">
                            <button class="hollow-btn" @click="saveModel('user')">找回密码</button>
                        </div>
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
        var registerUrl = HTTPSchema+APIDomain+'/user/code';
        var data = '{"phone": '+this.id+'}';
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

        var url = HTTPSchema+APIDomain+'/user/forget';
        if(this.id.indexOf('@')!=-1) {
            var url = HTTPSchema+APIDomain+'/user/forget/send';
        }

        this.$http.post(url, data).then(
            function (response) {
                if(this.id.indexOf('@')!=-1) {
                    ralert('找回密码邮件已发送到你的信箱请查收');
                }else{
                    ralert('重置账号成功');
                }
                this.close();
            },
            function (response) {ralert(response,'failure');}
        );
    }

  }
};
</script>