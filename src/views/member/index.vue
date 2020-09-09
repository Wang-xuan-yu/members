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
          <el-option v-for="(item,index) in payTypeValue" :key="index" :label="item.name" :value="item.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker value-format="yyyy-MM-dd" v-model="searchMap.birthday" type="date" placeholder="出生日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
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
      searchMap: {
        cardNum : "",
        name : "",
        payType : "",
        birthday : ""
      },
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      payTypeValue : payType
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
    //重置表单
    resetForm(formName){
      this.$refs[formName].resetFields();
    },
    //提交表单
    onSubmit() {
      this.fetchData();
    },
    //编辑
    handleEdit() {},
    //删除
    handleDelete() {},
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
      MemberApi.getMemberListPage(this.currentPage, this.pageSize,this.searchMap)
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
</style>