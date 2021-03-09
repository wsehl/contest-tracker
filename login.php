<?php
session_start();
isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true ? header("location: profile.php") : '';
$title = "Log in";
require_once "components/header.php";
?>

<section class="hero">
    <div class="hero-body">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd">
                    <div class="box is-shadowless pb-4">
                        <h1 class="title is-size-4 has-text-centered">Log in</h1>
                        <div class="notification is-danger is-light" role="alert" id="error" style="display: none;"></div>
                        <form id="login" onsubmit="return false" name="login_form" role="form" method="post">
                            <div class="field">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="text" placeholder="Username" name="username" id="username" autocomplete="off">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="password" placeholder="Passwrod" id="password" name="password" autocomplete="off">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field mb-4">
                                <button class="button is-link is-fullwidth" type="submit" name="login-submit" id="login-submit">Log In</button>
                            </div>
                            <nav class="level">
                                <div class="level-left">
                                    <div class="level-item">
                                        <label class="checkbox">
                                            <input type="checkbox">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <div class="level-right">
                                    <a class="level-item" href="./password_reset">Forgot password?</a>
                                </div>
                            </nav>
                            <p>Have no account yet? <a href="./signup">Create an account</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once "components/footer.php"; ?>