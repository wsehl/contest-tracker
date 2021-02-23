<?php
session_start();
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
  $log = 0;
} else {
  $log = 1;
}

require_once "components/header.php";

?>


<?php require_once "components/footer.php"; ?>