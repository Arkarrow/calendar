<template>
  <div id="app">
    <router-link to="/parameters"></router-link>
    <router-view></router-view>
    <div class="internetStatus" v-if="!internetCheck">
      <i class="ri-cloud-off-line"></i>
      {{ statusMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      internetCheck: true,
      statusMessage: "",
      errInternet: `Veuillez vérifier votre connexion internet, certaines fonctionnalités
      comme la synchronisation multi-appareils ou l'envoi de sms sont
      interrompus`,
      reconnect: "Connexion établie ! Tentative de reconnection ...",
      successSync: "Synchronisation effectuée avec succès !",

      localDB: Object,
    };
  },

  methods: {
    initialize() {},
    checkInternetConnection() {
      if (navigator.onLine) {
        if (!this.internetCheck) {
          this.statusMessage = this.reconnect;
          setTimeout(() => {
            this.statusMessage = this.successSync;
          }, 1500);
          setTimeout(() => {
            this.internetCheck = true;
          }, 3000);
        }
      } else {
        this.statusMessage = this.errInternet;
        this.internetCheck = false;
      }
    },
    addEventToLocalDB() {
      // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
      var indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB ||
        window.shimIndexedDB;

      // Open (or create) the database
      var open = indexedDB.open("MyDatabaseLeN1", 1);

      // Create the schema
      open.onupgradeneeded = function () {
        var db = open.result;
        var store = db.createObjectStore("MyObjectStore", { keyPath: "id" });
        store.createIndex("NameIndex", ["name.last", "name.first"]);
      };

      open.onsuccess = function () {
        // Start a new transaction
        var db = open.result;
        var tx = db.transaction("MyObjectStore", "readwrite");
        var store = tx.objectStore("MyObjectStore");
        store.index("NameIndex");

        // Add some data
        store.put({ id: 12345, name: { first: "John", last: "Doe" }, age: 42 });

        // Close the db when the transaction is done
        tx.oncomplete = function () {
          db.close();
        };
      };
    },
    retriveToLocalDB() {
      // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
      var indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB ||
        window.shimIndexedDB;

      // Open (or create) the database
      var open = indexedDB.open("MyDatabaseLeN1", 1);

      // Create the schema
      open.onupgradeneeded = function () {
        var db = open.result;
        var store = db.createObjectStore("MyObjectStore", { keyPath: "id" });
        store.createIndex("NameIndex", ["name.last", "name.first"]);
      };

      open.onsuccess = function () {
        // Start a new transaction
        var db = open.result;
        var tx = db.transaction("MyObjectStore", "readwrite");
        var store = tx.objectStore("MyObjectStore");
        store.index("NameIndex");

        // Query the data
        var getJohn = store.get(12345);

        getJohn.onsuccess = function () {
          if (getJohn.result) {
            console.log("ouho", getJohn.result.name.first); // => "John"
          } else {
            console.log("Impossible de trouver john, il faut l'enregistrer"); // => "John"
          }
        };

        // Close the db when the transaction is done
        tx.oncomplete = function () {
          db.close();
        };
      };
    },
  },
  created() {
    setInterval(() => {
      this.checkInternetConnection();
    }, 3000);
  },
  mounted() {
    this.retriveToLocalDB();
    setTimeout(() => {
      this.addEventToLocalDB();
    }, 1000);

    setTimeout(() => {
      this.retriveToLocalDB();
    }, 3000);
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  /* margin-top: 60px; */
}
.internetStatus {
  position: fixed;
  background: rgba(0, 255, 13, 0.5);
  z-index: 9;
  width: 100%;
  height: 50px;
  line-height: 50px;
  bottom: 0;
}

.fjs-powered-by {
  display: none;
}
</style>
