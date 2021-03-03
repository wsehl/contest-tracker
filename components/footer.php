</main>
<script src="js/font-awesome-5.15.2.min.js"></script>
<script src="js/jquery-3.6.0.min.js"></script>
<script src="js/swup.min.js"></script>
<script src="js/script.js"></script>

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