<template>
  <v-dialog v-model="show" width="400px">
    <panel-agenda title="Editar Horário">
      <v-card>
      <v-card-text>
        <v-text-field
          id="name"
          name="name"
          ref="name"
          v-model="name"
          label="Nome"
          required
          prepend-icon="mdi-account"
        />

        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              id="data"
              name="data"
              v-model="data"
              label="Data"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="data" @input="menu = false"></v-date-picker>
        </v-menu>

        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="start"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="start"
              label="Começo"
              prepend-icon="mdi-clock"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu2"
            v-model="start"
            :max="end"
            full-width
            @click:minute="$refs.menu2.save(start)"
          ></v-time-picker>
        </v-menu>

        <v-menu
          ref="menu3"
          v-model="menu3"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="end"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="end"
              label="Fim"
              prepend-icon="mdi-clock"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu3"
            v-model="end"
            :min="start"
            full-width
            @click:minute="$refs.menu3.save(end)"
          ></v-time-picker>
        </v-menu>


      </v-card-text>


      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.stop="show=false" icon><v-icon color="error">mdi-close</v-icon></v-btn>
        <v-btn @click.stop="atualizarEvento()" icon><v-icon color="green darken-1">mdi-check</v-icon></v-btn>

      </v-card-actions>
      </v-card>
    </panel-agenda>
  </v-dialog>
</template>

<script>
  import PanelAgenda from '@/components/Agenda/PanelAgenda'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    data ()  {
      return {
        id: null,
        name:  '',
        data: '',
        start: '',
        end:  '',
        menu:false,
        menu2:false,
        menu3:false
      }
    },

    // async mounted() {
    //   await this.$root.$on('DadosDoEvento', (this.eventSelected)=>{
    //     this.id = this.eventSelected.id
    //     this.name = this.eventSelected.name
    //     this.data = this.eventSelected.data
    //     this.start = this.eventSelected.start
    //     this.end = this.eventSelected.end
    //   })
    // },

    props:{
      value: Boolean
    },

    computed:{
      show: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        },
      },

      ...mapGetters('eventos',{
        eventSelected: 'getEventSelected'
      }),

    },

    components:{
      PanelAgenda
    },
    methods:{
      ...mapActions("eventos", ["updateEvent"]),

      atualizarEvento(){
        this.updateEvent({
          id: this.id,
          name: this.name,
          data: this.data,
          start: this.start,
          end: this.end,
        });
      }
    }
  }
</script>