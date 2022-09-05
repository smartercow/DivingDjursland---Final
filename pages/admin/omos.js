import { Card, Text } from "@nextui-org/react";
import React from "react";
import OmOs from "../../components/Admin/Dashboard/OmOs";

const OmOsDashboard = () => {
  return (
    <div>
      <Card variant="bordered">
        <Card.Header>
        <Text h4>Om os</Text>
        </Card.Header>
        <Card.Divider></Card.Divider>
        <Card.Body>
          <OmOs />
        </Card.Body>
      </Card>
    </div>
  );
};

export default OmOsDashboard;
