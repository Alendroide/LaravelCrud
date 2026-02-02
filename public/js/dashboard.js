let cars = [];

function renderCars() {
    if (!cars || cars.length === 0) {
        $("#cars").html("<p>No se encontraron vehículos.</p>");
        return;
    }

    $("#cars").html(cars.map(car => `
        <div class="car-card" data-id="${car.id}">
            <div class="edit-button" onclick="showUpdateModal(${car.id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
            </div>
            <img class="car-image" src="/img/logo.png" />
            <div class="car-info">
                <p>${car.brand} ${car.line} ${car.model}</p>
                <p><b>Color:</b> ${car.color}</p>
                <p><b>Placa:</b> ${car.plate}</p>
            </div>
        </div>
    `).join(""));
}

$.ajax({
    url: "/api/cars",
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
})

$("#upload-car-button").on("click", function(){
    $("#upload-car-modal").addClass("show");
})

function showUpdateModal(id) {
    $("#update-car-modal").addClass("show");
    let car = cars.find(car => car.id === id);
    $("#update-car-form input[name='id']").val(car.id);
    $("#update-car-form input[name='brand']").val(car.brand);
    $("#update-car-form input[name='line']").val(car.line);
    $("#update-car-form input[name='model']").val(car.model);
    $("#update-car-form input[name='plate']").val(car.plate);
    $("#update-car-form input[name='color']").val(car.color);
}

$("#create-car-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
        url: "/api/cars",
        type: "POST",
        dataType: "json",
        data: $(this).serialize(),
        success: function(response, status) {
            $("#upload-car-modal").removeClass("show");
            cars = [response, ...cars];
            renderCars();
        }
    })
})

$("#update-car-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
        url: "/api/cars/" + $(this).find("input[name='id']").val(),
        type: "PUT",
        dataType: "json",
        data: $(this).serialize(),
        success: function(response, status) {
            $("#upload-car-modal").removeClass("show");
            cars = [response, ...cars];
            renderCars();
        }
    })
})
