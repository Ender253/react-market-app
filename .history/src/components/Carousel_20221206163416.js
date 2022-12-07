import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import classes from "./Carousel.module.css";

const ControlledCarousel = (props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  
  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className={classes.carousel}
    >
      <Carousel.Item>
        <img
          className={classes.carousel}
          src="https://laptopmedia.com/wp-content/uploads/2021/11/acernitro5an515-45featured.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Acer Nitro 5 AN515-45</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={classes.carousel}
          src="https://i.ytimg.com/vi/CTEKpILWgAs/maxresdefault.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Apple iPhone 14 Pro</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={classes.carousel}
          src="https://images.samsung.com/is/image/samsung/p5/semiconductor/minisite/ssd/products/consumer-ssd/980pro/f01-980pro-pc.jpg?$ORIGIN_JPG$"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Samsung 980 1TB</h3>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className={classes.carousel}
          src="https://arenait.ro/files/2021/09/playstation-5-disponibil-altex-comanda-stoc.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>PlayStation 5</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ControlledCarousel;
