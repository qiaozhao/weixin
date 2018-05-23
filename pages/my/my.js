const app = getApp()
const config = require('../../utils/config.js')
const util = require('../../utils/util.js')

Page({

  data: {
    products: []
  },

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: config.baseURL + "product/",
      method: "GET",
      header: {
        "Authorization": "Bearer " + app.globalData.session.access_token,
        'Content-Type': 'application/json'
      },
      data: {
        category: 'published',
      },
      success: function (res) {
        console.log(res)
        that.setData({
          products: res.data.map(item => {
            return {
              id: item.id,
              subject: item.subject,
              description: item.description,
              mainImage: util.getFullImagePath(item.imageList[0])
            }
          })
        })
        console.log(that.data.products)
      },
      fail: function (err) {
        console.log(err)
      }
    })

  },

  createNew: function () {
    wx.navigateTo({
      url: '../create/create'
    })
  },
})