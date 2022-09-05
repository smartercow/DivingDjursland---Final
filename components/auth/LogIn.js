import React, { useEffect, useState } from "react";
import { useAuthState, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../Firebase/clientApp";
import { Button, Card, Input, Loading, Text } from "@nextui-org/react";
import { Mail } from "../../assets/Mail";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
const SignIn = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [user] = useAuthState(auth);
  const router = useRouter();
  const [loginError, setloginError] = useState()


  const [signInWithEmailAndPassword, userCred, loading, error] =
    useSignInWithEmailAndPassword(auth);

  //Firebase logic
  const onSubmit = (event) => {
    event.preventDefault();
    try {
      signInWithEmailAndPassword(loginForm.email, loginForm.password);
    } catch (error) {
      /* setloginError(error.msg) */
      /* console.log("fejllogin", error.msg); */
    }
  };

  const onChange = (event) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
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
    if (user) {
      getUsers();
    }
  }, [user]);

  return (
    <div className="">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-5">
          {/* <input name="email" type="email" onChange={onChange} /> <br /> */}
          <Input
            required
            label="Email"
            name="email"
            type="email"
            shadow={false}
            onChange={onChange}
            contentRight={<Mail fill="currentColor" />}
            width="100%"
          />
          {/* <input name="password" type="password" onChange={onChange} /> <br /> */}
          <Input.Password
            required
            label="Kodeord"
            name="password"
            type="password"
            shadow={false}
            onChange={onChange}
            width="100%"
          />
          <Button type="submit">
            {loading ? (
              <Loading color="white" type="points" />
            ) : (
              <Text color="white">Log Ind</Text>
            )}
          </Button>
          {error && (
            <div>
              <h6>Email eller password matcher ikke!</h6>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
