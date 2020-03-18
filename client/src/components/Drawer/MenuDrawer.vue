<template >
  <v-navigation-drawer
    v-model="drawerRight"
      app
      clipped
      left
      >

        <v-list-item>
          <v-list-content>
            <v-list-item-title class="title">
              <div style="font-family:'Spartan'; padding:10px; margin-left:-5px; margin-top:20px">
                <v-icon style="bottom:2px; margin-right: 5px">mdi-store</v-icon>Personal Studio
              </div>
            </v-list-item-title>
          </v-list-content>
        </v-list-item>

        <v-list dense nav style="margin-top: 40px; margin-left:10px">
          <v-list-item
            v-for="link in links"
            :key="link.text"
            link
            style="font-family: 'Rubik', sans-serif; "
          >
            <router-link :to=link.to>
              <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ link.text }} </v-list-item-title>
              </v-list-item-content>
            </router-link>
          </v-list-item>
        </v-list>
        <!-- Modificar pois não está reposivo -->

    </v-navigation-drawer>
</template>

<script>
/* eslint-disable */
export default {
  data: () => ({
    links: [
      {
        id: 1,
        to: "/",
        icon: "mdi-black-mesa",
        text: "Dashboard"
      },
      {
        id: 2,
        to: "/clientes",
        icon: "mdi-account-multiple-outline",
        text: "Clientes"
      },
      {
        id: 3,
        to: "/table-list",
        icon: "mdi-chart-donut",
        text: "Relátorios"
      },
      {
        id: 4,
        to: "/agenda",
        icon: "mdi-calendar",
        text: "Agenda"
      },
      {
        id: 4,
        to: "/notifications",
        icon: "mdi-bell-outline",
        text: "Notifications"
      }
    ]
  })
};
/* eslint-enable */
</script>
