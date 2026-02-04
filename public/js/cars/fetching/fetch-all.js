function fetchCars(filters = {}) {
    $("#loading-cars").show();

    $.ajax({
        url: "/cars",
        type: "GET",
        data: filters,
        dataType: "json",
        success: function (response) {
            cars = response.data;
            renderCars();
            renderPagination(response.links);
        },
        error: function () {
            $("#cars").html(`
                <div class="error">
                    Error buscando vehículos!
                </div>
            `);
        },
        complete: function () {
            $("#loading-cars").hide();
        }
    });
}

$(document).ready(function() {
    fetchCars();

    $("#car-filters").on("submit", function (e) {
        e.preventDefault();

        const filters = $(this).serialize();
        fetchCars(filters);
    });

    $("#clear-filters").on("click", function () {
        $("#car-filters")[0].reset();
        fetchCars();
    });
});