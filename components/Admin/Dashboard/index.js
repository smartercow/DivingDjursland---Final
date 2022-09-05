import { Button, Card, Table } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../Firebase/clientApp";
import Charts from "./Charts";
const Dashboard = ({ children }) => {
  const [user] = useAuthState(auth);
  const [usersList, setUsersList] = useState([]);

  const usersCollectionRef = collection(firestore, "Users");

  //Henter nav links i admin dashboard
  useEffect(() => {
    const getUsers = async () => {
      const usersData = await getDocs(usersCollectionRef);
      setUsersList(
        usersData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getUsers();
  }, []);

  console.log(user);

  return (
    <div>
{/*       <div>
        <Charts />
      </div> */}
      <div>
        <Table
          lined
          aria-label="Example table with static content"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            <Table.Column>Email</Table.Column>
            <Table.Column>Oprettet</Table.Column>
            <Table.Column>Sidste login</Table.Column>
          </Table.Header>
          <Table.Body>
            {usersList.map((user, index) => (
              <Table.Row key={index}>
                <Table.Cell>{user.user.email}</Table.Cell>
                <Table.Cell>
                  {new Date(Number(user.user.createdAt)).toLocaleString("da-DK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Table.Cell>
                <Table.Cell>
                  {new Date(Number(user.user.lastLoginAt)).toLocaleString("da-DK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
