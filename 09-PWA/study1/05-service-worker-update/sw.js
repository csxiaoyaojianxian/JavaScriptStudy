/* eslint-disable */

self.addEventListener('install', event => {
  console.log('Service worker installing ...')
  // cache a horse SVG
  event.waitUntil(
    caches.open('sw-demo-precache').then(cache => {
      cache.add('dog.jpeg')
      cache.add('monkey.jpeg')
    })
  )
  // skipWaiting
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  console.log('Service worker activate ...')
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!['sw-demo-precache'].includes(key)) {
          return caches.delete(key)
        }
      })
    )).then(() => {
      console.log('Service worker now ready to handle fetche events!')
      return self.clients.matchAll()
        .then(function (clients) {
          if (clients && clients.length) {
            clients.forEach(function (client) {
              // 给每个已经打开的标签都 postMessage
              client.postMessage('sw.update');
            })
          }
        })
    })
  )
})

// 判断从远端获取cat，更换为缓存中的dog
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url)
  if (url.origin === location.origin && url.pathname.endsWith('/cat.jpeg')) {
    event.respondWith(caches.match('dog.jpeg'))
  }
})