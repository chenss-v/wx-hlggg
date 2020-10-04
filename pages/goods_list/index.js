import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isactive:true
      }, {
        id: 1,
        value: "销量",
        isactive: false
      }, {
        id: 2,
        value: "价格",
        isactive: false
      }
    ],
    goodsList: []
  },
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid || "";
    this.QueryParams.query = options.query || "";
    this.getGoodsList();
  },
  async getGoodsList() {
    const res= await request({url: "/goods/search", data: this.QueryParams});
    const total = res.total;
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    this.setData({
      goodsList: [...this.data.goodsList].concat(...res.goods)
    })
    // })
    // wx.stopPullDownRefresh();
  },

  handletabsitemchange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isactive = true : v.isactive = false);
    this.setData({
      tabs
    })
  },
  // onPullDownRefresh() {
  //   this.setData({
  //     goodslist: [],
  //   })
  //   this.queryparams.pagenum = 1;
  //   this.getgoodslist();
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.totalpages) {
      wx.showToast({
        title: '没了呀！！！！',
      })
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
})