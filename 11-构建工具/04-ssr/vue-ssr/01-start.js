// https://ssr.vuejs.org/zh/

const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      name: 'csxiaoyao'
    },
    template: `<div>{{ name }}</div>`,
    created: function () {
      console.log('name is: ' + this.name)
    }
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
  
})

server.listen(8080)
