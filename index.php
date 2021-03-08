<?php
session_start();
$title = "Home";
require_once "components/header.php";
?>

<section class="hero">
    <div class="hero-body">
        <div class="container">
            <div class="columns">
                <div class="column is-5">
                    <h1 class="title is-3" style="margin-bottom: 2.5rem;">About</h1>
                    <h1 class="subtitle is-4" style="color:#5C5C5C">
                        This is the online portal of the
                        NIS Pavlodar school for students and teachers dedicated to project contests work
                    </h1>
                </div>
                <div class="column is-2"></div>
                <div class="column is-5">
                    <h1 class="title is-3">Upcoming Contests</h1>
                    <div class="box index-contest ">
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
        </div>
    </div>
</section>

<?php require_once "components/footer.php"; ?>