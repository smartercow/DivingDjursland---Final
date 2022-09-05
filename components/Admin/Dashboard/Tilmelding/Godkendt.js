import React, { useEffect, useState } from "react";
import { Button, Card, Collapse, Table, Text } from "@nextui-org/react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../Firebase/clientApp";

const Godkendt = ({ update, setUpdate }) => {
  const [tilmeldingData, setTilmeldingData] = useState([]);

  useEffect(() => {
    const tilmeldColRef = collection(firestore, "Tilmelding");
    const getTilmeld = async () => {
      const tilmeldData = await getDocs(tilmeldColRef);
      setTilmeldingData(
        tilmeldData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getTilmeld();
  }, [update]);
  return (
    <div>
      <Card variant="bordered">
        <Card.Body>
          <Text className="font-semibold uppercase text-green-700">
            Godkendt
          </Text>
          <Collapse.Group bordered className="mt-2">
            {tilmeldingData
              .filter((ikke) => {
                return ikke.godkendt === true;
              })
              .map((item, index) => (
                <Collapse
                  key={index}
                  title={
                    <div className="flex items-center">
                      <Text b>{item.navn} -&nbsp;</Text>
                      <Text>{item.turSted} -&nbsp;</Text>
                      <Text b small>
                        {item.turDato}
                      </Text>
                    </div>
                  }
                >
                  <Table
                    striped
                    shadow={false}
                    aria-label="Example table with dynamic content & infinity pagination"
                    css={{ minWidth: "100%", height: "auto" }}
                    color="secondary"
                  >
                    <Table.Header>
                      <Table.Column>Fuld navn</Table.Column>
                      <Table.Column>Telefon</Table.Column>
                      <Table.Column>Email</Table.Column>
                      <Table.Column>Adresse</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row key="1">
                        <Table.Cell>{item.navn}</Table.Cell>
                        <Table.Cell>{item.tel}</Table.Cell>
                        <Table.Cell>{item.email}</Table.Cell>
                        <Table.Cell>{item.adresse}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <Table
                    striped
                    shadow={false}
                    aria-label="Example table with dynamic content & infinity pagination"
                    css={{ minWidth: "100%", height: "auto" }}
                    color="secondary"
                  >
                    <Table.Header>
                      <Table.Column>Højde</Table.Column>
                      <Table.Column>Vægt</Table.Column>
                      <Table.Column>Skostørrelse</Table.Column>
                      <Table.Column>Grill</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row key="1">
                        <Table.Cell>{item.height}</Table.Cell>
                        <Table.Cell>{item.weight}</Table.Cell>
                        <Table.Cell>{item.sko}</Table.Cell>
                        <Table.Cell>{item.grill}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <Card variant="flat" css={{ mt: "10px" }}>
                    <Card.Body>
                      <div className="flex justify-between items-center gap-3">
                        <div className="flex w-full justify-between gap-3">
                          <div>
                            <Text>Betalingsmetode</Text>
                            <Text b>{item.betalingsmetode}</Text>
                          </div>
                          <div>
                            <Text>Betalt</Text>
                            <Text b>{item.sendt.toDate().toDateString()}</Text>
                          </div>
                        </div>
                        {/*                         <div className="w-full flex justify-end">
                          <Button auto>Godkend</Button>
                        </div> */}
                      </div>
                    </Card.Body>
                  </Card>
                </Collapse>
              ))}
          </Collapse.Group>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Godkendt;
