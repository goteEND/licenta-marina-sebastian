<template>
  <v-card class="fill-width">
    <v-card-title>
      Alte lucrari
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Cautare"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="students"
      :items-per-page="5"
      class="elevation-1"
      :loading="loading"
      :search="search"
    >
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["user"]),
  data() {
    return {
      loading: true,
      students: [],
      search: "",
      headers: [
        { text: "Titlu", value: "title" },
        { text: "Profesor", value: "profesor" },
        { text: "An", value: "year" }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get("api/studentTable").then(response => {
        this.students = response.data;
        this.loading = false;
      });
    }
  }
};
</script>

<style scoped></style>
