<template>
  <div class="hello">
      <form method="post">
          账号 :
          <input type="text" id="name" />
          <br /><br />
          密码 :
          <input type="text" id="pwd" />
          <br /><br />
          <input type="button" value="提交" @click="submit">
      </form>
  </div>
</template>

<script>
 import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    submit() {
        const that = this
        var name = document.getElementById("name").value;
        var pwd = document.getElementById("pwd").value;
        if (name == "" || pwd == "") {
            alert("帐号和密码不能为空")
        } else {
            //向服务器提交数据
            axios.post('http://127.0.0.1:3000/login', {
                    name: name,
                    pwd: pwd
                })
                .then(function(response) {
                    //成功时服务器返回 response 数据
                    // alert(response.data)
                    console.log('~~~~~~~~~~~')
                    console.log(response.data)
                    if(response.data.status == 1){
                      that.$router.push({
                        path:'/',
                      })
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
