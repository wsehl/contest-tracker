<?php
session_start();
isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true && $_SESSION["role"] === "Admin" ? '' : header("location: index.php");

$title = "Админ панель";
require_once "components/header.php";

require_once "core/config.php";

if (isset($_GET['del'])) {
    $id = $_GET['del'];
    $email = $_SESSION["email"];
    $result = mysqli_query($link, "SELECT * from users WHERE email='$email'");
    $row = mysqli_fetch_array($result);
    if ($id == $row["id"]) {
        $_SESSION = array();
        session_destroy();
        header("location: admin.php");
        exit;
    } else {
        mysqli_query($link, "DELETE FROM users WHERE id='$id'");
        header('location: admin.php');
    }
}
if (isset($_GET['logout'])) {
    $_SESSION = array();
    session_destroy();
    header("location: index.php");
    exit;
}

?>

<section class="hero">
    <div class="hero-body">
        <div class="container">
            <div class="columns">
                <div class="column is-12">
                    <form method="post">
                        <nav class="panel" style="box-shadow: 0 0em 0em;">
                            <div class="field has-addons">
                                <script>
                                    $(document).ready(function() {
                                        $("#search").keyup(function() {
                                            $.ajax({
                                                url: './core/search.php',
                                                type: 'post',
                                                data: {
                                                    search: $(this).val(),

                                                },
                                                success: function(result) {
                                                    $('#result').html(result);
                                                }
                                            });
                                        });
                                    });
                                </script>
                                <div class="control is-expanded">
                                    <input type="text" id="search" class="input" placeholder="Search" name="search" autocomplete="off">
                                </div>
                                <div class="control">
                                    <button class="button is-white" style="height: 40px!important;" type="submit" name="submit">
                                        <span class="icon">
                                            <i class="fas fa-search"></i>
                                        </span>
                                        <span>
                                            Поиск
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <span id="result"></span>
                        </nav>
                    </form>
                    <br>
                    <div class="table-container">
                        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Created at</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <?php $results = mysqli_query($link, "SELECT * FROM users"); ?>
                            <?php while ($row = mysqli_fetch_array($results)) { ?>
                                <tr>
                                    <td><?php echo $row['id']; ?></td>
                                    <td><?php echo $row['username']; ?></td>
                                    <td><?php echo $row['role']; ?></td>
                                    <td><?php echo $row['created_at']; ?></td>
                                    <td>
                                        <a class="button is-danger is-small" href="admin.php?del=<?php echo $row['id']; ?>" onClick="return confirm('Вы действительно хотите удалить эту запись?');">
                                            <i class="far fa-trash-alt"></i>
                                        </a>
                                    </td>
                                </tr>
                            <?php } ?>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once "components/footer.php"; ?>