<template>

  <v-app id="inspire">
     <link href="https://fonts.googleapis.com/css?family=Rubik:500|Spartan:500&display=swap" rel="stylesheet">
    <menu-drawer />
    <toolbar/>

    <router-view/>
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

</style>
