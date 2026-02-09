function getPurchasedCars() {
    return $.ajax({
        url: "/my-purchases/cars",
        method: "GET"
    });
}

function renderPurchasedCars() {
    getPurchasedCars()
        .done(cars => {
            $("#loading-cars").remove();

            if (!cars || cars.length === 0) {
                $("#purchased-cars").html("<p>No has comprado vehículos aún.</p>");
                return;
            }

            $("#purchased-cars").html(
                cars.map(item => {
                    const unitPriceWithTax = item.car.price + (item.car.price * item.car.tax);

                    return `
                        <div class="purchase-card">

                            <div class="purchase-image">
                                <img 
                                    src="${item.car.photos?.length ? `/storage/${item.car.photos[0]}` : '/img/default_car.png'}"
                                    alt="${item.car.brand} ${item.car.line}"
                                />
                            </div>

                            <div class="purchase-content">

                                <div class="purchase-header">
                                    <h5>${item.car.brand} ${item.car.line} ${item.car.model}</h5>
                                    <span class="purchase-date">
                                        ${new Date(item.purchased_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <div class="purchase-prices">
                                    <div>
                                        <small>Precio base:</small>
                                        <span>${formatPrice(item.car.price)}</span>
                                    </div>

                                    <div>
                                        <small>Impuesto (${item.car.tax * 100}%):</small>
                                        <span>${formatPrice(item.car.price * item.car.tax)}</span>
                                    </div>

                                    <div>
                                        <small>Unitario:</small>
                                        <span>${formatPrice(unitPriceWithTax)} × ${item.quantity}</span>
                                    </div>

                                    <strong>Total: ${formatPrice(item.subtotal)}</strong>
                                </div>

                                <div class="purchase-client">
                                    <span>Cliente</span>
                                    <p>${item.client.name}</p>
                                    <small>${item.client.cc}</small>
                                </div>

                                <div class="purchase-footer">
                                    Compra #${item.purchase_id}
                                </div>

                            </div>

                        </div>
                    `;
                }).join("")
            );
        })
        .fail(() => {
            showToast("Error al cargar tus compras", "error");
        });
}

$(document).ready(() => {
    renderPurchasedCars();
});