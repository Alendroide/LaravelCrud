function renderCartList() {
    const cart = getCart();

    if (!cart || !cart.items || cart.items.length === 0) {
        $("#cart").html("<p>Tu carrito está vacío.</p>");
        $("#cart-total").html("");
        return;
    }

    let total = 0;

    $("#cart").html(
        cart.items.map(item => {
            const unitTaxAmount = item.price * item.tax;
            const unitPriceWithTax = item.price + unitTaxAmount;
            const subtotal = unitPriceWithTax * item.amount;
            total += subtotal;

            return `
                <div class="cart-item" data-id="${item.id}">

                    <!-- Imagen -->
                    <div class="cart-item-image">
                        <img 
                            src="${item.photos?.length ? `/storage/${item.photos[0]}` : '/img/default_car.png'}"
                            alt="${item.brand} ${item.line}"
                        />
                    </div>

                    <!-- Info -->
                    <div class="cart-item-info">
                        <h5>${item.brand} ${item.line} ${item.model}</h5>
                        <p><b>Placa:</b> ${item.plate}</p>
                        <p><b>Color:</b> ${item.color}</p>

                        <div class="price">
                            ${formatPrice(item.price)} + ${formatPrice(unitTaxAmount)} (${item.tax * 100}%)
                        </div>

                        <div class="price">
                            ${formatPrice(unitPriceWithTax)} x ${item.amount}
                        </div>

                        <div class="subtotal">
                            <b>Subtotal:</b> ${formatPrice(subtotal)}
                        </div>
                    </div>

                    <!-- Acciones -->
                    <div class="cart-item-actions">

                        <div class="quantity-control">
                            <button onclick="decreaseFromCart(${item.id}); renderCartList()">−</button>
                            <span>${item.amount}</span>
                            <button onclick="increaseFromCart(${item.id}); renderCartList()">+</button>
                        </div>

                        <button 
                            class="remove-btn"
                            onclick="removeFromCart(${item.id}); renderCartList()"
                            title="Eliminar del carrito"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>

                    </div>

                </div>
            `;
        }).join("")
    );

    $("#cart-total").html(`
        <div>
            <h4>Total: ${formatPrice(total)}</h4>
            <p class="fs-4 mt-2">Cliente:</p>
            <div class="client-form mb-3 ms-4">
                <div class="form-group mb-2">
                    <label for="client-cc">Cédula del cliente</label>
                    <input
                        type="text"
                        id="client-cc"
                        class="form-control"
                        placeholder="Ingrese la cédula"
                    >
                </div>

                <div class="form-group">
                    <label for="client-name">Nombre del cliente</label>
                    <input
                        type="text"
                        id="client-name"
                        class="form-control"
                        placeholder="Ingrese el nombre"
                    >
                </div>
            </div>
            <button id="buy-cart-button" class="btn btn-outline-success d-flex align-items-center" onclick="checkoutCart()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign-icon lucide-dollar-sign"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Comprar
            </button>
        </div>
    `);
}

function removeFromCart(carId) {
    const cart = getCart();
    cart.items = cart.items.filter(i => i.id !== carId);
    saveCart(cart);
    updateCartTotalItems();
}

function increaseFromCart(carId) {
    const cart = getCart();
    const item = cart.items.find(i => i.id === carId);
    item.amount += 1;
    saveCart(cart);
    updateCartTotalItems();
}

function decreaseFromCart(carId) {
    const cart = getCart();
    const item = cart.items.find(i => i.id === carId);
    if (item.amount > 1) {
        item.amount -= 1;
        saveCart(cart);
    } else {
        removeFromCart(carId);
    }
    updateCartTotalItems();
}

function checkoutCart() {
    const cart = getCart();

    const client = {
        cc: $("#client-cc").val().trim(),
        name: $("#client-name").val().trim(),
    };

    if (!client.cc || !client.name) {
        showToast("Debe ingresar cédula y nombre del cliente", "error");
        return;
    }
    
    const originalBtnHtml = $("#buy-cart-button").html();
    $("#buy-cart-button").prop("disabled", true).html(`
        <div style="width: 1.5rem;">
            <svg fill="#198754" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
        </div>`
    ).addClass("disabled-button");

    $.ajax({
        url: "/purchase",
        method: "POST",
        data: {
            client: client,
            cart: cart
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success(res) {
            showToast("Compra realizada con éxito", "success");
            saveCart({ user: window.AUTH_USER_ID, items: [] });
            window.location.href = "mis-compras";
        },
        error(xhr, status, error) {
            let message = "Error al realizar la compra";
            if (xhr.status === 422 && xhr.responseJSON?.errors) {
                const errors = Object.values(xhr.responseJSON.errors).flat();
                message = errors[0];
            } else if (xhr.responseJSON?.message) {
                message = xhr.responseJSON.message;
            }
            showToast(message, "error");
        },
        complete() {
            $("#buy-cart-button").prop("disabled", false).html(originalBtnHtml).removeClass("disabled-button");
        }
    });

    updateCartTotalItems();
}

$(document).ready(function() {
    renderCartList();

    $(document).on("change", "#client-cc", function () {
        const cc = $(this).val().trim();

        if (!cc) return;

        $.ajax({
            url: `/clients/${cc}`,
            method: "GET",
            success(client) {
                if (client) {
                    $("#client-name").val(client.name).prop("readonly", true);
                } else {
                    $("#client-name").val("").prop("readonly", false);
                }
            },
            error() {
                $("#client-name").prop("readonly", false);
            }
        });
    });
});