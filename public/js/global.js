$(document).ready(function() {
    
    $("#sidebar-overlay").on("click", function() {
        $("body").toggleClass("sidebar-state");
    })

    $("#sidebar-toggle").on("click", function(){
        $("body").toggleClass("sidebar-state");
    })
})
