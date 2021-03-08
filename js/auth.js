$(document).ready(function () {
  $("#login-form").validate({
    rules: {
      password: {
        required: true,
      },
      username: {
        required: true,
      },
    },
    messages: {
      password: {
        required: "Please enter your password",
      },
      username: "Please enter your login",
    },
    submitHandler: submitForm,
  });

  /* Handling login functionality */
  function submitForm() {
    var data = $("#login-form").serialize();
    $.ajax({
      type: "POST",
      url: "core/api.php?action=login",
      data: data,
      beforeSend: function () {
        $("#error").fadeOut();
        $("#login_button").html(
          '<span class="glyphicon glyphicon-transfer"></span> &nbsp; sending ...'
        );
      },
      success: function (response) {
        if ($.trim(response) === "1") {
          console.log("dddd");
          $("#login-submit").html("Signing In ...");
          setTimeout('window.location.href = "index.php"; ', 2000);
        } else {
          $("#error").fadeIn(1000, function () {
            $("#error").html(response).show();
          });
        }
      },
    });
    return false;
  }

  /* Handling login functionality */
  function logout() {
    console.log("fdfdf");
    $.ajax({
      type: "POST",
      url: "core/api.php?action=logout",
      data: data,
      success: function (response) {
        window.location.href = "/index.php";
      },
    });
    return false;
  }
});
