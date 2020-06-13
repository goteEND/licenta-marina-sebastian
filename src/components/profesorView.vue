<template>
  <div>
    <p>Profesor View Reached</p>
    <div v-if="students">
      <v-data-table
        :headers="headers"
        :items="students"
        :items-per-page="10"
        class="elevation-1"
        :loading="loading"
      ></v-data-table>
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
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Role', value: 'role' },
          { text: 'Email', value: 'email' },
        ],
      }
    },
    async created () {
      const students = await axios.get("api/users")
      if (students.data) {
        this.students = students.data
        this.loading = false
      }
    }
  }
</script>

<style scoped>

</style>
