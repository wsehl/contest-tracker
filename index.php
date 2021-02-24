<?php
session_start();

$title = "Главная";
require_once "components/header.php";
?>

<section class="hero">
    <div class="hero-body">
        <div class="container">
            <div class="columns">
                <div class="column is-5">
                    <h1 class="title is-2">Цель</h1>
                    <br>
                    <h1 class="subtitle">
                        This is the online portal of the
                        NIS Pavlodar school for students and teachers dedicated to project contests work
                    </h1>
                </div>
                <div class="column is-2"></div>
                <div class="column is-5">
                    <h1 class="title is-2">Contests</h1>
                    <div class="box">
                        <h1 class="title is-5">iq-chem.com VI-thInternational</h1>
                        <h1 class="subtitle is-6">10 - 12 Grades</h1>
                        <nav class="level is-mobile">
                            <div class="level-left">
                                <h1 class="subtitle is-6">12 days left</h1>
                            </div>
                            <div class="level-right">
                                <h1 class="subtitle is-6">Chemistry</h1>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <hr>
            <h1 class="title is-4"><strong style="font-weight: 600;">Автор:</strong> Александр Тюльков</h1>
            <h1 class="subtitle is-4"><strong>Почта:</strong> windesehl@gmail.com</h1>
        </div>
    </div>
</section>

<?php require_once "components/footer.php"; ?>