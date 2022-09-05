import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Input, Row, Text, Textarea } from "@nextui-org/react";
import { IoMdCloudUpload } from "react-icons/io";
import { DeleteDocumentIcon } from "../../../../assets/DeleteDocumentIcon";
import { EditDocumentIcon } from "../../../../assets/EditDocumentIcon";
import Image from "next/image";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore, storage } from "../../../Firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
const Team = () => {
  //State for title & link fra inputs
  const [navn, setNavn] = useState("");
  const [role, setRole] = useState("");

  //Auth state for hvilken bruger der logget ind
  const user = useAuthState(auth);

  const selectedFileRef = useRef(null);

  //True/False for useEffect opdatering
  const [update, setUpdate] = useState(false);

  //State for alle documents i Slides collection der mappes ud i return
  const [teamList, setTeamList] = useState([]);

  //Sti til Slides collection Firestore database som bruges af flere functions
  const teamColRef = collection(firestore, "Team");

  //State for billede URL som kommer fra addImageToPost
  const [selectedFile, setSelectedFile] = useState(null);

  //Funktion til at oprette slides
  const createTeam = async () => {
    //Sti til SLides collection
    //Opretter en collection med title & link fra useState via onChange
    const teamDocRef = await addDoc(teamColRef, {
      adminID: user[0].email,
      navn: navn,
      role: role,
      timestamp: serverTimestamp(),
    });

    //console.log("New doc added with ID", slideDocRef.id)

    //Sti til hvor billede skal gemmes i Firestore storage
    const imageRef = ref(storage, `Team/${teamDocRef.id}/image`);

    //Opdater Slides doucment i db collection med url til billedet - efter document er oprettet
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(teamColRef, teamDocRef.id), {
          image: downloadURL,
        });
      }
    );
    //Nulstiller file input value
    setSelectedFile(null);
    setUpdate(!update);
  };

  //Ligger billede URL i selectedFile state via onChange på file input
  const addImageToSlide = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(teamColRef, id));
      setUpdate(!update);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  //Henter alle documents i Team collection og sætter dem i en state der mapper dem under i return
  useEffect(() => {
    const getTeam = async () => {
      const teamData = await getDocs(teamColRef);
      setTeamList(
        teamData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getTeam();
  }, [update]);
  return (
    <div>
      <Card variant="bordered">
        <Card.Body>
          <Text className="font-semibold mb-3">Team</Text>
          <div className="flex gap-4 flex-col md:flex-row">
            {teamList &&
              teamList.map((item, index) => (
                <Card variant="bordered" key={index}>
                  <Card.Body css={{ height: "40vh"}}>
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={item.image}
                      alt={item.navn}
                    />
                  </Card.Body>
                  <Card.Divider></Card.Divider>

                  <Card.Footer>
                    <Row
                      wrap="nowrap"
                      justify="space-between"
                      gap={0.2}
                      align="center"
                    >
                      <Text className="truncate">{item.navn}</Text>
                      <Text>
                        <EditDocumentIcon
                          size={22}
                          fill="#083C50"
                          className="cursor-pointer"
                          onClick={() => {}}
                        />
                        <DeleteDocumentIcon
                          fill="#F31260"
                          className="cursor-pointer"
                          onClick={() => handleDelete(item.id)}
                        />
                      </Text>
                    </Row>
                  </Card.Footer>
                </Card>
              ))}
          </div>
        </Card.Body>
        <Card.Divider />
        <Card.Body>
          <div className="flex flex-col gap-4">
            <Input
              bordered
              label="Navn"
              placeholder="Navn"
              onChange={(event) => setNavn(event.target.value)}
              color="default"
            />
            <Input
              bordered
              label="Role"
              placeholder="Role"
              onChange={(event) => setRole(event.target.value)}
              color="default"
            />
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="w-[40%]">
                <input
                  type="file"
                  placeholder="Upload billede..."
                  className="w-full"
                  hidden
                  onChange={addImageToSlide}
                  ref={selectedFileRef}
                />
                <Button
                  flat
                  className="text-black w-full"
                  css={{ background: "#F1F3F5" }}
                  auto
                  onClick={() => selectedFileRef.current?.click()}
                >
                  <Text>Upload billede</Text>
                  <IoMdCloudUpload className="text-xl ml-3" />
                </Button>
              </div>
              <div className="w-auto">
                <Button onClick={createTeam} color="primary">
                  Gem
                </Button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Team;
