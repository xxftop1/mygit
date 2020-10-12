const sigleCode = {
  sf:'30100001-',
  khlx:'30111001-',
  khxm:'30111002-',
  qj:'30111003-',
  qxjyfx:'30111011-',
  rjzSpzt:'30111014-',
  ZFKHZT:'30111018-',
  jyjcf:'30111019-',
  zfkhztCodeType:'30111018',
  bjyy:'30111015',
  cfclyj:'30111004',
}
const yesOrNo = {
  yes:'1',
  no:'2'
}
const zfxxDetail = {
  url:'http://172.25.16.102:8080/zfda/?'
}

/**
 * 服务名
 */
const server = {
  serverName:'/jfkh'
}

const writ = {
  base_path: '/writ/auto'
}
let bindToGlobal = (obj, key) => {
  if (typeof window[key] === 'undefined') {
    window[key] = {};
  }

  for (let i in obj) {
    window[key][i] = obj[i]
  }
}

/**
 * 计分考核用户信息key
 */
const jfkh = {
  curUserInfo:'jfkh_curUserInfo',
  normalCodeList:'jfkh_normalCodeList',
  normalCodeTypeList:'jfkh_normalCodeTypeList'
};

bindToGlobal(sigleCode,'_sigleCode');
bindToGlobal(yesOrNo,'_yesOrNo');
bindToGlobal(zfxxDetail,'_zfxxDetail');
bindToGlobal(server,'_server');
bindToGlobal(writ,'_writ');
bindToGlobal(jfkh,'_jfkh');
