<template>
  <div class="row dashboard-layout">
    <div class="col-md-12">
        <h3>Dashboard</h3>
    </div>
    <div class="col-md-2 dashboard-menu-list">
        <div v-for="item in menu">
            <router-link :to="{ name: 'dashboard.model', params: { name: item.name }}" class="dashboard-menu-item">{{item.label}}</router-link>
        </div>
    </div>
    <div class="col-md-10">
        <router-view />
    </div>
</div>
</template>


<script>
export default {
    data(){
        return {
            menu:~@model.menu@~
        }
    },
    created(){
    },
    watch: {
    },
    methods:{
    }
}
</script>