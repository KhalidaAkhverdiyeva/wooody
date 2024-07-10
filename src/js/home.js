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

        on: {
            slideChangeTransitionStart: function () {
                // Reset all slide texts to their initial hidden state
                var slideTexts = document.querySelectorAll('.swiper-slide .slide-text');
                slideTexts.forEach(function (text) {
                    text.style.bottom = '-50px';
                });
            },
            slideChangeTransitionEnd: function () {
                // Slide up the active slide's text
                var activeSlideText = this.slides[this.activeIndex].querySelector('.slide-text');
                activeSlideText.style.bottom = '20px';
            }
        }

    });
});

var swiperImages = document.querySelectorAll('.mySwiper .swiper-slide img');
swiperImages.forEach(function (img, index) {
    img.addEventListener('click', function () {

        swiper.slideTo(index + 1);
    });
});
