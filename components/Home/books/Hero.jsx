"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import api from "@/axios/axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  const [hero, setHero] = useState([]);

  useEffect(() => {
    const loadHero = async () => {
      try {
        const res = await api.get("/user/getAllHeroes");
        setHero(res.data);
        console.log("header hero", res.data);
      } catch (err) {
        console.error("Error loading hero:", err);
      }
    };
    loadHero();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    fade: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full h-[90vh] overflow-hidden relative">
      {hero && hero.length > 0 ? (
        <Slider {...settings}>
          {hero.map((item) => {
            const book = item.book;
            const cover = book.coverUrl
              ? book.coverUrl
              : "https://via.placeholder.com/800x400?text=No+Cover";

            return (
              <div
                key={book.id}
                className="relative w-full h-[90vh] m-auto"
              >
               <div className="w-screen h-screen relative overflow-hidden">
                    {/* BLURRED BACKGROUND ONLY */}
                    <div
                      className="absolute inset-0 scale-110 blur-xl z-0"
                      style={{
                        backgroundImage: `url(${cover})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>

                    {/* CONTENT (SHARP) */}
                    <div className="relative z-10 w-screen h-screen flex mx-40 gap-5">

                      {/* Left Image Section */}
                      <div className="w-1/3 flex items-center justify-center">
                        <img
                          src={cover}
                          alt={book.title}
                          className="bg-black w-72 md:h-[90vh] md:w-auto rounded-xl shadow-2xl object-cover"
                        />
                      </div>

                      {/* Right Text Section */}
                      <div className="w-1/2 h-full flex items-center">
                        <div className="h-96">
                          <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                            {book.title}
                          </h2>

                          <p className="text-lg md:text-xl text-gray-200 font-medium mt-3">
                            {book.author}
                          </p>

                          {book.description && (
                            <p className="text-gray-300 mt-4 leading-relaxed text-sm md:text-base">
                              {book.description}
                            </p>
                          )}

                          <a
                            href={book.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-block px-8 py-3 bg-yellow-600 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300 w-40"
                          >
                            Read Book
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>

              </div>
            );
          })}
        </Slider>
      ) : (
        <div className="text-center py-20 text-gray-300">Loading heroes...</div>
      )}
    </div>
  );
}

/* ----------------- Custom Arrow Buttons ------------------ */

function NextArrow({ onClick }) {
  return (
    <div
      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer bg-white/20 hover:bg-white/40 p-3 rounded-full backdrop-blur-md transition"
      onClick={onClick}
    >
      <ChevronRight className="text-white" size={26} />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div
      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer bg-white/20 hover:bg-white/40 p-3 rounded-full backdrop-blur-md transition"
      onClick={onClick}
    >
      <ChevronLeft className="text-white" size={26} />
    </div>
  );
}
