<template>
  <div class="home">
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>username</th>
          <th>email</th>
          <th>created_ad</th>
          <th>role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th>{{ user.id }}</th>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.created_at }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>

    <section>
      <b-button @click="clickMe">Click Me</b-button>
    </section>
    
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Home",

  data() {
    return {
      users: [],
    };
  },

  methods: {
    getAllUsers() {
      axios
        .get(
          "http://localhost/sites/contest-tracker/src/api/v1.php?action=read"
        )
        .then((response) => (this.users = response.data.users));
    },
  },

  mounted() {
    this.getAllUsers();
  },
};
</script>
