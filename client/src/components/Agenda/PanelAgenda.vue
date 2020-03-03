<template>
  <v-container style="padding:0; margin:0">
    <v-toolbar dark class="green">
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>

    <slot></slot>
  </v-container>
</template>

<script>
export default {
  props: ["title", "cor"]
};
</script>