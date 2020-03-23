<template>
  <v-content>
    <v-container class="fill-height " fluid>
      <v-row>
        <v-col sm="12" md="12" lg="12">

          <v-toolbar flat text color="#C5E1A5" height="80px" light>
            <v-btn fab text small @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-btn text @click="setToday()">Hoje</v-btn>
            <v-btn text @click="type = 'month'">Mês</v-btn>
            <v-btn text @click="type = 'week'">Semana</v-btn>
            <v-btn text @click="type = 'day'">Dia</v-btn>

            <v-spacer></v-spacer>

            <v-btn
              dark
              style="margin-left: 20px; background-color: #1B5E20;"
              fab
              @click.stop="showCreate=true"
            >
              <v-icon color="#F5F5F5">mdi-plus</v-icon>
            </v-btn>
            <criar-evento v-model="showCreate" />
          </v-toolbar>

          <v-sheet style="height:600px">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="#F1F8E9"
              :events="events"
              :event-color="getEventColor"
              :now="today"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
            ></v-calendar>

            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon dark @click.stop="showEdit=true && getEventById(selectedEvent.id)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>

                <editar-evento v-model="showEdit" />

                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="deleteEvent(selectedEvent.id) ">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>
              </v-card-actions>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import CriarEvento from "@/components/Agenda/CriarEvento";
import EditarEvento from "@/components/Agenda/EditarEvento";
import { mapActions, mapState } from "vuex";

// import Test from '@/components/Test'
export default {
  name: "calendario",

  data: () => ({
    focus: "",
    showCreate: false,
    showEdit: false,
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    },
    today: null,
    id: null,
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false
  }),

  components: {
    CriarEvento,
    EditarEvento
  },

  computed: {
    ...mapState({
      events: state => state.eventos.events
    })
  },

  created() {
    if(this.events == 0){
      this.getAllEvents();
    }

  },

  methods: {
    ...mapActions("eventos", ["deleteEvent", "getEventById", "getAllEvents"]),

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    selecionarEventoPorId(id) {
      this.getEventById(id);
    }
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
</style>