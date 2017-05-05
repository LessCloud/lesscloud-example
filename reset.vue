<template>
    <div  class="col-md-6 col-md-offset-3">
        <div id="forget-form">
            <center><h3>重置密码</h3></center>
            <div class="form-horizontal">
                <div class="form-group hide">
                    <label for="id" class="form-label">账户</label>
                    <input id="id" class="form-control" v-model="id" placeholder="请输入手机号码或电子邮箱地址">
                </div>
                <div class="form-group">
                    <label for="password" class="form-label">新密码</label>
                    <input id="password" type="password" class="form-control" v-model="password" placeholder="请输入新密码">
                </div>
                <div class="form-group">
                    <input type="hidden" v-model="code">
                    <button class="hollow-btn" @click="saveModel('user')">重置密码</button>
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
    this.id = app.context.params.email;
    this.code = app.context.params.code;
  },

  methods: {
    close: function(){
        this._modal_show = false;
        this.id = null;
        this.password = null;
        this.code = null;
    },
    saveModel:function(model){
        this.$data._id = undefined;
        var data = this.$data;

        var registerUrl = HTTPSchema+APIDomain+'/user/reset';
        this.$http.post(registerUrl, data).then(
            function (response) {
                    ralert('重置账号密码成功');
            },
            function (response) {ralert(response,'failure');}
        );
    }
  }
};
</script>