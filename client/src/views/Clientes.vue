<template>
  <v-content>
    <v-container fluid>
      <v-row>
        <v-col sm="6" md="6" lg="6" align="start" style="margin=30px;">
          <h2 style="margin-left: 12px;">Clientes</h2>
        </v-col>
        <v-col sm="6" md="6" lg="6" align="end">
          <v-btn @click="abrirMenu()" dark color="#1B5E20">+ Add Cliente</v-btn>
        </v-col>
        <v-col lg md="12" sm="12" style="margin: 6px">
          <v-simple-table fixed-header>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Nome</th>
                  <th class="text-left">Email</th>
                  <th class="text-left">Telefone</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cliente in clientes" :key="cliente.name">
                  <cliente
                    :avatar="cliente.avatar"
                    :name="cliente.name"
                    :email="cliente.email"
                    :telefone="cliente.telefone"
                  />
                  <th>
                    <v-icon>mdi-chevron-right</v-icon>
                  </th>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <cliente />
        </v-col>
        <v-col v-if="showCreate" lg="4" >
          <criar-cliente />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import Cliente from "@/components/Clientes/Cliente";
import CriarCliente from "@/components/Clientes/CriarCliente"
import {mapActions, mapState} from 'vuex'

export default {
  data: () => ({

  }),
  computed:{
    ...mapState({
      showCreate: state => state.cliente.menu,
      clientes: state => state.cliente.clientes
    })
  },
  components: {
    Cliente,
    CriarCliente
  },
  methods:{
    ...mapActions("cliente", ["abrirMenu", "fecharMenu", "index"])
  },
  created(){
    if(this.clientes == 0 ){
      this.index();
    }
  }
};
</script>