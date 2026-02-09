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
            }
        })
    })
    
    $("#update-car-form").on("submit", function (e) {
        e.preventDefault();
        if(!$(this).valid()) return;
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
            }
        })
    })
})