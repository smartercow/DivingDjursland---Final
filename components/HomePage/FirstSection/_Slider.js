import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";

import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../Firebase/clientApp";
import { useEffect, useState } from "react";
import { Loading } from "@nextui-org/react";
import Link from "next/link";

const Slider = () => {
  const [slideList, setSlideList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const slideCollectionRef = collection(firestore, "Slides");

  const getSlides = async () => {
    const slideData = await getDocs(slideCollectionRef);
    setSlideList(slideData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    setLoading(true);
    getSlides()
      .then(() => {
        setError(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper h-60 sm:h-72 md:h-80"
      >
        {loading && (
          <SwiperSlide>
            <div className="bg-[#CFF0F8] w-full h-full flex justify-center items-center animate-pulse">
              <Loading />
            </div>
          </SwiperSlide>
        )}
        {slideList.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link href={slide.link} passHref={true}>
              <a>
                <Image
                  src={slide.image}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                  priority
                />
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
