<template>
<div class="login-box">
	<div class="header text-center mb-30">
		这是头部
	</div>
	<div class="main flex flex-center items-center flex-col">
		<input type="text" v-model="account" placeholder="请输入账号" class="mb-10">
		<input type="text" v-model="password" placeholder="请输入密码">
		<div class="button radius-5 bg-secondary fc-white fz-18" @click="submit">
			点击登陆
		</div>
	</div>

</div>
</template>

<script type="text/ecmascript-6">
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      account: '',
      password: ''
    }
  },
	methods: {
    ...mapActions(['getLoginInfo', 'getLogin']),
    async submit() {
      try {
        //登陆
        let data = await this.getLogin({
          name: this.account,
          pass: this.password
        })
	      console.log(22222)
	      console.log(typeof data.success)
        wx.setStorageSync('demo-token', data.token)

        let objurl = '/pages/success/main'
        wx.switchTab({ url: objurl })
      } catch (e) {
        wx.showToast({
          title: e.info,
          icon: 'none',
          duration: 2000
        })
        wx.setStorageSync('demo-token', null) // 将token清空
				console.log('失败')
      }
    }
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.button
	width 100px
	height 40px
	margin-top 30px
input
	border-radius 2px
	border 1px solid #4caf50

</style>
