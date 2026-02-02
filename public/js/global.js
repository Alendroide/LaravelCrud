$(document).ready(function() {
    const mq = window.matchMedia('(max-width: 767px)');
    
    function syncSidebarState(e) {
        if (e.matches) {
            $('body').addClass('sidebar-closed');
        } else {
            $('body').removeClass('sidebar-closed');
        }
    }
    
    syncSidebarState(mq);
    mq.addEventListener('change', syncSidebarState);
    
    $("#sidebar-overlay").on("click", function() {
        $("body").toggleClass("sidebar-closed");
    })

    $("#sidebar-toggle").on("click", function(){
        $("body").toggleClass("sidebar-closed");
    })
})