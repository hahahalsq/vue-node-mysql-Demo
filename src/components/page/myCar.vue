<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="goodsname" label="商品名" align="center"></el-table-column>
                <el-table-column prop="price" label="价格" align="center"></el-table-column>
                <el-table-column prop="buynum" label="数量" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleAdd(scope.$index, scope.row)"
                        >修改数量</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleDel(scope.$index, scope.row)"
                        >移出购物车</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>


        <div class="fixBottom">
            <div class="fontA">您应付</div>
            <div class="fontB">{{totalMoney}}元</div>
            <div class="fontC" @click="confirmBuy()">确认购买</div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <div style="display:flex;align-items:center;justify-content:space-around;">
                <div>xxx</div>
                <el-input-number v-model="num" @change="handleChange" :min="1" label=""></el-input-number>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
import axios from 'axios'
export default {
    name: 'basetable',
    data() {
        return {
            tableData: [],
            tempData:[],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            username:'',
            tempRow:null,
            num:0,
            totalMoney:0,
        };
    },
    created() {
        this.getCarData();
    },
    mounted(){
        console.log('~~~~~')
    },

    watch: {
      // 如果路由发生变化，再次执行该方法
      "$route": "getCarData"
    },
    methods: {
        getCarData() {
            //向服务器提交数据
            const that = this
            that.username = localStorage.getItem('ms_username')
            var username = that.username
            axios.post('http://127.0.0.1:3000/getCarList', {
                username:username
            }).then(function(response) {
                    //成功时服务器返回 response 数据
                    if(response.data.length){
                        that.tableData = response.data
                        // that.getCarInfo()

                    }else{
                        that.tableData = []
                        that.$message.error('没有数据')
                        return false
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        // getCarInfo() {
        //     var that = this
        //     // 获取本账户购物车数据信息
        //     var username = localStorage.getItem('ms_username')
        //     axios.post('http://127.0.0.1:3000/getCarList', {
        //         username:username
        //     }).then(function(response) {
        //             that.$nextTick(() => {
        //                 //成功时服务器返回 response 数据
        //                 if(response.data.length){
        //                     for(var i=0;i<that.tableData.length;i++){
        //                         for(var j=0;j<response.data.length;j++){
        //                             if(that.tableData[i].id == response.data[j].id){
        //                                 that.tableData[i].carFlag = true
        //                                 break
        //                             }
        //                         }
        //                     }
        //                 }
        //                 that.tempData = JSON.parse(JSON.stringify(that.tableData))
        //             })

        //         })
        //         .catch(function(error) {
        //             console.log(error);
        //         });
        // },
        // 删除操作
        handleDel(index, row) {
            var id = row.id
            var that = this
            var username = localStorage.getItem('ms_username')
            axios.post('http://127.0.0.1:3000/delCar', {
                username:username,
                id:id,
            }).then(function(response) {
                    console.log('&&&&&&&&&&&&&&&&&&&')
                    console.log(response)
                    // that.getCarData();
                    if(response.status == 200)
                    {
                        that.getCarData();
                    }else{
                        that.$message.error('错误')
                        return false
                    }
                })
                .catch(function(error) {
                    console.log(error);
                }); 
        },
       // 添加操作
        handleAdd(index, row) {
            this.tempRow = row
            this.editVisible = true
            this.num = row.buynum
        },
        // 保存编辑
        cancel(){
            this.editVisible = false
            this.num = 1
        },
        saveEdit() {
            var row = this.tempRow
            var id = row.id
            var num = this.num
            var that = this
            var goodsname = row.goodsname
            var price = row.price
            var username = localStorage.getItem('ms_username')
            this.editVisible = false;
            axios.post('http://127.0.0.1:3000/updateCar', {
                username:username,
                id:id,
                buynum:num,
                goodsname:goodsname,
                price:price,
            }).then(function(response) {
                    if(response.status == 200)
                    {
                        that.getCarData();
                    }else{
                        that.$message.error('错误')
                        return false
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        handleChange(value) {
            console.log(value);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.totalMoney = 0
            console.log('*******************')
            console.log(this.multipleSelection)
            for(var i=0;i<this.multipleSelection.length;i++){
                var item = this.multipleSelection[i]
                var price = parseFloat(item.price)
                var buynum = parseFloat(item.buynum)
                this.totalMoney = this.totalMoney + price * buynum
            }
            console.log('******************')
            console.log(this.totalMoney)
        },
        confirmBuy(){
            console.log('*******************')
            console.log(this.multipleSelection)
            var username = localStorage.getItem('ms_username')
            var that = this
            for(var i=0;i<this.multipleSelection.length;i++){
                var item = this.multipleSelection[i]
                var sellname = item.sellname
                var id = item.id
                var goodsname = item.goodsname
                var buynum = item.buynum
                var price = item.price
                axios.post('http://127.0.0.1:3000/addDone', {
                    username:username,
                    id:id,
                    buynum:buynum,
                    goodsname:goodsname,
                    price:price,
                    sellname:sellname,
                }).then(function(response) {
                        if(response.status == 200)
                        {
                            axios.post('http://127.0.0.1:3000/delCar', {
                                username:username,
                                id:id,
                            }).then(function(response) {
                                    if(response.status == 200)
                                    {
                                        that.getCarData();
                                    }else{
                                        that.$message.error('错误')
                                        return false
                                    }
                                })
                                .catch(function(error) {
                                    console.log(error);
                                }); 


                        }else{
                            that.$message.error('错误')
                            return false
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
            // that.getCarData();
        },
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.fixBottom{
    position: absolute;
    bottom:40px;
    background-color: #ffffff;
    opacity:0.7;
    width:100%;
    left: 0;
    z-index:2;
    display: flex;
    align-items: center;
    justify-content: space-around;

}
.fontA{
    color:#666666;
    font-size:30px;
}
.fontB{
    color:#E56151;
    font-size:40px;
}
</style>
