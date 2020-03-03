import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import HelloWorld from '@/views/HelloWorld';
import Agenda from '@/views/Agenda';
import Test from '@/views/Test';

const routes = [
  {
    path: '/',
    name: HelloWorld,
    component: HelloWorld
  },
  {
    path:'/agenda',
    name: Agenda,
    component: Agenda
  },
  {
    path:'/test',
    name: Test,
    component: Test
  }
];

export default new VueRouter({
  routes
});