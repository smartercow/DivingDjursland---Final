import { Card, Text } from "@nextui-org/react";
import React from "react";
import Dykkerspots from "../../components/Admin/Dashboard/Dykkerspots";

const DykkerspotsDashboard = () => {
  return (
    <div>
      <Card variant="bordered">
        <Card.Header>
          <Text h4>Dykkerspots</Text>
        </Card.Header>
        <Card.Divider></Card.Divider>
        <Card.Body>
          <Dykkerspots />
        </Card.Body>
      </Card>
    </div>
  );
};

export default DykkerspotsDashboard;
