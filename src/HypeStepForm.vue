<style lang="scss">
    .form-wrap {
        border: 1px solid #ccc;
        min-width:300px;
        width:70vw;
        background: white;
        .form-body {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .header {
            height: 45px;
            background: #efefef;
            border-bottom: 1px solid #ccc;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                display: block;
                height: 12px;
                width: 12px;
                margin: 5px;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.2);
                &.is-active {
                    background: rgba(0, 0, 0, 0.4);
                    background: #FF8F00;
                }
            }
        }
        .form-footer {
            padding: 20px;
        }
    }
    html {
        width:100%;
        min-height: 100%;
    }
    body {
        width:100%;
        height:100%;
        background: radial-gradient(#FFF176, #F57F17);
        display: flex;
    }
    .center{
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items:center;
        justify-content: space-around;
    }
    .form-step {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<template>
    <div :id="idn" class="form-wrap">
            <div class="header">
                <span v-for="(step,i) in steps" :class="{'is-active': atIndex(i, true)}"></span>
            </div>
        <div class="form-body">
            <slot></slot>
        </div>
        <div class="form-footer">
            <button v-if="index > 0" class="btn btn-lg btn-default pull-left" @click="back">back</button>
            <button v-if="index < steps.length-1" class="btn btn-lg btn-default pull-right" @click="next">next</button>
            <button v-if="index == steps.length-1" class="btn btn-lg btn-primary pull-right" @click="submit">submit</button>
            <div class="clearfix"></div>
        </div>
    </div>
</template>
<script lang="javascript">
    export default {
        prop:{
           display: {
                type: String,
                default: 'block',
           },
           submit:{
                default: ()=>{},
                type: Function
           }
        },
        data () {
            return {
                idn: 'idn'+Math.random().toString(36).substring(24),
                steps: [],
                index: 0,
                display: 'flex',
            }
        },
        created(){
            this.$on('hype-step-next', ()=> {
                this.next()
            });
            this.$on('hype-step-back', ()=> {
                this.back()
            });
        },
        mounted(){
            this.steps = document.querySelectorAll('#'+this.idn+' > div.form-body > .form-step');
            console.log("done "+this.idn)
            this.show(0);
        },
        methods: {
            next(){
                if(this.index < this.steps.length-1){
                    this.hideAll();
                    this.steps[++this.index].style.display = this.display;
                    return
                }
            },
            back(){
                if(this.index > 0){
                    this.hideAll();
                    this.steps[--this.index].style.display = this.display;
                    return
                }
            },
            show(step){
                if(step == undefined) {
                    this.steps[this.index].style.display = this.display;
                    return
                }
                if( step < 0 || step >= this.steps.length) return;
                this.hideAll();
                this.steps[step].style.display = this.display;
            },
            hideAll(){
                this.steps.forEach(step => {
                    step.style.display = 'none';
                });
            },
            checkIndex(){
                if(this.index > this.steps.length-1 || this.index <0){
                    return false;
                }
                return true;
            },
            atIndex(step, callback){
                if(step == this.index){
                    return callback
                }
            }
        },
    }


</script>

