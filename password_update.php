<?php
session_start();
isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true ? '' : header("location: profile.php");

$title = "Password upadte";
require_once "components/header.php";

$password = $new_password = $new_password_err = $password_err = $red_error = $password_not_same = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require_once "core/config.php";
    $username = $_SESSION["username"];
    if (empty(trim($_POST["password"]))) {
        $password_err = "Пожалуйста, введите пароль.";
    } else {
        $password = trim($_POST["password"]);
    }
    if (empty(trim($_POST["new_password"]))) {
        $new_password_err = "Пожалуйста, введите новый пароль.";
    } else {
        $new_password = trim($_POST["new_password"]);
    }
    if (empty($new_password_err) && empty($password_err)) {
        $checkPass = "SELECT id, username, password, role FROM users WHERE username = ?";
        if ($stmt = mysqli_prepare($link, $checkPass)) {
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            $param_username = $username;
            if (mysqli_stmt_execute($stmt)) {
                mysqli_stmt_store_result($stmt);
                if (mysqli_stmt_num_rows($stmt) == 1) {
                    mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password, $role);
                    if (mysqli_stmt_fetch($stmt)) {
                        if (password_verify($password, $hashed_password)) {
                        } else {
                            $password_not_same = "Пароли не совпадают";
                        }
                    }
                }
            }
        }
        if (empty($password_not_same)) {
            if ($password != $new_password) {
                $sql = "UPDATE users SET password = ? WHERE username = '$username'";
                if ($stmt = mysqli_prepare($link, $sql)) {
                    mysqli_stmt_bind_param($stmt, "s", $param_password);
                    $param_password = password_hash($new_password, PASSWORD_DEFAULT);
                    if (mysqli_stmt_execute($stmt)) {
                        echo '<div class="notification is-success"><button class="delete"></button>Пароль успешно заменён</div>';
                    } else {
                        echo '<div class="notification is-danger"><button class="delete"></button>Что-то пошло не так</div>';
                    }
                } else {
                    echo '<div class="notification is-danger"><button class="delete"></button>Что-то пошло не так</div>';
                }
            } else {
                echo '<div class="notification is-danger"><button class="delete"></button>Пароли не могут совпадать</div>';
            }
        } else {
            echo '<div class="notification is-danger"><button class="delete"></button>Старый пароль не верен</div>';
        }
        mysqli_stmt_close($stmt);
    }

    mysqli_close($link);
    $password_err || $new_password_err ? $red_error = "is-danger" : $red_error = '';
}
?>

<section class="hero">
    <div class="hero-body">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd">
                    <div class="box is-shadowless pb-4">
                        <h1 class="title is-size-4 has-text-centered">Chnage password</h1>
                        <form method="post" onsubmit="return false">
                            <div class="field">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="password" placeholder="Old password" name="password">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="password" placeholder="New password" name="new_password">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <input class="button is-link is-fullwidth" type="submit" value="Submit">
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once "components/footer.php"; ?>