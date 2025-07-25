// src/components/SimpleCarousel.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const SimpleCarousel = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        overflow: "hidden",
        background: "linear-gradient(to right, #ec4899, #8b5cf6)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: `${images.length * 100}%`,
          transform: `translateX(-${current * (100 / images.length)}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            style={{
              width: `${100 / images.length}%`,
              height: "100%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Prev button */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          left: "5px",
          top: "50%",
          transform: "translateY(-50%)",
          border: "none",
          borderRadius: "50%",
          background: "linear-gradient(to left, #ec4899, #8b5cf6)",
          width: "30px",
          height: "30px",
          color: "#fff",
          fontSize: "1.2rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} size="sm" />
      </button>

      {/* Next button */}
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          right: "5px",
          top: "50%",
          transform: "translateY(-50%)",
          border: "none",
          borderRadius: "50%",
          background: "linear-gradient(to right, #ec4899, #8b5cf6)",
          width: "30px",
          height: "30px",
          color: "#fff",
          fontSize: "1.2rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesomeIcon icon={faChevronRight} size="sm" />
      </button>
    </div>
  );
};

export default SimpleCarousel;
