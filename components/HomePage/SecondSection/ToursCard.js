import { Card, Grid, Row, Text, Button, Collapse } from "@nextui-org/react";
import { collection, getDocs } from "firebase/firestore";

import Image from "next/image";
import { useEffect, useState } from "react";
import { firestore } from "../../Firebase/clientApp";

const Tours = () => {
  const [turer, setTurer] = useState([]);

  const turerColRef = collection(firestore, "Turer");

  useEffect(() => {
    const getTurer = async () => {
      const turerData = await getDocs(turerColRef);
      setTurer(turerData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTurer();
  }, []);

  return (
    <>
      <div className="hidden md:inline">
        <div className="flex justify-between gap-5">
          {turer.slice(0,3).map((item, index) => (
            <div key={index}>
              <Card isPressable className="w-35 sm:w-35 md:w-55 lg:w-80" key={index}>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={item.image}
                    objectFit="cover"
                    width="100%"
                    height={140}
                    alt={item.sted}
                  />
                </Card.Body>

                <Card.Header css={{ pb: 2 }}>
                  <Button color="secondary" css={{ opacity: 0.8 }} size="xs">
                    VIDEO
                  </Button>
                </Card.Header>

                <Card.Header css={{ justifyItems: "flex-start", py: 0 }}>
                  <Row wrap="wrap" justify="space-between" align="center">
                    <Text
                      h4
                      css={{
                        color: "$accents7",
                        fontWeight: "$semibold",
                        fontSize: "$sm",
                      }}
                    >
                      {item.dato}
                    </Text>
                    <Text h4 color="primary">
                      {item.sted}
                    </Text>
                  </Row>
                </Card.Header>

                <Card.Body css={{ pt: 0 }}>
                  <div>
                    <Text color="primary" className="italic">
                      Lorem ipsum dolor sit amet consectet adip isi cing elit
                      parta idlyrso le mundo pret jkre...
                    </Text>
                    <hr />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <Text b color="primary">
                        Antal Pladser:
                      </Text>
                      <Text color="primary">{item.ledigepladser}</Text>
                    </div>
                    <div className="flex justify-between">
                      <Text b color="primary">
                        Ledige Pladser:
                      </Text>
                      <Text color="primary">{item.antalpladser}</Text>
                    </div>
                    <div className="flex justify-between">
                      <Text b color="primary">
                        Type:
                      </Text>
                      <Text color="primary">{item.type}</Text>
                    </div>
                    <div className="flex justify-between">
                      <Text b color="primary">
                        Pris:
                      </Text>
                      <Text color="primary">{item.pris}</Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden">
        <Grid.Container gap={2}>
          <Grid>
            <Collapse.Group splitted>
              {turer.map((item, index) => (
                <Collapse
                  key={index}
                  title={
                    <Text h5 className="flex gap-4 items-center">
                      <Text>{item.date}</Text> {item.title}
                    </Text>
                  }
                >
                  <Card css={{ filter: "none" }}>
                    <Card.Header className="rounded-sm h-28">
                      <div>
                        <Image
                          layout="responsive"
                          objectFit="contain"
                          height="100%"
                          width="100%"
                          src={item.image}
                          alt=""
                        />
                      </div>
                    </Card.Header>
                    <Card.Header css={{ pb: 0 }}>
                      <Button css={{ opacity: 0.8 }} size="xs">
                        VIDEO
                      </Button>
                    </Card.Header>
                    <Card.Body css={{ pt: 1 }}>
                      <div className="mb-1">
                        <Text color="primary" className="italic">
                          Lorem ipsum dolor sit amet consectet adip isi cing
                          elit parta idlyrso le mundo pret jkre...
                        </Text>
                        <hr />
                      </div>
                      <div className="flex justify-between">
                        <Text b color="primary">
                          Antal Pladser:
                        </Text>
                        <Text color="primary">{item.seats}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text b color="primary">
                          Ledige Pladser:
                        </Text>
                        <Text color="primary">{item.aseats}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text b color="primary">
                          Type:
                        </Text>
                        <Text color="primary">{item.type}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text b color="primary">
                          Pris:
                        </Text>
                        <Text color="primary">{item.price}</Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Collapse>
              ))}
            </Collapse.Group>
          </Grid>
        </Grid.Container>
      </div>
    </>
  );
};

export default Tours;
