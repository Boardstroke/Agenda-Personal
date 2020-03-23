
<template>
  <v-container style="display:contents">
    <td>
      <v-avatar>
        <img :src="avatar"/>
      </v-avatar>
      {{name}}
    </td>
    <td>{{email}}</td>
    <td>{{telefone}}</td>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  props: ["avatar", "name", "email", "telefone"]
};
</script>

<style scoped>
td {
  padding: 16px;
}
</style>
