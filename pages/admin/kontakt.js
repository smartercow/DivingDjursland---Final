import { Card, Text } from "@nextui-org/react";
import React from "react";
import Kontakt from "../../components/Admin/Dashboard/Kontakt";

const KontaktDashboard = () => {
  return (
    <div>
      <Card variant="bordered">
        <Card.Header>
          <Text h4>Kontakt</Text>
        </Card.Header>
        <Card.Divider></Card.Divider>
        <Card.Body>
          <Kontakt />
        </Card.Body>
      </Card>
    </div>
  );
};

export default KontaktDashboard;
