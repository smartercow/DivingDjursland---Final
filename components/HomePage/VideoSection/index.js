import { Button, Text } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MyButton = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <Button size="lg" rounded className="bg-[#5379FE]">
        <Text color="white" className="text-md font-bold">
          FIND EN TUR
        </Text>
      </Button>
    </a>
  );
});

const VideoSection = () => {
  return (
    <div className="relative">
      <div className="absolute top-[25%] md:top-1/3 w-full flex justify-center">
        <div className="flex flex-col gap-2 md:gap-5 text-center">
          <Text
            b
            transform="uppercase"
            color="white"
            className="text-2xl md:text-4xl"
          >
            Tilmelding
          </Text>
          <Text color="white" className="font-semibold">
            Lorem ipsum dolor sit amet consectet adipisicing elit <br /> sit
            amet consectet adipisicing elit
          </Text>
          <div className="flex justify-center md:mt-5">
            <Link href="/turer" passHref>
              <MyButton />
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 w-full">
        <Image
          layout="responsive"
          height="6%"
          objectFit="cover"
          width="100%"
          src="/images/facedownwaves.svg"
          alt=""
          priority
        />
      </div>
      <div>
        {/* md:h-[40rem] lg:h-[50rem] xl:h-[55rem] */}
        <video
          autoPlay
          muted
          loop
          className="w-full h-[40vh]  md:h-[65vh] lg:h-[75vh] object-cover"
        >
          <source
            src="https://marinio.b-cdn.net/wp-content/uploads/2021/10/pexels-adrien-jacta-6430497.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="absolute bottom-0 w-full">
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

export default VideoSection;
