var prom = require("../../utils/prom.js")
const app = getApp()
var find=false;

var managerList = ["oathZ1A0Iddyj-qqpL6fl8OVBAFA"]
var DrawerList = ['oathZ1A0Iddyj-qqpL6fl8OVBAFA']
var tempMember=false;
var unionid;
var openid;
Page({
  data: {
    motto: '欢迎进入签到小程序',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    d:"s",
    isManager: false,
    isDrawer: false,
    isMember: true
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    var that =this;
    wx.login({
      success: function (res) {
        var code = res.code;
        prom.wxPromisify(wx.request)({
          url: "https://api.langjie.com/proxy/wxGetUserInfoByCode",
          data: {
            appid: 'wx238ca91cc7a15764',
            secret: '655d3bf13a70671966abdd4d2c6be206',
            js_code: code,
            grant_type: 'authorized_code'
          },
          header: {
          },
          fail: function (res) {
            console.log("login Fail");
          },
          success: function (res) {
            console.log('login Success')
          },
          complete: function (res) {
            openid = res.data.openid
            unionid = res.data.unionid
            for (var i=0;i<managerList.length;i++){
              if(managerList[i]==unionid){
                that.setData({
                  isManager: true
                })
              }
            }
            for (var i = 0; i < DrawerList.length; i++) {
              if (DrawerList[i] == unionid) {
                that.setData({
                  isDrawer: true
                })
              }
            }
          }
        }).then(function (res) {
          wx.request({
            url: 'https://api.langjie.com/wx/checkMemberExist?unionid=' + unionid,
            method: 'GET',
            success: function (res) {
            },
            fail: function (res) {
            },
            complete: function (res) {
              if (res.data.code == -1) {
                that.setData({
                  isMember : false
                })
              }
            }
          })
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

    } else if (this.data.canIUse){
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

      }
    } else {
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
  gotoAlbum() {
    wx.navigateTo({
      url: '../../tests/album/album',
    })
  },
  gotoTest(){
    var that = this;
    var hah = getApp().globalData.userInfo.nickName;
    console.log(app.globalData.userInfo);
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
    }).then(function (res) {
      for (var p in res.data) {
        if (hah == res.data[p].people_name) {
          find = true;
          console.log("first")
          break;
        }
      }
    }).then(function (res) {
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
    wx.navigateTo({
      url: '../../tests/test/test',
    })
  },
  gotoManage(){
    wx.navigateTo({
      url: '../../tests/manage/manage',
    })
  },
  gotoCj(){
    wx.navigateTo({
      url:'../cj/cj'
    })
  },
  // click: function () {

  //   ctx.setFillStyle('red')
  //   ctx.fillRect(0, 0, 150, 200)
  //   wx.drawCanvas({
  //     //画布标识，传入<canvas/>的cavas-id
  //     canvasId: 'myCanvas',
  //     //获取绘制行为， 就相当于你想做到菜context.getActions()就是食材
  //     actions: ctx.getActions(),
  //   })
  // },
  // click2:function(){
  //   ctx.clearRect(0, 0, 150, 200);
  //   ctx.setFillStyle('blue')
  //   ctx.fillRect(0, 0, 150, 200)
  //   wx.drawCanvas({
  //     canvasId:'myCanvas',
  //     actions:ctx.getActions(),
  //   })
  // },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
