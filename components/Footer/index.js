import React from "react";
import Image from "next/image";
import { Button, Input, Text } from "@nextui-org/react";

import { MdLocationPin, MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import {
  FaFacebookSquare,
  FaYoutube,
  FaInstagram
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="relative bg-[#EBFBFF] pt-5 md:pt-0">
      <div className="bg-[#EBFBFF]">
        <div className="max-w-5xl mx-5 lg:mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-3 lg:gap-10 mb-7">
            <div className="w-full flex flex-col gap-2">
              <div className="flex -pt-[-1rem]">
                <Text weight="extrabold" size={25} color="secondary">
                  DIVING
                </Text>
                <Text weight="extrabold" size={25} color="primary">
                  DJURSLAND
                </Text>
              </div>
              <Text color="primary">
                Lorem ipsum dolor sit amet co icing elitdolor sit amet consect
                dolor sit amet consectetur elit sit amet co icing elitdolor sit
                amet consect.
              </Text>
            </div>
            <div className="w-full flex flex-col gap-2">
              <Text size={18} weight="bold" color="primary">
                KONTAKT OS
              </Text>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Text size={20} color="secondary">
                    <MdLocationPin />
                  </Text>
                  <div>
                    <Text weight="semibold" color="primary">
                      Svinget 2 8570 Trustrup, Lyngby{" "}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-1">
                  <Text size={15} color="secondary">
                    <BsTelephoneFill />
                  </Text>
                  <Text weight="semibold" color="primary">
                    +45 42789605
                  </Text>
                </div>
                <div className="flex items-center gap-2 pl-1">
                  <Text size={20} color="secondary">
                    <MdEmail />
                  </Text>
                  <div>
                    <Text weight="semibold" color="primary">
                      contact@scubafun.dk
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <Text size={18} weight="bold" color="primary">
                NYHEDSBREV
              </Text>
              <div>
                <Input
                  aria-label="Nyhedsbrev"
                  status="white"
                  width="auto"
                  animated="false"
                  shadow="false"
                  placeholder="Din email her"
                  css={{ backgroundColor: "white", width: "76%" }}
                  contentRight={
                    <Button auto rounded color="secondary">
                      TILMELD
                    </Button>
                  }
                />
              </div>
              <div className="mt-2">
                <Text weight="semibold" color="primary" size={12}>
                  Tilmeld dig med din e-mailadresse for at modtage nyheder og
                  opdateringer
                </Text>
              </div>
            </div>
          </div>
          <hr />
          <div className="py-2 flex">
            <div className="w-full ">
              <Text color="primary" weight="semibold" className="text-sm md:text-base">
                © 2022 DIVINGDJURSLAND
              </Text>
            </div>
            <div className="flex gap-2 text-[1.5rem] cursor-pointer text-[#0A2540]">
              <FaFacebookSquare />
              <FaInstagram />
              <FaYoutube />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
