</main>
<script src="js/swup.min.js"></script>
<script>
    const options = {
        containers: ["#swup"],
        linkSelector: 'a[href^="' +
            window.location.origin +
            '"]:not([data-no-swup]), a[href^="./"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])'
    };
    const swup = new Swup(options);
</script>

<script>
    $(document).ready(function() {
        $(".navbar-burger").click(function() {
            $(".navbar-burger").toggleClass("is-active");
            $(".navbar-menu").toggleClass("is-active");
        });
    });
</script>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
            const $notification = $delete.parentNode;

            $delete.addEventListener('click', () => {
                $notification.parentNode.removeChild($notification);
            });
        });
    });
</script>

<script>
    function displayToast(message, position, type) {
        bulmaToast.toast({
            message: message,
            type: type,
            position: position.toLowerCase().replace(' ', '-'),
            dismissible: true,
            duration: 3000,
            pauseOnHover: true,
            animate: {
                in: 'fadeIn',
                out: 'fadeOut'
            },
        })
    }

    //  displayToast('Error', 'top-center', 'is-danger')
</script>

</body>

</html>