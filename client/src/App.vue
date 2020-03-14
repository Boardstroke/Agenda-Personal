<template>

  <v-app>
    <toolbar/>
    <link href="https://fonts.googleapis.com/css?family=Rubik:500|Spartan:500&display=swap" rel="stylesheet">
    <menu-drawer class="drawer"/>
    <div class="main-content">
    <router-view/>
    </div>
  </v-app>
</template>

<script>
import MenuDrawer from '@/components/Drawer/MenuDrawer'
import Toolbar from '@/components/Toolbar'
export default {
  name: 'App',

  components: {
    MenuDrawer,
    Toolbar
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.drawer{
  float:left
}
</style>
