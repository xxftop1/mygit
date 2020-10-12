export const khny = (state) => {
  return state.khny;
}

export const deptObj = (state) => {
  return {
    deptId: state.deptId,
    deptName: state.deptName
  }
}

export const corpObj = (state) => {
  return {
    corpId: state.corpId,
    corpName: state.corpName
  }
}
export const processState = (state) => {
  return state.processState;
}
export const hasReject = (state) => {
  return state.hasReject;
}
export const clickOver = (state) => {
  return state.clickOver
}