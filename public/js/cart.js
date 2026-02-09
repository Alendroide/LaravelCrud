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
            const subtotal = item.price * item.amount;
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
                            ${formatPrice(item.price)} x ${item.amount}
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
            <button class="btn btn-outline-success d-flex align-items-center" onclick="checkoutCart()">
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

    $.ajax({
        url: "/purchase",
        method: "POST",
        data: {
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
            }
            else if (xhr.responseJSON?.message) {
                message = xhr.responseJSON.message;
            }
            showToast(message, "error");
        }
    });

    updateCartTotalItems();
}

$(document).ready(function() {
    renderCartList();
});