$(document).ready(function () {
    $.ajax({
        url: `/cars/${window.VEHICLE_ID}`,
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
        const carDpColor = COLOR_MAP[car.color];
        $("#vehicle").html(`
            <div class="carousel col-12 col-xl-6" data-index="0">
                <button class="carousel-btn prev">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                </button>

                <img class="carousel-img shadow" src="${car.photos?.length > 0 ? `/storage/${car.photos[0]}` : '/img/default_car.png'}" />

                <button class="carousel-btn next">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
            </div>
            <div class="car-info col-12 col-xl-6 position-relative">
                ${window.AUTH_USER_ID === car.owner_id ?
                    `<div class="archive-button ${car.status ? "" : "archived"}" data-id="${car.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-archive-icon lucide-archive"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
                    </div>`
                    :
                    ""
                }
                <h2 class="fw-bold fs-1">${car.brand} ${car.line}</h2>
                <h3 class="fw-bold fs-3">${car.model}</h3>
                <p>${formatPrice(car.price)}</p>
                <div class="d-flex align-items-center">
                    <div class="color-display border border-2 border-black me-2" style="background:${carDpColor.css};"></div>
                    <p style="margin:0">${carDpColor.label}</p>
                </div>
                <p class="mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car-front-icon lucide-car-front"><path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/><path d="M7 14h.01"/><path d="M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>
                    ${car.plate}
                </p>
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                    ${car.views}
                </p>
            </div>
        `);
        window.CAR_PHOTOS = car.photos;
        if (car.photos?.length <= 1) {
            $('.carousel-btn').hide();
        }
    }

    $(document).on("click",".archive-button", function() {
        const carId = $(this).data('id');
        $.ajax({
            url: `/cars/${carId}`,
            type: 'POST',
            data: {
                _method: 'DELETE',
                _token: $('meta[name="csrf-token"]').attr('content'),
            },
            success: (response) => {
                console.log(response);
                $(this).toggleClass('archived');
            },
            error: (xhr) => {
                console.error(xhr.responseText);
                alert('Could not archive car');
            }
        });
    });

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