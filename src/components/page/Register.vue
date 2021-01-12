<template>
    <div>

        <div style="text-align:center;margin-top:3rem;margin-bottom:3rem;font-size:2rem;">填写注册信息</div>
        <div style="display:flex;justify-content:center;">
            <div class="container">
                <div class="form-box">

                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item prop="username" label="用户名">
                            <el-input v-model="form.name" placeholder="username" style="width:65%;">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="密码">
                            <el-input
                                type="password"
                                placeholder="password"
                                v-model="form.password" style="width:65%;"
                            >
                                <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="身份">
                            <el-select v-model="form.level" placeholder="请选择">
                                <el-option key="fd" label="我要出租" value='2'></el-option>
                                <el-option key="zk" label="我要租房" value="3"></el-option>
                            </el-select>
                        </el-form-item>
<!--                         <el-form-item label="日期时间">
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
                        </el-form-item> -->
<!--                         <el-form-item label="城市级联">
                            <el-cascader :options="options" v-model="form.options"></el-cascader>
                        </el-form-item>
                        <el-form-item label="选择开关">
                            <el-switch v-model="form.delivery"></el-switch>
                        </el-form-item>
                        <el-form-item label="多选框">
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox label="步步高" name="type"></el-checkbox>
                                <el-checkbox label="小天才" name="type"></el-checkbox>
                                <el-checkbox label="imoo" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="单选框">
                            <el-radio-group v-model="form.resource">
                                <el-radio label="步步高"></el-radio>
                                <el-radio label="小天才"></el-radio>
                                <el-radio label="imoo"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="文本框">
                            <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                        </el-form-item> -->
<!--                         <el-form-item>
                            <el-button type="primary" @click="onSubmit">提交注册</el-button>
                            <el-button>取消</el-button>
                        </el-form-item> -->
                    </el-form>

                    <div style="text-align:center;margin-top:3rem;">
                        <el-button type="primary" @click="onSubmit">提交注册</el-button>
                        <el-button>取消</el-button>
                    </div>
                </div>
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
            // options: [
            //     {
            //         value: 'guangdong',
            //         label: '广东省',
            //         children: [
            //             {
            //                 value: 'guangzhou',
            //                 label: '广州市',
            //                 children: [
            //                     {
            //                         value: 'tianhe',
            //                         label: '天河区'
            //                     },
            //                     {
            //                         value: 'haizhu',
            //                         label: '海珠区'
            //                     }
            //                 ]
            //             },
            //             {
            //                 value: 'dongguan',
            //                 label: '东莞市',
            //                 children: [
            //                     {
            //                         value: 'changan',
            //                         label: '长安镇'
            //                     },
            //                     {
            //                         value: 'humen',
            //                         label: '虎门镇'
            //                     }
            //                 ]
            //             }
            //         ]
            //     },
            //     {
            //         value: 'hunan',
            //         label: '湖南省',
            //         children: [
            //             {
            //                 value: 'changsha',
            //                 label: '长沙市',
            //                 children: [
            //                     {
            //                         value: 'yuelu',
            //                         label: '岳麓区'
            //                     }
            //                 ]
            //             }
            //         ]
            //     }
            // ],
            // form: {
            //     name: '',
            //     region: '',
            //     date1: '',
            //     date2: '',
            //     delivery: true,
            //     type: ['步步高'],
            //     resource: '小天才',
            //     desc: '',
            //     options: []
            // }
            form: {
                name: '',
                password: '',
                level: '',
            }

        };
    },
    methods: {
        onSubmit() {


            const that = this
            var name = this.form.name
            var pwd = this.form.password
            var level =this.form.level
            if (name == "" || pwd == "" || level == "") {
                that.$message.error('请补全注册信息！');
            } else {
                //向服务器提交数据
                axios.post('http://127.0.0.1:3000/register', {
                        name: name,
                        pwd: pwd,
                        level:parseInt(level)
                    })
                    .then(function(response) {
                        //成功时服务器返回 response 数据
                        if(response.status == 200){
                            that.$router.push({
                              path:'/login',
                            })
                        }else{
                            that.$message.error('注册失败');
                            return false
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }



            this.$message.success('提交成功！');
        }
    }
};
</script>