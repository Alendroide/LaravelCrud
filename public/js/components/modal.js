$(document).ready( function() {
    $(document).on("click", ".modal-close", function () {
        $(this).closest(".modal-overlay").removeClass("show");
    });

    $(document).on("click", ".modal-overlay", function (e) {
        if (e.target === this) {
            $(this).removeClass("show");
        }
    });
})