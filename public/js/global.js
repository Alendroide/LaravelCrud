let cars = [];

$(document).ready(function() {

    updateCartTotalItems();

    // Pagination logic

    $(document).on("click", "#pagination .page-link", function (e) {
        e.preventDefault();

        const url = $(this).data("url");
        if (!url) return;

        const query = url.split("?")[1];
        fetchCars(query);
    });

    // Redirect to car page on click

    $(document).on('click', '.car-card', function (e) {
        if ($(e.target).closest('.edit-button').length) return;
        if ($(e.target).closest('.add-to-cart-button').length) return;
    
        const id = $(this).data('id');
        window.location.href = `/car/${id}`;
    });

    // Toggle sidebar

    $(document).ready(function() {
        
        $("#sidebar-overlay").on("click", function() {
            $("body").toggleClass("sidebar-state");
        })

        $("#sidebar-toggle").on("click", function(){
            $("body").toggleClass("sidebar-state");
        })
    })

});
