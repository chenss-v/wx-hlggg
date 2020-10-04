// pages/user/index.js
Page({
  data: {
    userInfo:{},
    collectNums:0
  },
  onShow(){
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect")||[];
    this.setData({
      userInfo,
      collectNums:collect.length
    })
  }
})