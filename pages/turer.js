import { Image, Text } from "@nextui-org/react";
import React from "react";
import TurerList from "../components/Turer/TurerList";

const Turer = () => {
  return (
    <div>
      <div className="bg-[#EBFBFF] relative">
        <div className="max-w-5xl mx-5 lg:mx-auto relative h-40 md:h-60 lg:h-[24rem]">
          <div className="">
            <Image src="/images/headerimg.svg" alt="" />
          </div>
          <div className="absolute top-1/3 text-center w-full">
            <Text b color="primary" className="text-[1.7rem] md:text-[2rem]">
              DYKKERTURER
            </Text>
            <Text>Lorem ipsum dolor sit amet co icing elitdolor</Text>
          </div>
        </div>
        <div className="absolute bottom-0">
          <Image src="/images/morewaveswhite.svg" alt="" />
        </div>
      </div>
      <div className="max-w-5xl mx-5 lg:mx-auto mb-14">
        <TurerList />
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

export default Turer;
