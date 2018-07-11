var p="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // fRoundfClass:1,
    // fRoundsClass: 2,
    // fRoundtClass: 3,
    // sRoundfClass: 4,
    // sRoundsClass: 5,
    // sRoundtClass: 6,
    // tRoundfClass: 7,
    // tRoundsClass: 8,
    // tRoundtClass: 9,
    prizes:"",
      t: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    this.setData({
      prizes:""
    })
    wx.request({
      url: 'http://ec2-18-221-98-201.us-east-2.compute.amazonaws.com:3000/showPrize',
      method: 'GET',
      success: function (res) {
      },
      fail: function (res) {
      },
      complete: function (res) {   
        console.log(res);
        p+="轮|\t"+"等|\t"+"奖项|"+"获奖者"+"\n" 
        for(var i in res.data){
          p = p + res.data[i].prize_round + "　|" + res.data[i].prize_class +"　|"+res.data[i].prize_name+"|"+res.data[i].people_name+"\n";
        }
        that.setData({
          t:res.data,
          prizes: p
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