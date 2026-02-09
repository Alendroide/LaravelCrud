function showToast(message, type = "error", duration = 4000) {
    const $toast = $(`
        <div class="c-toast c-toast-${type}">
            ${message}
        </div>
    `);

    $("#toast-container").append($toast);

    requestAnimationFrame(() => {
        $toast.addClass("c-toast-show");
    });

    setTimeout(() => {
        $toast.removeClass("c-toast-show");
        setTimeout(() => $toast.remove(), 300);
    }, duration);
}

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
                    `<div class="add-to-cart-button" onclick="addToCart(${car.id}); renderCars(${showEditButton}, ${cartAdd}); updateCartTotalItems();">
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

function formatPrice(value) {
    if (!value) return "";
    return `$${new Intl.NumberFormat('es-CL').format(value)}`;
}

function renderPagination(pagination) {
    if (!pagination || pagination.length <= 1) {
        $("#pagination").html("");
        return;
    }

    let html = `
        <nav aria-label="Pagination">
            <ul class="pagination justify-content-center">
    `;

    pagination.forEach(link => {
        const disabled = link.url === null ? "disabled" : "";
        const active = link.active ? "active" : "";

        html += `
            <li class="page-item ${disabled} ${active}">
                <a class="page-link" href="#" data-url="${link.url}">
                    ${link.label}
                </a>
            </li>
        `;
    });

    html += `
            </ul>
        </nav>
    `;

    $("#pagination").html(html);
}

const COLOR_MAP = {
    rojo:              { label: "Rojo", css: "#c1121f" },
    azul:              { label: "Azul", css: "#003566" },
    negro:             { label: "Negro", css: "#000000" },
    blanco:            { label: "Blanco", css: "#ffffff" },
    gris:              { label: "Gris", css: "#6c757d" },
    plata:             { label: "Plata", css: "#bfc3c7" },
    amarillo:          { label: "Amarillo", css: "#ffcc00" },
    verde:             { label: "Verde", css: "#2d6a4f" },
    naranja:           { label: "Naranja", css: "#f77f00" },

    rojo_metalico:     { label: "Rojo metálico", css: "linear-gradient(135deg,#8d021f,#ff4d6d)" },
    azul_metalico:     { label: "Azul metálico", css: "linear-gradient(135deg,#0b3c5d,#3282b8)" },
    gris_metalico:     { label: "Gris metálico", css: "linear-gradient(135deg,#6b7280,#d1d5db)" },
    plata_metalico:    { label: "Plata metálico", css: "linear-gradient(135deg,#e5e7eb,#9ca3af)" },
    negro_metalico:    { label: "Negro metálico", css: "linear-gradient(135deg,#0f172a,#4b5563)" },
    verde_metalico:    { label: "Verde metálico", css: "linear-gradient(135deg,#14532d,#4ade80)" },

    blanco_perlado:    { label: "Blanco perlado", css: "linear-gradient(135deg,#ffffff,#e5e7eb)" },
    gris_perlado:      { label: "Gris perlado", css: "linear-gradient(135deg,#9ca3af,#f3f4f6)" },
    azul_perlado:      { label: "Azul perlado", css: "linear-gradient(135deg,#1e3a8a,#93c5fd)" },
    rojo_perlado:      { label: "Rojo perlado", css: "linear-gradient(135deg,#7f1d1d,#fb7185)" },

    rojo_ducati:       { label: "Rojo Ducati", css: "#cc0000" },
    verde_kawasaki:    { label: "Verde Kawasaki", css: "#00ff00" },
    azul_yamaha:       { label: "Azul Yamaha", css: "#0033a0" },
    naranja_ktm:       { label: "Naranja KTM", css: "#ff6600" },
    azul_bmw:          { label: "Azul BMW", css: "#1c69d4" },

    champagne:         { label: "Champagne", css: "#e6d3a3" },
    cobre:             { label: "Cobre", css: "#b87333" },
    vino:              { label: "Vino", css: "#5a0f24" },
    beige:             { label: "Beige", css: "#d6c4a8" },
    marron:            { label: "Marrón", css: "#6f4e37" },
    camuflado:         { label: "Camuflado", css: "linear-gradient(135deg,#4b5320,#78866b,#2f3e1f)" },
    personalizado:     { label: "Personalizado", css: "repeating-linear-gradient(45deg,#ccc,#ccc 5px,#999 5px,#999 10px)" }
};

function compressImage(file, maxSizeKB = 120, maxWidth = 1920) {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith("image/")) {
            return resolve(file);
        }

        const img = new Image();
        const reader = new FileReader();

        reader.onload = e => img.src = e.target.result;
        reader.onerror = reject;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            let { width, height } = img;
            if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            let quality = 0.9;

            function attempt() {
                canvas.toBlob(blob => {
                    if (!blob) return reject("Compression failed");

                    if (blob.size / 1024 <= maxSizeKB || quality <= 0.4) {
                        resolve(new File([blob], file.name, {
                            type: blob.type,
                            lastModified: Date.now()
                        }));
                    } else {
                        quality -= 0.1;
                        attempt();
                    }
                }, "image/jpeg", quality);
            }

            attempt();
        };

        reader.readAsDataURL(file);
    });
}

function updateCartTotalItems() {
    $(".total-cart-quantity").html(
        getCart().items.reduce((sum, i) => sum + i.amount, 0)
    );
}

function getPurchasedCars() {
    return $.ajax({
        url: "/my-purchases/cars",
        method: "GET"
    });
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

function addToCart(carId) {
    const car = cars.find(c => c.id === carId);
    const cart = getCart();
    const item = cart.items.find(i => i.id === car.id);
    if (item) {
        item.amount += 1;
    } else {
        cart.items.push({ ...car, amount: 1 });
    }
    saveCart(cart);
}