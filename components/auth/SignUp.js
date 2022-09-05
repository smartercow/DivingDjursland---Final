import { Button, Input, Loading, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { auth } from "../Firebase/clientApp";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { firestore } from "../Firebase/clientApp";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { Mail } from "../../assets/Mail";
import { async } from "@firebase/util";
import { useRouter } from "next/router";

const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(false);

  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  //console.log(user);

  const onSubmit = (event) => {
    try {
      event.preventDefault();
      if (error) setError("");
      if (signUpForm.password !== signUpForm.confirmPassword) {
        return setError("Password do not match");
      }
      // Valid form inputs
      createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);

    } catch (error) {
      console.log("Fejl", error.msg);
    }
  };

  const onChange = (event) => {
    //Update form state
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const createUserDocument = async (user) => {
    await setDoc(
      doc(firestore, "Users", user.user.uid),
      JSON.parse(JSON.stringify(user))
    );

    await updateDoc(doc(firestore, "Users", user.user.uid), {
      isAdmin: false,
    });
  };

  useEffect(() => {
    if (user) {
      createUserDocument(user);
      router.push('/')
    }
  }, [user]);

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-5">
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
            <Input.Password
              required
              shadow={false}
              label="Kode"
              name="password"
              type="password"
              onChange={onChange}
              width="100%"
            />
            <Input.Password
              required
              shadow={false}
              label="Gentage kode"
              name="confirmPassword"
              type="password"
              onChange={onChange}
              width="100%"
            />
            <Button type="submit">
              {loading ? (
                <Loading color="white" type="points" />
              ) : (
                <Text color="white">Opret Bruger</Text>
              )}
            </Button>
          </div>
          <p>{error}</p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
