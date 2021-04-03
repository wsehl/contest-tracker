<?php
session_start();
isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true ? header("location: ./profile") : '';
$title = "Sign up";
require_once "components/header.php";
?>

<section class="hero">
    <div class="hero-body">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd">
                    <div class="box is-shadowless">
                        <h1 class="title is-size-4 has-text-centered">Create an Account</h1>
                        <div class="notification is-danger is-light" role="alert" id="error" style="display: none;"></div>
                        <form id="signup" onsubmit="return false" role="form" method="post">
                            <div class="field">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="text" placeholder="Username" id="username" name="username" autocomplete="off">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="email" placeholder="Email" id="email" name="email" autocomplete="off">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="password" placeholder="Password" id="password" name="password" autocomplete="off">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="password" placeholder="Confirm password" id="confirm_password" name="confirm_password" autocomplete="off">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <button class="button is-link is-fullwidth" type="submit" name="register-submit" id="register-submit">Sign Up</button>
                            </div>
                            <p>Already have an account? <a href="./login">Log in</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once "components/footer.php"; ?>

<script>
    $(document).ready(function() {
        $("#signup").validate({
            errorElement: "p",
            errorClass: "is-danger",
            rules: {
                username: {
                    required: true,
                    minlength: 4,
                    maxlength: 25,
                },
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    minlength: 8,
                    maxlength: 30,
                    required: true,
                },
                confirm_password: {
                    minlength: 8,
                    required: true,
                    equalTo: "#password",
                },
            },
            messages: {
                username: {
                    required: "Please enter your login",
                    minlength: jQuery.validator.format(
                        "Username is less than {0} characters"
                    ),
                    maxlength: jQuery.validator.format(
                        "Usernames is more than {0} characters"
                    ),
                },
                email: {
                    required: "Please enter your email",
                    email: "Please enter a valid email",
                },
                password: {
                    required: "Please enter your password",
                    minlength: jQuery.validator.format(
                        "At least {0} characters required"
                    ),
                },
                confirm_password: {
                    minlength: jQuery.validator.format(
                        "At least {0} characters required"
                    ),
                    required: "Please enter your confirm password",
                    equalTo: "Passwords do not match. Please try again",
                },
            },
            submitHandler: submitRegisterForm,
        });

        function submitRegisterForm() {
            const data = $("#signup").serialize();
            $.ajax({
                type: "POST",
                url: "core/api.php?action=signup",
                data: data,
                beforeSend: function() {
                    $("#error").fadeOut();
                    $("#register-submit").addClass("is-loading");
                },
                success: function(response) {
                    if ($.trim(response) === "200") {
                        $("#register-submit").addClass("is-loading");
                        setTimeout('window.location.href = "./login"; ', 2000);
                    } else {
                        $("#error").fadeIn(1000, function() {
                            $("#register-submit").removeClass("is-loading");
                            $("#error").html(response).show();
                        });
                    }
                },
            });
            return false;
        }
    });
</script>