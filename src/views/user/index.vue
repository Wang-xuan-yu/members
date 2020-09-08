<template>
  <div class="user">
    <el-table :data="list" height="380" style="width: 100%;">
      <el-table-column type="index" label="编号" width="180"></el-table-column>
      <el-table-column prop="registe_time" label="注册日期" width="180"></el-table-column>
      <el-table-column prop="username" label="用户姓名" width="180"></el-table-column>
      <el-table-column prop="city" label="注册地址"></el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentPage" :page-size="pageSize" :current-page="currentPage" background layout="total, prev, pager, next" :total="total"></el-pagination>
  </div>
</template>

<script>
import UserApi from "../../api/user";
export default {
  name: "",
  data() {
    return {
      list: [],
      pageSize: 10,
      currentPage : 1,
      offset: 0,
      total : 0
    };
  },
  components: {},
  methods: {
    handleCurrentPage(data){
      console.log(data)
      this.offset = (data - 1) * this.pageSize;
      this.fetchData();
    },
    fetchData() {
      //请求列表数据
      UserApi.getUserList(this.offset, this.pageSize)
        .then(res => {
          this.list = res.data;
          console.log(this.list);
        })
        .catch(error => {
          console.log(error);
        });

      //请求总条数数据
      UserApi.getCount().then(res=>{
        console.log(res.data.count)
        this.total = res.data.count
      })  
    }
  },
  created() {
    this.fetchData();
  }
};
</script>


<style scoped>
.user {
  margin-top: 20px;
}
</style>