// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isactive: true
      }, {
        id: 1,
        value: "商品/商家投诉",
        isactive: false
      }
    ],
    chooseImgs:[],
    textVal:""
  },
  UpLoadImgs:[],
  handletabsitemchange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isactive = true : v.isactive = false);
    this.setData({
      tabs
    })
  },
  handleChooseImg(){
    wx.chooseImage({
      count: 9,
      sizeType:['origian', 'compressed'],
      sourceType:['album', 'camera'],
      success: (res)=>{
        this.setData({
          chooseImgs:[...this.data.chooseImgs,...res.tempFilePaths]
        })
      },
    })
  },
  handleRemoveImg(e){
    const {index} = e.currentTarget.dataset;
    let {chooseImgs} = this.data;
    chooseImgs.splice(index,1);
    this.setData({
      chooseImgs
    })
  },
  handleTextInpute(e){
    this.setData({
      textVal:e.detail.value
    })
  },
  handleFormSubmit(){
    const {textVal, chooseImgs} = this.data;
    if(!textVal.trim()){
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true,
      })
      return;
    }
    wx.showLoading({
      title: '正在上传中',
      mask: true
    })
    if (chooseImgs != 0) {
    chooseImgs.forEach((v, i)=>{
      wx.uploadFile({
        filePath: 'v',
        name: 'image',
        url: 'https://img.coolcr.cn/api/upload',
        formData: {}, 
        success: (result)=>{
          let url = JSON.parse(result.data).url;
          this.UploadImgs.push(url);
          if (i === chooseImgs.length - 1) {
            wx.hideLoading();
            this.setData({
              textVal: "",
              chooseImgs: []
            })
            wx.navigateBack({
              delta: 1
            })
          } 
        }
      })
    })
    } else {
      wx.hideLoading();
      console.log("只是提交了文本");
      wx.navigateBack({
        delta: 1
      })
    }
  }
})