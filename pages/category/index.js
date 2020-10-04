import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    rightContent:[],
    currentIndex: 0, 
    scrollTop:0
  },
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync("cates");
    if(!Cates){
      this.getCates();
    }else{
      if(Date.now()-Cates.tiem>1000*10){
        this.getCates();
      }else{
        this.Cates=Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  //获取分类数据
  async getCates(){
    // request({
    //   url:"/categories"
    // }).then(res=>{
    //   this.Cates=res.data.message;

    //   //把接口的数据存入到本地存储中
    //   wx-wx.setStorageSync("cates", {tiem:Date.now(),data:this.Cates});

    //   //构造左侧的大菜单数据
    //   let leftMenuList = this.Cates.map(v=>v.cat_name);
    //   //构造右侧的商品
    //   let rightContent = this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    const res = await request({url:"/categories"});
    this.Cates = res;
    //把接口的数据存入到本地存储中
    wx-wx.setStorageSync("cates", {tiem:Date.now(),data:this.Cates});

    //构造左侧的大菜单数据
    let leftMenuList = this.Cates.map(v=>v.cat_name);
    //构造右侧的商品
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  //左侧点击
  handleItemTap(e){
    // 1获取被点击的标题身上的索引
    // 2给data中的currentIndex赋值
    // 3根据不同的索引来渲染右侧的商品内容
    const {index}=e.currentTarget.dataset;
   
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop:0
    })
  }
})