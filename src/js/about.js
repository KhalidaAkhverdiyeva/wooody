var swiper = new Swiper(".about-Swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    slidesPerGroup: 1,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 3,
        }
    }
});


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