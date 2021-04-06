<?php
session_start();
isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true && $_SESSION["role"] === "Admin" ? '' : header("location: ./");
$title = "Dashboard";
require_once "components/header.php";
?>

<div id="app">
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <template v-if="loading">
                    <?php include("./components/spinner.php") ?>
                </template>
                <template v-else>
                    <div class="columns">
                        <div class="column is-12">
                            <input class="input mb-6" type="text" v-model="search" placeholder="Search">
                        </div>
                    </div>
                    <div class="columns">
                        <div class="columns is-4">
                            <div class="menu mr-6">
                                <ul class="menu-list">
                                    <li @click="selected = 'users'"><a :class="[
                                    selected === 'users' ? 'is-active' : 'not-active',
                ]">Users</a></li>
                                    <li @click="selected = 'events'"><a :class="[
                                    selected === 'events' ? 'is-active' : 'not-active',
                ]">Events</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="columns is-8 is-full">
                            <table class="table table-striped is-full" v-if="selected=='users'">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Created at</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="tbody-custom">
                                    <tr v-for="user in filteredUsers">
                                        <td>{{user.id}}</td>
                                        <td>{{user.username}}</td>
                                        <td>{{user.email}}</td>
                                        <td>{{user.role}}</td>
                                        <td>{{user.created_at}}</td>
                                        <!-- <td><button @click="showingdeleteModal = true; selectUser(user);" class="button is-danger is-small">Delete</button></td> -->
                                    </tr>
                                </tbody>

                            </table>
                            <table class="table table-striped is-full" v-if="selected=='events'">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>Event ID</th>
                                        <th>Organizer ID</th>
                                        <th>Title</th>
                                        <th>Descriptiona</th>
                                        <th>Date</th>
                                        <th>Published</th>
                                    </tr>
                                </thead>
                                <tbody class="tbody-custom">
                                    <tr v-for="event in events">
                                        <td>{{event.eventID}}</td>
                                        <td>{{event.organizerID}}</td>
                                        <td>{{event.name}}</td>
                                        <td>{{event.description}}</td>
                                        <td>{{event.date}}</td>
                                        <td>{{event.published}}</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                </template>
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
            events: [],
            search: '',
            selected: "users",
        },
        mounted: function() {
            const users = `core/api.php?action=users`;
            const events = `core/api.php?action=events`;

            const fetchedData = (url) =>
                axios.get(url);

            const promises = [users, events].map(fetchedData);

            Promise.all(promises)
                .then((response) => {
                    app.users = response[0].data.users;
                    console.log(response[1])
                    app.events = response[1].data.events;
                    app.loading = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        methods: {},
        computed: {
            filteredUsers() {
                return app.users.filter((item) => {
                    const id = item.id.toLowerCase();
                    const username = item.username.toLowerCase();
                    const email = item.email.toLowerCase();

                    const query = app.search.toLowerCase();
                    return (
                        id.includes(query) ||
                        username.includes(query) ||
                        email.includes(query)
                    );
                });
            },
        }
    });
</script>

<?php require_once "components/footer.php"; ?>