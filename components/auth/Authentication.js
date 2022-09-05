import { Button, Card, Text } from "@nextui-org/react";
import React, { useState } from "react";
import SignIn from "./LogIn";
import SignUp from "./SignUp";

const Auth = () => {
  const [signState, setSignState] = useState(true);
  return (
    <div>
      <Card variant="flat" css={{ w: "300px", bg: "#CFF0F8", p: "10px" }}>
        <Card.Body>
          <div className="text-center">
            <Text h4>LOGIN</Text>
          </div>
          {signState ? (
            <>
              <SignIn />
              <div className="mt-3">
                <Text b className="cursor-pointer" onClick={() => setSignState(!signState)}>Opret Bruger</Text>
              </div>
            </>
          ) : (
            <>
              <SignUp />
              <div className="mt-3">
                <Text b className="cursor-pointer" onClick={() => setSignState(!signState)}>Log Ind</Text>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Auth;
