$(document).ready(function(){

    var r = document.querySelector(':root');
    var darkmodeSwitch = document.getElementById("switch")

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

    darkmodeSwitch.addEventListener("click",
        function () {
            if (myFunction_get("--choice") == "dark") {
                myFunction_set("--choice", "light");
                myFunction_set("--accent", "#272829")
                myFunction_set("--dark", "#FFF6E0")
                myFunction_set("--mid", "#D8D9DA")
                myFunction_set("--light", "#61677A")
                document.getElementById("home").classList.remove("darkbackground")
                document.getElementById("home").classList.add("lightbackground")
            } else {
                myFunction_set("--choice", "dark")
                myFunction_set("--accent", "#EC625F")
                myFunction_set("--dark", "#313131")
                myFunction_set("--mid", "#414141")
                myFunction_set("--light", "#7B7B7B")
                document.getElementById("home").classList.add("darkbackground")
                document.getElementById("home").classList.remove("lightbackground")
            }
        });

    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
            $('.slider').addClass("sticky");
        }else{
            $('.slider').removeClass("sticky");
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

    $('.navbar .menu li a, .link').click(function(){
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
        strings: ["Student", "Developer", "Engineer", "Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
        preStringTyped: function (pos, self) {
            // pos is the position of the string in the array
            // self is the instance of Typed
            // Update your picture here based on the pos value
            updatePicture(pos);
        }
    });

    var typed = new Typed(".typing-2", {
        strings: ["Student", "Developer", "Engineer", "Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    //change picture based on typed string value
    function updatePicture(pos) {
        // Your logic to update the picture based on the pos value
        var imgElement = document.getElementById('home-image-icon');
        var timeout = 300
        imgElement.className += 'hidden';
        switch(pos) {
            case 0:
                setTimeout(function () {
                    imgElement.src = 'images/graduated.png'; // Change image source
                    imgElement.className = ''; // Remove class to fade in image
                }, timeout); // Set timeout to match transition duration
                break;
            case 1:
                setTimeout(function () {
                    imgElement.src = 'images/coding.png'; // Change image source
                    imgElement.className = ''; // Remove class to fade in image
                }, timeout); // Set timeout to match transition duration
                break;
            case 2:
                setTimeout(function () {
                    imgElement.src = 'images/worker.png'; // Change image source
                    imgElement.className = ''; // Remove class to fade in image
                }, timeout); // Set timeout to match transition duration
                break;
            case 3:
                setTimeout(function () {
                    imgElement.src = 'images/idea.png'; // Change image source
                    imgElement.className = ''; // Remove class to fade in image
                }, timeout); // Set timeout to match transition duration
                break;
            default:
                imgElement.src = "";
        }
        
        
    }

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