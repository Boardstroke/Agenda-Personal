<template>
  <v-container fluid  >
    <v-row justify="end" align="start" class="no-gutters" style="margin-left: 50px">
      <v-col justify="start" sm="12" md="12" lg="10">
        <cliente/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Cliente from '@/components/Clientes/Cliente'
export default {
  components:{
    Cliente
  }
}
</script>