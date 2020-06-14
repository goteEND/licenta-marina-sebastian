<template>
  <v-app id="dashboard">
    <v-content>
      <div v-if="user">
        <!-- <v-btn @click.prevent="logoutUser">Logout</v-btn> -->
        <studentView v-if="user.role === 'student'" />
        <profesorView v-if="user.role === 'profesor'" />
        <adminView v-if="user.role === 'admin'" />
      </div>
    </v-content>
  </v-app>
</template>

<script>
// import views
import studentView from "../components/studentView.vue";
import profesorView from "../components/profesorView.vue";
import adminView from "../components/adminView.vue";

import { mapActions, mapGetters } from "vuex";
export default {
  props: ["msg"],
  components: { studentView, profesorView, adminView },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"]),
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    }
  },
  created() {
    this.getProfile();
  }
};
</script>

<style></style>
