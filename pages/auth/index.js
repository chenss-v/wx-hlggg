import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';
import { login } from "../../utils/asyncWx.js";
Page({
  async handleGetUserInfo(e){
    const {encryptedData, rawData, iv, signature} = e.detail;
    const { code } = await login();
    const loginParams = { encryptedData, rawData, iv, signature, code } 
    const res = await wx.request({ url: '/users/wxlogin',data: loginParams,method:"post"});
    console.log(res)
  }
})