<?php
session_start();

$title = "Сброс пароля";
require_once "components/header.php";

require_once "core/config.php";
$email = "";
$email_err = "";
?>

<section class="hero">
    <div class="hero-body">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd">
                    <div class="box is-shadowless pb-4">
                        <h1 class="title is-size-4 has-text-centered">Сброс пароля</h1>
                        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                            <div class="field">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="<?php echo $red_error && $username_err ? 'input is-danger' : 'input' ?>" type="email" placeholder="Email" name="email" value="<?php echo $email; ?>">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                </div>
                                <span class="help is-danger"><?php echo $email_err; ?></span>
                            </div>
                            <div class="field">
                                <input class="button is-link is-fullwidth" type="submit" value="Сбросить пароль">
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once "components/footer.php"; ?>