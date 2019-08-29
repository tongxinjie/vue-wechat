import Vue from 'vue'
import Router from 'vue-router'
import chat from '@/components/chat/chat'
import address from '@/components/address/address'
import addressinfo from '@/components/address/addressinfo'
import addFriend from '@/components/address/addFriend'
import newfriendCard from '@/components/address/newfriendCard'
import find from '@/components/find/find'
import friendcircle from '@/components/find/friendcircle'
import me from '@/components/me/me'
import chatroom from '@/components/chatroom/chatroom'
import edit from '@/components/me/edit'
import editname from '@/components/me/editname'
import editheader from '@/components/me/editheader'
import login from '@/components/login/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    // {
    //   path: '/',
    //   name: 'login',
    //   component: login,
    //   meta: {req: false}
    // },

    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {req: false}
    },

    {
      path: '/',
      name: 'chat',
      component: chat,
      meta: {req: true}
    },

    {
      path: '/chat',
      name: 'chat1',
      component: chat,
      meta: {req: true}
    },
    {
      path: '/address',
      name: 'address',
      component: address,
      meta: {req: true}
    },
    {
      path: '/addressinfo',
      name: 'addressinfo',
      component: addressinfo,
      meta: {req: true}
    },
    {
      path: '/find',
      name: 'find',
      component: find,
      meta: {req: true}
    },
    {
      path: '/friendcircle',
      name: 'friendcircle',
      component: friendcircle,
      meta: {req: true}
    },
    {
      path: '/me',
      name: 'me',
      component: me,
      meta: {req: true}
    },
    {
      path: '/chatroom',
      name: 'chatroom',
      component: chatroom,
      meta: {req: true}
    },
    {
      path: '/edit',
      name: 'edit',
      component: edit,
      meta: {req: true}
    },
    {
      path: '/editname',
      name: 'editname',
      component: editname,
      meta: {req: true}
    },
    {
      path: '/editheader',
      name: 'editheader',
      component: editheader,
      meta: {req: true}
    },
    {
      path: '/addFriend',
      name: 'addFriend',
      component: addFriend,
      meta: {req: true}
    },
    {
      path: '/newfriendCard',
      name: 'newfriendCard',
      component: newfriendCard,
      meta: {req: true}
    }
  ]

})
