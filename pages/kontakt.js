import React from "react";
import { Image, Text } from "@nextui-org/react";
import Kontakt from "../components/Kontakt.js";

const KontaktPage = () => {
  return (
    <div>
      <div className="bg-[#EBFBFF] relative">
        <div className="max-w-5xl mx-5 lg:mx-auto relative h-40 md:h-60 lg:h-[24rem]">
          <div className="">
            <Image src="/images/headerimg.svg" alt="" />
          </div>
          <div className="absolute top-1/3 text-center w-full">
            <Text b color="primary" className="text-[1.7rem] md:text-[2rem]">
              KONTAKT
            </Text>
            <Text>Lorem ipsum dolor sit amet co icing elitdolor</Text>
          </div>
        </div>
        <div className="absolute bottom-0">
          <Image src="/images/morewaveswhite.svg" alt="" />
        </div>
      </div>
      <div className="max-w-5xl mx-5 lg:mx-auto mb-14 flex flex-col gap-10">
        <Kontakt />
        <div className="">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2209.770595892046!2d10.745221216064632!3d56.36829025182025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c2b6081629a95%3A0x4c9082853094ac9c!2sSvinget%202%2C%208570%20Trustrup!5e0!3m2!1sen!2sdk!4v1661967619440!5m2!1sen!2sdk"
            width="100%"
            height="450"
            style={{ border: 0}}
            allowFullScreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="w-full">
        <Image
          layout="responsive"
          height="7%"
          objectFit="cover"
          width="100%"
          src="/images/morewaves.svg"
          color="red"
          alt=""
        />
      </div>
    </div>
  );
};

export default KontaktPage;
