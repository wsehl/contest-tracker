<?php
require_once "../core/config.php";
if (isset($_POST['search'])) {
    $searchValue = $_POST['search'];
    if (empty(trim($_POST["search"]))) {
        "";
    }
    $sql = "SELECT * FROM users WHERE username LIKE '%$searchValue%'";
    $resulta = $link->query($sql);
    while ($row = $resulta->fetch_assoc()) {
        echo "<br>";
        echo $row['id'] . " ";
        echo $row['username'] . " ";
        echo $row['role'] . " ";
        echo $row['created_at'] . " ";
    }
}
