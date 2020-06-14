<template>
  <v-app id="dashboard">
    <v-content>
      <div v-if="user">
        <!-- <li class="list-group-item">Email: {{ user.email }}</li>
            <li class="list-group-item">Name: {{ user.name }}</li>
            <li class="list-group-item">Role: {{ user.role }}</li>
            <v-btn @click.prevent="logoutUser">Logout</v-btn> -->
        <studentView v-if="user.role === 'student'" />
        <profesorView v-if="user.role === 'profesor'" />
      </div>
    </v-content>
  </v-app>
</template>

<script>
// import views
import studentView from "../components/studentView.vue";
import profesorView from "../components/profesorView.vue";

import { mapActions, mapGetters } from "vuex";
export default {
  props: ["msg"],
  components: { studentView, profesorView },
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
