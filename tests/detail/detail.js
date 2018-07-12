
var prom = require("../../utils/prom.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: '',
    prizeName:"",
    prizePrice:0.0,
    prizeClass:0,
    prizeRound:0,
    imgUrl:"",
  },
  onLoad: function () {
  },
  name: function (e) {
    this.setData({
      prizeName: e.detail.value
    })
  },
  price: function (e) {
    this.setData({
      prizePrice: e.detail.value
    })
  },
  round: function (e) {
    this.setData({
      prizeRound: e.detail.value
    })
  },
  Class: function (e) {
    this.setData({
      prizeClass: e.detail.value
    })
    console.log(e.detail.value);
  },
  add:function(e){
    var that = this;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];
    prom.wxPromisify(wx.request)({
      url: 'https://api.langjie.com/proxy/wxAddPrize',
      data: { 
        "prize_name": that.data.prizeName,
        "prize_price":that.data.prizePrice, 
        "prize_class":that.data.prizeClass,
        "prize_round":that.data.prizeRound,
        "prize_url":that.data.imgUrl
      },
      method: 'POST',
      success: function (res) {
        console.log('add success');
      },
      fail: function (res) {
        console.log('add fail');
      },
      complete: function (res) {
        console.log('add complete');
      }
    }).then(function(res){
      wx.showToast({
        title: '成功添加',
      })
    }).then(function(res){
      
      wx.request({
        url: 'http://ec2-18-221-98-201.us-east-2.compute.amazonaws.com:3000/showPrize',
        method: 'GET',
        success: function (res) {
        },
        fail: function (res) {
        },
        complete: function (res) {

          var temp = [];
          for (var i = 0; i < res.data.length; i++) {
            temp.push(false);
          }
          var vis = [];
          for (var i in res.data) {
            console.log(res.data[i].prize_round)
            if (res.data[i].prize_round == prevPage.data.currentGroup) {
              vis.push(true);
            } else {
              vis.push(false);
            }
          }
          console.log(vis);
          prevPage.setData({
            prizeAmount: res.data.length,
            t: res.data,
            h: temp,
            prizeVis: vis
          })
        }
      })
    }).then(function(res){
      wx.navigateBack({})
    })
  },
    chooseimage: function () {
      var that = this;
      wx.showActionSheet({
        itemList: ['从相册中选择', '拍照'],
        itemColor: "#CED63A",
        success: function (res) {
          if (!res.cancel) {
            if (res.tapIndex == 0) {
              that.chooseWxImage('album')
            } else if (res.tapIndex == 1) {
              that.chooseWxImage('camera')
            }
          }
        }
      })

    },

    chooseWxImage: function (type) {
      var that = this;
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: [type],
        success: function (res) {
          console.log(res);
          that.setData({
            tempFilePaths: res.tempFilePaths[0],
          })
        }
      })
      console.log(this.data.tempFilePaths);
    },

  upload(){
    var that = this;
    console.log(this.data.tempFilePaths)
    wx.uploadFile({
      url: "https://api.langjie.com/wx/uploadImg",
      filePath: that.data.tempFilePaths,

      name: "file",
      formData: {
      },
      success: function (res) {

      },
      complete:function(res){
        console.log(res.data)
        var x = JSON.parse(res.data);
        that.setData({
          imgUrl: x.data
        })
      }
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})