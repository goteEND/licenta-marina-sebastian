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
    <v-card-actions>
      <v-spacer></v-spacer>
      <download-excel
        :fetch="fetchExcel"
        :fields="excel_fields"
        :before-generate="excelStartDl"
        :before-finish="excelFinishDl"
        name="situatie.xls"
        worksheet="situatie"
      >
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :loading="loadingBtn"
              :disabled="loadingBtn"
              v-bind="attrs"
              v-on="on"
              color="primary"
            >
              Generare situatie
            </v-btn>
          </template>
          <span
            >Situatia va fi generata dupa tabelul de mai sus. Cautarea nu tine
            cont de litere mari sau mici</span
          >
        </v-tooltip>
      </download-excel>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["user"]),
  data() {
    return {
      loadingBtn: false,
      excel_fields: {
        Nume: "name",
        Titlu: "title",
        An: "year",
        Email: "email"
      },
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
    },
    async fetchExcel() {
      const response1 = await axios.get(
        `api/generateExcelNameP?src=${this.search.replace(
          " ",
          "_"
        )}&prof=${this.user.name.replace(" ", "_")}`
      );
      const response2 = await axios.get(
        `api/generateExcelTitleP?src=${this.search.replace(
          " ",
          "_"
        )}&prof=${this.user.name.replace(" ", "_")}`
      );
      const response4 = await axios.get(
        `api/generateExcelYearP?src=${this.search.replace(
          " ",
          "_"
        )}&prof=${this.user.name.replace(" ", "_")}`
      );
      const response5 = await axios.get(
        `api/generateExcelEmailP?src=${this.search.replace(
          " ",
          "_"
        )}&prof=${this.user.name.replace(" ", "_")}`
      );
      let response = [];
      if (response1.data.length > 0) {
        response = [...response1.data];
      }
      if (response2.data.length > 0) {
        response = [...response2.data];
      }
      if (response4.data.length > 0) {
        response = [...response4.data];
      }
      if (response5.data.length > 0) {
        response = [...response5.data];
      }
      return response;
    },
    excelStartDl() {
      this.loadingBtn = true;
    },
    excelFinishDl() {
      this.loadingBtn = false;
    }
  }
};
</script>

<style scoped></style>
