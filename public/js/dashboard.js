
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