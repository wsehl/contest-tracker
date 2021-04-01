const options = {
  containers: ["#swup"],
  cache: true,
  linkSelector:
    'a[href^="' +
    window.location.origin +
    '"]:not([data-no-swup]), a[href^="./"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
};
const swup = new Swup(options);

function auth() {
  $(document).ready(function () {
    $("#login").validate({
      errorElement: "p",
      errorClass: "is-danger",
      rules: {
        username: {
          required: true,
        },
        password: {
          required: true,
        },
      },
      messages: {
        password: "Please enter your password",
        username: "Please enter your login",
      },
      submitHandler: submitLoginForm,
    });
    function submitLoginForm() {
      const data = $("#login").serialize();
      $.ajax({
        type: "POST",
        url: "core/api.php?action=login",
        data: data,
        beforeSend: function () {
          $("#error").fadeOut();
          $("#login-submit").addClass("is-loading");
        },
        success: function (response) {
          if ($.trim(response) === "200") {
            $("#login-submit").addClass("is-loading");
            setTimeout('window.location.href = "./"; ', 2000);
          } else {
            $("#error").fadeIn(1000, function () {
              $("#login-submit").removeClass("is-loading");
              $("#error").html(response).show();
            });
          }
        },
      });
      return false;
    }

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
        beforeSend: function () {
          $("#error").fadeOut();
          $("#register-submit").addClass("is-loading");
        },
        success: function (response) {
          if ($.trim(response) === "200") {
            $("#register-submit").addClass("is-loading");
            setTimeout('window.location.href = "./login"; ', 2000);
          } else {
            $("#error").fadeIn(1000, function () {
              $("#register-submit").removeClass("is-loading");
              $("#error").html(response).show();
            });
          }
        },
      });
      return false;
    }
  });
}

$(document).ready(function () {
  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
});

init();

function init() {
  auth();
}

swup.on("contentReplaced", init);
