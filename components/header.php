<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo $title; ?></title>
    <link rel="stylesheet" href="./css/styles.css" />
    <link rel="apple-touch-icon" sizes="180x180" href="media/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="media/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="media/favicon-16x16.png">
    <link rel="manifest" href="media/site.webmanifest">
    <link rel="mask-icon" href="media/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">
    <script src="js/libs/font-awesome-5.15.2.min.js"></script>
    <script src="js/libs/swup-2.0.14.min.js"></script>
    <script src="js/libs/bulma-toast-2.2.0.min.js"></script>
    <script src="js/libs/jquery-3.6.0.min.js"></script>
    <script src="js/libs/jquery-validate-1.19.3.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
</head>

<body>
    <nav id="navbar" class="navbar has-border">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="./">
                    <img src="./media/contest tracker.svg" alt="Bulma: Free, open source, and modern CSS framework based on Flexbox">
                </a>
                <div id="navbarBurger" class="navbar-burger burger" data-target="navMenuDocumentation">
                    <span></span><span></span><span></span>
                </div>
            </div>
            <div id="navMenuDocumentation" class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item" href="./about">
                        <p class="has-text-weight-medium has-text-black">About</p>
                    </a>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <?php if (!isset($_SESSION["role"])) { ?>
                            <?php } else if ($_SESSION["role"] == "Admin") { ?>
                                <a href="./admin" class="button is-outlined">Admin panel</a>
                            <?php } ?>
                            <?php if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) { ?>
                                <a href="./login" class="button is-white">Log in</a>
                                <a href="./signup" class="button is-link">Sign up</a>
                            <?php } else { ?>
                                <a href="./profile" class="button">Profile</a>
                                <a href="core/api.php?action=logout" class="button is-danger">Logout</a>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <main id="swup" class="transition-fade">