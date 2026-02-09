let currentFilters = {};

function fetchCars(filters = {}) {
    
    currentFilters = filters;

    $("#loading-cars").show();

    $.ajax({
        url: "/cars",
        type: "GET",
        data: filters,
        dataType: "json",
        success: function (response) {
            cars = response.data;
            renderCars(false, true);
            renderPagination(response.links);
        },
        error: function () {
            $("#cars").html(`
                <div class="error">
                    Error buscando vehículos!
                </div>
            `);
        },
        complete: function () {
            $("#loading-cars").hide();
        }
    });
}

$(document).ready(function() {
    fetchCars();

    $("#car-filters").on("submit", function (e) {
        e.preventDefault();

        const filters = $(this).serialize();
        fetchCars(filters);
    });

    $("#clear-filters").on("click", function () {
        $("#car-filters")[0].reset();
        fetchCars();
    });

    $("#download-excel").on("click", function () {
        const $btn = $(this);
        const originalHtml = $btn.html();
        const downloadToken = "token_" + Date.now();
        $btn.prop("disabled", true).html(`
            <div style="width: 1.5rem;">
                <svg fill="#198754" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
            </div>`
        ).addClass("disabled-button");

        let url = "/cars/export";
        const separator = url.indexOf('?') > -1 ? '&' : '?';
        url += separator + (currentFilters || "") + "&downloadToken=" + downloadToken;

        window.location.href = url;

        const downloadTimer = setInterval(function() {
            const cookieValue = document.cookie.split('; ').find(row => row.startsWith('downloadToken='));
            
            if (cookieValue && cookieValue.includes(downloadToken)) {
                clearInterval(downloadTimer);
                document.cookie = "downloadToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
                $btn.prop('disabled', false).html(originalHtml).removeClass("disabled-button");
            }
        }, 500);
    });
});