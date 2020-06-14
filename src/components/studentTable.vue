<template>
  <div v-if="students">
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: true,
      students: null,
      search: "",
      headers: [
        { text: "Titlu", value: "title" },
        { text: "Profesor", value: "profesor" },
        { text: "An", value: "year" }
      ]
    };
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

<style scoped></style>
