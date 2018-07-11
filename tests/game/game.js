let ctx = wx.createCanvasContext('gameCanvas')

var Width = wx.getSystemInfoSync().screenWidth;
var prom = require("../../utils/prom.js")

var currentPage=0;
var description_1=[]
var description_2=[]
var trial=[]
description_1.push("第一关: ")
description_1.push("第二关: ")
description_1.push("第三关: ")
description_2.push("/4 步")
description_2.push("/7 步")
description_2.push("/1000 步")
trial.push(4);
trial.push(7);
trial.push(1000);
var pages=[]
pages.push(first_page);
pages.push(second_page);

function restart(){
  count=0;
  var gamePage = pages[currentPage];
  gamePage();
  arr=[].concat(layout[currentPage]);

  console.log(arr2);
  console.log(arr);
  wx.showToast({
    title: '关灯次数耗尽',
    icon: 'loading',
    duration: 1800
  })
}
function first_page(){
  ctx.setFillStyle('azure')
  ctx.fillRect(0, 0, Width / 3, Width / 3)
  ctx.fillRect(Width * 2 / 3, 0, Width / 3, Width / 3)
  ctx.fillRect(Width * 2 / 3, Width * 2 / 3, Width / 3, Width / 3)
  ctx.fillRect(0, Width * 2 / 3, Width / 3, Width / 3)
  ctx.setFillStyle('grey')
  ctx.fillRect(Width / 3, 0, Width / 3, Width / 3)
  ctx.fillRect(0, Width / 3, Width / 3, Width / 3)
  ctx.fillRect(Width / 3, Width / 3, Width / 3, Width / 3)
  ctx.fillRect(Width / 3, Width * 2 / 3, Width / 3, Width / 3)
  ctx.fillRect(Width * 2 / 3, Width / 3, Width / 3, Width / 3)
  wx.drawCanvas({
    canvasId: 'gameCanvas',
    actions: ctx.getActions(),
  })
}

function second_page() {
  ctx.setFillStyle('grey')
  ctx.fillRect(0, 0, Width / 3, Width / 3)
  ctx.fillRect(Width / 3, 0, Width / 3, Width / 3)
  ctx.fillRect(Width * 2 / 3, 0, Width / 3, Width / 3)
  ctx.setFillStyle('azure')
  ctx.fillRect(Width * 2 / 3, Width * 2 / 3, Width / 3, Width / 3)
  ctx.fillRect(0, Width * 2 / 3, Width / 3, Width / 3)
  ctx.fillRect(0, Width / 3, Width / 3, Width / 3)
  ctx.fillRect(Width / 3, Width / 3, Width / 3, Width / 3)
  ctx.fillRect(Width / 3, Width * 2 / 3, Width / 3, Width / 3)
  ctx.fillRect(Width * 2 / 3, Width / 3, Width / 3, Width / 3)
  wx.drawCanvas({
    canvasId: 'gameCanvas',
    actions: ctx.getActions(),
  })
}

function drawCanvas(){

  ctx.setFillStyle((arr[0] == 0) ? "azure" : "grey");
  ctx.fillRect(0, 0, Width / 3, Width / 3);
  ctx.setFillStyle((arr[2] == 0) ? "azure" : "grey");
  ctx.fillRect(Width * 2 / 3, 0, Width / 3, Width / 3)
  ctx.setFillStyle((arr[6] == 0) ? "azure" : "grey");
  ctx.fillRect(0, Width * 2 / 3, Width / 3, Width / 3)
  ctx.setFillStyle((arr[8] == 0) ? "azure" : "grey");
  ctx.fillRect(Width * 2 / 3, Width * 2 / 3, Width / 3, Width / 3)
  ctx.setFillStyle((arr[1] == 0) ? "azure" : "grey");
  ctx.fillRect(Width / 3, 0, Width / 3, Width / 3)
  ctx.setFillStyle((arr[3] == 0) ? "azure" : "grey");
  ctx.fillRect(0, Width / 3, Width / 3, Width / 3)
  ctx.setFillStyle((arr[4] == 0) ? "azure" : "grey");
  ctx.fillRect(Width / 3, Width / 3, Width / 3, Width / 3)
  ctx.setFillStyle((arr[5] == 0) ? "azure" : "grey");
  ctx.fillRect(Width*2 / 3, Width * 1 / 3, Width / 3, Width / 3)
  ctx.setFillStyle((arr[7] == 0) ? "azure" : "grey");
  ctx.fillRect(Width * 1 / 3, Width*2 / 3, Width / 3, Width / 3)

  wx.drawCanvas({
    //画布标识，传入<canvas/>的cavas-id
    canvasId: 'gameCanvas',
    //获取绘制行为， 就相当于你想做到菜context.getActions()就是食材
    actions: ctx.getActions(),
  })

  
  for(var p =0;p<arr.length;p++){
    if(arr[p]==0){
      console.log("not complete");
      return;
    }
  }
  console.log("perfect!")
  count=0;
  wx.showToast({
    title: description_1[currentPage]+"通过",
    icon: 'success',
    duration: 2400
  })
  if(currentPage+1==pages.length){
    count=0;
    currentPage=0;
    arr = [0, 1, 0,
      1, 1, 1,
      0, 1, 0]
    wx.navigateBack({})
  }else{
    currentPage++;
    var gamePage=pages[currentPage];
    arr=[].concat(layout[currentPage]);
    gamePage();
  }
}
const layout=[];
const arr1 = [0,1,0,
           1,1,1,
           0,1,0]
