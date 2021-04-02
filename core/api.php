<?php
require_once('functions/auth.php');
$params = $_REQUEST;
$action = $params['action'] != '' ? $params['action'] : '';

switch ($action) {
    case 'login':
        login();
        break;
    case 'signup':
        signup();
        break;
    case 'logout':
        logout();
        break;
    case 'dashboard_users':
        dash_users();
        break;
    default:
        return;
}

function dash_users()
{
    require_once("config.php");
    $result = $link->query("SELECT * FROM `users`");
    $users  = array();
    while ($row = $result->fetch_assoc()) {
        array_push($users, $row);
    }
    return $users;
};
