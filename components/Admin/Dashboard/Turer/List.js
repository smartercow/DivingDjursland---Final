import { Button, Card, Row, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { EditDocumentIcon } from "../../../../assets/EditDocumentIcon";
import { DeleteDocumentIcon } from "../../../../assets/DeleteDocumentIcon";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../Firebase/clientApp";
const list = [
  {
    title: "Sangstrup Klint",
    img: "/images/sangstrup.jpg",
    description: "Lorem ipsum dolor sit amet consectet adipisicing elit",
    date: "07/08",
    seats: "10",
    aseats: "8",
    type: "Strand",
    price: "300,- DKK",
  },
  {
    title: "Kreidesse",
    img: "/images/hemmoor.jpg",
    description: "Lorem ipsum dolor sit amet consectet adipisicing elit",
    date: "13/08",
    seats: "10",
    aseats: "9",
    type: "Båd",
    price: "600,- DKK",
  },
  {
    title: "Ebeltoft Bådhavn",
    img: "/images/ebeltoft.jpg",
    description: "Lorem ipsum dolor sit amet consectet adipisicing elit",
    date: "18/08",
    seats: "10",
    aseats: "10",
    type: "Båd",
    price: "600,- DKK",
  },
];
const List = ({
  setId,
  setUpdate,
  update,
  setSelected,
  setVisible,
  handleDelete,
}) => {
  const [turerList, setTurerList] = useState([]);

  const turerCollectionRef = collection(firestore, "Turer");

  useEffect(() => {
    const getTurer = async () => {
      const menuData = await getDocs(turerCollectionRef);
      setTurerList(menuData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTurer();
  }, [update]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-2 flex-wrap">
        {turerList.map((item, index) => (
          <div key={index} className="w-80">
            <Card variant="bordered">
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={item.image}
                  objectFit="cover"
                  width="100%"
                  height={140}
                  alt={item.title}
                />
              </Card.Body>

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
              <Card.Footer className="flex justify-between">
                <Text className="text-gray-500 text-sm">
                  Oprettet: &nbsp;
                  {item.oprettet?.toDate().toLocaleString("da-DK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
/*                     hour: "2-digit",
                    minute: "2-digit", */
                  })}
                </Text>
                <div className="flex gap-1">
                  <EditDocumentIcon
                    size={22}
                    fill="#083C50"
                    className="cursor-pointer"
                    onClick={() => {
                      setId(item.id),
                        setSelected(item.type),
                        setVisible(item.synligt);
                    }}
                  />
                  <DeleteDocumentIcon
                    size={22}
                    fill="#F31260"
                    className="cursor-pointer"
                    onClick={() => {
                      handleDelete(item.id), setUpdate(!update);
                    }}
                  />
                </div>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
