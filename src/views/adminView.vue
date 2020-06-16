<template>
  <v-app id="adminView">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>{{ user.name }} - ADMIN</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="secondary ">Logout</v-btn>
              </v-toolbar>
              <v-card-text>
                <v-row align="center" justify="center">
                  <v-col cols="4" align="center" justify="center">
                    <v-btn color="secondary" class="ma-2" @click="viewTable"
                      >Situatie</v-btn
                    >
                    <v-btn color="secondary" class="ma-2" @click="viewEdit"
                      >Editare Useri</v-btn
                    >
                  </v-col>
                </v-row>
                <v-row align="center" justify="center">
                  <v-col>
                    <adminTable v-if="view === 'table'" />
                    <adminEdit v-if="view === 'edit'" />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import adminTable from "../components/adminTable.vue";
import adminEdit from "../components/adminEdit.vue";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { adminTable, adminEdit },
  computed: mapGetters(["user"]),
  data() {
    return {
      view: "edit"
    };
  },
  methods: {
    viewTable() {
      this.view = "table";
    },
    viewEdit() {
      this.view = "edit";
    }
  }
};
</script>

<style scoped></style>
