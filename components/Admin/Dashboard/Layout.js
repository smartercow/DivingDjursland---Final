import { Button, Card, Text } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../Firebase/clientApp";
import Authentication from "../../auth/Authentication";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";

//import { listMenu } from '../../../assets/adminmenu'

export const list = [
  {
    title: "Dashboard",
    link: "dashboard",
    icon: "",
  },
  {
    title: "Forsiden",
    link: "forside",
    icon: "",
  },
  {
    title: "Turer",
    link: "turer",
    icon: "",
  },
  {
    title: "Tilmelding",
    link: "tilmelding",
    icon: "",
  },
  {
    title: "Dykkerspots",
    link: "dykkerspots",
    icon: "",
  },
  {
    title: "Om os",
    link: "omos",
    icon: "",
  },
  {
    title: "Kontakt",
    link: "kontakt",
    icon: "",
  },
  /*   {
    title: "Footer",
    link: "footer",
    icon: "",
  }, */
  /*   {
    title: "Indstillinger",
    link: "indstillinger",
    icon: "",
  }, */
];
const Layout = ({ children }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  //console.log("list", list);

  const logout = async () => {
    await signOut(auth);
  };

  const getUsers = async () => {
    const docRef = doc(firestore, "Users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().isAdmin === true) {
      router.push("/admin/dashboard");
    } else if (docSnap.exists() && docSnap.data().isAdmin === false) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    } else if (user) {
      getUsers();
    }
  }, [user]);

  return (
    <div className="sm:max-w-5xl sm:mx-5 lg:mx-auto px-2">
      <div className="my-3">
        {user ? (
          <div className="flex flex-col gap-3">
            <Card variant="flat" css={{ mw: "100%" }}>
              <Card.Body>
                <div className="flex justify-between items-center">
                  <div>
                    Velkommen {user.displayName || user.email.split("@")[0]}
                  </div>
                  <div>
                    <Button css={{ mw: "60px" }} onClick={logout}>
                      Log Ud
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card variant="flat">
              <Card.Body>
                <div className="flex gap-4 justify-between flex-wrap md:px-2">
                  {list.map((item, index) => (
                    <div key={index} className="cursor-pointer">
                      <Link href={item.link}>
                        <Text css={{ textDecoration: "underline", textUnderlineOffset: "5px"}} color="primary" b>
                          {item.title}
                        </Text>
                      </Link>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            <div>{children}</div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Authentication />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
