let cars = [];

function renderCars() {
    if (!cars || cars.length === 0) {
        $("#cars").html("<p>No se encontraron vehículos.</p>");
        return;
    }

    $("#cars").html(cars.map(car => `
        <div class="car-card" data-id="${car.id}">
            ${car.owner_id === window.AUTH_USER_ID ?
                `<div class="edit-button" onclick="showUpdateModal(${car.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                </div>` : ""
            }
            <img class="car-image" src="${car.photos?.length > 0 ? `/storage/${car.photos[0]}` : '/img/default_car.png'}" />
            <div class="car-info">
                <p>${car.brand} ${car.line} ${car.model}</p>
                <p><b>Color:</b> ${car.color}</p>
                <p><b>Placa:</b> ${car.plate}</p>
                <div class="fw-bold fs-5">${formatPrice(car.price)}</div>
            </div>
        </div>
    `).join(""));
}

function showUpdateModal(id) {
    $("#update-car-modal").addClass("show");
    let car = cars.find(car => car.id === id);
    $("#update-car-form input[name='id']").val(car.id);
    $("#update-car-form input[name='brand']").val(car.brand);
    $("#update-car-form input[name='line']").val(car.line);
    $("#update-car-form input[name='model']").val(car.model);
    $("#update-car-form input[name='plate']").val(car.plate);
    $("#update-car-form input[name='color']").val(car.color);
    $("#update-car-form input[name='price']").val(car.price);
    $("#update-car-form .visual-price").val(formatPrice(car.price))
    loadUpdateCarPhotos(car.photos);
}

$(document).ready(function() {

    // Extra validations

    const carValidationConfig = {
        rules: {
            "photos[]": {
                filesize: 2 * 1024 * 1024
            }
        },
        messages: {
            "photos[]": {
                filesize: "Cada imagen debe pesar máximo 2MB"
            }
        }
    };

    $("#create-car-form").validate(carValidationConfig);

    $("#update-car-form").validate(carValidationConfig);

    // Redirect to car page on click

    $(document).on('click', '.car-card', function (e) {
        if ($(e.target).closest('.edit-button').length) return;
    
        const id = $(this).data('id');
        window.location.href = `/car/${id}`;
    });
    
    $("#upload-car-button").on("click", function(){
        $("#upload-car-modal").addClass("show");
    })

    // Parse logic

    $('.visual-price').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        $(this).siblings('.real-price').val(value);

        if (value === "") {
            $(this).val("");
            return;
        }
        let formattedValue = formatPrice(value);
        $(this).val(formattedValue);
    });

    // Submit logic
    
    $("#create-car-form").on("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        $.ajax({
            url: "/cars",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response, status) {
                $("#upload-car-modal").removeClass("show");
                cars = [response, ...cars];
                renderCars();
                this.reset();
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        })
    })
    
    $("#update-car-form").on("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const id = $(this).find("input[name='id']").val();
        $.ajax({
            url: "/cars/" + id,
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response, status) {
                $("#update-car-modal").removeClass("show");
                cars = cars.map(car => car.id === response.id ? response : car);
                renderCars();
            }
        })
    })

});
