<template>
  <div class="h-screen">
    <nav>
      <div class="flex mb-2">
        <div class="w-1/3 text-left">
          <img
            src="@/assets/logo.jpeg"
            alt=""
            style="width: auto; height: 50px"
          />
        </div>
        <div class="w-2/3 text-left middle"></div>
        <div class="w-3/3 text-right">
          <router-link to="/parameters">
            <i class="ri-settings-5-line w ri-2x"></i>
          </router-link>
          <router-link to="/help">
            <i class="ri-question-line w ri-2x"></i>
          </router-link>
        </div>
      </div>
    </nav>
    <div class="flex mb-2">
      <div class="w-1/6">
        <vue-cal
          xsmall
          :time="false"
          hide-view-selector
          active-view="month"
          default-view="month"
          locale="fr"
          :disable-views="['years', 'year', 'week', 'day']"
          @cell-focus="today = $event"
          class="vuecal--green-theme vuecal--rounded-theme mb-4"
          style="max-width: 270px; height: 290px; margin: auto"
        >
        </vue-cal>
        <div class="mt-4">
          <div class="flex mb-2">
            <div
              class="pl-12 cursor-pointer"
              @click="openCalendarSelect = !openCalendarSelect"
            >
              Mes calendriers
              <i
                :class="`${
                  openCalendarSelect
                    ? 'ri-arrow-up-s-line'
                    : 'ri-arrow-down-s-line'
                } ri-lg`"
              ></i>
            </div>
          </div>
          <div
            class="calendar"
            :style="{ display: openCalendarSelect ? '' : 'none' }"
          >
            <div class="flex mb-2" v-for="(d, index) in products" :key="index">
              <div class="w-1/3">
                <input
                  v-if="d.name == 'Principal'"
                  type="checkbox"
                  name=""
                  id=""
                  checked
                  @change="filterEventByProducts(d.name)"
                />
                <input
                  v-else
                  type="checkbox"
                  name=""
                  id=""
                  @change="filterEventByProducts(d.name)"
                />
              </div>
              <div class="w-2/3 text-left">
                <span :class="d.color"> {{ d.name }}</span>
              </div>
            </div>
            <hr class="mb-2 mt-2" />
          </div>
          <div class="flex mb-2">
            <div class="pl-12 cursor-pointer" @click="createRDV = !createRDV">
              Ajouter un évènement
              <i
                :class="`${
                  createRDV ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
                } ri-lg`"
              ></i>
            </div>
          </div>
          <div class="mt-4" :style="{ display: createRDV ? '' : 'none' }">
            <select name="" id="" @change="generateForm($event)">
              <option
                :value="d.name.toLowerCase()"
                v-for="(d, index) in products"
                :key="index"
              >
                {{ d.name }}
              </option>
            </select>

            <div v-for="(f, index) in form" :key="index">
              <div v-if="f.name == selectForm">
                <div v-for="(g, i) in f.form" :key="i">
                  <select v-if="g.type == 'select'" v-model="dynamicModel[i]">
                    <option
                      :value="v.value"
                      v-for="(v, index) in g.values"
                      :key="index"
                    >
                      {{ v.label }}
                    </option>
                  </select>
                  <input
                    v-if="g.type == 'textfield'"
                    v-model="dynamicModel[i]"
                    :placeholder="g.label"
                  />
                </div>
              </div>
            </div>
            <datetime
              type="datetime"
              input-id="dateHourPicker"
              v-model="dateHourPicker"
              class="theme-orange"
              :phrases="{ ok: 'Ok', cancel: 'Annuler' }"
              :minute-step="fractionBy"
              title="A quelle heure sera programmé le rdv ?"
            ></datetime>

            <datetime
              type="datetime"
              input-id="dateHourPicker"
              v-model="dateHourPickerEnd"
              class="theme-orange"
              :phrases="{ ok: 'Ok', cancel: 'Annuler' }"
              :minute-step="fractionBy"
              title="A quelle heure sera programmé le rdv ?"
            ></datetime>
            <div>
              <div>
                <input type="number" placeholder="Numéro de téléphone" />
              </div>
            </div>
            <button @click="AddRDV()">Ajouter</button>
          </div>
        </div>
      </div>
      <div class="w-5/6">
        <vue-cal
          hide-title-bar
          hide-view-selector
          ref="vuecal"
          class="vuecal--green-theme w-full"
          :selected-date="today"
          :disable-views="['years', 'year']"
          :hide-weekdays="[]"
          :show-week-numbers="false"
          :default-view="defaultView"
          events-on-month-view="short"
          overlaps-per-time-step
          :events="events"
          locale="fr"
          style="min-height: 100vh"
          :time-from="openAt * 60"
          :time-to="closeAt * 60"
          :time-step="fractionBy"
          :special-hours="specialHours"
        >
        </vue-cal>
      </div>
    </div>
  </div>
</template>

<script>
import vuecal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/i18n/fr.js";
// You need a specific loader for CSS files
import "vue-datetime/dist/vue-datetime.css";
import axios from "axios";

const dailyHours = { from: 5 * 60, to: 20 * 60, class: "business-hours" };

let baseUri = "https://pharmacie.juleslevassort.com/";
export default {
  name: "Calendar",
  components: { "vue-cal": vuecal },
  data: () => ({
    sA: [1, 4, 7, 10, 13, 16, 19, 21],
    sB: [2, 5, 8, 11, 14, 17, 20, 22],
    sC: [3, 6, 9, 12, 15, 18, 21, 23],
    products: [],
    loadProducts: [],
    selectForm: "Principal",
    form: {},
    dynamicModel: [],
    openCalendarSelect: false,
    createRDV: true,
    dateHourPicker: "",
    dateHourPickerEnd: "",
    activeView: "week",
    popupIsOpen: false,
    selectedEvent: {},
    showDialog: false,
    specialHours: {
      1: dailyHours,
      2: dailyHours,
      3: dailyHours,
      4: dailyHours,
      5: dailyHours,
      6: dailyHours,
      7: dailyHours,
    },
    openAt: 8,
    closeAt: 20,
    fractionBy: 15,
    defaultView: "week",
    today: new Date().toISOString().slice(0, 10),
    selectDate: Date,
    events: [
      {
        start: "2022-02-27 10:35",
        end: "2022-02-27 12:30",
        title: "RDV 1",
        class: "health",
      },
      {
        start: "2022-02-27 10:35",
        end: "2022-02-27 14:30",
        title: "RDV 2",
        class: "sport",
      },
    ],
  }),
  created() {
    window.addEventListener("keydown", (e) => {
      if (e.key == "m" && !this.popupIsOpen) {
        this.$refs.vuecal.switchView("month", new Date());
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.key == "w" && !this.popupIsOpen) {
        this.$refs.vuecal.switchView("week", new Date());
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.key == "d" && !this.popupIsOpen) {
        this.$refs.vuecal.switchView("day", new Date());
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.key == "y" && !this.popupIsOpen) {
        this.$refs.vuecal.switchView("year", new Date());
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.key == "ArrowRight" && !this.popupIsOpen) {
        this.$refs.vuecal.next();
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.key == "ArrowLeft" && !this.popupIsOpen) {
        this.$refs.vuecal.previous();
      }
    });
  },
  async mounted() {
    // console.log("P: " + p);
    console.log("this.events: " + JSON.stringify(this.events));

    console.log("reload");
    this.selectDate = this.today;
    this.dateHourPicker = this.today;
    this.loadProducts.push("principal");

    this.fetchCalendarProducts();
    this.getCalendarForms();

    setInterval(() => {
      this.getSemaineType(this.today);
    }, 100);

    this.fetchEvents();
    setInterval(() => {
      this.fetchEvents();
    }, 5000);
  },
  watch: {
    watcher() {},
  },
  methods: {
    getCalendarForms() {
      axios
        .get(baseUri + "calendar/forms")
        .then((res) => {
          this.form = res.data.forms;
          console.log(this.forms);
        })
        .catch((err) => console.error(err));
    },
    getSemaineType(dateW) {
      let currentdate = new Date(dateW);
      var oneJan = new Date(currentdate.getFullYear(), 0, 1);
      var numberOfDays = Math.floor(
        (currentdate - oneJan) / (24 * 60 * 60 * 1000)
      );
      var result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);

      if (this.sA.includes(result - 1)) {
        // semaine A
        dailyHours.class = "business-hours-a";
      } else if (this.sB.includes(result - 1)) {
        // semaine B
        dailyHours.class = "business-hours-b";
      } else if (this.sC.includes(result - 1)) {
        // semaine C

        dailyHours.class = "business-hours-c";
      }
    },
    generateForm(event) {
      this.selectForm = event.target.value;
    },
    filterEventByProducts(event) {
      let product = event.toLowerCase();
      if (this.loadProducts.includes(product)) {
        if (this.loadProducts.indexOf(product) > -1) {
          this.loadProducts.splice(this.loadProducts.indexOf(product), 1); // 2nd parameter means remove one item only
        }
        console.log(this.loadProducts);
      } else {
        this.loadProducts.push(product);
        console.log(this.loadProducts);
      }
    },
    onEventCreate() {},
    AddRDV() {
      //  let { telephone, hour, type, calendar } = this;

      let rdv = { title: "", description: "", start: "", end: "" };

      let properties = this.form.filter(
        (word) => word.name == this.selectForm
      )[0];

      for (let i = 0; i < this.dynamicModel.length; i++) {
        console.log(this.dynamicModel[i]);
        if (properties.form[i].type == "select") {
          rdv.description += this.dynamicModel[i] + ", ";
        }
        if (properties.form[i].type == "textfield") {
          rdv.title += this.dynamicModel[i] + " ";
        }
      }

      axios
        .post(baseUri + "calendar/events", {
          start: this.cleanDateString(this.dateHourPicker),
          end: this.cleanDateString(this.dateHourPickerEnd),
          title: rdv.title,
          content: rdv.description,
          classCss: "sport",
          category: this.selectForm,
          background: true,
        })
        .then(() =>
          this.$toasted.show("Rendez-vous enregistré avec succès !", {
            theme: "toasted-primary",
            position: "top-center",
            duration: 5000,
          })
        )
        .catch((err) => console.error(err));
    },
    cleanDateString(stringDate) {
      if (stringDate) {
        let d = stringDate.split("T");
        let fd = d[0] + " " + d[1].substring(0, 5);
        return fd;
      }
    },
    viewTheDate() {
      console.log(new Date(this.selectDate));
      this.$refs.vuecal.switchView("week", new Date(this.selectDate));
    },
    onEventClick(event, e) {
      this.selectedEvent = event;
      this.showDialog = true;

      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation();
    },
    setEventVal() {
      this.events = [
        {
          start: "2022-02-27 15:25",
          end: "2022-02-27 16:25",
          title: "Vaccination John - 1ere injection +12 ans",
          content: "Informations complémentaires",
          class: "sport",
          split: 2,
          background: true,
        },
      ];
    },

    fetchEvents() {
      axios
        .get(baseUri + "calendar/events?filter=" + this.loadProducts.join(","))
        .then((res) => (this.events = res.data.data))
        .catch((err) => console.error(err));
    },

    fetchCalendarProducts() {
      axios
        .get(baseUri + "calendar/products")
        .then((res) => (this.products = res.data.data))
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style>
/*     @import '../../node-modules/vue-cal/dist/vuecal.css'; */
/* @import "vue-cal/dist/vuecal.css"; */
* {
  margin: 0;
}
*.vuecal--month-view .vuecal__cell {
  height: 80px;
}

.vuecal--month-view .vuecal__cell-content {
  justify-content: flex-start;
  height: 100%;
  align-items: flex-end;
}

.vuecal--month-view .vuecal__cell-date {
  padding: 4px;
}
.vuecal--month-view .vuecal__no-event {
  display: none;
}

/* Different color for different event types. */
.vuecal__event.leisure {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}
.vuecal__event.sport {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
.vuecal__event.health {
  background-color: rgba(164, 230, 210, 0.9);
  border: 1px solid rgb(144, 210, 190);
}
.business-hours {
  background-color: rgba(0, 247, 255, 0.2);
  border: solid rgba(0, 247, 255, 0.6);
  border-width: 2px 0;
}

.business-hours-a {
  background-color: rgba(255, 230, 0, 0.2);
  border: solid rgba(255, 230, 0, 0.6);
  border-width: 2px 0;
}

.business-hours-b {
  background-color: rgba(0, 247, 255, 0.2);
  border: solid rgba(0, 247, 255, 0.6);
  border-width: 2px 0;
}

.business-hours-c {
  background-color: rgba(225, 0, 255, 0.2);
  border: solid rgba(225, 0, 255, 0.6);
  border-width: 2px 0;
}

/* color */
.vuecal__event.leisure {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}
.vuecal__event.sport {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}

/* taille calendar */

.vuecal--month-view .vuecal__cell {
  height: auto;
  min-height: 20px;
}

.vuecal--month-view .vuecal__cell-content {
  justify-content: flex-start;
  height: 100%;
  align-items: flex-end;
}

.vuecal--month-view .vuecal__cell-date {
  padding: 4px;
}
.vuecal--month-view .vuecal__no-event {
  display: none;
}

/* theme */
.vuecal--green-theme .vuecal__menu,
.vuecal--green-theme .vuecal__cell-events-count {
  background-color: #bad049;
}
.vuecal--green-theme .vuecal__title-bar {
  background-color: #fff;
}
.vuecal--green-theme .vuecal__cell--today,
.vuecal--green-theme .vuecal__cell--current {
  background-color: #ff0000;
}
.vuecal--green-theme .vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
  background-color: #bad049;
}
.vuecal--green-theme .vuecal__cell--selected:before {
  border-color: #bad049;
}
.vuecal__flex,
.vuecal__weekdays-headings {
  color: #000;
}
.vuecal--month-view .vuecal__cell-date {
  padding: 8px;
}
/* nav */

nav {
  background-color: #bad049;
  height: 50px;
  width: 100%;
  position: relative;
}
/* 
nav button {
  height: 24px;
  margin-top: calc((50px - 27px) / 2);
  margin-right: 6px;
  margin-left: 6px;

  background-color: transparent;
  cursor: pointer;
  border: none;
  border-radius: 6px;
} */

nav .middle button {
  height: 24px;
  margin-top: calc((50px - 27px) / 2);
  margin-right: 6px;
  margin-left: 6px;

  padding-right: 6px;
  padding-left: 6px;

  background-color: white;
  cursor: pointer;
  border: none;
  border-radius: 6px;
}
.slbutton {
  margin-top: calc((50px - 24px) / 2);
  width: 120px;
  background-color: white;
}
nav .w {
  color: white;
  padding-left: 8px;
  padding-right: 8px;
}

.left {
  float: left;
}
.right {
  float: right;
}

.popup {
  width: 450px;
  min-height: 400px;
  background: rgba(255, 255, 255);
  color: white;

  margin-left: calc((100vw - 450px) / 2);
  margin-top: calc((100vh - 400px) / 2);
  padding: 12px;
  position: fixed;
  z-index: 99999999;
}

input,
textarea {
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 2px;
  width: 70%;
  margin-bottom: 12px;
  border: none;
  font-size: 17px;
  border: solid 1px rgb(214, 214, 214);
  outline: none;
}
textarea {
  height: 68px;
}
select {
  width: 70%;
  height: 28px;
  border: none;
  font-size: 17px;
  border-bottom: solid 1px rgb(214, 214, 214);
  margin-bottom: 12px;
  outline: none;
}

.addEvent {
  width: 70%;
  height: 28px;
  border: none;
  font-size: 22px;
  margin-bottom: 12px;
  outline: none;
  background: #bad049;
  color: white;
  border-radius: 6px;
  box-shadow: 0 0 5px 2px rgb(209, 209, 209);
}

/* date picker */

.theme-orange .vdatetime-popup__header,
.theme-orange .vdatetime-calendar__month__day--selected > span > span,
.theme-orange .vdatetime-calendar__month__day--selected:hover > span > span {
  background: #bad049;
}

.theme-orange .vdatetime-year-picker__item--selected,
.theme-orange .vdatetime-time-picker__item--selected,
.theme-orange .vdatetime-popup__actions__button {
  color: #bad049;
}
</style>
