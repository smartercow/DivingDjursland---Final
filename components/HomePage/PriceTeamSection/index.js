import { Text } from "@nextui-org/react";
import PriceSection from "./PriceSection";
import TeamSection from "./TeamSection";

const PriceTeamSection = () => {
  return (
    <div className="max-w-5xl mx-5 lg:mx-auto pt-6 md:pt-3">
      <div className="text-center">
        <Text
          className="text-xl sm:text-2xl md:text-3xl tracking-wider"
          color="primary"
          weight="bold"
          transform="uppercase"
        >
          Vores priser & kurser
        </Text>
        <Text color="primary">Lorem ipsum dolor sit amet consec</Text>
        <br />
      </div>
      <div className="flex flex-col gap-14 mt-5">
        <div>
          <PriceSection />
        </div>
        <div className="hidden md:inline">
          <div className="text-center">
            <Text
              className="text-xl sm:text-2xl md:text-3xl tracking-wider"
              color="primary"
              weight="bold"
              transform="uppercase"
            >
              Vores team
            </Text>
            <Text color="primary">Lorem ipsum dolor sit amet consec</Text>
            <br />
          </div>
          <div className="mt-3">
            <TeamSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceTeamSection;
