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
                    <el-form-item label="姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
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
                    </el-form-item>
<!--                     <el-form-item label="城市级联">
                        <el-cascader :options="options" v-model="form.options"></el-cascader>
                    </el-form-item> -->
                    <el-form-item label="选择开关">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item>
<!--                     <el-form-item label="多选框">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="步步高" name="type"></el-checkbox>
                            <el-checkbox label="小天才" name="type"></el-checkbox>
                            <el-checkbox label="imoo" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item> -->
                    <el-form-item label="描述">
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
            options: [
                {
                    value: 'guangdong',
                    label: '广东省',
                    children: [
                        {
                            value: 'guangzhou',
                            label: '广州市',
                            children: [
                                {
                                    value: 'tianhe',
                                    label: '天河区'
                                },
                                {
                                    value: 'haizhu',
                                    label: '海珠区'
                                }
                            ]
                        },
                        {
                            value: 'dongguan',
                            label: '东莞市',
                            children: [
                                {
                                    value: 'changan',
                                    label: '长安镇'
                                },
                                {
                                    value: 'humen',
                                    label: '虎门镇'
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 'hunan',
                    label: '湖南省',
                    children: [
                        {
                            value: 'changsha',
                            label: '长沙市',
                            children: [
                                {
                                    value: 'yuelu',
                                    label: '岳麓区'
                                }
                            ]
                        }
                    ]
                }
            ],
            form: {
                name: '',
                sex:'',
                date1: '',
                date2: '',
                org:'',
                delivery: true,
                desc: '',
            }
        };
    },
    methods: {
        onSubmit() {
            this.$message.success('提交成功！');
            const that = this
            var name = this.form.name
            var sex = this.form.sex
            var date1 = this.form.date1
            var date2 = this.form.date2
            var org = this.form.org
            var delivery = this.form.delivery ? 1 : 0
            var desc = this.form.desc
            if (name=="" || sex =="" || date1=="" || date2=="" || org=="" || delivery=="" || desc=="") {
                this.$message.error('请将数据补充完整！');
            } else {
                //向服务器提交数据
                axios.post('http://127.0.0.1:3000/submitform', {
                        name: name,
                        sex:sex,
                        date1:date1,
                        date2:date2,
                        org:org,
                        delivery:delivery,
                        desc:desc
                    })
                    .then(function(response) {
                        //成功时服务器返回 response 数据
                        console.log('~~~~~~~~~~~')
                        console.log(response.data)

                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        }
    }
};
</script>