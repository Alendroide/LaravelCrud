
$.ajax({
    url: "/api/cars",
    type: "GET",
    dataType: "json",
    success: function(response, status) {
        const cars = response.data;

        if (!cars || cars.length === 0) {
            $("#cars").html("<p>No se encontraron vehículos.</p>");
            return;
        }

        $("#cars").html(cars.map(car => `
            <div class="car-card" data-id="${car.id}">
                <img class="car-image" src="/img/logo.png" />
                <div class="car-info">
                    ${car.brand} ${car.line} ${car.model}
                </div>
            </div>
        `).join(""));
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
})

$("#upload-car-button").on("click", function(){
    $("#upload-car-modal").addClass("show");
})

$(".modal-close").on("click", function () {
    $("#upload-car-modal").removeClass("show");
});

$(".modal-overlay").on("click", function (e) {
    if ($(e.target).hasClass("modal-overlay")) $("#upload-car-modal").removeClass("show");
});

$("#create-car-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
        url: "/api/cars",
        type: "POST",
        dataType: "json",
        data: $(this).serialize(),
        success: function(response, status) {
            $("#upload-car-modal").removeClass("show");
            location.reload();
        }
    })
})