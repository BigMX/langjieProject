var prom=require("../../utils/prom.js")

const app=getApp();
var find=false;
Page({
  data:{
    nickName:'wh',
    userInfo: {},
    usermotto:"WELCOME",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onReady:function(){
    var userInfo=getApp().globalData.userInfo;
    console.log(userInfo.nickName);
    this.setData({
      nickName:userInfo.nickName
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  abc(){
    wx.request({
      url: 'https://api.langjie.com/proxy/wxShowPeople',
      method: 'GET',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log('submit success');
        getApp().globalData.ren= res.data;  
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
          wx.navigateTo({
            url: '../album/album',
          })
      }
    })
  },
  abcd(){
    var hah = getApp().globalData.userInfo.nickName;
    prom.wxPromisify(wx.request)({
      url: 'https://api.langjie.com/proxy/wxshowPeople',
      method: 'GET',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log('submit success');
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      
      }
    }).then(function(res){
      for (var p in res.data) {
        if (hah == res.data[p].people_name) {
          find = true;
          console.log("first")
          break;
        }
      }
    }).then(function(res){
      console.log(find)
      if (find) {
        
        wx.showToast({
          title: "您已参与",
          icon: 'success',
          duration: 2000
        })
      } else {
        
        wx.request({
          url: 'https://api.langjie.com/proxy/wxAddPeople',
          data: { "nickName": hah },
          method: 'POST',
          success: function (res) {
            console.log(hah);
            console.log('add Complete');
          },
          fail: function (res) {
            console.log('add fail');
          },
          complete: function (res) {
            console.log('add complete');
            wx.showToast({
              title: "谢谢参与",
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },
  abcde(){
    wx.navigateTo({
      url: '../game/game',
    })
  },
  abcdef(){
    wx.redirectTo({
      url: '../../pages/index/index',
    })
  },
  abcdefg(){
    wx.navigateTo({
      url: '../prize/prize',
    })
  },
    abcdefgh() {
    wx.navigateTo({
      url: '../draw/draw',
    })
  }
})