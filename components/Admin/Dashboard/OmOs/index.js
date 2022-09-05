import { Button, Card, Input, Row, Text, Textarea } from "@nextui-org/react";
import React from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { DeleteDocumentIcon } from "../../../../assets/DeleteDocumentIcon";
import { EditDocumentIcon } from "../../../../assets/EditDocumentIcon";
import Team from "./Team";
const OmOs = () => {
  return (
    <div className="flex flex-col gap-5">
      <Card variant="bordered">
        <Card.Body>
          <Text className="font-semibold mb-3">Beskrivelse</Text>
          <div className="flex flex-col gap-4">
            <Input
              bordered
              label="Overskrift"
              placeholder="Om os"
              color="default"
            />
            <Textarea
              bordered
              label="Om os beskrivelse"
              placeholder="Om os beskrivelse"
            />
            <div className="mt-2">
              <Button>Gem</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Team />
    </div>
  );
};

export default OmOs;
