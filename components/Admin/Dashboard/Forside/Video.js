import { Button, Card, Checkbox, Grid, Input, Text } from "@nextui-org/react";
import React from "react";

const Video = () => {
  return (
    <div>
      <Text className="my-3 font-bold">Video på forsiden</Text>
      <Grid>
        <Card variant="bordered">
          <Card.Body>
            <Grid className="flex flex-col gap-3">
              <Input
                bordered
                label="Video link"
                labelLeft="https://"
                placeholder="www.youtube.com/watch?v=#########"
              />
              <div className="flex justify-between items-center gap-3 flex-col md:flex-row sm:flex-row md:gap-[20%] mt-2">
                <div className="w-full">
                  <Checkbox defaultSelected={true}>
                    <Text>Synligt på forsiden</Text>
                  </Checkbox>
                  ;
                </div>
                <div className="w-full">
                  <Button className="w-full" color="primary" onClick={() => {}} >
                    Opdater
                  </Button>
                </div>
              </div>
            </Grid>
          </Card.Body>
        </Card>
      </Grid>
    </div>
  );
};

export default Video;
