Page({

  /**
   * 页面的初始数据
   */
  data:{
    group: [
      { name: 1, value: 'firstGroup', checked: 'true' },
      { name: 2, value: 'SecondGroup' },
      { name: 3, value: 'ThirdGroup' },
    ],
    currentGroup: 1,
    prizeAmount:1,
        t: [],
        h:[],
        prizeVis:[],
        prizeName: "",
        prizePrice: 0.0,
        prizeClass: 0,
        prizeRound: 0,
        curr:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  listenerRadioGroup: function (e) {
    console.log(e.detail.value);
    var that = this;
    var vis=[];
    for(var i in this.data.t){
      if(this.data.t[i].prize_round==e.detail.value){
        vis.push(true);
      }else{
        vis.push(false);
      }
    }
    console.log(vis);
    this.setData({
      currentGroup: e.detail.value,
      prizeVis:vis
    })
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
  },
  onLoad: function (options) {
    var that = this;
    console.log(getCurrentPages());
    wx.request({
      url: 'http://ec2-18-221-98-201.us-east-2.compute.amazonaws.com:3000/showPrize',
      method: 'GET',
      success: function (res) {
      },
      fail: function (res) {
      },
      complete: function (res) {

        var temp=[];
        for(var i=0;i<res.data.length;i++){
          temp.push(false);
        }
        var vis=[];
        for(var i in res.data){
          console.log(res.data[i].prize_round)
          if(res.data[i].prize_round==that.data.currentGroup){
            vis.push(true);
          }else{
            vis.push(false);
          }
        }
        console.log(vis);
        that.setData({
          prizeAmount: res.data.length,
          t: res.data,
          h:temp,
          prizeVis:vis
        })
      }
    })
  },

  detail:function(event){
    console.log(event.currentTarget.dataset.testid)
    var temp=this.data.h
    temp[event.currentTarget.dataset.testid] =(temp[event.currentTarget.dataset.testid]==false)?true:false;
    this.setData({
      h:temp
    })
    console.log(this.data.h);
    var id = event.currentTarget.dataset.testid;
    this.setData({
      curr: this.data.t[event.currentTarget.dataset.testid].prize_id,
      prizeName:this.data.t[id].prize_name,
      prizePrice:this.data.t[id].prize_price,
      prizeRound:this.data.t[id].prize_round,
      prizeClass:this.data.t[id].prize_class
    })
  },

  add(){
    wx.navigateTo({
      url: '../detail/detail',
    })
  },

  update(){
    var that = this;
    wx.request({
      url: 'http://ec2-18-221-98-201.us-east-2.compute.amazonaws.com:3000/updatePrize',
      data: {
        "prize_name": that.data.prizeName,
        "prize_price": that.data.prizePrice,
        "prize_class": that.data.prizeClass,
        "prize_round": that.data.prizeRound,
        'prize_id': that.data.t[that.data.curr].prize_id
      },
      method: 'PUT',
      success: function (res) {
        console.log('add success');
      },
      fail: function (res) {
        console.log('add fail');
      },
      complete: function (res) {
        console.log('add complete');
      }
    })
    var temp = this.data.h
    var prizeList=this.data.t
    prizeList[this.data.curr].prize_name=this.data.prizeName;
    prizeList[this.data.curr].prize_price = this.data.prizePrice;
    prizeList[this.data.curr].prize_class = this.data.prizeClass;
    prizeList[this.data.curr].prize_round = this.data.prizeRound;
    temp[this.data.curr] = (temp[this.data.curr] == false) ? true : false;
    var vis = [];
    for (var i in prizeList) {
      if (prizeList[i].prize_round == this.data.currentGroup) {
        vis.push(true);
      } else {
        vis.push(false);
      }
    }
    this.setData({
      h: temp,
      t:prizeList,
      prizeVis:vis
    })
  },

  Delete:function(e){
    var that = this;
    wx.request({
      url: 'http://ec2-18-221-98-201.us-east-2.compute.amazonaws.com:3000/deletePrize/' + that.data.curr,
      method: 'DELETE',
      success: function (res) {
        console.log('delete success');
      },
      fail: function (res) {
        console.log('delete fail');
      },
      complete: function (res) {
        console.log('delete complete');
      }
    })
    var temp = [];
    var prizeList = [];
    for(var i=0;i<this.data.h.length;i++){
      if(this.data.t[i].prize_id!=this.data.curr){
        temp.push(this.data.h[i]);
        prizeList.push(this.data.t[i]);
      }
    }
    var vis = [];
    for (var i in prizeList) {
      if (prizeList[i].prize_round == this.data.currentGroup) {
        vis.push(true);
      } else {
        vis.push(false);
      }
    }
    this.setData({
      h: temp,
      t: prizeList,
      prizeVis: vis
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