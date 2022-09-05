import { Button, Card, Text } from "@nextui-org/react";

const PriceSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6 lg:gap-10">
      <div className="w-full">
        <Card>
          <Card.Body>
            <div className="flex flex-col gap-1 md:gap-3 px-3">
              <Text color="primary" transform="uppercase" h5>
                Strand scuba <br /> dykning
              </Text>
              <Text color="#5379FE" h4>
                300,- DKK
              </Text>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur
              </Text>
              <Button css={{ backgroundColor: "#5379FE" }}>
                <p className="font-semibold" color="white">
                  FIND EN TUR
                </p>
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="w-full">
        <Card>
          <Card.Body>
            <div className="flex flex-col gap-1 md:gap-3 px-3">
              <Text color="primary" transform="uppercase" h5>
                Båd scuba <br /> dykning
              </Text>
              <Text color="#682FDE" h4>
                600,- DKK
              </Text>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur
              </Text>
              <Button css={{ backgroundColor: "#682FDE" }}>
                <p className="font-semibold" color="white">
                  FIND EN TUR
                </p>
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="w-full">
        <Card>
          <Card.Body>
            <div className="flex flex-col gap-1 md:gap-3 px-3">
              <Text color="primary" transform="uppercase" h5>
                Scuba dykning <br /> kurser
              </Text>
              <Text color="#0DB9C6" h4>
                3,500,- DKK
              </Text>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur
              </Text>
              <Button css={{ backgroundColor: "#0DB9C6" }}>
                <p className="font-semibold" color="white">
                  FIND EN TUR
                </p>
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default PriceSection;
