/**
 * @description 根据出生日期算出年龄
 */
export const jsGetAge = (strBirthday) => {
  var returnAge;
  var strBirthdayArr = strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];
  var d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();
  if (nowYear == birthYear) {
    returnAge = 0;//同年 则为0岁
  }else {
    var ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay;//日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        }else {
          returnAge = ageDiff;
        }
      }else {
        var monthDiff = nowMonth - birthMonth;//月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        }else {
          returnAge = ageDiff;
        }
      }
    }else {
      returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge;//返回周岁年龄
}

//获取当前页数
export const getPageNum = (offset, limit) => {
  return offset / limit + 1;
};
//检查权限
export const checkLinkShow = (rightKey, rightList) => {
  if ($.inArray(rightKey, rightList) != -1) {
    return true;
  } else {
    return false;
  }
};
//从localStorage中检查权限
export const checkButtonShow = (name) => {
  var rightList = JSON.parse(localStorage.getItem(_jfkh.curUserInfo)).userRightList;
  return checkLinkShow(name, rightList);
};

//获取用户级别
export const getDeptType = () => {
  var curUserInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
  return curUserInfo.deptType === '1' ? true : false;
}
//判断是否是监狱局
export const isJyj = () => {
  var deptType = JSON.parse(localStorage.getItem(_jfkh.curUserInfo)).deptType;
  return deptType == '1';
};
//判断是否是监狱局
export const formatLastMonth = (realDate) => {
  var newDate = new Date(realDate);
  var year = newDate.getFullYear();
  var month = newDate.getMonth();
  if(month == 0) {
    year = parseInt(year) - 1;
    month = 12;
  } else {
    month = month < 10 ? "0" + month: month;
  }
  return year + "-" + month;
};
