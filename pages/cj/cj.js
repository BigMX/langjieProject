var prom = require("../../utils/prom.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    group: [
      { name: 1, value: 'firstGroup', checked: 'true' },
      { name: 2, value: 'SecondGroup' },
      { name: 3, value: 'ThirdGroup' },
    ],
    currentGroup: 1,
    t: [],
    h: [],
    prizeVis: [],
    curr: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  listenerRadioGroup: function (e) {
    console.log(e.detail.value);
    var that = this;
    var vis = [];
    for (var i in this.data.t) {
      if (this.data.t[i].prize_round == e.detail.value) {
        vis.push(true);
      } else {
        vis.push(false);
      }
    }
    console.log(vis);
    this.setData({
      currentGroup: e.detail.value,
      prizeVis: vis
    })
  },


  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://ec2-18-221-98-201.us-east-2.compute.amazonaws.com:3000/showPrizeByPrice',
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
        var id = [];
        var name = [];
        for (var i in res.data) {
          if (res.data[i].prize_round == that.data.currentGroup) {
            vis.push(true);
          } else {
            vis.push(false);
          }
        }

        console.log(vis);
        that.setData({
          prizeAmount: res.data.length,
          t: res.data,
          h: temp,
          prizeVis: vis,
        })
      }
    })
  },

  chou: function (event) {
    var that=this;
    var prizeId = this.data.t[event.currentTarget.dataset.testid].prize_id;
    var temp = that.data.t;
    prom.wxPromisify(wx.request)({
      url: 'http://ec2-18-221-98-201.us-east-2.compute.amazonaws.com:3000/drawPrize/' + prizeId,
      method: 'GET',
      success: function (res) {
      },
      fail: function (res) {
      },
      complete: function (res) {
        console.log(res.data.temp);
        temp[event.currentTarget.dataset.testid].people_id = res.data.temp[0].people_id;
        temp[event.currentTarget.dataset.testid].people_name = res.data.temp[0].people_name;
      }
    }).then(function(res){
       that.setData({
         t:temp
       })
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