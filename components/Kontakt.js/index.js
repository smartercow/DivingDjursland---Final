import React from "react";
import { Text, Input, Textarea, Button } from "@nextui-org/react";
import { MdLocationPin, MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";

const Kontakt = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5 md:gap-8">
      <div className="w-full flex flex-col gap-5 md:gap-8">
        <div className="w-full p-5 rounded-xl bg-[#EBFBFF]">
          <Text h5 color="primary">
            ÅBNINGSTIDER
          </Text>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <Text color="primary" className="font-semibold">
                Mandag - Torsdag:
              </Text>
              <Text color="primary" className="font-semibold">
                10:00 til 18:00
              </Text>
            </div>
            <div className="flex justify-between">
              <Text color="primary" className="font-semibold">
                Fredag:
              </Text>
              <Text color="primary" className="font-semibold">
                10:00 til 15:00
              </Text>
            </div>
            <div className="flex justify-between">
              <Text color="primary" className="font-semibold">
                Lørdag:
              </Text>
              <Text color="primary" className="font-semibold">
                Lukket
              </Text>
            </div>
            <div className="flex justify-between">
              <Text color="primary" className="font-semibold">
                Søndag:
              </Text>
              <Text color="primary" className="font-semibold">
                Lukket
              </Text>
            </div>
          </div>
        </div>
        <div className="w-full p-5 rounded-xl bg-[#EBFBFF]">
          <Text h5 color="primary">
            KONTAKT OPLYSNINGER
          </Text>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Text size={20} color="secondary">
                <MdLocationPin />
              </Text>
              <Text color="primary" className="font-semibold">
                Svinget 2 8570 Trustrup, Lyngby
              </Text>
            </div>
            <div className="flex gap-2 pl-1">
              <Text size={15} color="secondary">
                <BsTelephoneFill />
              </Text>
              <Text color="primary" className="font-semibold">
                +45 42789605
              </Text>
            </div>
            <div className="flex gap-2 pl-1">
              <Text size={20} color="secondary">
                <MdEmail />
              </Text>
              <Text color="primary" className="font-semibold">
                contact@scubafun.dk
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-5 rounded-xl bg-[#EBFBFF]">
        <Text h5 color="primary">
          BESKED
        </Text>
        <div className="flex flex-col gap-3">
          <div className="w-full flex flex-col gap-1">
            <div className="pl-1">
              <Text>Dit navn</Text>
            </div>
            <Input placeholder="Fulde navn" />
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="pl-1">
              <Text>Din email</Text>
            </div>
            <Input placeholder="Email" />
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="pl-1">
              <Text>Din besked</Text>
            </div>
            <Textarea placeholder="Din besked her..." />
          </div>
          <div className="mt-2">
            <Button rounded >SEND</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kontakt;
