<template>
  <v-card>
    <h1>Editare Useri</h1>
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
      search: ""
    };
  }
};
</script>

<style scoped></style>
