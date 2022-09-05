import { Card, Text, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Authentication from "../components/auth/Authentication";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../components/Firebase/clientApp";
import { useRouter } from "next/router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { User } from "firebase/auth";

const Auth = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState([]);

  const getUsers = async () => {
    const docRef = doc(firestore, "Users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().isAdmin === true) {
      setUserData(docSnap.data());
      console.log("isAdmin = True");
    } else if (docSnap.exists() && docSnap.data().isAdmin === false) {
      console.log("isAdmin = False");
    } else {
      console.log("Intet sådant dokument!");
    }
  };

  useEffect(() => {
    if (user) {
      getUsers();
    }
  }, [user]);

  return (
    <div>
      <div className="bg-[#EBFBFF] relative">
        <div className="max-w-5xl mx-5 lg:mx-auto relative h-80">
          <div className="">
            <Image src="/images/headerimg.svg" alt="" />
          </div>
        </div>
        <div className="absolute bottom-0">
          <Image src="/images/morewaveswhite.svg" alt="" />
        </div>
      </div>
      <div className="absolute top-[10%] md:top-[20%] flex justify-center w-full">
        <div className=" bg-white p-10 rounded-2xl">
          <Authentication />
        </div>
      </div>
      <div className="h-60"></div>
      <div className="w-full mt-20">
        <Image
          layout="responsive"
          height="7%"
          objectFit="cover"
          width="100%"
          src="/images/morewaves.svg"
          color="red"
          alt=""
        />
      </div>
    </div>
    /*     <div className="bg-gradient pt-5 relative h-[90vh] bg-[url('/images/headerimg.svg')] bg-contain">
      <div>
      </div>
      <div className="max-w-5xl mx-5 lg:mx-auto">
        <div className="mx-auto absolute md:top-10 md:left-[40%]">

        </div>
      </div>
      <div></div>
    </div> */
  );
};

export default Auth;
