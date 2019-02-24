const APP_SHELL_CACHE_NAME = 'appshell'
const STATIC_FILES_CACHE_NAME = 'static'
const APP_SHELL_URL = '/appshell'
const STATIC_FILES_REG_EXP = /.*\.(js|css)$/
const files = ['/']

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE_NAME)
      .then(cache => {
        return cache.addAll(files)
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

// do some cleaning things
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(names => {
        return Promise.all(names.map(name => caches.delete(name)))
      })
      .then(() => {
        return self.clients.claim()
      })
  )
})

self.addEventListener('fetch', event => {
  let req = event.request
  let promise
  // mode navigate 意味着这个请求是页面请求
  if (req.mode === 'navigate') {
    promise = caches.match(new Request(APP_SHELL_URL))
      .then(resp => {
        if (resp) {
          return resp
        }
        // fetch and cache APP_SHELL_URL
        fetchAndCache(APP_SHELL_URL, APP_SHELL_CACHE_NAME)
        // fetch
        return fetch(req.clone())
      })
  } else if (STATIC_FILES_REG_EXP.test(req.url)) {
    // cache static files, cache first
    promise = caches.match(req)
      .then(resp => {
        if (resp) {
          return resp
        }

        return fetchAndCache(req.clone(), STATIC_FILES_CACHE_NAME)
      })
  }

  promise && event.respondWith(promise)
})

/**
 * fetch and cache
 *
 * @param {string|Request} req request or the url of request
 * @param {string} cacheName cache name
 * @return {Promise.<Response>} return response
 */
function fetchAndCache (req, cacheName) {
  if (typeof req === 'string') {
    req = new Request(req)
  }
  return fetch(req).then(resp => {
    if (!resp || resp.status !== 200) {
      return resp
    }

    let clonedResp = resp.clone()
    // cache the response
    caches.open(cacheName)
      .then(cache => {
        cache.put(req, clonedResp)
      })

    return resp
  })
}
