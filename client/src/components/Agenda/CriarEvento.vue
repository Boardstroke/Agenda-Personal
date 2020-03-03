<template>

    <v-dialog v-model="show" width="400px" >
      <panel-agenda title="Marcar Horário" v-bind:class="cor">
        <v-card

          flat
        >
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
                <v-text-field v-model="end" label="Fim" prepend-icon="mdi-clock" readonly v-on="on"></v-text-field>
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
          <v-btn @click.stop="show=false" icon>
            <v-icon color="error">mdi-close</v-icon>
          </v-btn>
          <v-btn @click.stop="criarEvento()" icon>
            <v-icon color="green darken-1">mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
        </v-card>
      </panel-agenda>
    </v-dialog>
</template>

  <script>
import EventoService from "@/services/EventoService";

import PanelAgenda from "@/components/Agenda/PanelAgenda";
export default {
  data() {
    return {
      name: "",
      data: "",
      start: "",
      end: "",

      menu: false,
      menu2: false,
      menu3: false
    };
  },
  components: {
    PanelAgenda
  },

  props: {
    value: Boolean
  },

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    overlayOff: function() {
      this.name = "";
      this.data = "";
      this.start = "";
      this.end = "";

      this.$root.$emit("update");
    },

    async criarEvento() {
      try {
        const response = await EventoService.criarEvento({
          name: this.name,
          data: this.data,
          start: this.start,
          end: this.end
        });
        this.overlayOff();
        this.show = false;
        console.log(response);
      } catch (err) {
        this.error = err.response.data.error;
      }
    }
  }
};
</script>