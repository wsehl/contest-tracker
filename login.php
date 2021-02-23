<?php
session_start();
if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
    $log = 1;
    header("location: welcome.php");
    exit;
} else {
    $log = 0;
}

$title = "Авторизация";

require_once "components/header.php";
require_once "core/config.php";
$username = $password = "";
$username_err = $password_err = $red_error = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty(trim($_POST["username"]))) {
        $username_err = "Пожалуйста, введите имя полльзователя.";
    } else {
        $username = trim($_POST["username"]);
    }
    if (empty(trim($_POST["password"]))) {
        $password_err = "Пожалуйста, введите пароль.";
    } else {
        $password = trim($_POST["password"]);
    }
    if (trim($_POST["username"]) == "admin" && trim($_POST["password"]) == "admin") {
        header("location: admin.php");
        session_start();
        $_SESSION["admin"] = true;
    }
    if (empty($username_err) && empty($password_err)) {
        $sql = "SELECT id, username, password FROM users WHERE username = ?";
        if ($stmt = mysqli_prepare($link, $sql)) {
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            $param_username = $username;
            if (mysqli_stmt_execute($stmt)) {
                mysqli_stmt_store_result($stmt);
                if (mysqli_stmt_num_rows($stmt) == 1) {
                    mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password);
                    if (mysqli_stmt_fetch($stmt)) {
                        if (password_verify($password, $hashed_password)) {
                            session_start();
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;
                            header("location: welcome.php");
                        } else {
                            $password_err = "Неверный пароль.";
                        }
                    }
                } else {
                    $username_err = "Такого аккаунта не существует";
                }
            }
        }
        mysqli_stmt_close($stmt);
    }
    mysqli_close($link);
    $username_err || $password_err ? $red_error = "is-danger" : $red_error = '';
}
?>

<section class="hero">
    <div class="hero-body">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-one-third">
                    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                        <div class="field">
                            <label class="label">Логин</label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="<?php echo $red_error && $username_err ? 'input is-danger' : 'input' ?>" type="text" placeholder="Логин" name="username" value="<?php echo $username; ?>">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                </span>
                            </div>
                            <span class="help is-danger"><?php echo $username_err; ?></span>
                        </div>
                        <div class="field">
                            <label class="label">Пароль</label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="<?php echo $red_error && $username_err ? 'input is-danger' : 'input' ?>" type="password" placeholder="Пароль" name="password">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                            </div>
                            <span class="help is-danger"><?php echo $password_err; ?></span>
                        </div>
                        <div class="field">
                            <input class="button is-link is-fullwidth" type="submit" value="Войти">
                        </div>
                        <p>Нет аккаунта? <a href="register.php">Зарагестрироваться</a></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once "components/footer.php"; ?>