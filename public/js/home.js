document.addEventListener('DOMContentLoaded', function () {
    new Swiper(".mySwiper", {
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 5500,
            disableOnInteraction: true,
        },
        speed: 800,

    });
});

var swiperImages = document.querySelectorAll('.mySwiper .swiper-slide img');
swiperImages.forEach(function (img, index) {
    img.addEventListener('click', function () {

        swiper.slideTo(index + 1);
    });
});

window.addEventListener('scroll', function () {
    let scrollToTop = document.getElementById('scrollToTop');
    let header = document.querySelector('header');
    if (window.scrollY > 50) {
        scrollToTop.classList.add('show-scroll-to-top');
    } else {
        scrollToTop.classList.remove('show-scroll-to-top');
    }
});

document.getElementById('scrollToTop').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// HEADER NAV
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname;
    const homeLinks = document.querySelectorAll('.page-link');

    homeLinks.forEach(function (link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});


