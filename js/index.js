const options = {
  containers: ["#swup"],
  cache: true,
  linkSelector:
    'a[href^="' +
    window.location.origin +
    '"]:not([data-no-swup]), a[href^="./"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
};
const swup = new Swup(options);

$(document).ready(function () {
  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
});

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

//  displayToast('Error', 'top-center', 'is-danger')
