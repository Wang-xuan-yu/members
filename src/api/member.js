import request from "../utils/request"

export default {
    //获取会员列表接口
    getMemberList(){
        return request({
            url : "/member/list",
            method : "get"
        })
    },
    //获取会员列表分页接口
    getMemberListPage(page,size,searchMap){
        return request({
            url : `/member/list/search/${page}/${size}`,
            method : "POST",
            data : searchMap
        })
    },
    //新增会员接口
    addMember(data){
        return request({
            url : "/member",
            method : "post",
            data : data
        })
    },
    //删除会员接口
    removeMember(id){
        return request({
            url : `/member/${id}`,
            method : "delete"
        })
    },
    //查询单条数据接口
    findMember(id){
        return request({
            url : `/member/${id}`,
            method : "get"
        })
    },
    //更新某一条会员的数据接口
    updatedMember(id,data) {
       return request({
           url : `/member/${id}`,
           method : "put",
           data : data
       }) 
    },
}   