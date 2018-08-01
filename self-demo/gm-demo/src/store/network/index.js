import config from '@/config'

const state = {
  requestList: {}
}

// 请求锁
const mutations = {
  setRequestLock: (state, payload) => {
    state.requestList[payload] = true
  },
  setRequestUnlock: (state, payload) => {
    delete state.requestList[payload]
  }
}

const actions = {
  gmNetwork: ({state, commit, dispatch, rootState}, payload) => {
    let tag = payload.tag
    let url = payload.url
    let type = payload.type || 'get'
    let data = payload.data || {}
    let showIndicator = payload.showIndicator || true   // 是否转圈
    // merge common request params from rootState.
    // Object.assign(data, rootState.reqParams, {custNo: rootState.custNo ? rootState.custNo : (window.cookieStore.read('custNo') || '')})
    let header = payload.header || {}
    return new Promise(async (resolve, reject) => {
      // if (showIndicator) Indicator.open()
      try {
        if (!state.requestList[payload]) {
          commit('setRequestLock', tag)
          let res = await dispatch('sendRequest', {url: url, type: type, data: data, header: header})
          resolve(res)
        }
      } catch (err) {
        // alert('网络错误')
        console.log('网络错误')
        reject(err)
      } finally {
        commit('setRequestUnlock', tag)
      }
    })
  },
  sendRequest: ({commit, dispatch}, payload) => {
    payload.type = payload.type.toLowerCase()
    switch (payload.type) {
      case 'get':
      case 'put':
      case 'patch':
      case 'delete':
      case 'post':
        console.log('post')
        return new Promise((resolve, reject) => {
          console.log('这是post')
          wx.request({
            url: config.host + payload.url,
            data: payload.data,
            method: payload.type,
            header: payload.header,
            // header: {
            //   'Authorization': `Bearer ${ wx.getStorageSync('demo-token') }`
            // },
            success: function (res) {
              // if (res.data.code === 0) {
              //   resolve(res.data.data)
              // } else {
              //   reject(res.data)
              // }
              // resolve(res)
              if (res.data.errorCode === '0000') {
                resolve(res)
              } else {
                reject(res)
              }
              if (res.data.errorCode === '401') {
                console.log('请重新登陆')
                let objurl = '/pages/login/main'
                wx.switchTab({ url: objurl })
                console.log('跳转')
              } else if (res.data.errorCode === '9999') {
                console.log('系统繁忙')
              }
            },
            fail: function (res) {
              reject(res)
            }
          })
        })
        break
      case 'postmultipart':
        let formData = new FormData()
        for (let key in payload.data) {
          formData.append(key, payload.data[key])
        }
        return new Promise((resolve, reject) => {
          // axios({
          //   method: 'post',
          //   url: payload.url,
          //   data: formData,
          //   header: Object.assign(payload.header, {'content-type': 'multipart/form-data'})
          // }).then((res) => {
          //   resolve(res)
          // }).catch((err) => {
          //   reject(err)
          // })
          wx.request({
            url: config.host + payload.url,
            data: formData,
            method: 'post',
            header: Object.assign(payload.header, {'content-type': 'multipart/form-data'}),
            success: function (res) {
              resolve(res)
            },
            fail: function (res) {
              reject(res)
            }
          })
        })
        break
    }
  }
}

export default {
  state,
  mutations,
  actions
}

