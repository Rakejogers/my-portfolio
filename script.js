$(document).ready(function(){

    var r = document.querySelector(':root');

    function myFunction_get(variable) {
        // Get the styles (properties and values) for the root
        var rs = getComputedStyle(r);
        // Alert the value of the --blue variable
        return rs.getPropertyValue(variable);
    }

    function myFunction_set(variable, set) {
        // Set the value of variable --blue to another value (in this case "lightblue")
        r.style.setProperty(variable, set);
    }

    $(".switch").on("mouseup", function () {
        if (myFunction_get("--choice")=="dark") {
            myFunction_set("--choice", "light");
            myFunction_set("--accent", "#FEA1A1")
            myFunction_set("--dark", "#ECCDB4")
            myFunction_set("--mid", "#F0EDD4")
            myFunction_set("--light", "#F9FBE7")
        } else {
            myFunction_set("--choice", "dark")
            myFunction_set("--accent", "#EC625F")
            myFunction_set("--dark", "#313131")
            myFunction_set("--mid", "#414141")
            myFunction_set("--light", "#7B7B7B")
        }
    });

    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Student", "Developer", "Designer", "Engineer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Student", "Developer", "Designer", "Engineer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});