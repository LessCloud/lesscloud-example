<template>
  <div class="container">
    <div class="row">

      <div class="form-horizontal" style="margin:20px 10px;">
        <div class="col-md-offset-3 col-md-6">

            <div class="form-group">
                <label for="password" class="form-label">原密码</label>
                <input class="form-control" type="password" v-model="password" placeholder="原密码">
            </div>

            <div class="form-group">
                <label for="new_password" class="form-label">新密码</label>
                <input class="form-control" type="password" v-model="new_password" placeholder="新密码">
            </div>

            <div class="form-group">
                <label for="confirm_password" class="form-label">确认新密码</label>
                <input class="form-control" type="password" v-model="confirm_password" placeholder="重复输入新密码">
            </div>

            <div class="form-group">
                <button class="hollow-btn" @click="saveModel('user')">修改密码</button>
            </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
        password: null,
        new_password: null,
        confirm_password: null,
    }
  },
  ready:function(){
  },
  methods: {
    clearForm: function(){
        this.password = null;
        this.new_password = null;
        this.confirm_password = null;
    },
    saveModel:function(model){
        this.$data._id = undefined;
        var data = this.$data;

        var resetUrl = HTTPSchema+APIDomain+'/user/reset/password';
        this.$http.post(resetUrl, data).then(
            function (response) {
                    ralert('重置账号密码成功');
                    this.clearForm()
            },
            function (response) {ralert(response,'failure');}
        );
    }
  }
};
</script>