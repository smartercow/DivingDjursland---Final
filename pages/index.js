import Head from "next/head";
import Image from "next/image";
import FirstSection from "../components/HomePage/FirstSection";
import SecondSection from "../components/HomePage/SecondSection";
import PriceTeamSection from "../components/HomePage/PriceTeamSection";
import PraktiskInfo from "../components/HomePage/PraktiskInfo";
import VideoSection from "../components/HomePage/VideoSection";
import Slider from "../components/HomePage/FirstSection/Slider";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Diving Djursland</title>
        <meta name="description" content="Lavet af Peter Gaiti" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        {/* First section */}
        <div className="bg-gradient pt-5 relative">
          <FirstSection />
          <div className="relative h-auto w-auto">
            <Image
              layout="responsive"
              height="5vh"
              objectFit="cover"
              width="100%"
              src="/images/wavessvg.svg"
              alt=""
            />
          </div>
        </div>

        {/* Second section */}
        <div className="s-section py-10 flex flex-col gap-10">
          <SecondSection />
        </div>

        {/* Pris & Team section */}
        <div className="bg-gradient">
          <div className="relative h-auto w-auto">
            <Image
              layout="responsive"
              height="5vh"
              objectFit="cover"
              width="100%"
              src="/images/wavessvg.svg"
              alt=""
              className="flip-h"
            />
          </div>
          <PriceTeamSection />
          <div className="relative h-auto w-auto mt-10 md:mt-16">
            <Image
              layout="responsive"
              height="5vh"
              objectFit="cover"
              width="100%"
              src="/images/wavessvg.svg"
              alt=""
            />
          </div>
        </div>
        {/* Praktisk Info */}
        <div>
          <div className="mb-7">
            <PraktiskInfo />
          </div>
        </div>

        {/* Video section */}
        <div className="relative mt-10 hidden md:inline">
          <VideoSection />
        </div>
      </main>
    </div>
  );
}
