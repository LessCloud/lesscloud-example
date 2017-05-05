<template>
  <div class="container">
    <div class="row">

      <div class="form-horizontal" style="margin:20px auto;">
        <div class="col-md-offset-3 col-md-6">

          <div class="form-group">
            <label class="col-sm-2 control-label">账户</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{account}}</p>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">其它项目</label>
            <div class="col-sm-10">
              <p class="form-control-static">...</p>
            </div>
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
      profile: null,
      account: null
    }
  },
  ready:function(){
    this.profile = localStorage.getItem('LESSCLOUD_USER_INFO');
    if(this.profile!='') {
      this.profile = JSON.parse(this.profile);
    }
    if(this.profile!=null) {
      if(this.profile.hasOwnProperty('phone') && this.profile.phone!=undefined){
        this.account = this.profile.phone
      }else{
        this.account = this.profile.email
      }
    }
  }
};
</script>
