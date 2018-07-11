var ren2 = getApp().globalData.ren;  
var ren=JSON.stringify(ren2);
console.log(ren);
Page({
  data:{
    myText:"ok"
  },
  onLoad:function(){
    var json = getApp().globalData.ren;
    var temp="";
    for(var p in json){
      temp+=json[p].people_id+" "+json[p].people_name+"\n";
    }
    this.setData({
      myText:temp
    })
  },
})
