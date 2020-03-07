<template>
  <v-navigation-drawer
    fixed
    width=25%
    color="#3F51B5"
    dark
    fab
  >
  <v-layout
    class="fill-height"
    column

  >
      <v-card flat text color="#3F51B5" style="display: inline; padding: 20px; ">
        <v-row >
          <v-col align="left" >

            <v-icon style="float: left; margin-right: 20px" color=#90CAF9>mdi-cisco-webex</v-icon>
            <p  style="float: left; font-family: 'Spartan', sans-serif; margin-top:2px"  > Personal Studio </p>

          </v-col>
        </v-row>
      </v-card>




  <v-list
        dense
        nav
        style="margin-top: 40px; margin-left:10px"
      >
        <v-list-item
          v-for="link in links"
          :key="link.text"
          link
          style="font-family: 'Rubik', sans-serif; "
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- Modificar pois não está reposivo -->
      <v-btn text style="top:220px"><v-icon>mdi-exit-to-app</v-icon>Logout</v-btn>

  </v-layout>
  </v-navigation-drawer>

</template>

<script>

/* eslint-disable */
export default {

  data: () => ({

    links: [
      {
        id: 1,
        to: '/',
        icon: 'mdi-black-mesa',
        text: 'Dashboard'
      },
      {
        id: 2,
        to: '/user-profile',
        icon: 'mdi-account',
        text: 'Clientes'
      },
      {
        id:3,
        to: '/table-list',
        icon: 'mdi-chart-donut',
        text: 'Relátorios'
      },
      {
        id: 4,
        to: '/agenda',
        icon: 'mdi-calendar',

        text:'Agenda'
      },
      {
        id:4,
        to: '/notifications',
        icon: 'mdi-bell-outline',
        text: 'Notifications'
      }
    ]
  })
};
/* eslint-enable */
</script>
