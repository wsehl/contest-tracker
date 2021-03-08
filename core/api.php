<?php
$params = $_REQUEST;
$action = $params['action'] != '' ? $params['action'] : '';

switch ($action) {
    case 'login':
        login();
        break;
    case 'logout':
        logout();
        break;
    default:
        return;
}

function login()
{
    require_once("config.php");
    if (isset($_POST['login-submit'])) {
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
                            echo "1";
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;
                            $_SESSION["role"] = $role;
                        } else {
                            echo "Ohhh ! Wrong Credential.";
                        }
                    }
                } else {
                    echo "No such account";
                }
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
    header("location: ../index.php");
    exit;
}
