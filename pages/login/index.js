// pages/login/index.js
Page({
  handleGetUserInfo(e){
    const {userInfo} = e.detail;
    wx.setStorageSync("userInfo", userInfo);
    wx.navigateBack({
      delta: 1
    })
  }
})
