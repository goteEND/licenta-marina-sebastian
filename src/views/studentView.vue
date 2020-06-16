<!-- <template v-if="user.role === 'profesor'"> -->
<template>
  <v-app id="studentView">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>{{ user.name }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn @click="logoutUser" color="secondary">Logout</v-btn>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="4">
                        <h2 v-if="user.profesor === ' '">Formular</h2>
                        <h3 v-if="user.profesor === ' '">
                          Va rugam completati formularul urmator
                        </h3>
                        <h2 v-if="user.profesor !== ' '">
                          <v-icon>mdi-account</v-icon>
                          {{ user.profesor }}
                        </h2>
                        <h3 class="my-2" v-if="user.profesor !== ' '">
                          <v-icon>mdi-calendar</v-icon>
                          {{ user.year }}
                        </h3>
                        <h2 v-if="user.profesor !== ' '">
                          <v-icon>mdi-fountain-pen-tip</v-icon>
                          {{ user.title }}
                        </h2>
                      </v-col>
                      <v-col v-if="user.profesor === ' '" cols="12" md="4">
                        <v-select
                          prepend-icon="mdi-account"
                          v-model="profesor"
                          :items="items"
                          :rules="[v => !!v || 'Camp obligatoriu']"
                          label="Coordonator"
                        ></v-select>

                        <v-select
                          prepend-icon="mdi-calendar"
                          v-model="anPrezentare"
                          :items="items2"
                          :rules="[v => !!v || 'Camp obligatoriu']"
                          label="An prezentare"
                        ></v-select>

                        <v-text-field
                          prepend-icon="mdi-fountain-pen-tip"
                          v-model="titluPrezentare"
                          :rules="[v => !!v || 'Camp obligatoriu']"
                          label="Titlu"
                        ></v-text-field>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            :disabled="!valid"
                            @click="postUserChoice"
                            color="primary"
                            >Trimite</v-btn
                          >
                        </v-card-actions>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <studentTable />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import studentTable from "../components/studentTable.vue";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: mapGetters(["user"]),
  components: { studentTable },

  data: () => ({
    valid: true,

    profesor: "",
    anPrezentare: "",
    titluPrezentare: "",
    items: [
      "Hunyadi Daniel",
      "Musan Mircea",
      "Ralf Fabian",
      "Neamtu Mircea",
      "Pitic Alina",
      "Simian Dana",
      "Stoica Florin",
      "Stoica Laura"
    ],
    items2: ["2020", "2021", "2022"]
  }),

  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    },
    postUserChoice() {
      axios.post("api/users", {
        _id: this.user._id,
        profesor: this.profesor,
        anPrezentare: this.anPrezentare,
        titluPrezentare: this.titluPrezentare
      });
      // this.profesor = "";
      // this.anPrezentare = "";
      // this.titluPrezentare = "";
      this.user.profesor = this.profesor;
      this.user.year = this.anPrezentare;
      this.user.title = this.titluPrezentare;
    }
  },

  async created() {
    const students = await axios.get("api/users");
    if (students.data) {
      this.students = students.data;
      this.loading = false;
    }
  }
};
</script>
