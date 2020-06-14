<template>
  <v-card>
    <v-card-title>
      Utilizatori
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
      :loading="loading"
      :search="search"
      class="elevation-1"
    >
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: true,
      students: [],
      search: "",
      headers: [
        {
          text: "Nume",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Profesor", value: "profesor" },
        { text: "An", value: "year" },
        { text: "Titlu", value: "title" }
        // { text: "Role", value: "role" },
        // { text: "Email", value: "email" }
      ]
    };
  },
  async created() {
    const students = await axios.get("api/profesorTable");
    if (students.data) {
      this.students = students.data;
      this.loading = false;
    }
  }
};
</script>

<style scoped></style>
