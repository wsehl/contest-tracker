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
    $("#login-form").validate({
      errorElement: 'div',
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
          $("#login-submit").addClass("is-loading");
        },
        success: function (response) {
          if ($.trim(response) === "1") {
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
