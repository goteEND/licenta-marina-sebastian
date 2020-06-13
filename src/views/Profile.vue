<template>
  <div>
    <h2>Profile</h2>
    {{ msg }}
    <div class="card" v-if="user">
      <ul class="list-group">
        <li class="list-group-item">Email: {{ user.email }}</li>
        <li class="list-group-item">Name: {{ user.name }}</li>
        <v-btn @click.prevent="logoutUser">Logout</v-btn>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["msg"],
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
