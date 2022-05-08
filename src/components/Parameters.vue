<template>
  <div>
    <nav id="header" class="bg-white fixed w-full z-10 top-0 shadow">
      <div
        class="w-full container mx-auto flex flex-wrap items-center justify-between my-4"
      >
        <div class="pl-4 md:pl-0">
          <router-link to="/"> Revenir sur le calendrier </router-link>
        </div>

        <div class="pr-0 flex justify-end">
          <div class="flex relative inline-block float-right">
            <div class="relative text-sm">
              <div
                id="userMenu"
                class="bg-white rounded shadow-md mt-2 mr-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible"
              >
                <ul class="list-reset">
                  <li>
                    <a
                      href="#"
                      class="px-4 py-2 block hover:bg-gray-400 no-underline hover:no-underline"
                      >My account</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="px-4 py-2 block hover:bg-gray-400 no-underline hover:no-underline"
                      >Notifications</a
                    >
                  </li>
                  <li>
                    <hr class="border-t mx-2 border-gray-400" />
                  </li>
                  <li>
                    <a
                      href="#"
                      class="px-4 py-2 block text-green-600 font-bold hover:bg-green-600 hover:text-white no-underline hover:no-underline"
                      >Logout</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!--Container-->
    <div
      class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-16"
    >
      <div class="w-full lg:w-1/5 px-6 text-xl text-gray-800 leading-normal">
        <div class="block lg:hidden sticky inset-0">
          <button
            id="menu-toggle"
            class="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-green-600 appearance-none focus:outline-none"
          >
            <svg
              class="fill-current h-3 float-right"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </button>
        </div>
        <div
          class="w-full sticky inset-0 hidden max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20"
          style="top: 6em"
          id="menu-content"
        >
          <ul class="list-reset py-2 md:py-0">
            <li
              class="py-1 md:my-2 hover:bg-green-100 lg:hover:bg-transparent border-l-4 border-transparent font-bold border-green-600"
            >
              <a
                href="#section1"
                class="block pl-4 align-middle text-gray-700 no-underline hover:text-green-600 text-left"
              >
                <span class="pb-1 md:pb-0 text-sm">Général</span>
              </a>
            </li>
            <li
              class="py-1 md:my-2 hover:bg-green-100 lg:hover:bg-transparent border-l-4 border-transparent"
            >
              <a
                href="#section2"
                class="block pl-4 align-middle text-gray-700 no-underline hover:text-green-600 text-left"
              >
                <span class="pb-1 md:pb-0 text-sm">Mes calendriers</span>
              </a>
            </li>
            <li
              class="py-1 md:my-2 hover:bg-green-100 lg:hover:bg-transparent border-l-4 border-transparent"
            >
              <a
                href="#section3"
                class="block pl-4 align-middle text-gray-700 no-underline hover:text-green-600 text-left"
              >
                <span class="pb-1 md:pb-0 text-sm">Mes formulaires</span>
              </a>
            </li>
            <li
              class="py-1 md:my-2 hover:bg-green-100 lg:hover:bg-transparent border-l-4 border-transparent text-left"
            >
              <a
                href="#section4"
                class="block pl-4 align-middle text-gray-700 no-underline hover:text-green-600"
              >
                <span class="pb-1 md:pb-0 text-sm">Signaler un problème</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!--Section container-->
      <section class="w-full lg:w-4/5">
        <!--Title-->
        <h1
          class="flex items-center font-sans font-bold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl"
        >
          Paramètres
        </h1>

        <!--divider-->
        <hr class="bg-gray-300 my-12" />

        <!--Title-->
        <h2
          id="section1"
          class="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl"
        >
          Général
        </h2>

        <!--Card-->
        <div
          class="p-8 mt-6 lg:mt-0 leading-normal rounded shadow bg-white text-left"
        >
          Début de la journée : 8h
          <br />
          Fin de la journée : 20h
          <br />
          Le calendrier est fractionné par tranche de 15min
        </div>
        <!--/Card-->

        <!--divider-->
        <hr class="bg-gray-300 my-12" />

        <!--Title-->
        <h2
          class="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl"
        >
          Mes calendriers
        </h2>

        <!--Card-->
        <div id="section2" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
          <div class="flex flex-row">
            <div class="basis-1/2">
              <div
                class="w-96 border inline-block ml-1 mb-1"
                v-for="(data, index) in myCalendar"
                :key="index"
              >
                <div :class="data.color">
                  {{ data.name }}
                  <i
                    class="ri-delete-bin-7-line float-right mr-2 cursor-pointer"
                    @click="deleteProduct(data._id)"
                  ></i>
                </div>
              </div>
            </div>
            <div class="basis-1/2">
              <h1>Ajouter un nouveau calendrier</h1>
              <input
                type="text"
                class="w-96"
                placeholder="Nom du calendrier"
                v-model="selectName"
              />
              <!-- This example requires Tailwind CSS v2.0+ -->
              <div
                v-if="colorModale"
                class="fixed z-10 inset-0 overflow-y-auto"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
              >
                <div
                  class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                >
                  <div
                    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                  ></div>
                  <span
                    class="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                    >&#8203;</span
                  >
                  <div
                    class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  >
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div class="sm:flex sm:items-start">
                        <div
                          class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                        >
                          <h3
                            class="text-lg leading-6 font-medium text-gray-900"
                            id="modal-title"
                          >
                            Veuillez sélectionner une couleur
                          </h3>
                          <div class="mt-2">
                            <div class="">
                              <button
                                v-for="(c, i) in colorAvailable"
                                :key="i"
                                :class="`inline-block ml-3 mb-3 bg-${c}-300 p-5 rounded focus:ring-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 `"
                                @click="selectColor = `bg-${c}-300`"
                              ></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                    >
                      <button
                        type="button"
                        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                        @click="saveProduct()"
                      >
                        Enregistrer
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  class="w-96 rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-400 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="colorModale = true"
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
        <!--/Card-->

        <!--divider-->
        <hr class="bg-gray-300 my-12" />

        <!--Title-->
        <h2
          class="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl"
        >
          Mes formulaires
        </h2>

        <div id="section3" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
          <p>Sélectionner un formulaire pour l'éditer</p>
          <button
            class="w-96 border inline-block ml-1 mb-1"
            v-for="(data, index) in myCalendar"
            :key="index"
            @click="switchEdit(data.name)"
          >
            <div :class="data.color">
              {{ data.name }}
            </div>
          </button>
          <p class="mt-12" v-if="editName">
            Édition du calendrier
            <u>"{{ editName }}"</u>
          </p>
          <div
            id="form-editor"
            :style="{
              display: editName ? '' : 'none',
              border: '1px solid gray',
            }"
          ></div>
          <div v-if="editName">
            <button
              @click="saveForm()"
              class="mt-8 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-200 text-base font-medium text-black hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-100 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Sauvegarder
            </button>
          </div>
        </div>

        <hr class="bg-gray-300 my-12" />

        <h2
          class="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl"
        >
          Signaler un problème
        </h2>

        <!--Card-->
        <div id="section4" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
          <p>
            Si vous rencontrez un problème concernant l'utilisation du logiciel,
            veuillez envoyer un mail à
            <a href="mailto:jules.levassort@gmail.com">
              jules.levassort@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
    <hr class="mt-7 mb-12" />
  </div>
