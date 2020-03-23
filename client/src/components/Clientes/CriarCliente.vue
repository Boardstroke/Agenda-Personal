<template>

    <div style="position:fixed; width:24%">
      <h3>Criar Cliente</h3>
      <form>
        <v-text-field v-model="avatar" label="avatar" required />
        <v-text-field v-model="name" label="Nome" required />
        <v-text-field v-model="email" label="Email" required />
        <v-text-field v-model="telefone" label="Telefone" required />
        <v-row align="end ">
        <v-spacer></v-spacer>
          <v-btn @click.stop="fecharMenu()" icon>
            <v-icon color="error">mdi-close</v-icon>
          </v-btn>
          <v-btn @click.stop="criarCliente({avatar: avatar, name: name, email:email, telefone:telefone})" icon>
            <v-icon color="green darken-1">mdi-check</v-icon>
          </v-btn>
          </v-row>
      </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data: () => ({
    avatar: '',
    name: '',
    email: '',
    telefone: '',
  }),
  methods:{
    ...mapActions("cliente", ["fecharMenu", "criarCliente"]),
  }
};
</script>