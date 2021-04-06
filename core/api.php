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
    case 'users':
        users();
        break;
    case 'events':
        events();
        break;
    default:
        return;
}

function users()
{
    require_once("config.php");
    header("Content-type: application/json");
    $res = array('error' => false);
    $result = $link->query("SELECT * FROM `users`");
    $users  = array();
    while ($row = $result->fetch_assoc()) {
        array_push($users, $row);
    }
    $res['users'] = $users;
    $link->close();
    echo json_encode($res);
    die();
};

function events()
{
    require_once("config.php");
    header("Content-type: application/json");
    $res = array('error' => false);
    $result = $link->query("SELECT * FROM `events`");
    $events  = array();
    while ($row = $result->fetch_assoc()) {
        array_push($events, $row);
    }
    $res['events'] = $events;
    $link->close();
    echo json_encode($res);
    die();
};
