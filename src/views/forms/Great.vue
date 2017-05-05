<template>
    <el-form ref="form" :model="GreatForm" label-width="80px"><el-form-item label="模型"><el-input v-model="GreatForm.model"></el-input></el-form-item>
<el-form-item label="模型ID"><el-input v-model="GreatForm.modelId"></el-input></el-form-item> <slot name="btns"><el-form-item label=""><el-button type="primary" @click="onSubmit">保 存</el-button><el-button @click="onCancel">取 消</el-button></el-form-item></slot></el-form>
</template>

<script type="text/javascript">
import lcAPI from 'lesscloud-sdk'
import Vue from 'vue'
import { Tooltip,
Button,
Loading,
Popover,
Message,
MessageBox,
Form,
FormItem,
Select,
Input,
Radio,
RadioGroup,
RadioButton,
Checkbox,
CheckboxGroup,
Switch,
Select,
Option,
OptionGroup,
Button,
ButtonGroup,
Upload,
Progress
} from 'element-ui'


Vue.use(Tooltip)
Vue.use(Button)
Vue.use(Loading)
Vue.use(Popover)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Button)
Vue.use(ButtonGroup)

Vue.prototype.$message = Message

export default {
      data(){
          return {
            GreatForm: null,
            GreatFormTemplate: {
                _id:null,
                model:null,
                modelId:null
            },
            
          }
      },
      props:['updateItem','scene','tableData'],
      created:function(){
        this.GreatForm = this.GreatFormTemplate;
        if(this.updateItem!==null) {
            this.GreatForm = this.updateItem;
        }
      },
      watch:{
        updateItem: function(){
          if(this.updateItem!==null) {
            this.GreatForm = this.updateItem;
          }else{
            this.GreatForm = this.GreatFormTemplate;
          }
        }
      },
      computed:{
      },
      methods:{
        jsonToQueryString:function (json) {
          return '?' + Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +encodeURIComponent(json[key]);
          }).join('&');
        },
        onSubmit() {
            for (var item in this.GreatForm) {
                if(this.GreatForm[item] == null) {
                    delete this.GreatForm[item];
                }
            }
            if(this.scene=='search') {
                this.searchData();
            }else{
                this.saveData();
            }
        },
        searchData(){
            lcAPI.find(this.$route.params.name, this.jsonToQueryString(this.GreatForm)).then((response) => {
                this.$parent.$parent.$emit('tableDataUpdate',response.body().data());
                this.onCancel();
            }).catch((response) => {
                this.$message.error('查找数据失败')
            });
        },
        saveData(){
            lcAPI.save(this.$route.params.name, this.GreatForm).then((response) => {
                this.$message({message: '保存数据成功', type: 'success'});
                this.onCancel();
            }).catch((response) => {
                this.$message.error('保存数据失败')
            });
        },
        onCancel() {
            this.$parent.close();
        },
        
      } 
}
</script>