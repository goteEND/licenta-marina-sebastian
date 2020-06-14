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
        { text: "An", value: "year" },
        { text: "Titlu", value: "title" },
        { text: "Email", value: "email", sortable: false }
        // { text: "Role", value: "role" },
        // { text: "Email", value: "email" }
      ]
    };
  },
  async mounted() {
    const students = await axios.get("api/profesorTable?prof=Ralf_Fabian");
    console.log(this.user);
    if (students.data) {
      this.students = students.data;
      this.loading = false;
    }
  }
};
</script>

<style scoped></style>
