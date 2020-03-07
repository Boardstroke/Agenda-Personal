<template>
  <v-container fluid fill-height>
    <v-row justify="end" class="fill-height">
      <v-col sm="12" md="12" lg="9">
        <v-toolbar flat text color="#E3F2FD" height="80px" light>
           <v-btn fab text small color="#00BCD4" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="#00BCD4" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
            <v-btn text @click="setToday()">Hoje </v-btn>
            <v-btn text @click="type = 'month'">Mês</v-btn>
            <v-btn text @click="type = 'week'">Semana</v-btn>
            <v-btn text @click="type = 'day'">Dia</v-btn>

          <v-toolbar-title>{{ title }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn
            dark
            style="margin-left: 20px; background-color: #1565C0;"
            fab
            @click.stop="ShowCreate=true"
          >
            <v-icon color=#F5F5F5>mdi-plus</v-icon>
          </v-btn>
            <criar-evento v-model="ShowCreate" />

        </v-toolbar>

        <v-sheet style="height:600px">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="indigo lighten-3"
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
              <v-btn
                icon
                dark
                @click.stop="showEdit=true && selecionarEventoPorId(selectedEvent.id)"
              >
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
</template>

<script>
import EventoService from "@/services/EventoService";
import CriarEvento from "@/components/Agenda/CriarEvento";
import EditarEvento from "@/components/Agenda/EditarEvento";

// import Test from '@/components/Test'
export default {
  data: () => ({
    focus: "",

    ShowCreate: false,
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
    selectedOpen: false,

    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ]
  }),
  components: {
    CriarEvento,
    EditarEvento
  },

  created(){
    this.$store.dispatch('updateEvents')
  },
  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    },
    events(){
      return this.$store.getters.indexEvents
    }
  },

  mounted() {
    this.$refs.calendar.checkChange();

    // this.$root.$on("update", () => {
    //   this.updateRange();
    //   this.selectedOpen = false;
    //   this.selectedEvent.remove();
    // });


  },
  methods: {
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
    // Objetivo dia 3 de março: Todas as asyncs abaixo devem ser manipuladas usando vuex
    // async updateRange() {
    //   let snapshot = (await EventoService.index()).data;
    //   let events = [];

    //   snapshot.forEach(arr => {
    //     events.push({
    //       id: arr.id,
    //       name: arr.name,
    //       start: this.formatDate(new Date(arr.data + " " + arr.start), true),
    //       end: this.formatDate(new Date(arr.data + " " + arr.end), true),
    //       color: this.colors[this.rnd(0, this.colors.length - 1)]
    //     });
    //   });
    //   this.events = events;
    // },
    async deleteEvent(id) {
      try {
        await EventoService.remove({ id: parseInt(id) });

        this.selectedEvent = {};
        this.selectedOpen = false;
        // this.updateRange();
      } catch (err) {
        console.log("Não foi possivel excluir");
      }
    },

    async selecionarEventoPorId(id) {
      try {
        const response = await EventoService.selecionarEventoPorId({
          id: parseInt(id)
        });

        this.$root.$emit("DadosDoEvento", response.data);
      } catch (err) {
        console.log("Não Possivel selcionar elemento");
      }
    },

    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
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