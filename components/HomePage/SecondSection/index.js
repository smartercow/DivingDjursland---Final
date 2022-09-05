import ToursCard from "./ToursCard";
import { Button, Text } from "@nextui-org/react";
import FrontVideo from "./FrontVideo";

const SecondSection = () => {
  return (
    <div className="max-w-5xl mx-5 lg:mx-auto">
      <div className="text-center">
        <Text
          className="text-xl sm:text-2xl md:text-3xl tracking-wider"
          color="primary"
          weight="bold"
        >
          KOMMENDE DYKKERTURE
        </Text>
        <Text color="primary">Lorem ipsum dolor sit amet consec</Text>
        <br />
      </div>

      <div className="flex flex-col gap-14">
        <div>
          {/* Næste dykker turer */}
          <ToursCard />
        </div>
        <div className="mb-10">
          {/* Youtube embed video */}
          <FrontVideo />
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