const arr2 = [1, 1, 1,
            0, 0, 0,
            0, 0, 0]
layout.push(arr1);
layout.push(arr2);
var arr=[].concat(layout[currentPage]);

var count=0;
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width:null,
    canIUse:false,
    description:null,
    count:0,
    description: "第一关: "+count+"/4 步"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      width: Width + 'px',
    })
    var gamePage = pages[currentPage];
    gamePage();
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

  light_1:function(){
    count++;
    if (count > trial[currentPage]) {
      restart();
    }else{
      arr[0]=(arr[0]==0)?1:0;
      arr[1] = (arr[1] == 0) ? 1 : 0;
      arr[3] = (arr[3] == 0) ? 1 : 0;
      drawCanvas();  
    }
    this.setData({
      description: description_1[currentPage] + count + description_2[currentPage]
    })
  },

  light_2:function(){
    count++;
    if (count > trial[currentPage]) {
      restart();
    } else {
    arr[0] = (arr[0] == 0) ? 1 : 0;
    arr[1] = (arr[1] == 0) ? 1 : 0;
    arr[2] = (arr[2] == 0) ? 1 : 0;
    arr[4] = (arr[4] == 0) ? 1 : 0;
    drawCanvas();
    }
    this.setData({
      description: description_1[currentPage] + count + description_2[currentPage]
    })
  },
  light_3: function () {
    count++;
    if (count > trial[currentPage]) {
      restart();
    } else {
    arr[1] = (arr[1] == 0) ? 1 : 0;
    arr[2] = (arr[2] == 0) ? 1 : 0;
    arr[5] = (arr[5] == 0) ? 1 : 0;
    drawCanvas();
    }
    this.setData({
      description: description_1[currentPage] + count + description_2[currentPage]
    })
  },
  light_4: function () {
    count++;
    if (count > trial[currentPage]) {
      restart();
    } else {
    arr[0] = (arr[0] == 0) ? 1 : 0;
    arr[3] = (arr[3] == 0) ? 1 : 0;
    arr[4] = (arr[4] == 0) ? 1 : 0;
    arr[6] = (arr[6] == 0) ? 1 : 0;
    drawCanvas();
  }
    this.setData({
    description: description_1[currentPage] + count + description_2[currentPage]
  })
  },
  light_5: function () {
    count++;
    if (count > trial[currentPage]) {
      restart();
    } else {
    arr[1] = (arr[1] == 0) ? 1 : 0;
    arr[3] = (arr[3] == 0) ? 1 : 0;
    arr[4] = (arr[4] == 0) ? 1 : 0;
    arr[5] = (arr[5] == 0) ? 1 : 0;
    arr[7] = (arr[7] == 0) ? 1 : 0;
    drawCanvas();
  }
    this.setData({
    description: description_1[currentPage] + count + description_2[currentPage]
  })
  },
  light_6: function () {
    count++;
    if (count > trial[currentPage]) {
      restart();
    } else {
    arr[2] = (arr[2] == 0) ? 1 : 0;
    arr[4] = (arr[4] == 0) ? 1 : 0;
    arr[5] = (arr[5] == 0) ? 1 : 0;
    arr[8] = (arr[8] == 0) ? 1 : 0;
    drawCanvas();
  }
    this.setData({
    description: description_1[currentPage] + count + description_2[currentPage]
  })
  },
  light_7: function () {
    count++;
    if (count > trial[currentPage]) {
      restart();
    } else {
    arr[3] = (arr[3] == 0) ? 1 : 0;
    arr[6] = (arr[6] == 0) ? 1 : 0;
    arr[7] = (arr[7] == 0) ? 1 : 0;
    drawCanvas();
  }
    this.setData({
    description: description_1[currentPage] + count + description_2[currentPage]
  })
  },
  light_8: function () {
    count++;
    if (count > trial[currentPage]) {
      restart();
    } else {
    arr[4] = (arr[4] == 0) ? 1 : 0;
    arr[6] = (arr[6] == 0) ? 1 : 0;
    arr[7] = (arr[7] == 0) ? 1 : 0;
    arr[8] = (arr[8] == 0) ? 1 : 0;
    drawCanvas();
  }
    this.setData({
    description: description_1[currentPage] + count + description_2[currentPage]
  })
  },
  light_9: function () {
    count++;
    if (count > trial[currentPage]) {
      restart();
    } else {
    arr[5] = (arr[5] == 0) ? 1 : 0;
    arr[7] = (arr[7] == 0) ? 1 : 0;
    arr[8] = (arr[8] == 0) ? 1 : 0;
    drawCanvas();
  }
    this.setData({
    description: description_1[currentPage] + count + description_2[currentPage]
  })
  },

  restart_button:function(){
    restart();
    this.setData({
      description: description_1[currentPage] + count + description_2[currentPage]
    })
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