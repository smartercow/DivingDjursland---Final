/* import Link from "next/link"; */
import { Button, Link } from "@nextui-org/react";
import { RiMenu2Fill } from "react-icons/ri";
import { collection, getDocs } from "firebase/firestore";
import { auth, firestore } from "../Firebase/clientApp";
import { useEffect, useState } from "react";
import Content from "./Content";
import { useAuthState } from "react-firebase-hooks/auth";
const Header = () => {
  const [user] = useAuthState(auth);

  const navColRef = collection(firestore, "Menu");
  const [navigation, setNavigation] = useState([]);
  useEffect(() => {
    const getNavigation = async () => {
      const menuData = await getDocs(navColRef);
      setNavigation(
        menuData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getNavigation();
  }, []);
  

  return (
    <div className="bg-[#CFF0F8]">
      <div className="flex justify-between items-center md:max-w-5xl md:mx-5 lg:mx-auto">

        <Content navigation={navigation} user={user} />


        {/* Right */}

      </div>
    </div>
  );
};

export default Header;
