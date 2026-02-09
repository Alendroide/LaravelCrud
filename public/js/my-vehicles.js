function fetchCars(filters = {}) {
    
    currentFilters = filters;

    $("#loading-cars").show();

    $.ajax({
        url: "/get-user-vehicles",
        type: "GET",
        data: filters,
        dataType: "json",
        success: function (response) {
            cars = response.data;
            renderCars(true);
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

function showUpdateModal(id) {
    $("#update-car-modal").addClass("show");
    let car = cars.find(car => car.id === id);
    $("#update-car-form input[name='id']").val(car.id);
    $("#update-car-form input[name='brand']").val(car.brand);
    $("#update-car-form input[name='line']").val(car.line);
    $("#update-car-form input[name='model']").val(car.model);
    $("#update-car-form input[name='plate']").val(car.plate);
    $("#update-car-form select[name='color']").val(car.color);
    $("#update-car-form input[name='price']").val(car.price);
    $("#update-car-form .visual-price").val(formatPrice(car.price))
    loadUpdateCarPhotos(car.photos);
}

$(document).ready( function () {

    // Form validations
    
    $("#create-car-form").validate();
    $("#update-car-form").validate();
    
    // Open Create Modal
    
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
        if(!$(this).valid()) return;
        const form = this;
        const formData = new FormData(this);
        $("#save-car-button").prop("disabled", true).html(`
            <div style="width: 2rem; height: 2rem;">
                <svg fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
            </div>`
        ).addClass("disabled-button");
        $.ajax({
            url: "/cars",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response, status) {
                $("#upload-car-modal").removeClass("show");
                cars = [response, ...cars];
                renderCars(true);
                showToast("Vehículo creado exitosamente", "success");
                // Reset
                form.reset();
                photosFiles = [];
                $("#photo-previews").html("");
            },
            error: function(xhr, status, error) {
                if (xhr.status === 422 && xhr.responseJSON?.errors) {
                    Object.values(xhr.responseJSON.errors).forEach(messages => {
                        messages.forEach(msg => showToast(msg, "error"));
                    });
                } else if (xhr.responseJSON?.message) {
                    showToast(xhr.responseJSON.message, "error");
                } else {
                    showToast("Error inesperado, intenta de nuevo", "error");
                }
            },
            complete: function() {
                $("#save-car-button").prop("disabled", false).html("Guardar vehiculo").removeClass("disabled-button");
            }
        })
    })
    
    $("#update-car-form").on("submit", function (e) {
        e.preventDefault();
        if(!$(this).valid()) return;
        const formData = new FormData(this);
        const id = $(this).find("input[name='id']").val();
        $("#update-car-button").prop("disabled", true).html(`
            <div style="width: 2rem; height: 2rem;">
                <svg fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
            </div>`
        ).addClass("disabled-button");
        $.ajax({
            url: "/cars/" + id,
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response, status) {
                $("#update-car-modal").removeClass("show");
                cars = cars.map(car => car.id === response.id ? response : car);
                renderCars(true);
                showToast("Vehículo actualizado exitosamente", "success");
            },
            error: function(xhr, status, error) {
                if (xhr.status === 422 && xhr.responseJSON?.errors) {
                    Object.values(xhr.responseJSON.errors).forEach(messages => {
                        messages.forEach(msg => showToast(msg, "error"));
                    });
                } else if (xhr.responseJSON?.message) {
                    showToast(xhr.responseJSON.message, "error");
                } else {
                    showToast("Error inesperado, intenta de nuevo", "error");
                }
            },
            complete: function() {
                $("#update-car-button").prop("disabled", false).html("Guardar vehiculo").removeClass("disabled-button");
            }
        })
    })
})