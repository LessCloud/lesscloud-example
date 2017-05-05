<template>
    <div class="container-fluid">
        <top-nav />

            <div class="row">
                <div class="col-md-12">
                  <router-view />
                </div>
            </div>

    </div>
</template>


<script>
// import Vue from 'vue'
import TopNav from './topnav.vue';

export default {
    components: {TopNav},
    data () {
         return {
            'visible': false
         }
     },
     methods: {
    }
}
</script>