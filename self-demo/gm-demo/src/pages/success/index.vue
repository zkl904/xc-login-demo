<template>
<div class="success flex flex-col items-center">
	<div class="header">
		登陆成功
	</div>
	<div class="button radius-5 bg-secondary fc-white fz-18" @click="submit">
		搜索信息
	</div>
</div>
</template>

<script type="text/ecmascript-6">
import {mapActions} from 'vuex'
export default {
  data() {
    return {

    }
  },
	created() {
    wx.showToast({
      title: '登陆成功',
      icon: 'success',
      duration: 2000
    })
	},
	methods: {
    ...mapActions(['getLoginInfo']),
    async submit () {
      console.log('调用')
      try {
        let data = await this.getLoginInfo({
					id: 1
	      })
      } catch(e) {

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
</style>
