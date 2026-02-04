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
