let cars = [];

function renderCars(showEditButton = false, cartAdd = false) {
    if (!cars || cars.length === 0) {
        $("#cars").html("<p>No se encontraron vehículos.</p>");
        return;
    }

    const cart = getCart();

    $("#cars").html(cars.map(car =>  {
        const itemInCart = cart.items.find(i => i.id === car.id);
        const quantity = itemInCart ? itemInCart.amount : 0;
        return `
            <div class="car-card" data-id="${car.id}">
                ${(car.owner_id === window.AUTH_USER_ID) && showEditButton ?
                    `<div class="edit-button" onclick="showUpdateModal(${car.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                    </div>` : ""
                }
                ${cartAdd ?
                    `<div class="add-to-cart-button" onclick="addToCart(${car.id}); renderCars(${showEditButton}, ${cartAdd});">
                        ${quantity > 0 ?
                            `<span class="cart-quantity">${quantity}</span>` : ""
                        }
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
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
    `}).join(""));
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

function getCart() {
    const carts = JSON.parse(localStorage.getItem("carts")) || [];
    let cart = carts.find(c => c.user === window.AUTH_USER_ID);
    if (!cart) {
        cart = { user: window.AUTH_USER_ID, items: [] };
        carts.push(cart);
        localStorage.setItem("carts", JSON.stringify(carts));
    }
    return cart;
}

function saveCart(cart) {
    const carts = JSON.parse(localStorage.getItem("carts")) || [];
    const index = carts.findIndex(c => c.user === cart.user);
    if (index > -1) {
        carts[index] = cart;
    } else {
        carts.push(cart);
    }
    localStorage.setItem("carts", JSON.stringify(carts));
}

function addToCart(productId) {
    const cart = getCart();
    const item = cart.items.find(i => i.id === productId);
    if (item) {
        item.amount += 1;
    } else {
        cart.items.push({ id: productId, amount: 1 });
    }
    saveCart(cart);
}


$(document).ready(function() {

    // Pagination logic

    $(document).on("click", "#pagination .page-link", function (e) {
        e.preventDefault();

        const url = $(this).data("url");
        if (!url) return;

        const query = url.split("?")[1];
        fetchCars(query);
    });

    // Form validations

    $("#create-car-form").validate();
    $("#update-car-form").validate();

    // Redirect to car page on click

    $(document).on('click', '.car-card', function (e) {
        if ($(e.target).closest('.edit-button').length) return;
        if ($(e.target).closest('.add-to-cart-button').length) return;
    
        const id = $(this).data('id');
        window.location.href = `/car/${id}`;
    });
    
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

});
