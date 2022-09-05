import { Card, Text } from "@nextui-org/react";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../../Firebase/clientApp";
import Image from "next/image"

const TeamSection = () => {
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
    <div className="flex flex-col md:flex-row gap-3 md:gap-6 lg:gap-10">
      {teamList &&
        teamList.map((item, index) => (
          <Card key={index}>
            <Card.Body css={{ height: "40vh" }}>
            <Image
                layout="fill"
                objectFit="cover"
                src={item.image}
                alt={item.navn}
              />  
            </Card.Body>
            <Card.Body>
            <Text color="primary"><Text transform="uppercase" b color="primary">{item.navn}</Text> <br /> {item.role}</Text>
                
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default TeamSection;
