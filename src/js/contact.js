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