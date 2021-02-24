<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> <?php echo $title; ?></title>
    <link rel="stylesheet" href="./css/bulmaswatch.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/js/all.min.js" integrity="sha512-UwcC/iaz5ziHX7V6LjSKaXgCuRRqbTp1QHpbOJ4l1nw2/boCfZ2KlFIqBUA/uRVF0onbREnY9do8rM/uT/ilqw==" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/style.css" />
    <link rel="apple-touch-icon" sizes="180x180" href="media/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="media/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="media/favicon-16x16.png">
    <link rel="manifest" href="media/site.webmanifest">
    <link rel="mask-icon" href="media/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">
</head>

<body>
    <nav id="navbar" class="navbar">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="index.php">
                    <img src="./media/logo.svg" alt="Bulma: Free, open source, and modern CSS framework based on Flexbox" width="235" height="28">
                </a>
                <div id="navbarBurger" class="navbar-burger burger" data-target="navMenuDocumentation">
                    <span></span><span></span><span></span>
                </div>
            </div>
            <div id="navMenuDocumentation" class="navbar-menu">

                <div class="navbar-start">
                    <a class="navbar-item" href="about.php">
                        О нас
                    </a>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <?php if (!isset($_SESSION["role"])) { ?>
                            <?php } else if ($_SESSION["role"] == "Admin") { ?>
                                <a href="admin.php" class="button is-outlined">Админ панель</a>
                            <?php } ?>

                            <?php if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) { ?>
                                <a href="login.php" class="button is-outlined">Войти</a>
                                <a href="register.php" class="button is-info">Регистрация</a>
                            <?php } else { ?>
                                <a href="profile.php" class="button">Профиль</a>
                                <a href="logout.php" class="button is-danger">Выйти</a>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>