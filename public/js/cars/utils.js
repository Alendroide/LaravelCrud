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
