// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id?', // /app/xxx
    props: true, // 直接把参数（id）传入组件component，减少在组件内使用$route，解耦
    // props: { id },
    // props: (route) => ({ id: route.query.b }),
    component: () => import(/* webpackChunkName: "todo-view" */ '../views/todo/todo.vue'),
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'asdasd'
    },
    // 局部导航守卫
    beforeEnter (to, from, next) {
      console.log('app route before enter')
      next()
    },
    children: [
      {
        path: 'test',
        component: Login
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login-view" */ '../views/login/login.vue')
  }
]
