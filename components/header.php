<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contests Tracker</title>
    <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css">
    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
    <link rel="stylesheet" href="css/style.css" />
</head>

<body>
    <nav id="navbar" class="navbar is-spaced">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="index.php">Contest Tracker</a>
                <div id="navbarBurger" class="navbar-burger burger" data-target="navMenuDocumentation">
                    <span></span><span></span><span></span>
                </div>
            </div>
            <div id="navMenuDocumentation" class="navbar-menu">
                <!-- 
                <div class="navbar-start">
                    <a class="navbar-item" href="about.php"><span>About</span></a>
                    <a class="navbar-item" href="contact.php"><span>Contacts</span></a>
                </div>
                -->
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <?php
                            if ($log == 0) {
                            ?>
                                <a href="login.php" class="button">Войти</a>
                                <a href="register.php" class="button is-info">Регистрация</a>
                            <?php
                            } else if ($log == 1) {
                            ?>
                                <a href="welcome.php" class="button">Профиль</a>
                                <a href="logout.php" class="button is-danger">Выйти</a>
                            <?php
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>