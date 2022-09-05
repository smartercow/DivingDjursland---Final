import { Button, Text } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const FrontShop = () => {
  return (
    <div className="flex justify-between items-center gap-5 flex-col sm:flex-row mt-8 md:mt-0">
      <div className=" max-w-none sm:max-w-xs md:max-w-sm lg:max-w-lg flex flex-col gap-5">
        <Text
          className="text-xl sm:text-2xl md:text-3xl tracking-wider"
          color="primary"
          weight="bold"
        >
          VORES UDSTYR
        </Text>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestia quas vel sint commodi repudiandae con uuntur
          voluptatum laborumnumquam tiis harum quisquam eius sed odit fugiat
          fuga praesentium optio, eaque rerum!
        </p>
        <div className="hidden sm:inline">
          <Link href="/omos">
            <Button color="secondary" auto size="lg">
              GÅ TIL SHOPPEN
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-80 md:w-96 sm:inline">
        <div className="relative ani-con ">
          <div className="front-diver h-40 w-40 sm:h-48 sm:w-48 md:h-60 md:w-60 lg:h-72 lg:w-72 opacity-75">
            <Image
              layout="responsive"
              objectFit="contain"
              height="100%"
              width="100%"
              src="/images/roundedbeach.png"
              alt=""
            />
          </div>
          <Text
            h1
            size={70}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 90%",
            }}
            className="fs-text uppercase opacity-50 font-extrabold text-6xl sm:text-5xl md:text-6xl lg:text-7xl"
          >
            ScubaFun
          </Text>
          <div className="diver">
            <Image
              layout="responsive"
              objectFit="contain"
              height="100%"
              width="100%"
              src="/images/diver.png"
              alt=""
            />
          </div>
        </div>
        <div className="sm:hidden flex justify-center">
          <Link href="/omos">
            <Button auto size="lg">
              GÅ TIL SHOPPEN
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FrontShop;
