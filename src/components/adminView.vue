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
              </v-toolbar>
              <v-card-text>
                <profesorTable />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import profesorTable from "./profesorTable.vue";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { profesorTable },
  computed: mapGetters(["user"]),
  data() {
    return {};
  }
};
</script>

<style scoped></style>
