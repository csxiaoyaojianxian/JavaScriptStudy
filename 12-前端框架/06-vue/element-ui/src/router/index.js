import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/dashboard/list'

import MatchList from '../pages/match/list'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/match_list',
      name: 'MatchList',
      component: MatchList
    },
    // {
    //   path: '/query',
    //   component:Query,
    //   children: [{
    //     path: '/',
    //     component: QueryPlayer
    //   }, {
    //     path: 'player',
    //     component: QueryPlayer
    //   }, {
    //     path: 'team',
    //     component: QueryTeam
    //   }, ]
    // },
  ]
})
