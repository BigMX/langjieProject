
Page({
  data: {
    group: [
      { name: 1, value: 'firstGroup', checked: 'true' },
      { name: 2, value: 'SecondGroup' },
      { name: 3, value: 'ThirdGroup' },
    ],
    prize: [
      { name: 1, value: 'firstPrize', checked: 'true' },
      { name: 2, value: 'SecondPrize' },
      { name: 3, value: 'ThirdPrize' },
    ],
    currentGroup:1,
    currentPrize:1,
    PrizeDetail:null,
    isDrawn:true
  },
  /**
   * radio监听事件
   */
  listenerRadioGroup: function (e) {
    console.log(e.detail.value);
    var that=this;
    this.setData({
      currentGroup: e.detail.value
    })
    wx.request({
      url: 'http://ec2-18-221-98-201.us-east-2.compute.amazonaws.com:3000/getPrize/'+e.detail.value+'/'+this.data.currentPrize,
      method: 'GET',
      success: function (res) {

      },
      fail: function (res) {
      },
      complete: function (res) {
        console.log(res);
        var d="";
        if(res.data[0].people_id){
          that.setData({
            isDrawn: true
          })
          d+="已被抽走"
        }else{
          that.setData({
            isDrawn:false
          })
          d+="未被抽走"
        }
        that.setData({
          PrizeDetail: res.data[0].prize_name+d
        })
      }
    })

  },
  listenerRadioPrize: function (e) {
    console.log(e.detail.value);
    var that = this;
    this.setData({
      currentPrize: e.detail.value
    })
    wx.request({
      url: 'http://ec2-18-221-98-201.us-east-2.compute.amazonaws.com:3000/getPrize/' + this.data.currentGroup+'/'+e.detail.value,
      method: 'GET',
      success: function (res) {

      },
      fail: function (res) {
      },
      complete: function (res) {
        console.log(res);
        var d = "";
        if (res.data[0].people_id) {
          that.setData({
            isDrawn: true
          })
          d += "已被抽走"
        } else {
          that.setData({
            isDrawn: false
          })
          d += "未被抽走"
        }
        that.setData({
          PrizeDetail: res.data[0].prize_name+d
        })
      }
    })


  },

  chouyixia:function(){
    wx.request({
      url: 'http://ec2-18-221-98-201.us-east-2.compute.amazonaws.com:3000/drawPrize/' + this.data.currentGroup + '/' + this.data.currentPrize,
      method: 'GET',
      success: function (res) {
      },
      fail: function (res) {
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://ec2-18-221-98-201.us-east-2.compute.amazonaws.com:3000/getPrize/1/1',
      method: 'GET',
      success: function (res) {

      },
      fail: function (res) {
      },
      complete: function (res) {
        console.log(res);
        var d = "";
        if (res.data[0].people_id) {
          d += "已被抽走"
        } else {
          that.setData({
            isDrawn: false
          })
          d += "未被抽走"
        }
        that.setData({
          PrizeDetail: res.data[0].prize_name + d
        })
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})