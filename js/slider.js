$('.responsive').slick({
    centerMode: true,
    centerPadding: '60px',
    arrows: false,
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: false,
    focusOnSelect: true,
    responsive: [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            autoplay: false,
            }
        },
        {
        breakpoint: 768,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay: false,
            }
        },
        {
        breakpoint: 600,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            autoplay: false,
            }
        },
        {
        breakpoint: 480,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay: false,
            }
        }
    ]
});