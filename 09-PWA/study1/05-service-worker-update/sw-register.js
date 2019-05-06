if ('serviceWorker' in navigator) {
  // 每次的sw-register保证是最新的，不使用缓存，但是具体注册的sw可以使用缓存
  navigator.serviceWorker.register('/sw.js?v=20180705121319')
}

navigator.serviceWorker.addEventListener('message', function (e) {
  if (e.data && e.data === 'sw.update') {
    // 如果数据更新了，强制刷新（不推荐，推荐提示用户数据更新）
    window.location.reload()
  }
})
