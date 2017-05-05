<template>
    <div class="container">
        <pre v-for="item in items">{{item}}</pre>
    </div>
</template>

<script type="text/javascript">
import lcAPI from 'lesscloud-sdk'

export default {
    data(){
        return {
            items: []
        }
    },
    created:function(){
        this.items = lcAPI.findAll('Book').then((response)=>{
            this.items = response.body(false).results;
        }).catch((response)=>{
        })
    }
}
</script>