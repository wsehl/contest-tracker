<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
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
    /*  
        'is-primary','is-link','is-info','is-success','is-warning','is-danger',
    */


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