

const token = async function (ctx) {
  const token = wx.getStorageSync('demo-token');
  if(token != null && token != 'null') {
    let decode = jwt.decode(token); // 解析token
  }
}
