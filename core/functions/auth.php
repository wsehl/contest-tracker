<?php
function login()
{
    require_once("config.php");
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $sql = "SELECT id, username, password, role FROM users WHERE username = ?";
    if ($stmt = mysqli_prepare($link, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $param_username);
        $param_username = $username;
        if (mysqli_stmt_execute($stmt)) {
            mysqli_stmt_store_result($stmt);
            if (mysqli_stmt_num_rows($stmt) == 1) {
                mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password, $role);
                if (mysqli_stmt_fetch($stmt)) {
                    if (password_verify($password, $hashed_password)) {
                        echo "200";
                        $_SESSION["loggedin"] = true;
                        $_SESSION["id"] = $id;
                        $_SESSION["username"] = $username;
                        $_SESSION["role"] = $role;
                        // if (!empty($_POST["remember"])) {
                        //     setcookie("user", $username, time() + (10 * 365 * 24 * 60 * 60));
                        // }
                    } else {
                        echo "Ohhh ! Wrong Credential";
                    }
                }
            } else {
                echo "No such account";
            }
        }
    }
    mysqli_stmt_close($stmt);
}

function signup()
{
    require_once("config.php");
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $confirm_password = trim($_POST["confirm_password"]);
    $email =  trim($_POST['email']);
    $error = "";

    if (empty(trim($_POST["username"]))) {
        //  echo "Enter your username please";
        $error = $error + 1;
    } else {
        $sql = "SELECT id FROM users WHERE username = ?";
        if ($stmt = mysqli_prepare($link, $sql)) {
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            $param_username = trim($_POST["username"]);
            if (mysqli_stmt_execute($stmt)) {
                mysqli_stmt_store_result($stmt);
                if (mysqli_stmt_num_rows($stmt)) {
                    echo "Username already exists <br>";
                    $error = $error + 1;
                } else {
                    $username = trim($_POST["username"]);
                }
            } else {
                echo "Something went worng";
                $error = $error + 1;
            }
        }
        mysqli_stmt_close($stmt);
    }

    if (empty(trim($_POST["email"]))) {
        //   echo "Enter your email please";
        $error = $error + 1;
    } else {
        $sql = "SELECT id FROM users WHERE email = ?";
        if ($stmt = mysqli_prepare($link, $sql)) {
            mysqli_stmt_bind_param($stmt, "s", $param_email);
            $param_email = trim($_POST["email"]);
            if (mysqli_stmt_execute($stmt)) {
                mysqli_stmt_store_result($stmt);
                if (mysqli_stmt_num_rows($stmt)) {
                    echo "Email already exists <br>";
                    $error = $error + 1;
                } else {
                    $email = trim($_POST["email"]);
                }
            } else {
                echo "Something went worng";
                $error = $error + 1;
            }
        }
        mysqli_stmt_close($stmt);
    }

    // if (empty(trim($_POST["password"]))) {
    //     echo "Enter your password";
    // } elseif (strlen(trim($_POST["password"])) < 8) {
    //     echo "Password must be more that 8 symbols";
    // } else {
    //     $password = trim($_POST["password"]);
    // }


    if (empty($password_err) && ($password != $confirm_password)) {
        // echo "Passwords do not match";
        $error = $error + 1;
    }

    if ($error == 0) {
        $sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
        if ($stmt = mysqli_prepare($link, $sql)) {
            mysqli_stmt_bind_param($stmt, "sss", $param_username, $param_password, $param_email);
            $param_username = $username;
            $param_password = password_hash($password, PASSWORD_DEFAULT);
            $param_email = $email;
            if (mysqli_stmt_execute($stmt)) {
                echo "200";
            } else {
                echo "Something went worng";
            }
        }
        mysqli_stmt_close($stmt);
    }
}

function logout()
{
    session_start();
    $_SESSION = array();
    session_destroy();
    header("location: ../");
    exit;
}
