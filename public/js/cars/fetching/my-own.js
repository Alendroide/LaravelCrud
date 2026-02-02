$(document).ready(function() {
    $.ajax({
        url: "/api/my-vehicles",
        type: "GET",
        dataType: "json",
        success: function(response, status) {
            cars = response.data;
            renderCars();
        },
        error: function(xhr, status, error) {
            $("#cars").html(`
                <div class="error">
                    Error buscando vehículos!
                </div>
            `);
        },
        complete: function (){
            $("#loading-cars").remove();
        }
    });
});