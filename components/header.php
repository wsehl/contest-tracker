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
    <script src="js/libs/font-awesome.min.js"></script>
    <script src="js/libs/jquery.min.js"></script>
    <script src="js/libs/jquery-validate.min.js"></script>
    <script src="js/libs/vue.min.js"></script>
    <script src="js/libs/axios.min.js"></script>
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
                        <?php if (isset($_SESSION['loggedin'])) {
                            echo '<div class="navbar-item has-dropdown is-hoverable">
										<a class="navbar-link">' . $_SESSION['username'] . '</a>
											<div class="navbar-dropdown">
                                                <a href="./profile" class="navbar-item">Profile</a>';
                            if ($_SESSION["role"] == "Admin") {
                                echo '<a href="./dashboard" class="navbar-item">Dashboard</a>';
                            }
                            echo '<hr class="navbar-divider">
								<a class="navbar-item" href="core/api.php?action=logout">Logout</a>
							  </div>
							</div>';
                        ?>
                        <?php } else { ?>
                            <div class="buttons">
                                <a href="./login" class="button is-white">Log in</a>
                                <a href="./signup" class="button is-link">Sign up</a>
                            </div>
                        <?php } ?>

                        <!-- 
                        <div class="buttons">
                            <?php if (!isset($_SESSION["role"])) { ?>
                            <?php } else if ($_SESSION["role"] == "Admin") { ?>
                                <a href="./dashboard" class="button is-outlined">Admin panel</a>
                            <?php } ?>
                            <?php if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) { ?>
                                <a href="./login" class="button is-white">Log in</a>
                                <a href="./signup" class="button is-link">Sign up</a>
                            <?php } else { ?>
                                <a href="./profile" class="button">Profile</a>
                                <a href="core/api.php?action=logout" class="button is-danger">Logout</a>
                            <?php } ?>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </nav>