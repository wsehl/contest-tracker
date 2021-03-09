<?php
session_start();
isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true ? '' : header("location: index.php");

$title = "Профиль";
require_once "components/header.php";
?>

<section class="hero">
    <div class="hero-body">
        <div class="container">
            <h1 class="title">Welcome, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>!</h1>
            <a href="./password_update">Change password</a>
        </div>
    </div>
</section>

<?php require_once "components/footer.php"; ?>