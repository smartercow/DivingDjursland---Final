import { Button, Text } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../components/Firebase/clientApp";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user]);
  return (
    <div className="bg-[#e6f4f7]">
      <div className="max-w-5xl mx-5 lg:mx-auto h-[80vh] pt-5">
        {user && (
          <div className=" flex flex-col gap-3">
            <div className="flex gap-3">
              <Text h4>Velkommen</Text>
              <div className="underline">
                <Text h4>{user.email}</Text>
              </div>
              <hr />
            </div>
            <div className="border ">
              <Text>Dine turer</Text>
              <Text>...</Text>
              <Text>...</Text>
              <Text>...</Text>
            </div>
            <div>
              <Button color="error" onClick={logout}>
                Logud
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
