"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getImagePrefix } from "@/utils/util";

const serviceData = [
  {
    heading: "General Consultation",
    name: "Comprehensive health checks",
    rating: 4.8,
    duration: "30 mins",
    type: "In-Person",
    patients: "120+",
    imgSrc: "/images/services/chronicillness1.png",
  },
  {
    heading: "Women's Health",
    name: "Specialized care for women",
    rating: 4.9,
    duration: "45 mins",
    type: "In-Person / Online",
    patients: "90+",
    imgSrc: "/images/services/womenhealth.png",
  },
  {
    heading: "Chronic Illness",
    name: "Diabetes, Hypertension, etc.",
    rating: 4.7,
    duration: "60 mins",
    type: "In-Person",
    patients: "75+",
    imgSrc: "/images/services/generalconsultation.png",
  },
  {
    heading: "Pediatrics",
    name: "Health care for children",
    rating: 4.9,
    duration: "30 mins",
    type: "In-Person",
    patients: "50+",
    imgSrc: "/images/services/prediatrics12.png",
  },
];

const Courses = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    speed: 500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true },
      },
    ],
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <Icon key={`full-${i}`} icon="tabler:star-filled" className="text-yellow-500 text-xl inline-block" />
          ))}
        {halfStars > 0 && <Icon icon="tabler:star-half-filled" className="text-yellow-500 text-xl inline-block" />}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <Icon key={`empty-${i}`} icon="tabler:star-filled" className="text-gray-400 text-xl inline-block" />
          ))}
      </>
    );
  };

  return (
    <section id="services">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="sm:flex justify-between items-center mb-20">
          <h2 className="text-midnight_text text-4xl lg:text-5xl font-semibold mb-5 sm:mb-0">
            Our Medical Services
          </h2>
        </div>
        <Slider {...settings}>
          {serviceData.map((items, i) => (
            <div key={i}>
              <div className="bg-white m-3 mb-12 px-3 pt-3 pb-12 shadow-course-shadow rounded-2xl h-full">
                <div className="relative rounded-3xl">
                  <Image
                    src={`${getImagePrefix()}${items.imgSrc}`}
                    alt="service-image"
                    width={389}
                    height={262}
                    className="m-auto clipPath"
                  />
                </div>

                <div className="px-3 pt-6">
                  <h3 className="text-2xl font-bold text-black inline-block">{items.heading}</h3>
                  <p className="text-base font-normal pt-3 text-black/75">{items.name}</p>

                  <div className="flex justify-between items-center py-6 border-b">
                    <div className="flex items-center gap-4">
                      <h3 className="text-red-700 text-2xl font-medium">{items.rating}</h3>
                      <div className="flex">{renderStars(items.rating)}</div>
                    </div>
                    <h3 className="text-lg font-medium">{items.duration}</h3>
                  </div>

                  <div className="flex justify-between pt-6">
                    <div className="flex gap-2">
                      <Icon icon="solar:notebook-minimalistic-outline" className="text-primary text-xl inline-block me-2" />
                      <h3 className="text-base font-medium text-black opacity-75">{items.type}</h3>
                    </div>
                    <div className="flex gap-2">
                      <Icon icon="solar:users-group-rounded-linear" className="text-primary text-xl inline-block me-2" />
                      <h3 className="text-base font-medium text-black opacity-75">{items.patients}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Courses;
