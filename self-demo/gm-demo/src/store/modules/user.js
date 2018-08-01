const state = {
  userInfo: null
}

const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload
  }
}
const token = wx.getStorageSync('demo-token');
const actions = {
  getUserInfo({commit, dispatch, rootState}, payload) {
    console.log('开始')
    return new Promise(async (resolve, reject) => {
      try {
        let params = {
          tag: 'getUserInfo',
          url: '/weapp/demo',
          type: 'post',
          data: {
            mobileNo: payload.mobileNo
          }
        }
        let {data} = await dispatch('gmNetwork', params)
        if (data.errorCode === rootState.code.CODE_XHR_SUCCESS) {
          resolve()
        } else {
          reject(data)
        }
      } catch (e) {
        console.log(1111, e)
      }
    })
  },
  getLoginInfo({commit, dispatch, rootState}, payload) {
    console.log('开始')
    console.log(wx.getStorageSync('demo-token'))
    return new Promise(async (resolve, reject) => {
      try {
        let params = {
          tag: 'getLoginInfo',
          url: '/api/user',
          type: 'post',
          // 需要登陆验证的请添加 header头部
          header: {
            'Authorization': `Bearer ${ wx.getStorageSync('demo-token') }`
          },
          data: {
            id: payload.id
          }
        }
        let {data} = await dispatch('gmNetwork', params)
        if (data.errorCode === rootState.code.CODE_XHR_SUCCESS) {
          resolve()
        } else {
          reject(data)
        }
      } catch (e) {
        console.log(1111, e)
      }
    })
  },
  getLogin({commit, dispatch, rootState}, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        let params = {
          tag: 'getLoginInfo',
          url: '/auth/login',
          type: 'post',
          data: {
            name: payload.name,
            pass: payload.pass
          }
        }
        let {data} = await dispatch('gmNetwork', params)
        if (data.errorCode === rootState.code.CODE_XHR_SUCCESS) {
          console.log('调用成功')
          resolve(data)
        } else {
          console.log('走reject')
          reject(data)
        }
      } catch (e) {
        console.log(1111, e)
      }
    })
  },
}

const getters = {
  userInfo: (state) => state.userInfo
}


export default {
  state,
  mutations,
  actions,
  getters
}
