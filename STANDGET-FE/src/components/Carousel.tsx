// ProductCarousel.tsx

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideA from "../assets/banner_image.png"
import SlideB from "../assets/banner_image2.png";


export default function ProductCarousel() {
  const products = [
    {
      id: 1,
      title: "Galaxy S25 Ultra",
      subTitle: "Total bonus up to 4.5 Million + IDR 500k",
      image: SlideA,
    },
    {
      id: 2,
      title: "Galaxy Z Flip 6 ",
      subTitle: "Total bonus up to 4 Million + IDR 400k",
      image: SlideB,
    },
    {
      id: 3,
      title: "Galaxy S25 Ultra",
      subTitle: "Total bonus up to 4.5 Million + IDR 500k",
      image: SlideA,
    },
    {
      id: 4,
      title: "Galaxy Z Flip 6 ",
      subTitle: "Total bonus up to 4 Million + IDR 400k",
      image: SlideB,
    },
  ];
 
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

  return (
    <section className="w-full min-h-[350px] bg-[#ffce95] flex items-center justify-center rounded-b-3xl">
      <div className="lg:container">
        <div className="slider_container w-full h-full">
          <Slider {...settings}>
            {products?.map((product) => (
              <div key={product?.id} className="banner_slide_item">
                <div className="pt-5">
                  <h3 className="text-3xl text-[#272343] font-inter uppercase leading-16 max-w-[631px] w-full font-bold mb-5">
                    {product?.title}
                  </h3>
                  <p className="text-lg font-inter text-[#272343] font-normal">
                    {product?.subTitle}
                  </p>

                </div>

                <div className="banner_image  w-[500px] h-[400px] flex items-center justify-end">
                  <img
                    className=" w-[450px] h-[400px]"
                    src={product?.image}
                    alt={product?.title}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
