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
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["user"]),
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
        { text: "Titlu", value: "title" },
        { text: "An", value: "year" },
        { text: "Email", value: "email", sortable: false }
        // { text: "Role", value: "role" },
        // { text: "Email", value: "email" }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(`api/profesorTable?prof=${this.user.name.replace(" ", "_")}`)
        .then(response => {
          this.students = response.data;
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped></style>