</template>

<script>
import { FormEditor } from "@bpmn-io/form-js";
import axios from "axios";

let baseUri = "https://api.calendrier.pharmacie-ploumoguer.fr/";

export default {
  data() {
    return {
      schema: Object,
      myCalendar: Object,
      selectColor: "",
      selectName: "",
      colorModale: false,
      editName: "",
      myForms: [],
      colorAvailable: [
        "slate",
        "stone",
        "red",
        "orange",
        "amber",
        "yellow",
        "lime",
        "green",
        "emerald",
        "teal",
        "cyan",
        "sky",
        "blue",
        "indigo",
        "violet",
        "purple",
        "fuchsia",
        "pink",
        "rose",
      ],
      formEditor: Object,
    };
  },
  methods: {
    async switchEdit(evnt) {
      this.editName = evnt;
      await this.formEditor.importSchema({
        components: this.myForms.filter(
          (word) => word.name.toLowerCase() == this.editName.toLowerCase()
        )[0].form,
        type: "default",
      });
    },
    saveForm() {
      console.log(this.schema.components);

      axios
        .post(baseUri + "calendar/forms", {
          form: this.schema.components,
          name: this.editName,
        })
        .then((res) => {
          console.log(res);

          if (res.data && res.data.type == "update") {
            this.$toasted.show(
              "Formulaire " + this.editName + " mis à jour avec succès !",
              {
                theme: "toasted-primary",
                position: "top-center",
                duration: 5000,
              }
            );
          } else {
            this.$toasted.show(
              "Formulaire " + this.editName + " créé avec succès !",
              {
                theme: "toasted-primary",
                position: "top-center",
                duration: 5000,
              }
            );
          }
          this.getCalendarForms();
        })
        .catch((err) => console.error(err));
    },
    saveProduct() {
      this.colorModale = false;
      axios
        .post(baseUri + "calendar/products", {
          color: this.selectColor,
          name: this.selectName,
        })
        .then(() => {
          this.getMyCalendar();
          this.selectName = "";
        })
        .catch((err) => console.error(err));
    },
    deleteProduct(id) {
      axios
        .delete(baseUri + "calendar/products/" + id)
        .then(() => this.getMyCalendar())
        .catch((err) => console.error(err));
    },
    getMyCalendar() {
      axios
        .get(baseUri + "calendar/products")
        .then((res) => (this.myCalendar = res.data.data))
        .catch((err) => console.error(err));
    },
    getCalendarForms() {
      axios
        .get(baseUri + "calendar/forms")
        .then((res) => (this.myForms = res.data.forms))
        .catch((err) => console.error(err));
    },
  },
  async mounted() {
    this.getMyCalendar();
    this.getCalendarForms();
    this.formEditor = new FormEditor({
      container: document.querySelector("#form-editor"),
    });

    await this.formEditor.importSchema({
      components: [],
      type: "default",
    });

    setInterval(() => {
      this.schema = this.formEditor.saveSchema();
    }, 1000);
  },
};
</script>

<style scoped>
body {
  scroll-behavior: smooth;
}
</style>
