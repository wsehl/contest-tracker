<?php
session_start();

$title = "О нас";
require_once "components/header.php";
?>

<section class="hero">
    <div class="hero-body">
        <div class="container">
            <h1 class="title">Contest Tracker</h1>
            <h1 class="subtitle">Будь в курсе всех конкурсов!</h1>
            <p>
                This is the online portal of the
                NIS Pavlodar school for students and teachers dedicated to project contests work
            </p>
        </div>
    </div>
</section>

<?php require_once "components/footer.php"; ?>