<?php
session_start();
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    $log = 0;
} else {
    $log = 1;
}
require_once "components/header.php";
?>

<div class="container">
    <section class="hero is-large">
        <div class="hero-body">
            <div class="columns">
                <div class="column"></div>
                <div class="column">
                    <h1 class="title">Добро пожаловать, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>!</h1>
                    <progress class="progress is-small is-light" max="100">15%</progress>
                </div>
                <div class="column"></div>
            </div>
        </div>
    </section>
</div>

<?php require_once "components/footer.php"; ?>