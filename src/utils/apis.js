var fake = false
var serverUrl = "/api/v1"
var projectID = "5b72a8ff6157e72acc8a3fbd"
var mockUrl = "/mock/" + projectID + "/api/v1"
var url = fake ? mockUrl : serverUrl
const apis = {
  com0001: url + "/system/getJy", // 获取监狱信息
  com0002: url + "/system/getJq", // 获取监区信息
  com0003: url + "/system/getCurUserInfo", // 获取当前用户信息
  com0004: url + "/normalcodes/batch", // 获取codes
  com0005: url + "/system/getNormalCodeList", // 获取CodeList
  com0006: url + "/system/getWritServerUrl", // 获取文书地址
  com0007: url + "/system/getQsjy", // 获取乔司监狱
  com0008: url + "/system/getTaskNextSprs", // 获取下一步审批人
  com0009: url + "/system/deleteFile/",//通过编号删除附件
  // 1. 月公示流程 (谭聪)
  api0011: url + "/ygs/getYgsLc", // 根据部门或单位id获取该部门的月公示
  api0012: url + "/ygs/getThMd", // 查询月评议批量退回的罪犯名单
  api0013: url + "/ygs/addYgsLc", // 新增月公示流程
  api0014: url + "/ygs/updateYgsLc", // 更新月公示流程
  // 2. 确定考核名单  (谭聪)
  api0023: url + "/ygs/batchAddYgsMd", // 保存考核名单
  api0024: url + "/ygs/updateYgsMd", // 更新考核名单
  api0025: url + "/ygs/getYgsMdList", // 获取月公示确认考核名单
  api0026: url + "/ygs/getKhmdCountByZt/", // 通过是否考核状态查询考核名单数量
  // 3. 劳动改造分(吕淑静)
  api0031: url + "/ygs/exportLdfyb", // 劳动分样表下载接口
  api0032: url + "/ygs/exportLdfhz", // 导出劳动改造分汇总列表接口
  api0033: url + "/ygs/exportWldList", // 导出无劳动定额列表
  api0034: url + "/ygs/importLdf", // 有定额劳动分导入
  api0035: url + "/ygs/getLdhzList/", // 根据条件查询劳动改造分汇总列表接口
  api0036: url + "/ygs/getWldList/", // 根据条件查询无劳动定额分列表
  api0037: url + "/ygs/getYldList/", // 根据条件查询有定额劳动分列表
  api0038: url + "/ygs/updateYld", //单条更新劳动分
  api0039: url + "/ygs/batchUpdateJfkhLdf", //批量更新劳动分
  api0040: url + "/ygs/createYgsldfList", //获取月公示劳动改造分名单
  // 4. 教育改造分（胡存夫）
  api0041: url + "/ygs/updateJyjcfList", // 修改月公示教育改造分名单
  api0042: url + "/ygs/getYgsJygzfList", // 获取月公示教育基础分名单
  api0043: url + "/ygs/getYgsJygzfHzList", // 获取月公示教育改造分汇总列表
  api0044: url + "/ygs/batchSaveJyjcfList", // 批量保存教育改造分列表
  api0045: url + "/ygs/createYgsCs", // 生成月初审表
  api0046: url + "/ygs/exportJyjcf", // 导出教育改造基础分
  api0047: url + "/ygs/exportYgsJygzfHzList", // 导出教育改造汇总
  // 5. 月初审接口(高德翰)
  api0051: url + "/ygs/getYcsVoList/", // 查看月初审表
  api0052: url + "/ygs/exportYcs", // 导出罪犯月初审表
  api0053: url + "/ygs/uploadFile", // 上传已签字初审表接口
  api0054: url + "/ygs/entity", // 查看已签字初审表接口
  api0055: url + "/ygs/downloadFileBylcBh", // 下载已签字月初审文件
  api0056: url + "/ygs/deleteFile/", // 删除上传的已签字初审表接口
  api0057: url + "/ygs/detaildata", // 查看扣分详情
  api0058: url + "/ygs/next",//更新月初审完成状态
  // 6. 月公示月汇总接口(曹书源)
  api0061: url + "/ygs/getYgsYhzList", // 查询月公示汇总表接口
  api0062: url + "/ygs/tjzb/", // 提交前准备
  api0063: url + "/ygs/submitYpy", // 提交月评议
  api0064: url + "/ygs/exportYpy", // 生成月评文书
  api0065: url + "/ygs/getBz", // 根据编号获取备注
  api0066: url + "/ygs/addBz", // 根据编号更新备注
  api0067: url + "/ygs/getThzf", // 查询退回罪犯信息接口
  api0068: url + "/ygs/getCorpDeptName",
  api0069: url + "/ygs/getWsZip", // 获取监狱监区Name
  // 7. 完成(吕淑静)
  api0071: url + "/ygs/scqz", // 上传罪犯签字月评表接口
  api0072: url + "/ygs/getWcYpys/", // 查看月评议表
  api0073: url + "/ygs/getYgsWcList",//获取月公示评议列表
  // 8. 教育分项比例设定接口  (谭聪)
  api0081: url + "/jyfxblpz/addJyblfx", // 保存教育分项比例设定接口
  api0082: url + "/jyfxblpz/updateJyblfx", // 更新教育分项比例设定接口
  api0083: url + "/jyfxblpz/getJyblfxList", // 查询教育分项比例设定列表接口
  // 9. 计分考核概况汇总表接口  (谭聪)
  api0091: url + "/jfkhgkhz/getGkhz", // 根据部门或单位id获取计分考核概况汇总表
  // 10. 奖励接口(贾珂)
  api0101: url + "/jl/dhJl", // 兑换奖励接口
  api0102: url + "/jl/cancelJl", // 取消奖励接口
  api0103: url + "/jl/getJlHyPc", // 合议记录展示列表接口
  api0104: url + "/jl/approvalJl", // 奖励审批
  api0105: url + "/jl/getJl", // 奖励查看详情
  api0106: url + "/jl/beforeSubmitJl", // 开启奖励审批流接口
  api0107: url + "/jl/submitJl", // 提交奖励
  api0108: url + "/jl/getJlList/", // 根据状态动态查询奖励列表接口
  api0109: url + "/jl/GetJl/", // 查询可评定奖励罪犯

  // 12. 月公示评议(胡存夫)
  api0121: url + "/ygs/getYgsPyList", // 获取月公示评议列表
  api0122: url + "/ygs/approvalYgs", // 批量审批
  api0123: url + "/ygs/ygsQbtgOrPlth", // 合议记录展示列表接口
  api0124: url + "/ygs/getSfpy", // 获取是否可评议数据（boolean类型）
};

export {
  apis
}
