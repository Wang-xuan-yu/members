<template>
  <div class="login-container">
    <div class="login-form">
      <h2>积云会员管理系统</h2>
      <el-form ref="form"  :rules="rules" :model="form" label-width="80px">
        <el-form-item label="账号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import loginApi from "../../api/login"
export default {
  name: "",
  data() {
    return {
        form : {
            mobile : "",
            password : ""
        },
        rules: {
            name : [
                {required : true, message : "请输入有效的账号", trigger : "blur"},
                {min : 3, max : 10 , message : '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            pass : [
                {required : true, message : "请输入有效的密码", trigger : "blur"},
                {min : 6, max : 20 , message : '长度在 6 到 20 个字符', trigger: 'blur' }
            ]
        }
    }
  },
  methods: {
    submitForm(formName){
        this.$refs[formName].validate((valid) =>{
            console.log(valid);
            if(valid){
                //调用登录接口
                loginApi.wxLogin(this.form).then(res=>{
                    console.log(res)
                    const code = res.data.code;
                    if(code == 200){
                        //获取token
                        const token = res.data.data.remember_token;
                        //吧token存储到本地
                        localStorage.setItem("token",token);
                        // //获取用户信息
                        loginApi.wxInfo().then(res=>{
                            console.log(res)
                             const resp = res.data;
                            if(resp.code == 200){
                                //将获取到的用户信息保存到本地
                                localStorage.setItem("info",JSON.stringify(resp.rows));
                                //跳转到首页
                                this.$router.push({path : "/"})
                            }else{
                                this.$message({
                                    message: '登录失败',
                                    type: 'warning'
                                })
                            }
                        })
                    }else{
                        this.$message({
                            message: '登录失败',
                            type: 'warning'
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }else{
                console.log("error submit")
                return false;
            }
        })
    }
  },
  components: {}
};
</script>


<style scoped>
.login-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("http://img.zcool.cn/community/038ff5a59ba3527a80120753483accd.jpg");
}
.login-form {
  padding: 30px 50px 30px 30px;
  width: 350px;
  margin: 160px auto;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
}
.login-form h2 {
  text-align: center;
  color : #303133;
}
</style>