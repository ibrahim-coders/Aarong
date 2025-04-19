import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner1 from '../../assets/banner/banner-2.jpg';
import banner2 from '../../assets/banner/banner.1.jpg';
import banner3 from '../../assets/banner/bannerr.jpg';

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const banners = [
    {
      image: banner1,
      title: 'Discover Handmade Artistry',
      text: 'Explore our exclusive handcrafted collection, made with love and precision.',
      btnText: 'Shop Art',
      btnLink: '/shop-art',
    },
    {
      image: banner2,
      title: 'Luxury Fashion Redefined',
      text: 'Step into elegance with our latest premium clothing collection.',
      btnText: 'Explore Fashion',
      btnLink: '/fashion',
    },
    {
      image: banner3,
      title: 'Eco-Friendly Home Decor',
      text: 'Transform your space with our sustainable & stylish home essentials.',
      btnText: 'View Collection',
      btnLink: '/home-decor',
    },
  ];

  return (
    <section className="bg-white cursor-move">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="relative">
            <div className="h-[450px] sm:h-[600px]">
              <img
                src={banner.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-center  "
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center ">
              <div className="text-center text-white px-6 lg:max-w-3xl">
                <h1 className="text-4xl font-bold sm:text-5xl">
                  {banner.title}
                </h1>
                <p className="mt-4 text-lg">{banner.text}</p>
                <div className="mt-6">
                  <Link
                    to={banner.btnLink}
                    className="bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-700"
                  >
                    {banner.btnText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero;
