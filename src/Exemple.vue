<template>
    <div>
        Identifier: {{id}}
        <button @click="back">GO Back</button>
        <button @click="next">GO Next</button>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                id: 0
            }
        },
        mounted(){
            this.id = Math.random()*10000;
        },
        methods:{
            next(){
                this.$parent.$emit('hype-step-next');
            },
            back(){
                this.$parent.$emit('hype-step-back');
            }
        }
    }
</script>
