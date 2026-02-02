$(document).ready(function () {
    $.ajax({
        url: `/api/cars/${window.VEHICLE_ID}`,
        method: 'GET',
        success: function (response) {
            renderVehicle(response);
        },
        error: function () {
            $("#vehicle").html("<p>Vehicle not found</p>");
        },
        complete: function () {
            $("#loading-vehicle").hide();
        }
    });

    function renderVehicle(car) {
        $("#vehicle").html(`
            <div class="vehicle-card">
                <div class="carousel" data-index="0">
                    <button class="carousel-btn prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                    </button>

                    <img class="carousel-img" src="/storage/${car.photos[0]}" />

                    <button class="carousel-btn next">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </button>
                </div>
                <div class="car-info">
                    <h2 class="car-brand">${car.brand} ${car.model}</h2>
                    <p><b>Color:</b> ${car.color}</p>
                    <p><b>Plate:</b> ${car.plate}</p>
                </div>
            </div>
        `);
        window.CAR_PHOTOS = car.photos;
    }

    $(document).on('click', '.carousel-btn', function () {
        const $carousel = $(this).closest('.carousel');
        let index = Number($carousel.data('index'));
        const photos = window.CAR_PHOTOS;

        if ($(this).hasClass('next')) {
            index = (index + 1) % photos.length;
        } else {
            index = (index - 1 + photos.length) % photos.length;
        }

        $carousel.data('index', index);
        $carousel.find('.carousel-img').attr('src', `/storage/${photos[index]}`);
    });
});