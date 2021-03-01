<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="价格(￥)">
                        <el-input v-model="form.price"></el-input>
                    </el-form-item>
                    <el-form-item label="存量(件)">
                        <el-input v-model="form.number"></el-input>
                    </el-form-item>
<!--                     <el-form-item label="价格">
                        <el-radio-group v-model="form.sex">
                            <el-radio label="man">男</el-radio>
                            <el-radio label="woman">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="日期时间">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.date1"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker
                                placeholder="选择时间"
                                v-model="form.date2"
                                style="width: 100%;"
                            ></el-time-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="科室">
                        <el-select v-model="form.org" placeholder="请选择">
                            <el-option key="org1" label="口腔科" value="org1"></el-option>
                            <el-option key="org2" label="骨科" value="org2"></el-option>
                            <el-option key="org3" label="内科" value="org3"></el-option>
                            <el-option key="org4" label="外科" value="org4"></el-option>
                        </el-select>
                    </el-form-item> -->
<!--                     <el-form-item label="城市级联">
                        <el-cascader :options="options" v-model="form.options"></el-cascader>
                    </el-form-item> -->
<!--                     <el-form-item label="选择开关">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item> -->
<!--                     <el-form-item label="多选框">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="步步高" name="type"></el-checkbox>
                            <el-checkbox label="小天才" name="type"></el-checkbox>
                            <el-checkbox label="imoo" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item> -->
                    <el-form-item label="详情">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'baseform',
    data() {
        return {
            form: {
                name: '',
                price:'',
                number:'',
                desc:'',
            }
        };
    },
    methods: {
        onSubmit() {
            const that = this
            var name = this.form.name
            var price = this.form.price
            var number = (this.form.number)
            var desc = this.form.desc
            var username = localStorage.getItem('ms_username')
            if (name=="" || price =="" || number=="" ) {
                this.$message.error('请将数据补充完整！');
            } else {
                //向服务器提交数据
                axios.post('http://127.0.0.1:3000/submitgoodsform', {
                        goodsname: name,
                        price:price,
                        amount:number,
                        describe:desc,
                        username:username,
                        state:1,
                    })
                    .then(function(response) {
                        //成功时服务器返回 response 数据
                        if(response.status == 200){
                            that.$message.success('提交成功！');
                            that.$router.push({
                              path:'/goodsHold',
                            })
                            that.form.name = ''
                            that.form.price = ''
                            that.form.number = ''
                            that.form.desc = ''
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        }
    }
};
</script>