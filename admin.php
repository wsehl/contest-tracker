<?php
session_start();
isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true && $_SESSION["role"] === "Admin" ? '' : header("location: index.php");
$title = "Dashboard";
require_once "components/header.php";
?>

<div id="app">
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <div class="columns">
                    <template v-if="loading">
                        <?php include("./components/spinner.php") ?>
                    </template>
                    <template v-else>
                        <table class="table table-striped">
                            <thead class="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Created At</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody class="tbody-custom">
                                <tr v-for="user in users">
                                    <td>{{user.id}}</td>
                                    <td>{{user.username}}</td>
                                    <td>{{user.email}}</td>
                                    <td>{{user.created_at}}</td>
                                    <td>{{user.role}}</td>
                                </tr>
                            </tbody>

                        </table>
                    </template>
                </div>
            </div>
        </div>
    </section>
</div>

<script>
    const app = new Vue({
        el: "#app",
        data: {
            loading: true,
            users: [],
        },
        mounted: function() {
            this.getAllUsers();
        },
        methods: {
            getAllUsers: function() {
                axios.get('core/api.php?action=read')
                    .then(function(response) {
                        console.log(response);
                        app.users = response.data.users;
                    })
                    .finally(function() {
                        app.loading = false;
                    })
            },
        }
    });
</script>

<?php require_once "components/footer.php"; ?>