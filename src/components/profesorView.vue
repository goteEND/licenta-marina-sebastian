<template>
  <div>
    <p>Profesor View Reached</p>
    <div v-if="students">
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
          :items-per-page="10"
          class="elevation-1"
          :loading="loading"
          :search="search"
        >
        </v-data-table>
      </v-card>
    </div>
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
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Role", value: "role" },
        { text: "Email", value: "email" }
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
