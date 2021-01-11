import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";

import { Card, Icon, Image, Dimmer, Loader, Segment } from "semantic-ui-react";
import { getImagenes } from "../../api/carrousel";
export default function FullCarrousel() {
  const [imagenes, setImagenes] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await getImagenes();
      if (response != null) {
        setImagenes(response || []);
      }
    })();
  }, []);
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className="full-carrousel"
      containerClass=""
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 1,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 1,
        },
      }}
      showDots
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      <div>
        <Image
          src={imagenes.url_imagen1}
          style={{
            display: "block",
            height: "100%",
            margin: "auto",
            width: "100%",
          }}
        />
      </div>
      <div>
        <Image
          src={imagenes.url_imagen2}
          style={{
            display: "block",
            height: "100%",
            margin: "auto",
            width: "100%",
          }}
        />
      </div>
      <div>
        <Image
          src={imagenes.url_imagen3}
          style={{
            display: "block",
            height: "100%",
            margin: "auto",
            width: "100%",
          }}
        />
      </div>
      <div>
        <Image
          src={imagenes.url_imagen4}
          style={{
            display: "block",
            height: "100%",
            margin: "auto",
            width: "100%",
          }}
        />
      </div>
    </Carousel>
  );
}
