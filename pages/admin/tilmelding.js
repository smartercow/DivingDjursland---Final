import { Card, Text } from "@nextui-org/react";
import React from "react";
import Tilmelding from "../../components/Admin/Dashboard/Tilmelding";

const TilmeldingDashboard = () => {
  return (
    <div className="w-full">
      <Card variant="bordered">
        <Card.Header>
        <Text h4>Tilmelding</Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body>
          <Tilmelding />
        </Card.Body>
      </Card>
    </div>
  );
};

export default TilmeldingDashboard;
