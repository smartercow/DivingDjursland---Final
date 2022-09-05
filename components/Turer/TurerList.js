import {
  Card,
  Grid,
  Row,
  Text,
  Button,
  Collapse,
  Modal,
} from "@nextui-org/react";
import { collection, getDocs } from "firebase/firestore";

import Image from "next/image";
import { useEffect, useState } from "react";
import { firestore } from "../Firebase/clientApp";
import Tilmelding from "../Tilmelding";

const TurerList = () => {
    const [tur, setTur] = useState("")
    const [turId, setTurId] = useState("")
    const [turDato, setTurDato] = useState("")
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
      setVisible(false);
      console.log("closed");
    };
  const [turerList, setTurerList] = useState([]);

  const turerCollectionRef = collection(firestore, "Turer");

  useEffect(() => {
    const getTurer = async () => {
      const menuData = await getDocs(turerCollectionRef);
      setTurerList(menuData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTurer();
  }, []);

  console.log(tur);
  console.log(turId);
  console.log(turDato);
  return (
    <>
      <div className="">
        <div className="flex justify-between gap-5 flex-wrap">
          {turerList.map((item, index) => (
            <div key={index}>
              <Card className="w-35 sm:w-35 md:w-55 lg:w-80" key={index}>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={item.image}
                    objectFit="cover"
                    width="100%"
                    height={140}
                    alt={item.title}
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
                      {item.beskrivelse}
                    </Text>
                    <hr />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <Text b color="primary">
                        Antal Pladser:
                      </Text>
                      <Text color="primary">{item.antalpladser}</Text>
                    </div>
                    <div className="flex justify-between">
                      <Text b color="primary">
                        Ledige Pladser:
                      </Text>
                      <Text color="primary">{item.ledigepladser}</Text>
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
                <Card.Divider />
                <Card.Footer>
                  <div className="flex justify-center w-full">
                    <Button color="secondary" onPress={handler} onClick={() => setTur(item.sted) || setTurId(item.id) || setTurDato(item.dato)}>Tilmeld</Button>
                  </div>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
          className="w-full"
          width="70%"
          css={{ bg: "$primary", }}
          noPadding
        >
          <Modal.Header>
            <Text id="modal-title" size={18} color="white" className="top-[-5px]">
              Tilmelding -&nbsp;
              <Text b size={18} color="white">
                {tur} ({turDato})
              </Text>
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Tilmelding tur={tur} turId={turId} turDato={turDato} closeHandler={closeHandler}/>
          </Modal.Body>
          {/* <Modal.Footer>footer</Modal.Footer> */}
        </Modal>
      </div>
    </>
  );
};

export default TurerList;
