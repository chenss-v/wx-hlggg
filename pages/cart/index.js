import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow(){
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart")||[];
    // const allChecked = cart.length?cart.every(v=>v.checked):false;
    this.setData({
      address
    });
    this.setCart(cart);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  async handleChooseAddress() {
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      if (scopeAddress === false) {
        await openSetting();
      }
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync("address", address);
    }catch(error) {
      console.log(error)
    }
  },
  handleItemChacked(e){
    const goods_id=e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id === goods_id);
    cart[index].checked=!cart[index].checked;
    this.setCart(cart);
  },
  setCart(cart){
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    })
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync("cart", cart);
  },
  handleItemAllChack(){
    let {cart,allChecked} = this.data;
    allChecked=!allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart);
  },
  async handleItemNumEdit(e){
    const {operation,id}=e.currentTarget.dataset;
    let {cart}=this.data;
    const index=cart.findIndex(v=>v.goods_id===id);
    if (cart[index].num === 1 && operation === -1) {
      const res = await showModal({ content:"您是否要删除？"});
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    }else{
      cart[index].num += operation;
      this.setCart(cart);
    } 
  },
  handlePay() {
    const { address, totalNum } = this.data;
    if (!address.userName) {
      wx.showToast({
        title: '您还没有选择收货地址',
        icon: 'none'
      })
    }
    else if (totalNum === 0) {
      wx.showToast({
        title: '您还没有选购商品',
        icon: 'none'
      })
    }

    else {
      wx.navigateTo({
        url: '/pages/pay/index'
      })
    }
  }
})