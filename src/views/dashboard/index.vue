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
            menu:[{"name":"Book","label":"图书","defaultCollectionNum":"100","realtime":"enable"},{"name":"Comment","label":"评论","defaultCollectionNum":100,"realtime":"enable"},{"name":"Great","label":"赞👍","defaultCollectionNum":100},{"name":"Recommend","label":"推荐","defaultCollectionNum":100}]
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