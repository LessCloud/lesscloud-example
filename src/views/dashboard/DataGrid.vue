<template>
    <div>
        <component v-bind:is="grid">
        </component>
    </div>
</template>


<script>
import Vue from 'vue'
import lcAPI from 'lesscloud-sdk'

import Book from './Book.vue'
import Comment from './Comment.vue'
import Great from './Great.vue'
import Recommend from './Recommend.vue'

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
      Book:Book,
      Comment:Comment,
      Great:Great,
      Recommend:Recommend
    },
    created(){
    },
    watch: {
    },
    methods:{
    }
}
</script>
