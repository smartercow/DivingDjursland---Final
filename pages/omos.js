import { Card, Image, Row, Text } from "@nextui-org/react";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../components/Firebase/clientApp";

const OmOs = () => {
  const [teamList, setTeamList] = useState([]);

  const teamColRef = collection(firestore, "Team");

  useEffect(() => {
    const getTeam = async () => {
      const teamData = await getDocs(teamColRef);
      setTeamList(teamData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTeam();
  }, []);
  return (
    <div>
      <div className="bg-[#EBFBFF] relative">
        <div className="max-w-5xl mx-5 lg:mx-auto relative h-40 md:h-60 lg:h-[24rem]">
          <div className="">
            <Image src="/images/headerimg.svg" alt="" />
          </div>
          <div className="absolute top-1/3 text-center w-full">
            <Text b color="primary" className="text-[1.7rem] md:text-[2rem]">
              OM DIVING DJURSLAND
            </Text>
            <Text>Lorem ipsum dolor sit amet co icing elitdolor</Text>
          </div>
        </div>
        <div className="absolute bottom-0">
          <Image src="/images/morewaveswhite.svg" alt="" />
        </div>
      </div>

      <div className="max-w-5xl mx-5 lg:mx-auto relative flex flex-col gap-14">
        <div className="flex justify-center">
          <div className="w-[80%]">
            <Text b color="primary">
              DIVING DJURSLAND: Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi
              repudiandae consequuntur voluptatum laborum numquam blanditiis
              harum quisquam eius sed odit fugiat iusto fuga praesentium optio,
              eaque rerum!
            </Text>
          </div>
        </div>
        <div className="relative">
          <div className="text-center">
            <Text h3 color="primary">
              VORES TEAM
            </Text>
            <Text color="primary">
              Lorem ipsum dolor sit amet consectet adipisicing elit
            </Text>
          </div>

          <div className="flex gap-4 flex-col md:flex-row flex-wrap justify-between my-10">
            {teamList.map((item, index) => (
              <div key={index}>
                <div className="h-80 w-full md:w-72">
                  <Image
                    layout="responsive"
                    height="100%"
                    width="100%"
                    objectFit="cover"
                    src={item.image}
                    alt={item.navn}
                  />
                </div>
                <div className="p-4">
                  <h5 color="primary">{item.navn}</h5>
                  <p color="primary">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
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

export default OmOs;
