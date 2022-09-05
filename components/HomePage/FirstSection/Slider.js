import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Parallax, Pagination, Navigation } from "swiper";
import { Button, Loading, Text } from "@nextui-org/react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../Firebase/clientApp";

export default function Slider() {
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
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper max-w-5xl mx-auto"
      >
        <div
          slot="container-start"
          className="parallax-bg"
          style={{
            "background-image": "url(/images/divingbg2.jpg)",
          }}
          data-swiper-parallax="-23%"
        ></div>
        {loading && (
          <SwiperSlide>
            <div className="max-w-5xl mx-auto h-60 md:h-72 bg-slate-400 px-5 bg-opacity-70 rounded-xl">
              <div className="w-full h-60 md:h-72 flex justify-center items-center animate-pulse">
                <Loading />
              </div>
            </div>
          </SwiperSlide>
        )}

        {slideList.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="max-w-5xl mx-auto h-60 md:h-72 bg-slate-400 px-5 py-5 bg-opacity-70 rounded-xl">
              <div className="flex flex-col gap-1 justify-between">
                <div className="title text-sm" data-swiper-parallax="-300">
                  <Text color="primary" className="leading-8" h2>
                    {slide.title}
                  </Text>
                </div>
                <div className="subtitle text-xs" data-swiper-parallax="-200">
                  <Text color="primary" h3>
                    {slide.beskrivelse}
                  </Text>
                </div>
                <div className="flex flex-col gap-6">
                  <div
                    className="w-full md:w-[80%] hidden md:inline"
                    data-swiper-parallax="-100"
                  >
                    <Text weight="semibold" color="primary">
                      {slide.content}
                    </Text>
                  </div>
                </div>
                <div className="md:mt-5" data-swiper-parallax="-100">
                    <Button auto color="secondary">
                      LÆS MERE
                    </Button>
                  </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
