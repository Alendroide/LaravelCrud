$(document).ready(function() {
    
    $("#sidebar-overlay").on("click", function() {
        $("body").toggleClass("sidebar-state");
    })

    $("#sidebar-toggle").on("click", function(){
        $("body").toggleClass("sidebar-state");
    })
})

// Custom rule to check for max size in file inputs

$.validator.addMethod(
    "filesize",
    function (value, element, maxSize) {
        if (this.optional(element)) return true;

        if (!element.files || !element.files.length) return true;

        for (let i = 0; i < element.files.length; i++) {
            if (element.files[i].size > maxSize) {
                return false;
            }
        }

        return true;
    },
    "Uno o más archivos superan el tamaño permitido"
);
