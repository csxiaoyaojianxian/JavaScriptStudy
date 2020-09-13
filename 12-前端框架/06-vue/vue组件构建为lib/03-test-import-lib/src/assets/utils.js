/**
 * [推荐使用 parallelLoadScripts/seriesLoadScripts]
 * @name: loadScript
 */
function loadScript (url, key, charset) {
  return new Promise((resolve, reject) => {
    if (window[`load_js_${key}`]) {
      console.log('reload js - ' + key)
      resolve()
      return
    }
    window[`load_js_${key}`] = true
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.charset = charset || 'utf-8'
    document.body.appendChild(script)
    script.addEventListener('load', () => {
      resolve()
      console.log('load js success - ' + key)
    }, false)
    script.addEventListener('error', () => reject(script), false)
  })
}

/**
 * [推荐使用 parallelLoadScripts/seriesLoadScripts]
 * @name: loadScripts
 */
function loadScripts (urls) {
  return Promise.all(urls.map((item) => {
    return loadScript(item.url, item.key, item.charset)
  }))
}

/**
 * 串行加载指定的脚本
 * 串行加载[异步]逐个加载，每个加载完成后加载下一个
 * 全部加载完成后执行回调
 * @param {Array|String}  scripts 指定要加载的脚本
 * @param {Function} callback 成功后回调的函数
 * @return {Array} 所有生成的脚本组件对象数组
 */
function seriesLoadScripts (scripts, callback, charset) {
  if (typeof (scripts) !== 'object') {
    scripts = [scripts]
  }
  var HEAD = document.getElementsByTagName('head')[0] || document.documentElement
  var s = []
  var last = scripts.length - 1
  // 递归
  var recursiveLoad = function (i) {
    s[i] = document.createElement('script')
    s[i].setAttribute('type', 'text/javascript')
    // Attach handlers for all browsers
    // 异步
    s[i].onload = s[i].onreadystatechange = function () {
      if (!/*@cc_on!@*/0 || this.readyState === 'loaded' || this.readyState === 'complete') { // eslint-disable-line
        this.onload = this.onreadystatechange = null
        this.parentNode.removeChild(this)
        if (i !== last) {
          recursiveLoad(i + 1)
        } else if (typeof (callback) === 'function') {
          callback()
        }
      }
    }
    // 同步
    s[i].setAttribute('src', scripts[i])
    if (charset) {
      s[i].setAttribute('charset', charset)
    }
    HEAD.appendChild(s[i])
  }
  recursiveLoad(0)
}

/**
* 并行加载指定的脚本
* 并行加载[同步]同时加载，不管上个是否加载完成，直接加载全部
* 全部加载完成后执行回调
* @param {Array|String}  scripts 指定要加载的脚本
* @param {Function} callback 成功后回调的函数
* @return {Array} 所有生成的脚本组件对象数组
*/
function parallelLoadScripts (scripts, callback) {
  if (typeof (scripts) !== 'object') {
    scripts = [scripts]
  }
  var HEAD = document.getElementsByTagName('head')[0] || document.documentElement
  var s = []
  var loaded = 0
  for (var i = 0; i < scripts.length; i++) {
    s[i] = document.createElement('script')
    s[i].setAttribute('type', 'text/javascript')
    // Attach handlers for all browsers
    // 异步
    s[i].onload = s[i].onreadystatechange = function () {
      if (!/*@cc_on!@*/0 || this.readyState === 'loaded' || this.readyState === 'complete') { // eslint-disable-line
        loaded++
        this.onload = this.onreadystatechange = null
        this.parentNode.removeChild(this)
        if (loaded === scripts.length && typeof (callback) === 'function') callback()
      }
    }
    // 同步
    s[i].setAttribute('src', scripts[i])
    HEAD.appendChild(s[i])
  }
}

/**
 * @name: loadCss
 */
function loadCss (url, key) {
  if (window[`load_css_${key}`]) {
    return
  }
  window[`load_css_${key}`] = true
  let head = document.getElementsByTagName('head')[0]
  let link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  head.appendChild(link)
  console.log('load css success - ' + key)
}

export {
  loadScript,
  loadScripts,
  seriesLoadScripts,
  parallelLoadScripts,
  loadCss
}
