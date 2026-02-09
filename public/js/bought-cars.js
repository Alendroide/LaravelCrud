function renderPurchasedCars() {
    getPurchasedCars()
        .done(cars => {
            $("#loading-cars").remove();

            if (!cars || cars.length === 0) {
                $("#purchased-cars").html("<p>No has comprado vehículos aún.</p>");
                return;
            }

            $("#purchased-cars").html(
                cars.map(item => `
                    <div class="cart-item">

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

                            <div class="price">
                                ${formatPrice(item.price)} x ${item.quantity}
                            </div>

                            <div class="subtotal">
                                <b>Subtotal:</b> ${formatPrice(item.subtotal)}
                            </div>

                            <small class="text-muted">
                                Compra #${item.purchase_id} · 
                                ${new Date(item.purchased_at).toLocaleDateString()}
                            </small>
                        </div>

                    </div>
                `).join("")
            );
        })
        .fail(() => {
            showToast("Error al cargar tus compras", "error");
        });
}

$(document).ready(() => {
    renderPurchasedCars();
});