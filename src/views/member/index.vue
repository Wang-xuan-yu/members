<template>
  <div class="member">
    <!-- 查询 -->
    <el-form :inline="true" :model="searchMap" ref="ruleForm" class="demo-form-inline">
      <el-form-item prop="cardNum">
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号" style="width:195px"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="会员名字" style="width:195px"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="searchMap.payType" placeholder="支付类型" style="width:110px">
          <el-option
            v-for="(item,index) in payTypeValue"
            :key="index"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="searchMap.birthday"
          type="date"
          placeholder="出生日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="list" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
      <el-table-column prop="name" label="会员姓名"></el-table-column>
      <el-table-column prop="birthday" label="会员生日"></el-table-column>
      <el-table-column prop="phone" label="手机号码" width="110"></el-table-column>
      <el-table-column prop="integral" label="可用积分"></el-table-column>
      <el-table-column prop="money" label="开卡金额"></el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          <span>{{scope.row.payType | pay}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" width="180"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 新增对话框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form ref="memberEdit" :model="form" :rules="rules" style="width:400px">
        <el-form-item label="会员卡号" prop="cardNum" :label-width="formLabelWidth">
          <el-input v-model="form.cardNum"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday" :label-width="formLabelWidth">
          <el-date-picker v-model="form.birthday" type="date" placeholder="会员生日"></el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money" :label-width="formLabelWidth">
          <el-input v-model="form.money"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral" :label-width="formLabelWidth">
          <el-input v-model="form.integral"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType" :label-width="formLabelWidth">
          <el-select v-model="form.payType" placeholder="支付类型">
            <el-option
              v-for="(item,index) in payTypeValue"
              :label="item.name"
              :value="item.type"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address" :label-width="formLabelWidth">
          <el-input v-model="form.address" type="textarea"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="form.id == null ? submitData('memberEdit'):updatedData('memberEdit')"
        >确 定</el-button>
        {{form.id}}
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MemberApi from "../../api/member";
const payType = [
  {
    type: 1,
    name: "现金"
  },
  {
    type: 2,
    name: "微信"
  },
  {
    type: 3,
    name: "支付宝"
  },
  {
    type: 4,
    name: "银行卡"
  }
];
export default {
  name: "",
  data() {
    return {
      title: "",
      rules: {
        cardNum: [
          { required: true, message: "请输入会员卡号", trigger: "blur" },
          { min: 3, max: 30, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入会员姓名", trigger: "blur" }],
        payType: [
          { required: true, message: "请选择支付方式", trigger: "change" }
        ]
      },
      formLabelWidth: "100px",
      form: {
        id: null,
        cardNum: "",
        name: "",
        birthday: "",
        phone: "",
        money: 0,
        integral: 0,
        payType: "",
        address: ""
      },
      dialogFormVisible: false,
      searchMap: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: ""
      },
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      payTypeValue: payType
    };
  },
  components: {},
  filters: {
    pay(data) {
      const payValue = payType.find((item, index) => {
        return item.type == data;
      });
      return payValue.name;
    }
  },
  methods: {
    //显示新增表单
    handleAdd() {
      this.title = "新增会员";
      this.dialogFormVisible = true;
      this.$nextTick(function() {
        this.$refs["memberEdit"].resetFields();
      });
      // console.log(this.$refs["memberEdit"])
    },
    //提交表单
    submitData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          MemberApi.addMember(this.form)
            .then(res => {
              console.log(res);
              if (res.data.data.code == "200") {
                this.fetchData();
              } else {
                this.$message({
                  text: res.data.data.message
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
        return false;
      });
      this.dialogFormVisible = false;
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //提交表单
    onSubmit() {
      this.fetchData();
    },
    //更新数据方法
    updatedData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          MemberApi.updatedMember(this.form.id,this.form).then(res => {
            if (res.data.code == 200) {
              this.fetchData();
              this.$message({
                text: "数据更新成功"
              });
            } else {
              this.$message({
                text: "数据更新失败"
              });
            }
          });
        }else{
          return false;
        }
      });

      this.dialogFormVisible = false;
    },
    //编辑
    handleEdit(index) {
      this.title = "编辑会员";
      MemberApi.findMember(index)
        .then(res => {
          console.log(res);
          if (res.data.data.code == 200) {
            this.form = res.data.data.data;
            console.log(this.form);
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.dialogFormVisible = true;
    },
    //删除
    handleDelete(index) {
      this.$confirm("确认删除这条记录吗？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          const that = this;
          MemberApi.removeMember(index)
            .then(res => {
              console.log(res);
              if (res.data.data.code == 200) {
                that.fetchData();
                this.$message({
                  type: "success",
                  message: res.data.data.message
                });
              } else {
                this.$message({
                  type: "warning",
                  message: res.data.data.message
                });
              }
            })
            .catch(error => {
              this.$message({
                type: "warning",
                message: "请求失败"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //条数改变时触发
    handleSizeChange(cSize) {
      console.log("条数");
      this.pageSize = cSize;
      this.fetchData();
    },
    //页码改变时触发
    handleCurrentChange(cPage) {
      console.log(cPage);
      this.currentPage = cPage;
      this.fetchData();
    },
    //初始化数据
    fetchData() {
      //请求会员列表的数据
      MemberApi.getMemberListPage(
        this.currentPage,
        this.pageSize,
        this.searchMap
      )
        .then(res => {
          console.log(res);
          //   console.log(res);
          this.list = res.data.data.data.rows;
          this.total = res.data.data.data.total;
          console.log(this.list);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>


<style scoped>
.member {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
}
.el-dialog__wrapper /deep/ .el-dialog {
  width: 39%;
}
</style>