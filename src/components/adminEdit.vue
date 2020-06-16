<template>
  <v-data-table
    :headers="headers"
    :items="students"
    :search="search"
    :loading="loading"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Utilizatori</v-toolbar-title>
        <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Cautare"
          single-line
          hide-details
        ></v-text-field>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Editare</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nume"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.profesor"
                      label="Coordonator"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.title"
                      label="Titlu"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.year"
                      label="An"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.role"
                      label="Rol*"
                    ></v-text-field>
                  </v-col>
                  <p>Roluri posibile: admin profesor student</p>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["user"]),
  data: () => ({
    dialog: false,
    search: "",
    loading: true,
    headers: [
      {
        text: "Nume",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Coordonator", value: "profesor", sortable: false },
      { text: "Titlu", value: "title", sortable: false },
      { text: "An", value: "year", sortable: false },
      { text: "Rol", value: "role", sortable: false },
      { text: "Actiuni", value: "actions", sortable: false }
    ],
    students: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      profesor: 0,
      title: 0,
      year: 0,
      role: 0
    },
    defaultItem: {
      name: "",
      profesor: 0,
      title: 0,
      year: 0,
      role: 0
    }
  }),

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios.get(`api/adminEdit`).then(response => {
        this.students = response.data;
        this.loading = false;
      });
    },

    editItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.students.indexOf(item);
      const delItem = Object.assign({}, item);
      confirm("Doriti sa stergeti acest camp?") &&
        axios.delete("api/adminEdit/" + delItem._id).then(response => {
          if (response.status === 200) {
            this.students.splice(index, 1);
          }
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.students[this.editedIndex], this.editedItem);
      } else {
        this.students.push(this.editedItem);
      }
      axios.post("api/adminEdit", this.editedItem).then(response);
      this.close();
    }
  }
};
</script>
