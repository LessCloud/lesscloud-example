<template>
    <div class="top-nav container-fluid">
        <div class="container">
            <div class="row">
                  <div class="col-md-4">
                      <h3><router-link to="/">{{AppName}}</router-link></h3> 
                  </div>
                  <div class="col-md-6">
                      <div class="search-bar">
                      <el-input placeholder="搜索你想要的内容" class="search-bar-input" v-model="searchBar" :on-icon-click="searchPress"></el-input>
                      </div>
                  </div>

                  <div class="col-md-2">
                    <div class="top-icon-bar">
                        <div v-show="loggedin">
                          <router-link to="/dashboard"><i class="fa fa-dashboard" alt="控制面板"></i></router-link>
                          <el-dropdown>
                            <span class="el-dropdown-link">
                              <i class="el-icon-setting"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item>
                                <el-badge is-dot :hidden="true" class="item">
                                    <i class="fa fa-bell" alt="通知"></i> 通知
                                </el-badge>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <el-badge is-dot :hidden="true" class="item">
                                  <i class="fa fa-envelope" alt="私信"></i> 私信
                                </el-badge>
                              </el-dropdown-item>
                              <el-dropdown-item>账户设置</el-dropdown-item>
                              <el-dropdown-item @click.native="logout()" divided>退出</el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                        </div>
                        <div v-show="!loggedin">
                          <router-link to="/account/login">登录</router-link> / <router-link to="/account/register">注册</router-link>
                        </div>
                    </div>
                  </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import {Dropdown, DropdownMenu, DropdownItem, Badge, Input} from 'element-ui'

Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Badge)
Vue.use(Input)

export default {
      data(){
          return {
            AppName: '',
            loggedin: false,
            searchBar: ''
          }
      },
      created:function(){
        var name = document.head.querySelector('meta[name=LESSCLOUD-APP-NAME]');
        if(name!==null && name.content!==undefined) {
          this.AppName = name.content;
        }
        if(localStorage.getItem('JWT')!=null) {
          this.loggedin = true
        }
      },
      methods:{
        searchBarBlur(){
          alert('search bar blur');
        },
        searchBarFoucs(){
          alert('search bar foucs');
        },
        searchPress(){
          alert('search button pressed');
        },
        removeLoggedStatusWithCookie(){
            var cookieName = 'logged';
            var cookieValue = 'no';
            var myDate = new Date();
            myDate.setMonth(myDate.getMonth() - 12);
            document.cookie = cookieName +"=" + cookieValue + ";expires=" + myDate + "";
        },
        logout(){
          this.removeLoggedStatusWithCookie();
          localStorage.removeItem('JWT')
          alert('你已经成功登出');
          window.location = '/';
          return false;
      }
      } 
}
</script>