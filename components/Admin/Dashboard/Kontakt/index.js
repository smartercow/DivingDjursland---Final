import { Button, Card, Input, Text } from "@nextui-org/react";
import React from "react";

const Kontakt = () => {
  return (
    <div>
      <Card variant="bordered">
        <Card.Body>
          <div className="flex flex-col gap-8 md:flex-row ">
            <div className="flex flex-col gap-4 w-full">
              <Text className="font-semibold">Kontakt oplysninger</Text>
              <Input
                bordered
                label="Adresse"
                placeholder="Navn på stedet"
                color="default"
              />
              <Input
                bordered
                label="Telefon"
                labelLeft="+45"
                placeholder="00 00 00 00"
              />
              <Input
                bordered
                label="Email"
                placeholder="email@email.com"
                color="default"
              />
            </div>
            <div className="w-full flex flex-col gap-4">
              <Text className="font-semibold">Åbningstider</Text>
              <Input width="100%" label="Mandag - Torsdag" type="time" />
              <Input width="100%" label="Fredag" type="time" />
              <Input
                bordered
                label="Google maps parameters"
                placeholder="41.40338, 2.17403"
                color="default"
              />
            </div>
          </div>
          <div className="mt-4">
            <Button>Gem</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Kontakt;
