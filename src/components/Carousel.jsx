// CustomCarousel.jsx or Carousel.jsx
import React from 'react';
import { Carousel } from 'react-bootstrap';

const CustomCarousel = () => {
  return (
    <Carousel interval={3000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/home.jpg"
          alt="Slide 1"
          height="500px"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/home1.jpg"
          alt="Slide 2"
          height="500px"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default CustomCarousel;
