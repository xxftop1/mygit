const state = {
  khny: '',
  deptId: '',
  corpId: '',
  deptName: '',
  corpName: '',
  hasReject: false,
  clickOver: false,
  processState: {
    // 进度标志
    bh:"",
    sfqdkhmd: "", // 是否确定考核名单。Boolean类型 必须
    sfzzjyjcf: "", // 是否制作教育基础分。Boolean类型 必须
    sfwcldjcfsp: "", // 是否完成劳动基础分审批。Boolean类型 必须
    sfwcycs: "", // 是否完成月初审。Boolean类型 必须
    sfwcyhz: "", // 是否完成月汇总。Boolean类型 必须
    sfwcpy: "", // 是否完成评议。Boolean类型 必须
    pysfth: "", // 评议是否退回。Boolean类型 必须
    sfzsthan:""//退回原因列表是否有数据。必须
  }
};

export default state;
