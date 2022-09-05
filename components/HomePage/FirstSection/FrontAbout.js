import Image from "next/image";
import Link from "next/link";
import { Text } from "@nextui-org/react";
const FrontAbout = () => {
  return (
    <div className="hidden md:inline">
      <div className="flex justify-between items-center gap-14">
        <div className="w-80 md:w-96 hidden sm:inline">
          <div className="h-full w-full">
            {/* <img src="/images/aboutdjurs.png" alt="" /> */}
            <Image
              layout="responsive"
              objectFit="contain"
              height="100%"
              width="100%"
              src="/images/aboutdjurs.png"
              alt=""
            />
          </div>
        </div>
        <div className=" max-w-none sm:max-w-xs md:max-w-sm lg:max-w-lg flex flex-col gap-4">
          <Text
            className="text-xl sm:text-2xl md:text-3xl tracking-wider"
            color="primary"
            weight="bold"
          >
            DIVING DJURSLAND
          </Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestia quas vel sint commodi repudiandae con uuntur
            voluptatum laborumnumquam tiis harum quisquam eius sed odit fugiat
            fuga praesentium optio, eaque rerum!
          </Text>
          <Link href="/omos">
            <Text
              color="secondary"
              className="text-sm md:text-base font-bold uppercase cursor-pointer"
            >
              Læs mere→
            </Text>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FrontAbout;
