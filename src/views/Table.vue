<template>
  <div class="home">
    <div>
      <h1>Hi {{ username }}</h1>
      <p>{{ secretMessage }}</p>
      <input type="button" value="Logout" @click="logout" />
    </div>
    <div class="section">
      <div v-if="loading">
        <a class="button is-white is-loading"></a>
      </div>
      <table v-else class="table">
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
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthService from '@/services/AuthService.js';
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      users: [],
      errorMsg: "",
      successMsg: "",
      loading: true,
    };
  },

  methods: {
    getAllUsers() {
      axios
        .get(
          "http://localhost/sites/contest-tracker/src/api/v1.php?action=read"
        )
        .then((response) => {
          if (response.data.error) {
            this.errorMsg = response.data.message;
          } else {
            this.users = this.users = response.data.users;
            console.log(this.users);
          }
        })
        .finally(() => (this.loading = false));
    },
  },

  mounted() {
    this.getAllUsers();
  },
};
</script>
