<template>
  <v-navigation-drawer
    fixed
    width=17%

  >
  <v-layout
    class="fill-height"
    column

  >
      <v-card flat text>
        <v-row >
          <v-col align="center">
            <v-avatar>
              <v-img
                src="https://avatars3.githubusercontent.com/u/17815?s=400&v=4"
                alt="pic of user"
              />

            </v-avatar>
            <h3> Personal Studio </h3>
          </v-col>
        </v-row>
      </v-card>


  <v-divider></v-divider>

  <v-list
        dense
        nav
      >
        <v-list-item
          v-for="link in links"
          :key="link.texxt"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>


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
        icon: 'mdi-view-dashboard',
        text: 'Dashboard'
      },
      {
        id: 2,
        to: '/user-profile',
        icon: 'mdi-account',
        text: 'User Profile'
      },
      {
        id:3,
        to: '/table-list',
        icon: 'mdi-clipboard-outline',
        text: 'Table List'
      },
      {
        id:4,
        to: '/typography',
        icon: 'mdi-format-font',
        text: 'Typography'
      },
      {
        id:5,
        to: '/icons',
        icon: 'mdi-chart-bubble',
        text: 'Icons'
      },
      {
        id:6,
        to: '/maps',
        icon: 'mdi-map-marker',
        text: 'Maps'
      },
      {
        id:7,
        to: '/notifications',
        icon: 'mdi-bell',
        text: 'Notifications'
      }
    ]
  })
};
/* eslint-enable */
</script>