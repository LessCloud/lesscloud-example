<template>
    <div>
        <component v-bind:is="grid">
        </component>
    </div>
</template>


<script>
import Vue from 'vue'
import lcAPI from 'lesscloud-sdk'

~@import.tables@~

export default {
    data(){
        return {
        }
    },
    computed:{
      grid: function(){
        return this.$route.params.name
      }
    },
    components:{
      ~@import.components@~
    },
    created(){
    },
    watch: {
    },
    methods:{
    }
}
</script>
