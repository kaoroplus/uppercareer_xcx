// pages/quiz/quiz.js
var common = require('questions.js')
var index = 0
const maxIndex = 60
const YesorNo = 0;
const SingleChoice = 1;
const MultiChoice = 2;
const Questions = [
  { content: '我喜欢把一件事情做完后再做另一件事。', style: YesorNo, index: 1 },
  { content: '在工作中我喜欢独自筹划，不愿受别人干涉。', style: YesorNo, index: 2 },
  { content: '集体讨论中，我往往保持沉默。', style: YesorNo, index: 3 },
  { content: '喜欢做戏剧、音乐、歌舞、新闻采访等方面的工作。', style: YesorNo, index: 4 },
  { content: '每次写信我都一挥而就，不再重复。', style: YesorNo, index: 5 },
  { content: '经常不停地思考某一问题，直到想出正确的答案。', style: YesorNo, index: 6 },
  { content: '别人借我的和我借别人的东西，我都能记得很清楚。', style: YesorNo, index: 7 },
  { content: '喜欢抽象思维的工作，不喜欢动手的工作。', style: YesorNo, index: 8 },
  { content: '喜欢成为人们注意的焦点。', style: YesorNo, index: 9 },
  { content: '我喜欢不时地夸耀一下自己取得的好成就。', style: YesorNo, index: 10 },
  { content: '我曾经渴望有机会参加探险。', style: YesorNo, index: 11 },
  { content: '当我一个独处时，会感到更愉快。', style: YesorNo, index: 12 },
  { content: '我喜欢在做事情前，对此事情做出细致的安排。', style: YesorNo, index: 13 },
  { content: '我讨厌修理自行车、电器一类的工作。', style: YesorNo, index: 14 },
  { content: '我喜欢参加各种各样的聚会。', style: YesorNo, index: 15 },
  { content: '我愿意从事虽然工资少、但是比较稳定的职业。', style: YesorNo, index: 16 },
  { content: '音乐能使我陶醉。', style: YesorNo, index: 17 },
  { content: '我办事很少思前想后。', style: YesorNo, index: 18 },
  { content: '我喜欢经常请示上级。', style: YesorNo, index: 19 },
  { content: '我喜欢需要运用智力的游戏。', style: YesorNo, index: 20 },
  { content: '我很难做那种需要持续集中注意力的工作。', style: YesorNo, index: 21 },
  { content: '我喜欢亲自动手制作一些东西，从中得到乐趣。', style: YesorNo, index: 22 },
  { content: '我的动手能力很差。', style: YesorNo, index: 23 },
  { content: '和不熟悉的人交谈对我来说毫不困难。', style: YesorNo, index: 24 },
  { content: '和别人谈判时，我总是很容易放弃自己的观点', style: YesorNo, index: 25 },
  { content: '我很容易结识同性朋友。', style: YesorNo, index: 26 },
  { content: '对于社会问题，我通常持中庸的态度。', style: YesorNo, index: 27 },
  { content: '当我开始做一件事情后，即使碰到再多的困难，我也要执著地干下去。', style: YesorNo, index: 28 },
  { content: '我是一个沉静而不易动感情的人。', style: YesorNo, index: 29 },
  { content: '当我工作时，我喜欢避免干扰。', style: YesorNo, index: 30 },
  { content: '我的理想是当一名科学家。', style: YesorNo, index: 31 },
  { content: '与言情小说相比，我更喜欢推理小说。', style: YesorNo, index: 32 },
  { content: '有些人太霸道，有时明明知道他们是对的，也要和他们对着干。', style: YesorNo, index: 33 },
  { content: '我爱幻想。', style: YesorNo, index: 34 },
  { content: '我总是主动地向别人提出自己的建议。', style: YesorNo, index: 35 },
  { content: '我喜欢使用榔头一类的工具。', style: YesorNo, index: 36 },
  { content: '我乐于解除别人的痛苦。', style: YesorNo, index: 37 },
  { content: '我更喜欢自己下了赌注的比赛或游戏。', style: YesorNo, index: 38 },
  { content: '我喜欢按部就班地完成要做的工作。', style: YesorNo, index: 39 },
  { content: '我希望能经常换不同的工作来做。', style: YesorNo, index: 40 },
  { content: '我总留有充裕的时间去赴约会。', style: YesorNo, index: 41 },
  { content: '我喜欢阅读自然科学方面的书籍和杂志。', style: YesorNo, index: 42 },
  { content: '如果掌握一门手艺并能以此为生，我会感到非常满意。', style: YesorNo, index: 43 },
  { content: '我曾渴望当一名汽车司机。', style: YesorNo, index: 44 },
  { content: '听别人谈“家中被盗”一类的事，很难引起我的同情。', style: YesorNo, index: 45 },
  { content: '如果待遇相同，我宁愿当商品推销员，而不愿当图书管理员。', style: YesorNo, index: 46 },
  { content: '我讨厌跟各类机械打交道。', style: YesorNo, index: 47 },
  { content: '我小时候经常把玩具拆开，把里面看个究竟。', style: YesorNo, index: 48 },
  { content: '当接受新任务后，我喜欢以自己的独特方法去完成它。', style: YesorNo, index: 49 },
  { content: '我有文艺方面的天赋。', style: YesorNo, index: 50 },
  { content: '我喜欢把一切安排得整整齐齐、井井有条。', style: YesorNo, index: 51 },
  { content: '我喜欢作一名教师。', style: YesorNo, index: 52 },
  { content: '和一群人在一起的时候，我总想不出恰当的话来说。', style: YesorNo, index: 53 },
  { content: '看情感影片时，我常禁不住眼圈红润。', style: YesorNo, index: 54 },
  { content: '我讨厌学数学。', style: YesorNo, index: 55 },
  { content: '在实验室里独自做实验会令我寂寞难耐。', style: YesorNo, index: 56 },
  { content: '对于急躁、爱发脾气的人，我仍能以礼相待。', style: YesorNo, index: 57 },
  { content: '遇到难解答的问题时，我常常放弃。', style: YesorNo, index: 58 },
  { content: '大家公认我是一名勤劳踏实的、愿为大家服务的人。', style: YesorNo, index: 59 },
  { content: '我喜欢在人事部门工作。', style: YesorNo, index: 60 },
];
var answer = [];
var result = {
  realistic: 0,
  enterprise: 0,
  common: 0,
  artistic: 0,
  social: 0,
  investigate: 0
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: null,
    question: null,    

    showTopTips: false,
    isDisabled:true,
    isNextHidden: false,
    isSummitHidden:true,

    radioItems: [
      { name: '是', value: 1 },
      { name: '不是', value: 0 },
    ],
    checkboxItems: [
      { name: 'A', value: '0' },
      { name: 'B', value: '1' },
      { name: 'C', value: '2' },
      { name: 'D', value: '3' },
      { name: 'E', value: '4' },
    ],

    isAgree: false,

  },

    radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value);
      answer[index] = e.detail.value;
      var radioItems = this.data.radioItems;
      for (var i = 0, len = radioItems.length; i < len; ++i) {
          radioItems[i].checked = radioItems[i].value == e.detail.value;
      }

      this.setData({
          radioItems: radioItems,
          isDisabled: false
      });
  },
  checkboxChange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value);

      var checkboxItems = this.data.checkboxItems, values = e.detail.value;
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
          checkboxItems[i].checked = false;

          for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
              if(checkboxItems[i].value == values[j]){
                  checkboxItems[i].checked = true;
                  break;
              }
          }
      }

      this.setData({
          checkboxItems: checkboxItems
      });
  },

  /**
   * 下一题
   */
  onTapButtonNext: function () {
    var radioItems = this.data.radioItems;
    console.log('答案变更，结果为：', answer[index]);    
    index++;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = false;
    }
    this.setData({
      question: Questions[index],
      isDisabled: true,
      radioItems: radioItems

    });

    if(index == 10){
      this.setData({
        isNextHidden: true,
        isSummitHidden: false

      })
    }
  },

  /**
   * 提交答案
   */
  onTapButtonFinish: function () {
    result.artistic = answer[4] + answer[9] + answer[10] + answer[17] + answer[33] + answer[34] + answer[49] + answer[50] + answer[54];
    result.artistic = (1 - answer[32]);
    result.common = answer[7] + answer[19] + answer[29] + answer[39] + answer[41] + answer[51] + answer[57];
    result.common = (1 - answer[5]) + (1 - answer[18]) + (1 - answer[40]);
    result.enterprise = answer[11] + answer[24] + answer[28] + answer[35] + answer[38] + answer[46] + answer[60];
    result.enterprise = (1 - answer[3]) + (1 - answer[16]) + (1 - answer[25]);
    result.investigate = answer[6] + answer[8] + answer[20] + answer[30] + answer[31] + answer[42];
    result.investigate = (1 - answer[21]) + (1 - answer[55]) + (1 - answer[56]) + (1 - answer[58]);
    result.realistic = answer[2] + answer[13] + answer[22] + answer[36] + answer[43];
    result.realistic = (1 - answer[14]) + (1 - answer[23]) + (1 - answer[44]) + (1 - answer[47]) + (1 - answer[48]);
    result.social = answer[26] + answer[37] + answer[52] + answer[59];
    result.social = (1 - answer[1]) + (1 - answer[12]) + (1 - answer[15]) + (1 - answer[27]) + (1 - answer[45]) + (1 - answer[53]);
    console.log(result);
    console.log(answer);
    wx.redirectTo({
      url: '../result/result'
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({question:Questions[index]
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