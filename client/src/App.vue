<template>
  <v-app>
    <toolbar/>
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
