<?php
session_start();
$title = "Сброс пароля";
require_once "components/header.php";
?>

<section class="hero">
    <div class="hero-body">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd">
                    <div class="box is-shadowless pb-4">
                        <h1 class="title is-size-4 has-text-centered">Restore password</h1>
                        <form method="post" onsubmit="return false">
                            <div class="field">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="email" placeholder="Email" name="email">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field mb-4">
                                <button class="button is-link is-fullwidth" type="submit" name="login-submit" id="login-submit">Send Instructions</button>
                            </div>
                            <p><a href="./login">Log in</a> or <a href="./signup">Sign up</a< /p>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once "components/footer.php"; ?>