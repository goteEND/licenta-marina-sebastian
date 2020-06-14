<template v-if="user.role === 'profesor'">
  <v-app id="login">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>{{ user.name }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <!-- <h2 v-if="coordonator2 !== ''">
                  Coordonatorul ales este {{ coordonator2 }}
                </h2> -->
                <v-form v-model="valid">
                  <v-container>
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
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" @click="postpam" color="primary"
                  >Post</v-btn
                >
                <v-btn @click="loginUser" color="primary">Test</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["user"]),

  data: () => ({
    valid: true,
    // coordonator2: "",
    // an: "",
    // titlu: "",
    profesor: "",
    anPrezentare: "",
    titluPrezentare: "",
    items: [
      "Hunyadi Daniel",
      "Musan Mircea",
      "Ralf Fabian",
      "Neamtu Mircea",
      "Pitic Alina",
      "Stoica Florin",
      "Stoica Laura"
    ],
    items2: ["2020", "2021", "2022"]
  }),
  methods: {
    postpam() {
      axios.post("api/userChoice", {
        nume: user.name,
        profesor: this.profesor,
        anPrezentare: this.anPrezentare,
        titluPrezentare: this.titluPrezentare
      });
    }
  }
};
</script>
