function formatPrice(value) {
    if (!value) return "";
    return `$${new Intl.NumberFormat('es-CL').format(value)}`;
}