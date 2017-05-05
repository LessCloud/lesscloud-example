<template>
    <el-form ref="form" :model="BookForm" label-width="80px"><el-form-item label="书名"><el-input v-model="BookForm.name"></el-input></el-form-item>
<el-form-item label="zz"><el-input type="textarea" v-model="BookForm.zz"></el-input></el-form-item>
<el-form-item label="价格"><el-input v-model="BookForm.price"></el-input></el-form-item>
<el-form-item label="封面"><el-upload class="upload-demo" ref="upload" :action="coverUploadURL" :data="coverUploadToken" :on-preview="coverFilePreview" :on-remove="coverFileRemove" :file-list="coverFileList" :auto-upload="false" :multiple="false" :on-success="coverUploadSuccess"> <el-button slot="trigger" @click="getcoverUploadToken" size="small" type="primary">选取文件</el-button> <el-button style="margin-left: 10px;" size="small" type="success" @click="coverUpload">上传文件</el-button> <div slot="tip" class="el-upload__tip"></div> </el-upload></el-form-item>
<el-form-item label="赞"><el-input v-model="BookForm.great"></el-input></el-form-item>
<el-form-item label="作者"><el-input v-model="BookForm.author"></el-input></el-form-item>
<el-form-item label="简介"><el-input v-model="BookForm.bookIntro"></el-input></el-form-item>
<el-form-item label="评级"><el-input v-model="BookForm.rate"></el-input></el-form-item>
<el-form-item label="ISBN"><el-input v-model="BookForm.isbn"></el-input></el-form-item>
<el-form-item label="出版社"><el-input v-model="BookForm.publisher"></el-input></el-form-item>
<el-form-item label="出版日期"><el-input v-model="BookForm.publishDate"></el-input></el-form-item>
<el-form-item label="页数"><el-input v-model="BookForm.pageCount"></el-input></el-form-item>
<el-form-item label="评论统计" class="hide"><el-input type="hidden" v-model="BookForm.commentCount"></el-input></el-form-item> <slot name="btns"><el-form-item label=""><el-button type="primary" @click="onSubmit">保 存</el-button><el-button @click="onCancel">取 消</el-button></el-form-item></slot></el-form>
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
            BookForm: null,
            BookFormTemplate: {
                _id:null,
                name:null,
                zz:null,
                price:null,
                cover:null,
                great:null,
                author:null,
                bookIntro:null,
                rate:null,
                isbn:null,
                publisher:null,
                publishDate:null,
                pageCount:null,
                commentCount:null
            },
            coverUploadToken:{},
            coverUploadURL:'',
            coverFileList:[]
          }
      },
      props:['updateItem','scene','tableData'],
      created:function(){
        this.BookForm = this.BookFormTemplate;
        if(this.updateItem!==null) {
            this.BookForm = this.updateItem;
        }
      },
      watch:{
        updateItem: function(){
          if(this.updateItem!==null) {
            this.BookForm = this.updateItem;
          }else{
            this.BookForm = this.BookFormTemplate;
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
            for (var item in this.BookForm) {
                if(this.BookForm[item] == null) {
                    delete this.BookForm[item];
                }
            }
            if(this.scene=='search') {
                this.searchData();
            }else{
                this.saveData();
            }
        },
        searchData(){
            lcAPI.find(this.$route.params.name, this.jsonToQueryString(this.BookForm)).then((response) => {
                this.$parent.$parent.$emit('tableDataUpdate',response.body().data());
                this.onCancel();
            }).catch((response) => {
                this.$message.error('查找数据失败')
            });
        },
        saveData(){
            lcAPI.save(this.$route.params.name, this.BookForm).then((response) => {
                this.$message({message: '保存数据成功', type: 'success'});
                this.onCancel();
            }).catch((response) => {
                this.$message.error('保存数据失败')
            });
        },
        onCancel() {
            this.$parent.close();
        },
        getcoverUploadToken(){
            var api = lcAPI.restful.custom('https://api.lesscloud.com/upload/token?id=default_storage_instance', false);
            api.get().then((response)=>{
            var data = response.body().data();
                this.coverUploadToken = {token:data.token};
                this.coverUploadURL = data.uploadUrl;
            }).catch((response)=>{
                this.$message.error('获取上传token失败');
            })
        },
        coverUploadSuccess(response){
                var filename = '//'+response.domain+'/'+response.key;
                this.BookForm.cover = filename; console.log(response);
        },
        coverUpload(){
                this.$refs.upload.submit();
        },
        coverFilePreview(file){
                console.log(file);
        },
        coverFileRemove(file,coverFileList){
                console.log(coverFileList[file]);
        },

      } 
}
</script>