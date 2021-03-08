const options = {
  containers: ["#swup"],
  cache: true,
  linkSelector:
    'a[href^="' +
    window.location.origin +
    '"]:not([data-no-swup]), a[href^="./"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
};
const swup = new Swup(options);

function login() {
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
            setTimeout('window.location.href = "index"; ', 2000);
          } else {
            $("#error").fadeIn(1000, function () {
              $("#error").html(response).show();
            });
          }
        },
      });
      return false;
    }
  });
}

function displayToast(message, position, type) {
  bulmaToast.toast({
    message: message,
    type: type,
    position: position.toLowerCase().replace(" ", "-"),
    dismissible: true,
    duration: 3000,
    pauseOnHover: true,
    animate: {
      in: "fadeIn",
      out: "fadeOut",
    },
  });
}

//displayToast("Error", "top-center", "is-danger");

$(document).ready(function () {
  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
});

function init() {
  login();
}

swup.on("contentReplaced", init);
