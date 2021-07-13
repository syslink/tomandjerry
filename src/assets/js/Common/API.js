module.exports = {
// 根据钱包地址获取用户信息：
// 接口名：customer/get
// 参数：walletAddress
// 返回的用户信息包含token信息
  getUserInfor: "https://alibiotec.com/customer/get.do",


// 添加/修改用户信息：
// 接口名：customer/edit
// 参数：id（修改时必传，添加不传） nickName，intro，walletAddress，apptoken（修改必传）
  customerEdit: "https://alibiotec.com/customer/edit.do",


// 根据用户Id获取地址列表：
// 接口名：address/list
// 参数：customerId，apptoken
  getAddressList: "https://alibiotec.com/address/list.do",
  

// 修改地址：
// 接口名：address/edit
// 参数：id(主键),country（国家）,province（省）,city（市）,address（地址）,name（姓名）,phone（电话）,postId（邮编）,isdef（是否默认地址）,customerId（用户ID），apptoken
  addressEdit: "https://alibiotec.com/address/edit.do",

// 删除地址：
// 接口名：address/delete
// 参数：id，apptoken
  addressDelete: "https://alibiotec.com/address/delete.do",

  
}