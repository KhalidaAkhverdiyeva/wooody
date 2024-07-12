var swiper = new Swiper(".about-Swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});