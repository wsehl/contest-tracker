<?php
session_start();
isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true ? header("location: profile.php") : '';
$title = "Login";
require_once "components/header.php";
?>

<section class="hero">
    <div class="hero-body">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd">
                    <div class="box is-shadowless pb-4">
                        <h1 class="title is-size-4 has-text-centered">Login</h1>
                        <div class="alert alert-danger" role="alert" id="error" style="display: none;">...</div>
                        <form id="login-form" onsubmit="return false" name="login_form" role="form" method="post">
                            <div class="field">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="text" placeholder="Username" name="username" id="username">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <span id="check-e"></span>
                                </div>
                            </div>
                            <br>
                            <div class="field">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="password" placeholder="Passwrod" id="password" name="password">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <button class="button is-link is-fullwidth" type="submit" name="login-submit" id="login-submit">Sign In</button>
                            </div>
                            <p>Нет аккаунта? <a href="./register">Sign Up</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once "components/footer.php"; ?>