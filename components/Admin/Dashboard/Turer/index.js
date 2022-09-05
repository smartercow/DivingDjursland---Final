import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Input,
  Row,
  Text,
  Textarea,
} from "@nextui-org/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import List from "./List";
import { firestore, auth, storage } from "../../../Firebase/clientApp";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const initialState = {
  sted: "",
  beskrivelse: "",
  dato: "",
  tidspunkt: "",
  antalpladser: 0,
  pris: 0,
  video: "",
};

const Turer = () => {
  //Dropdown
  const [selected, setSelected] = useState(new Set(["Strand"]));
  const selectedType = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  const [id, setId] = useState(null);

  const [user] = useAuthState(auth);
  const [selectedFile, setSelectedFile] = useState(null);
  const [visible, setVisible] = useState(true);
  const selectedFileRef = useRef(null);
  const [update, setUpdate] = useState(true);

  const [form, setForm] = useState(initialState);
  const { sted, beskrivelse, dato, tidspunkt, antalpladser, pris, video } =
    form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log(selectedType);
  console.log(selectedFile);
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

  useEffect(() => {
    id && getTurerDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getTurerDetail = async () => {
    const docRef = doc(firestore, "Turer", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
  };

  console.log(selectedType);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sted && beskrivelse && selected) {
      if (!id) {
        try {
          const turerDocRef = await addDoc(collection(firestore, "Turer"), {
            ...form,
            oprettet: serverTimestamp(),
            userId: user.uid,
            type: selectedType,
            ledigepladser: form.antalpladser,
            synligt: visible,
          });
          /* toast.success("Tur blev oprettet"); */

          const turerImageRef = ref(storage, `Turer/${turerDocRef.id}/image`);

          //Opdater Turer document i db collection med url til billedet - efter document er oprettet
          await uploadString(turerImageRef, selectedFile, "data_url").then(
            async (snapshot) => {
              const downloadURL = await getDownloadURL(turerImageRef);
              await updateDoc(doc(firestore, "Turer", turerDocRef.id), {
                image: downloadURL,
              });
            }
          );
          setForm(initialState);
          setId("");
          setUpdate(!update);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await updateDoc(doc(firestore, "Turer", id), {
            ...form,
            type: selectedType,
            synligt: visible,
            opdateret: serverTimestamp(),
            opdateretAf: user.uid,
          });

          setForm(initialState);
          setUpdate(!update);
          setId("");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "Turer", id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card variant="bordered">
        <Card.Header>
          <Text h4>Turer</Text>
        </Card.Header>

        <Card.Divider />

        <Card.Body>
          <Card variant="bordered">
            <Card.Body>
              <Text className="mb-2 font-semibold">Ny tur</Text>
              <form onSubmit={handleSubmit}>
                <div className="flex justify-between gap-8 flex-col md:flex-row">
                  <div className="flex flex-col gap-2 w-full">
                    <Input
                      bordered
                      label="Sted"
                      placeholder="Navn på stedet"
                      color="default"
                      name="sted"
                      value={sted}
                      onChange={handleChange}
                    />
                    <Textarea
                      bordered
                      label="Beskrivelse"
                      placeholder="Beskrivelse om stedet"
                      name="beskrivelse"
                      value={beskrivelse}
                      onChange={handleChange}
                    />
                    <Input
                      label="Dato"
                      type="date"
                      name="dato"
                      value={dato}
                      onChange={handleChange}
                    />
                    <Input
                      label="Tidspunkt"
                      type="time"
                      name="tidspunkt"
                      value={tidspunkt}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full mt-[-20px] md:mt-0">
                    <Input
                      bordered
                      label="Antal pladser"
                      placeholder="0"
                      color="default"
                      type="number"
                      name="antalpladser"
                      value={antalpladser}
                      onChange={handleChange}
                    />
                    <Input
                      bordered
                      label="Pris"
                      placeholder="0"
                      color="default"
                      type="number"
                      name="pris"
                      value={pris}
                      onChange={handleChange}
                    />
                    <div className="flex items-center justify-between my-1 gap-2">
                      <Text>Type</Text>
                      <Dropdown>
                        <Dropdown.Button
                          flat
                          color="currentColor"
                          css={{ tt: "capitalize", w: "85%" }}
                        >
                          {selected}
                        </Dropdown.Button>
                        <Dropdown.Menu
                          aria-label="Single selection actions"
                          color="secondary"
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={selected}
                          onSelectionChange={setSelected}
                        >
                          <Dropdown.Item key="Strand">Strand</Dropdown.Item>
                          <Dropdown.Item key="Båd">Båd</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <input
                      type="file"
                      placeholder="Upload billede..."
                      className="w-full"
                      hidden
                      onChange={addImageToSlide}
                      ref={selectedFileRef}
                    />
                    <Input
                      bordered
                      label="Video link"
                      placeholder="https://www.youtube.com/watch?v=#########"
                      color="default"
                      name="video"
                      value={video}
                      onChange={handleChange}
                    />
                    <Button
                      flat
                      className="text-black w-full mt-2"
                      css={{ background: "#F1F3F5" }}
                      auto
                      onClick={() => selectedFileRef.current?.click()}
                    >
                      <Text>Upload billede</Text>
                      <IoMdCloudUpload className="text-xl ml-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3 flex-col md:flex-row sm:flex-row md:gap-[20%] mt-4">
                  <div className="w-full">
                    <Checkbox
                      onChange={setVisible}
                      value={visible}
                      isSelected={visible}
                    >
                      <Text>Synligt på forsiden</Text>
                    </Checkbox>
                  </div>
                  <div className="w-full">
                    <Button
                      className="w-full"
                      color="primary"
                      type="submit"
                      onClick={() => setUpdate(!update)}
                    >
                      {id ? "Opdater" : "Opret"}
                    </Button>
                  </div>
                </div>
              </form>
            </Card.Body>
          </Card>

          <Card.Divider className="my-5" />
          <List
            setId={setId}
            setSelected={setSelected}
            setVisible={setVisible}
            update={update}
            setUpdate={setUpdate}
            handleDelete={handleDelete}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Turer;
