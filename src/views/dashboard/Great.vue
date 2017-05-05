<template>
    <div>
          <!-- begin toolbar -->
          <div class="row">
            <div class="col-md-12" style="margin:10px 0;">
                <div class="pull-right">
                    <el-button type="primary" icon="delete" :disabled="!itemSelected" @click="confirmRemoveItems">删除选定</el-button>
                    <el-button type="primary" icon="search" @click="openSearchForm">搜索赞👍</el-button>
                    <el-button type="primary" icon="edit" @click="openAddForm">添加赞👍</el-button>
                </div>
            </div>
            <!-- end toolbar -->

            <!-- begin add -->
            <el-dialog title="添加赞👍" v-model="displayAddForm" size="small" top="10%">
                <Great-form :update-item="updateItem" scene="create"></Great-form >
            </el-dialog>
            <!-- end add -->

            <!-- begin update -->
            <el-dialog title="更新赞👍" v-model="displayUpdateForm" size="small" top="10%">
                <Great-form :update-item="updateItem" scene="update"></Great-form >
            </el-dialog>
            <!-- end update -->

            <!-- begin search -->
            <el-dialog title="搜索赞👍" v-model="displaySearchForm" size="small" top="10%">
                <Great-form :update-item="updateItem" scene="search"></Great-form >
            </el-dialog>
            <!-- end search -->

            <!-- begin preview -->
            <el-dialog title="预览赞👍" v-model="displayDataItemPreview" size="large" top="10%">
              <pre>{{previewData}}</pre>
              <span slot="footer" class="dialog-footer">
                <el-button @click="displayDataItemPreview = false">取 消</el-button>
                <el-button type="primary" @click="displayDataItemPreview = false">确 定</el-button>
              </span>
            </el-dialog>
            <!-- end preview -->

            <div class="col-md-12">
                <el-table :data="tableData" border style="width: 100%" v-loading="loading" element-loading-text="正在加载赞👍，请稍后..." @selection-change="selectedDataItem">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column fixed prop="_id" label="ObjectID" width="220">
                </el-table-column>
                <el-table-column prop="model" label="模型" width="150" :show-overflow-tooltip="true"></el-table-column>,<el-table-column prop="modelId" label="模型ID" width="150" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="createdAt" label="创建时间" width="210">
                </el-table-column>
                <el-table-column prop="updatedAt" label="更新时间" width="210">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                  <template scope="scope">
                    <el-button @click.native.prevent="openPreviewForm(scope.$index, tableData)" type="text" size="large">
                        <i class="fa fa-eye"></i>
                    </el-button>
                    <el-button @click.native.prevent="openUpdateForm(scope.$index, tableData)" type="text" size="large">
                        <i class="fa fa-edit"></i>
                    </el-button>
                    <el-button type="text" size="large" @click.native.prevent="confirmRemoveItem(scope.$index, tableData)">
                        <i class="fa fa-trash"></i>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!-- begin toolbar -->
            <div class="col-md-7" style="margin:10px 0;">
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 50, 100, 300]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
            </div>
            <div class="col-md-5" style="margin:10px 0;">
                <div class="pull-right">
                    <el-button type="primary" icon="delete" :disabled="!itemSelected" @click="confirmRemoveItems">删除选定</el-button>
                    <el-button type="primary" icon="search" @click="openSearchForm">搜索赞👍</el-button>
                    <el-button type="primary" icon="edit" @click="openAddForm">添加赞👍</el-button>
                </div>
            </div>
            <!-- end toolbar -->

        </div>
    </div>
</template>


<script>
import Vue from 'vue'
import lcAPI from 'lesscloud-sdk'
import GreatForm from '../forms/Great.vue'
import { Table,
TableColumn,
Tooltip,
Button,
Pagination,
Loading,
Col,
Submenu,
MenuItemGroup,
MenuItem,
Popover,
Message,
Dialog,
MessageBox,
Form,
FormItem,
Select,
Input,
InputNumber,
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
DatePicker,
TimeSelect,
TimePicker,
Upload,
Progress,
Spinner
} from 'element-ui'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Loading)
Vue.use(Col)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Popover)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Spinner)

Vue.prototype.$message = Message

export default {
    data(){
        return {
            updateItem:null,
            tableData:[],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            loading: false,
            itemSelected: false,
            selectedItems: [],
            formData: null,
            previewData: null,
            displayDataItemPreview: false,
            displaySearchForm: false,
            displayAddForm: false,
            displayUpdateForm: false
        }
    },
    components:{
        GreatForm
    },
    created(){
        this.currentPage = parseInt(this.$route.params.page || 1)
        this.fetching()
        this.$on('tableDataUpdate', function(data){
            this.total = data.total;
            this.tableData = data.results;
        })
    },
    watch: {
        '$route': 'fetching'
    },
    methods:{
        selectedDataItem(val){
            this.itemSelected = val.length==0 ? false : true;
            this.selectedItems = val
        },
        fetching(){
            var name = this.$route.params.name;
            var params = {'$limit':this.pageSize, '$skip': this.pageSize*(this.currentPage-1)}
            this.loading = true;
            lcAPI.findAll(name, params).then((response)=>{
                this.total = response.body(false).total;
                this.tableData = response.body(false).results;
                setTimeout(() => {this.loading = false}, 500);
            }).catch((response)=>{
                this.$message.error('赞👍数据获取失败，请刷新重试');
                this.loading = false;
            })
        },
        removeItems(){
          if(this.selectedItems.length>0) {
            var container = Array();
            var selectedItemsIndex = Array();
            for (var i = 0; i<this.selectedItems.length; i++) {
              container[i] = {"method":"DELETE","path": "/api/"+this.$route.params.name+'/'+this.selectedItems[i]._id+""};
              selectedItemsIndex[i] = this.tableData.indexOf(this.selectedItems[i]);
            }

            container = JSON.stringify(container)
            lcAPI.batch(container).then((response)=>{
                for (var i = selectedItemsIndex.length - 1; i >= 0; i--) {
                    this.tableData.splice(selectedItemsIndex[i], 1);
                }
                this.$message({message: '删除赞👍成功', type: 'success'});
             }).catch((response) => this.$message.error('删除赞👍失败') )
          }
        },
        removeItem(rows, index){
            var name = this.$route.params.name;
            var id = rows[index]._id
            lcAPI.remove(name, {"_id":id}).then((response)=>{
                rows.splice(index, 1);
                this.$message({message: '删除赞👍成功', type: 'success'});
            }).catch((response)=> this.$message.error('删除赞👍失败') )
        },
        confirmRemoveItem(index, rows) {
            MessageBox.confirm('确认继续删除?', '提示', {
                confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
            }).then(() => {
                this.removeItem(rows, index)
            }).catch(() => {});
        },
        confirmRemoveItems(index, rows) {
            MessageBox.confirm('确认继续删除?', '提示', {
                confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
            }).then(() => {
                this.removeItems()
            }).catch(() => {});
        },
        openSearchForm(){
            this.updateItem = null;
            this.displaySearchForm=true;
        },
        openAddForm(){
            this.updateItem = null;
            this.displayAddForm=true;
        },
        openPreviewForm(index, rows){
            this.previewData = rows[index];
            this.displayDataItemPreview = true;
        },
        openUpdateForm(index, rows){
            this.updateItem = rows[index];
            this.displayUpdateForm = true;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.handleCurrentChange(val)
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.fetching()
            this.$router.push({ name: 'dashboard.model.page', params: { page: val }})
        }
    }
}
</script>
