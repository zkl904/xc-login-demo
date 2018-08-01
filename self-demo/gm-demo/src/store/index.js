import Vue from 'vue'
import Vuex from 'vuex'

import network from './network'
import user from './modules/user'
Vue.use(Vuex)

const state = {
  reqParams: {
    accptmd: 4,
    distributorCode: 247,
    branchCode: 247000,
    appVersion: '7.0.0'
  },
  code: {
    CODE_XHR_SUCCESS: '0000'
  },
  displayControl: {
    header: false,
    tabBar: false
  },
  routerDirection: 'left',
  appName: 'gaoming',
  appVersion: '1.2.4',
  TEST_OSS_PATH: 'http://webstatic.91gaoming.com/gaoming-web/static',
  PRD_OSS_PATH: 'http://webstatic.91gaoming.com/gaoming-web/static'
  // PRD_OSS_PATH: 'http://static.91ifa.com/gaoming-web/static'
}

const getters = {
  code: (state) => state.code,
  displayControl: (state) => state.displayControl,
  weChatSession: (state) => state.weChatSession,
  routerDirection: (state) => state.routerDirection,
  appVersion: (state) => state.appVersion,
  TEST_OSS_PATH: (state) => state.TEST_OSS_PATH,
  PRD_OSS_PATH: (state) => state.PRD_OSS_PATH
  // env: () => {
  //   if (window.location.host === 'weixin.91ifa.com') {
  //     return 'prd'
  //   } else if (window.location.host === 'devweixin.91gaoming.com') {
  //     return 'test'
  //   } else {
  //     return 'dev'
  //   }
  // }
}

export default new Vuex.Store({
  state,
  getters,
  modules: {
    network,
    user
  }
})

